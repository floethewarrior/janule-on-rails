class MemesColumnType < ActiveRecord::Migration[6.0]
  def change
    change_column :memes, :edges, :integer, array: true, default: [], using: 'ARRAY[edges]::INTEGER[]'
  end
end
