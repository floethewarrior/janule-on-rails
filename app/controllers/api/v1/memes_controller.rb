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

  def destroy
    recipe&.destroy
    render json: { message: 'Recipe deleted!' }
  end

  private
  def meme_params
    params.permit(:name, :creator)
  end
end
