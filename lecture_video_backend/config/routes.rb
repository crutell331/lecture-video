Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      # Sign Up Route
      resources :users, only: [:create]
      # Login Route
      post '/login', to: 'auth#create'
      # Retrieve User Route
      get '/profile', to: 'users#profile'
    end
  end
end
