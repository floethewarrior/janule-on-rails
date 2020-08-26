Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'memes/index'
      post 'memes/create'
      get '/show/:id', to: 'memes#show'
      get '/edges/:id', to: 'memes#edges'
      post 'memes/associate'
      delete '/destroy/:id', to: 'memes#destroy'
    end
  end
  root 'homepage#index'
  get '/*path' => 'homepage#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
