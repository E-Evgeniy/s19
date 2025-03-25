# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ('/')
  # root 'articles#index'
  root to: 'react#home'

  get '/up', to: 'health_check#up'

  namespace :api do
    namespace :v1 do
      resources :users
    end
  end

  get 'api/v1/user/user_destroy_session', to: 'api/v1/users#user_destroy_session'


  get '/up', to: 'health_check#up'

  namespace :api do
    namespace :v1 do
      resources :multiplication_tables
    end
  end

  get 'multiplication_table_before', to: 'react#home'
  #-*****************************************************************************************************


  namespace :api do
    namespace :v1 do
      resources :analysises do
        member do
          get :get_files
        end
      end
    end
  end

  get 'api/v1/result', to: 'api/v1/analysises#result'


  namespace :api do
    namespace :v1 do
      resources :name_pairs do
      end
    end
  end

  get 'api/v1/name_pair/find_for_create', to: 'api/v1/name_pairs#find_for_create'


  get 'load_data', to: 'react#home'
  get 'result', to: 'react#home'
  get 'name_pairs', to: 'react#home'
  get 'name_pairs/new', to: 'react#home'
#-*****************************************************************************************************
  namespace :api do
    namespace :v1 do
      resources :clients do
        member do
          get :get_files
        end
      end
    end
  end

  get 'api/v1/client/find_for_create', to: 'api/v1/clients#find_for_create'
  get 'api/v1/client/find_for_edit', to: 'api/v1/clients#find_for_edit'

  get 'api/v1/file/destroy_by_url', to: 'api/v1/files#destroy_by_url'

  namespace :api do
    namespace :v1 do
      resources :suppliers do
        member do
          get :get_files
        end
      end
    end
  end

  get 'api/v1/supplier/find_for_create', to: 'api/v1/suppliers#find_for_create'
  get 'api/v1/supplier/find_for_edit', to: 'api/v1/suppliers#find_for_edit'

  namespace :api do
    namespace :v1 do
      resources :materials do
        member do
          get :get_files
        end
      end
    end
  end

  get 'api/v1/material/find_for_create', to: 'api/v1/materials#find_for_create'
  get 'api/v1/material/find_for_edit', to: 'api/v1/materials#find_for_edit'
  get 'api/v1/material/check_for_create_order', to: 'api/v1/materials#check_for_create_order'

  namespace :api do
    namespace :v1 do
      resources :material_orders do
        member do
          get :get_files
        end
      end
    end
  end

  get 'api/v1/material_order/find_for_create', to: 'api/v1/material_orders#find_for_create'
  get 'api/v1/material_order/find_for_edit', to: 'api/v1/material_orders#find_for_edit'

  namespace :api do
    namespace :v1 do
      resources :items do
        member do
          get :get_files
        end
      end
    end
  end

  get 'api/v1/item/find_for_create', to: 'api/v1/items#find_for_create'
  get 'api/v1/item/find_for_edit', to: 'api/v1/items#find_for_edit'
  get 'api/v1/item/check_for_create_order', to: 'api/v1/items#check_for_create_order'

  namespace :api do
    namespace :v1 do
      resources :material_order_items
    end
  end

  namespace :api do
    namespace :v1 do
      resources :item_orders do
        member do
          get :get_files
        end
      end
    end
  end

  get 'api/v1/item_order/find_for_create', to: 'api/v1/item_orders#find_for_create'
  get 'api/v1/item_order/find_for_edit', to: 'api/v1/item_orders#find_for_edit'

  namespace :api do
    namespace :v1 do
      resources :item_order_units
    end
  end

  namespace :api do
    namespace :v1 do
      resources :tech_processes do
        member do
          get :get_files
        end
      end
    end
  end

  get 'api/v1/tech_process/find_for_create', to: 'api/v1/tech_processes#find_for_create'
  get 'api/v1/tech_process/find_for_edit', to: 'api/v1/tech_processes#find_for_edit'

  namespace :api do
    namespace :v1 do
      resources :posts do
        member do
          get :get_files
        end
      end
    end
  end

  get 'api/v1/post/find_for_create', to: 'api/v1/posts#find_for_create'
  get 'api/v1/post/find_for_edit', to: 'api/v1/posts#find_for_edit'

  namespace :api do
    namespace :v1 do
      resources :post_tech_processes
    end
  end

  get 'api/v1/post_tech_process/find_for_create', to: 'api/v1/post_tech_processes#find_for_create'
  get 'api/v1/post_tech_process/find_for_add_post', to: 'api/v1/post_tech_processes#find_for_add_post'

  namespace :api do
    namespace :v1 do
      resources :item_tech_processes
    end
  end

  get 'api/v1/item_tech_process/find_for_create', to: 'api/v1/item_tech_processes#find_for_create'
  get 'api/v1/item_tech_process/find_for_add_object', to: 'api/v1/item_tech_processes#find_for_add_object'

  namespace :api do
    namespace :v1 do
      resources :manufacturing_plans
    end
  end

  namespace :api do
    namespace :v1 do
      resources :matrices do
        member do
          get :get_files
        end
      end
    end
  end

  get 'api/v1/matrix/find_for_create', to: 'api/v1/matrices#find_for_create'
  get 'api/v1/matrix/find_for_edit', to: 'api/v1/matrices#find_for_edit'


  namespace :api do
    namespace :v1 do
      resources :matrix_tech_processes
    end
  end

  get 'api/v1/matrix_tech_process/find_for_create', to: 'api/v1/matrix_tech_processes#find_for_create'
  get 'api/v1/matrix_tech_process/find_for_add_object', to: 'api/v1/matrix_tech_processes#find_for_add_object'

  namespace :api do
    namespace :v1 do
      resources :user_posts
    end
  end

  get 'api/v1/user_post/find_for_create', to: 'api/v1/user_posts#find_for_create'
  get 'api/v1/user_post/find_for_add_object', to: 'api/v1/user_posts#find_for_add_object'


  get 'api/v1/mp_order/enter_made_volume', to: 'api/v1/mp_orders#enter_made_volume'
  get 'api/v1/mp_order/change_priority_object', to: 'api/v1/mp_orders#change_priority_object'


  # Route for Active Storage files
  # get "/rails/active_storage/*path", to: "active_storage/blobs#show"

  # Route for downloading attachments
  # get "/download_attachment/:id", to: "active_storage#download_attachment"

  


  
  
  get 'users/:id', to: 'react#home'
  get 'users/new', to: 'react#home'
  get 'users', to: 'react#home'
  get 'users/:id/edit', to: 'react#home'
  get 'clients/:id', to: 'react#home'
  get 'clients/new', to: 'react#home'
  get 'clients', to: 'react#home'
  get 'clients/:id/edit', to: 'react#home'
  get 'suppliers/:id', to: 'react#home'
  get 'suppliers/new', to: 'react#home'
  get 'suppliers', to: 'react#home'
  get 'suppliers/:id/edit', to: 'react#home'
  get 'materials/:id', to: 'react#home'
  get 'materials/new', to: 'react#home'
  get 'materials', to: 'react#home'
  get 'materials/:id/edit', to: 'react#home'
  get 'material_orders/:id', to: 'react#home'
  get 'material_orders/new', to: 'react#home'
  get 'material_orders', to: 'react#home'
  get 'material_orders/:id/edit', to: 'react#home'
  get 'items/new', to: 'react#home'
  get 'items', to: 'react#home'
  get 'items/:id/edit', to: 'react#home'
  get 'items/:id', to: 'react#home'
  get 'item_orders/new', to: 'react#home'
  get 'item_orders/', to: 'react#home'
  get 'item_orders/:id', to: 'react#home'
  get 'item_orders/:id/edit', to: 'react#home'
  get 'posts/new', to: 'react#home'
  get 'posts', to: 'react#home'
  get 'posts/:id/edit', to: 'react#home'
  get 'posts/:id', to: 'react#home'
  get 'production/', to: 'react#home'
  get 'purchases_materials/', to: 'react#home'
  get 'supply_of_products/', to: 'react#home'
  get 'tech_processes/:id/edit', to: 'react#home'
  get 'tech_processes/new', to: 'react#home'
  get 'tech_processes', to: 'react#home'
  get 'tech_processes/:id/edit', to: 'react#home'
  get 'tech_processes/:id', to: 'react#home'
  get 'production/', to: 'react#home'
  get 'manufacturing_plans/new', to: 'react#home'
  get 'manufacturing_plans', to: 'react#home'
  get 'manufacturing_plans/:id/edit', to: 'react#home'
  get 'manufacturing_plans/:id', to: 'react#home'
  get 'manufacturing_plans/common', to: 'react#home'
  get 'manufacturing_plans/add_users_in_plan', to: 'react#home'
  get 'matrices/new', to: 'react#home'
  get 'matrices', to: 'react#home'
  get 'matrices/:id/edit', to: 'react#home'
  get 'matrices/:id', to: 'react#home'
  

  # Route for React components
  # get "*path", to: "react#home"
end
