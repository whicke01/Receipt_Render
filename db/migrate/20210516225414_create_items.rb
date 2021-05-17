class CreateItems < ActiveRecord::Migration[5.2]
  def change
    create_table :items do |t|
      t.integer :quantity
      t.text :name, null: false
      t.float :price

      t.belongs_to :receipt, null: false

      t.timestamps null: false
    end
  end
end
