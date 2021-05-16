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
          nextItem['boundingPoly']['vertices'][2]['x'] >= currentXAvg &&
          textBoxArray.index(nextItem) > currentIndex)

          currentItem['description'] << (' ' + nextItem['description'] )
          sliceingArray << textBoxArray.index(nextItem)
        end
      end

      if(sliceingArray.length > 0)
        sliceingArray.reverse!
        sliceingArray.map do |sliceIndex|
          textBoxArray.slice!(sliceIndex)
        end
        sliceingArray = []
      end
      receiptItems << currentItem['description']
    end

    receipt.receipt_text = receiptItems.join('\n')

    if receipt.save
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