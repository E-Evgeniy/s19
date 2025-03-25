class CreateUsers < ActiveRecord::Migration[7.2]
  def change
    create_table :users do |t|
      t.string  :first_name
      t.string  :last_name
      t.string  :middle_name
      t.string  :class_name
      t.integer :user_number

      t.timestamps
    end
  end
end
