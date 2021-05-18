class Api::V1::ReceiptsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }
  
  def create
    submittedData = receipt_params()

    receipt = Receipt.new(restaurant: submittedData[:restaurant], tax: 0.00, receipt_url: submittedData[:image], receipt_text: '')

    googleKey = ENV['GOOGLE_API_KEY']
    
    visionPost = {
      "requests": [
        {
          "image": {
            "source": {
              "imageUri": receipt.receipt_url.url
            }
          },
          "features": [
            {
              "type": "TEXT_DETECTION",
              "maxResults": 100
            }
          ]
        }
      ]
    }
    
    
    visionApiUrl = "https://vision.googleapis.com/v1/images:annotate?key=" + googleKey
    faradayHeaders = {"Content-Type": "application/json"}
    
    responseText = Faraday.post(visionApiUrl, visionPost.to_json, faradayHeaders)
    parsedText = JSON.parse(responseText.body)

    textBoxArray = parsedText['responses'][0]['textAnnotations']
    textBoxArray.shift

    receiptItems = []
    currentXAvg = -1
    currentIndex = 0
    sliceingArray = []

    textBoxArray.map do |currentItem|
      sumX = 0

      currentItem['boundingPoly']['vertices'].map do |vertex|
        vertex['x']? '':vertex['x']=0
        sumX += vertex['x']
      end

      currentXAvg = sumX / 4
      currentIndex = textBoxArray.index(currentItem)

      textBoxArray.map do |nextItem|
        currentItem['boundingPoly']['vertices'].sort!{ |a, b| (a['x']) <=> (b['x']) }

        if (nextItem['boundingPoly']['vertices'][0]['x'] <= currentXAvg && 
          nextItem['boundingPoly']['vertices'][3]['x'] >= currentXAvg &&
          textBoxArray.index(nextItem) > currentIndex)

          currentItem['description'] << ' '
          currentItem['description'] << nextItem['description']
          
          sliceingArray << textBoxArray.index(nextItem)
        end
      end
      
      receiptItems << currentItem['description']

      if(sliceingArray.length > 0)
        sliceingArray.reverse!
        sliceingArray.map do |sliceIndex|
          textBoxArray.slice!(sliceIndex)
        end
        sliceingArray = []
      end
    end

    receipt.receipt_text = receiptItems.join(' \n')

    taxItem = 0
    subtotalItem = 0
    
    receiptItems.map do |item|
      item.include?('Tax')? (taxItem = item) : ''
      (item.include?('Sub') && item.include?('total'))? (subtotalItem = item) : ''
    end

    if taxItem != 0 && subtotalItem != 0 
      taxAmount = taxItem[/\d+[,.]\d+/]
      subtotal = subtotalItem[/\d+[,.]\d+/]
      
      if taxAmount && subtotal
        tax = ((taxAmount.to_f / subtotal.to_f) * 100).round
        receipt.tax = tax
      end
    end

    if receipt.save
      
      receiptItems.map do |item|
        quantity = nil
        itemName = item
        price = nil

        if (itemName =~ /^[0-9].*/) == 0
          quantity = itemName[/\d+/]
          itemName.delete_prefix!(quantity)
          quantity.to_i
        end

        if (itemName[/\d+[,.]\d+/])
          price = itemName[/\d+[,.]\d+/]
          itemName.delete_suffix!("$" + price)
          price.to_f
        end

        Item.create(quantity: quantity, name: itemName, price: price, receipt: receipt)
      end

      render json: receipt
    else
      render json: {errors: piza.errors.full_messages}
    end
  end

  private

  def receipt_params
    params.permit(:restaurant, :guests, :image)
  end
end