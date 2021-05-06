class Api::V1::ReceiptsController < ApplicationController
  
  def create
    binding.pry
    #receipt = Receipt.new(receipt_params)

  end

  private

  def receipt_params
    params.permit(:restaurant, :guests, :image)
  end
end