class Item < ApplicationRecord
  validates :quantity, numbericality: true, allow_blank: true
  validates :name, presence: true
  validates :price, numericality: true, allow_blank: true

  belings_to :receipt
end
