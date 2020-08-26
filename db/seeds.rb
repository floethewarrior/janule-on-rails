# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
# meme = Meme.create([{name: 'hello janule', creator: 'kroshtron#5301', edges: [1]}])

# memes = Meme.all()
# for meme in memes
#     puts meme.id
# end

require 'rubygems'
require 'json'

memes = Meme.all()
for meme in memes
    if meme.edges[0] == nil
        meme.edges = nil
        meme.save
    end
end

# januleFile = File.read(Rails.root.join('db',"janule.json"))
# januleJSON = JSON.parse(januleFile)

# for memeJSON in januleJSON
#     meme = Meme.find_by name: memeJSON['name']
#     edges = Array.new
#     for edge in memeJSON['edges']
#         edgeMeme = Meme.find_by name: edge[1]
#         edges.push(edgeMeme.id)
#     end
#     if edges.length > 0
#         meme.edges = '{' + edges.join(',') + '}'
#         meme.save
#     end
# end

# for memeJSON in januleJSON
#     meme = Meme.create({name: memeJSON['name'], creator: memeJSON['creator']})
#     puts(meme.id)
# end

# meme = Meme.find_by name:'hello janule'
# puts meme.id