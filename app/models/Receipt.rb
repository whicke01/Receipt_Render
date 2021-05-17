class Receipt < ApplicationRecord
  validates :restaurant, presence: true
  validates :tax, numericality: true, allow_blank: true

  has_many :items

  mount_uploader :receipt_url, ReceiptPhotoUploader
end