# frozen_string_literal: true

# Controller the API MultiplicationTablesController
module Api
    module V1
      # ClientsController
      class MultiplicationTablesController < BaseController
        def create
          puts("current_user = #{current_user.user_number}")

          current_number = (current_user.multiplication_tables.maximum(:attempt_number) || 0) + 1
          puts("params = #{params}")

          a0 = params[:tb][:a0].to_i
          an = params[:tb][:an].to_i
          b0 = params[:tb][:b0].to_i
          bn = params[:tb][:bn].to_i

          if [ a0, an, b0, bn ].any? { |n| n < 1 || n > 100 }
            render json: { error: "Значения должны быть от 1 до 100" }, status: :unprocessable_entity
          end
        end

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
