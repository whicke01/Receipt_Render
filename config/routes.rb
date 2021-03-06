Rails.application.routes.draw do
  root 'homes#index'
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  get '/receipt', to: 'homes#index'
  get '/receipt/new', to: 'homes#index'
  get '/receipt/new/:id', to: 'homes#index'
  get '/receipt/:id', to: 'homes#index'

  namespace :api do
    namespace :v1 do
      resources :receipts, only: [:create, :show] do
        resources :items, only: [:index]
      end
    end
  end
end
