class Api::V1::ReceiptsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }
  def create
    submittedData = receipt_params()
    receipt = Receipt.new(restaurant: submittedData[:restaurant], tax: 0.00, receipt_url: submittedData[:image], receipt_text: 'this will be edited later by the return value of the google OCR api')
    binding.pry
    render json: receipt
    
  end

  private

  def receipt_params
    params.permit(:restaurant, :guests, :image)
  end
end