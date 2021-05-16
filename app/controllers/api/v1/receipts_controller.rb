class Api::V1::ReceiptsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }
  
  def create
    submittedData = receipt_params()

    receipt = Receipt.new(restaurant: submittedData[:restaurant], tax: 0.00, receipt_url: submittedData[:image], receipt_text: 'this will be edited later by the return value of the google OCR api')


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
    puts(textBoxArray.shift)

    receiptItems = []
    currentXAvg = -1

    textBoxArray.map do |currentItem|
      currentItem['boundingPoly']['vertices'].sort!{ |a, b| (a['x']) <=> (b['x']) }
      if currentItem['boundingPoly']['vertices'][0]['x'] <= currentXAvg && currentItem['boundingPoly']['vertices'][2]['x'] >= currentXAvg
        receiptItems.last.concat(' ' + currentItem['description'])
      else
        receiptItems << currentItem['description'] 
        sumX = 0
        currentItem['boundingPoly']['vertices'].map do |vertex|
          vertex['x']? '':vertex['x']=0
          sumX += vertex['x']
        end

        currentXAvg = sumX / 4
      end
    end

    binding.pry

    render json: {receipt: receipt, guests: submittedData[:guests]} 
  end

  private

  def receipt_params
    params.permit(:restaurant, :guests, :image)
  end
end