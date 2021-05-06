class CreateReceipt < ActiveRecord::Migration[5.2]
  def change
    create_table :receipts do |t|
      t.string :restaurant, null: false
      t.string :receipt_url, null: false
      t.string :receipt_text, null: false
      t.float :tax, null: false

      t.timestamps null: false
    end
  end
end
