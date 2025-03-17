# frozen_string_literal: true

# Controller the API NamePairsController
module Api
  module V1
    # ClientsController
    class NamePairsController < BaseController

      def index
        name_pairs = get_clients(params).order(name: :asc)

        render(json: { clients: })
      end

      def create
        name = params[:pair][:name]
        multiplier = params[:pair][:multiplier].to_i

        name_pair = NamePair.new(name:, multiplier:)

        if name_pair.save
          render(json: {}, status: :created)
        else
          render json: { error: name_pair.errors.messages }, status: `422`
        end
      end

      def find_for_create
        name_valid = NamePair.where(name: params['name']).empty?
        render(json: { name_valid: })
      end

      def show
        client_show = Client.find(params[:id])
        client = {}
        client[:id] = client_show.id
        client[:name] = client_show.name
        client[:email] = client_show.email
        client[:inn] = client_show.inn
        client[:site] = client_show.site

        files_data = client_show.files

        files = files_data.map { |file| { url: url_for(file), name: file.filename.to_s, blob_id: file.blob_id} } if files_data.count.positive?

        render(json: { client:, files: })
      end

      def destroy
        client = Client.find(params[:id])

        if client.destroy
          render(json: {}, status: `200`)
        else
          render json: { error: client.errors.messages }, status: `422`
        end
      end

      def update
        client = Client.find(params[:id])

  

        if client.update(client_params)
          render(json: {}, status: :created)
        else
          render json: { error: client.errors.messages }, status: 422
        end
      end

      def find_for_edit
        client_edit = Client.find(params[:id])
        inn_valid = Client.where(inn: params['input_inn']).empty?
        inn_valid = true if params[:count_edit_inn] == '0' || client_edit.inn == params['input_inn']

        files_data = client_edit.files

        files = files_data.map { |file| { url: url_for(file), name: file.filename.to_s } } if files_data.count.positive?

        render(json: { inn_valid:, client_edit:, files: })
      end

      private

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
