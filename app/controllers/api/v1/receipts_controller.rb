class Api::V1::ReceiptsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }
  
  def create
    submittedData = receipt_params()

    # receipt = Receipt.new(restaurant: submittedData[:restaurant], tax: 0.00, receipt_url: submittedData[:image], receipt_text: 'this will be edited later by the return value of the google OCR api')


    googleKey = ENV['GOOGLE_API_KEY'] #AIzaSyBwktOJEVl4cix-_ty2NRr3tUfRjaI61Yw
    
    visionPost = {
      "requests": [
        {
          "image": {
            "source": {
              "imageUri": "https://storage.googleapis.com/rr-testing-bucket/uploads/tmp/1621103088-258502186329214-0022-2524/test_Receipt_Mc1.jpeg"
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
    
    
    visionApiUrl = "https://vision.googleapis.com/v1/images:annotate?key=" + 'AIzaSyBwktOJEVl4cix-_ty2NRr3tUfRjaI61Yw'
    faradayHeaders = {"Content-Type": "application/json"}
    

    responseText = Faraday.post(visionApiUrl, visionPost.to_json, faradayHeaders)
    parsedText = JSON.parse(responseText.body)
    receiptText = parsedText['responses'][0]['textAnnotations'][0]['description']
    puts(receiptText)
    binding.pry

    render json: {receipt: receipt, guests: submittedData[:guests]}
    
  end

  private

  def receipt_params
    params.permit(:restaurant, :guests, :image)
  end
end