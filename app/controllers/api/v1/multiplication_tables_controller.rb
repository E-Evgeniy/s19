# frozen_string_literal: true

# Controller the API MultiplicationTablesController
module Api
    module V1
      # ClientsController
      class MultiplicationTablesController < BaseController
  
        private

        def test_new
        end
  
        def client_params
          params.require(:client).permit(:name, :inn, :address, :email, :site, files: [])
        end
  
        def get_name_pairs(params)
          query_params = create_query_params(params)
          query_params = {} if query_params.blank?
  
          if query_params.blank?
            NamePair.all
          else
            NamePair.where("name ILIKE ? ", query_params[:name])
          end
        end
  
        def create_query_params(params)
          query_params = {}
          query_params[:name] = "%#{params[:name]}%" if params[:name].present?
          query_params
        end
      end
    end
  end
  