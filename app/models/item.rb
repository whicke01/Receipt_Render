class Item < ApplicationRecord
  validates :quantity, numericality: true, allow_blank: true
  validates :name, presence: true
  validates :price, numericality: true, allow_blank: true

  belongs_to :receipt
end
