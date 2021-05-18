class ReceiptSerializer < ActiveModel::Serializer
  attributes :id, :restaurant, :tax

  attribute :image_url do
    object.receipt_url.url
  end

  has_many :items
end
