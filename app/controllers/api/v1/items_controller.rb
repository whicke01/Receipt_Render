class Api::V1::ItemsController < ApplicationController

  def index
    receipt = Receipt.find(params[:receipt_id])
    items = receipt.items
    
    render json: receipt, serializer: ReceiptSerializer
  end

end