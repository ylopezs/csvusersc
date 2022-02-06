Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do 
      get 'people/index'
      post 'people/load'
    end
  end

  root 'people#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
