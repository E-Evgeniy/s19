# frozen_string_literal: true

# Controller the API supplierssController
module Api
  module V1
    # suppliersController
    class SuppliersController < BaseController
      def index
        suppliers = get_suppliers(params).order(name: :asc)

        render(json: { suppliers: })
      end

      def create
        name = params[:supplier][:name]
        email = params[:supplier][:email]
        inn = params[:supplier][:inn]
        address = params[:supplier][:address]
        site = params[:supplier][:site]
        files = params[:supplier][:files]

        supplier = Supplier.new(name:, email:, inn:, address:, site:)

        if supplier.save
          files&.each do |f|
            supplier.files.attach(io: f, filename: f.original_filename, content_type: f.content_type)
          end

          render(json: {}, status: :created)
        else
          render json: { error: supplier.errors.messages }, status: `422`
        end
      end

      def find_for_create
        inn_valid = Supplier.where(inn: params['input_inn']).empty?

        render(json: { inn_valid: })
      end

      def show
        supplier_show = Supplier.find(params[:id])
        supplier = {}
        supplier[:id] = supplier_show.id
        supplier[:name] = supplier_show.name
        supplier[:email] = supplier_show.email
        supplier[:inn] = supplier_show.inn
        supplier[:site] = supplier_show.site

        files_data = supplier_show.files

        if files_data.count.positive?
          files = files_data.map do |file|
            { url: url_for(file), name: file.filename.to_s, blob_id: file.blob_id }
          end
        end

        render(json: { supplier:, files: })
      end

      def destroy
        supplier = Supplier.find(params[:id])

        if supplier.destroy
          render(json: {}, status: `200`)
        else
          render json: { error: supplier.errors.messages }, status: `422`
        end
      end

      def update
        supplier = Supplier.find(params[:id])

        if supplier.update(supplier_params)
          render(json: {}, status: :created)
        else
          render json: { error: supplier.errors.messages }, status: :unprocessable_entity
        end
      end

      def find_for_edit
        supplier_edit = Supplier.find(params[:id])
        inn_valid = Supplier.where(inn: params['input_inn']).empty?
        inn_valid = true if params[:count_edit_inn] == '0' || supplier_edit.inn == params['input_inn']

        files_data = supplier_edit.files

        if files_data.count.positive?
          files = files_data.map do |file|
            { url: url_for(file), name: file.filename.to_s }
          end
        end

        render(json: { inn_valid:, supplier_edit:, files: })
      end

      private

      def supplier_params
        params.require(:supplier).permit(:name, :inn, :address, :email, :site, files: [])
      end

      def get_suppliers(params)
        query_params = create_query_params(params)

        query_params = {} if query_params.blank?

        if query_params.blank?
          Supplier.all
        else
          Supplier.where('name ILIKE ? OR inn ILIKE ? OR address ILIKE ? OR site ILIKE ? OR email ILIKE ?',
                         query_params[:name], query_params[:inn], query_params[:address], query_params[:site], query_params[:email])
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
