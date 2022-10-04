Rails.application.routes.draw do
  


  resources :messages
  resources :conversations
  resources :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "messages#index"

  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? 

  # Route for login after signup
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  # Route for signing up/creating new user
  post "/signup", to: "users#create"
  get "/me", to: "users#show"

  

end


