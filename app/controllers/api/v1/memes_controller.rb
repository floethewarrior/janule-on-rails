class Api::V1::MemesController < ApplicationController
  def index
    memes = Meme.all.order(created_at: :desc)
    render json: memes
  end

  def create
    meme = Meme.create!(meme_params)
    if meme
      render json: meme
    else
      render json: meme.errors
    end
  end

  def show
    meme = Meme.find(params[:id])
    if meme
      render json: meme
    else
      render json: meme.errors
    end
  end

  def edges
    meme = Meme.find(params[:id])
    if meme && meme.edges != nil
      edges = Meme.find(meme.edges)
      render json: edges
    else
      render json: {message: "No Edges"}
    end
  end

  def associate
    ids = params[:ids]
    for id in ids
      meme = Meme.find(id)
      if meme
        meme_edges = meme.edges != nil ? meme.edges : Array.new
        for edge_id in ids
          if edge_id != id
            meme_edges.append(edge_id)
          end
        end
        meme.edges = meme_edges
        meme.save
      else
        render json: {message: "Could not find meme: %d" % [id]}
        break
      end
    end
    render json: {message: "boogly"}
  end

  def destroy
    meme = Meme.find(params[:id])
    meme&.destroy
    render json: {message: 'meme deleted!'}
  end

  private
  def meme_params
    params.permit(:name, :creator)
  end
end
