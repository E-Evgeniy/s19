# frozen_string_literal: true

# Controller the API ClientssController
module Api
  module V1
    # ClientsController
    class ClientsController < BaseController

      Module.const_set('ENTITY', 'client')

      def index
        clients = get_clients(params).order(name: :asc)

        render(json: { clients: })
      end

      def create
        name = params[:client][:name]
        email = params[:client][:email]
        inn = params[:client][:inn]
        address = params[:client][:address]
        site = params[:client][:site]
        files = params[:client][:files]

        client = Client.new(name:, email:, inn:, address:, site:)

        client.article = ItemOrder.find_article_for_entity(Module::ENTITY)

        if client.save
          files&.each do |f|
            client.files.attach(io: f, filename: f.original_filename, content_type: f.content_type)
          end

          render(json: {}, status: :created)
        else
          render json: { error: client.errors.messages }, status: `422`
        end
      end

      def find_for_create
        inn_valid = Client.where(inn: params['input_inn']).empty?

        render(json: { inn_valid: })
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

      def get_clients(params)
        query_params = create_query_params(params)

        query_params = {} if query_params.blank?

        if query_params.blank?
          Client.all
        else
          Client.where("name ILIKE ? OR inn ILIKE ? OR address ILIKE ? OR site ILIKE ? OR email ILIKE ?", query_params[:name], query_params[:inn], query_params[:address], query_params[:site], query_params[:email])
        end
      end

      def create_query_params(params)
        query_params = {}

        query_params[:name] = "%#{params[:name]}%" if params[:name].present?
        query_params[:inn] = "%#{params[:inn]}%" if params[:inn].present?
        query_params[:address] = "%#{params[:address]}%" if params[:address].present?
        query_params[:email] = "%#{params[:email]}%" if query_params[:email].present?
        query_params[:site] = "%#{params[:site]}%" if query_params[:site].present?

        query_params
      end
    end
  end
end
