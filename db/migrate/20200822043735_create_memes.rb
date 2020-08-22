class CreateMemes < ActiveRecord::Migration[6.0]
  def change
    create_table :memes do |t|
      t.string :name, null: false
      t.string :creator, null: false
      t.references :meme
      t.timestamps
    end
  end
end
