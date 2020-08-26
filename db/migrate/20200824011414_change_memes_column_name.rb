class ChangeMemesColumnName < ActiveRecord::Migration[6.0]
  def change
    rename_column :memes, :meme_id, :edges
  end
end
