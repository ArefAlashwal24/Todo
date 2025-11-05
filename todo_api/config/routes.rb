Rails.application.routes.draw do
  resources :todos
  root to: redirect('/todos') # optional
end
