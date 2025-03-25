class CreateMultiplicationTables < ActiveRecord::Migration[7.2]
  def change
    create_table :multiplication_tables do |t|
      t.references :user, null: false, foreign_key: true
      t.integer :a0, null: false  # Множитель a0 в таблице a0*b0 .. an*bn
      t.integer :an, null: false  # Множитель an в таблице a0*b0 .. an*bn
      t.integer :b0, null: false  # Множитель b0 в таблице a0*b0 .. an*bn
      t.integer :bn, null: false  # Множитель bn в таблице a0*b0 .. an*bn
      t.integer :user_answer
      t.integer :attempt_number, null: false, default: 1
      t.string :status, default: "pending" # Можно использовать статус "pending", "completed", "wrong"

      t.timestamps
    end
  end
end
