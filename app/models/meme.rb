class Meme < ApplicationRecord
    validates :name, presence: true
    validates :creator, presence: true
end
