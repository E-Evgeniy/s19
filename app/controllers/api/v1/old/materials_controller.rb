# frozen_string_literal: true

# Controller the API materialssController
module Api
  module V1
    # materialsController
    class MaterialsController < BaseController
      def index
        materials = get_materials(params).order(name: :asc)

        render(json: { materials: })
      end

      def create
        name = params[:material][:name]
        average_price = params[:material][:average_price]
        description = params[:material][:description]

        files = params[:material][:files]

        material = Material.new(name:, average_price:, description:)

        if material.save
          files&.each do |f|
            material.files.attach(io: f, filename: f.original_filename, content_type: f.content_type)
          end

          render(json: {}, status: :created)
        else
          render json: { error: material.errors.messages }, status: `422`
        end
      end

      def find_for_create
        name_valid = Material.where(name: params['input_name']).empty?

        render(json: { name_valid: })
      end

      def show
        material_show = Material.find(params[:id])
        material = {}
        material[:id] = material_show.id
        material[:name] = material_show.name
        material[:average_price] = material_show.average_price
        material[:description] = material_show.description

        files_data = material_show.files

        if files_data.count.positive?
          files = files_data.map do |file|
            { url: url_for(file), name: file.filename.to_s, blob_id: file.blob_id }
          end
        end

        render(json: { material:, files: })
      end

      def destroy
        material = Material.find(params[:id])

        if material.destroy
          render(json: {}, status: `200`)
        else
          render json: { error: material.errors.messages }, status: `422`
        end
      end

      def update
        material = Material.find(params[:id])

        if material.update(material_params)
          render(json: {}, status: :created)
        else
          render json: { error: material.errors.messages }, status: :unprocessable_entity
        end
      end

      def find_for_edit
        material_edit = Material.find(params[:id])
        name_valid = Material.where(name: params['input_name']).empty?
        name_valid = true if params[:count_edit_name] == '0' || material_edit.name == params['input_name']

        files_data = material_edit.files

        if files_data.count.positive?
          files = files_data.map do |file|
            { url: url_for(file), name: file.filename.to_s }
          end
        end

        render(json: { name_valid:, material_edit:, files: })
      end

      def check_for_create_order
        material = Material.where(name: params[:input_name]).first

        if material.nil?
          material_valid = false
          material_id = nil
        else
          material_valid = true
          material_id = material.id
        end

        render(json: { material_valid:, material_id: })
      end

      private

      def material_params
        params.require(:material).permit(:name, :average_price, :description, files: [])
      end

      def get_materials(params)
        query_params = create_query_params(params)

        query_params = {} if query_params.blank?

        if query_params.blank?
          Material.all
        else
          name_condition = query_params[:name].present? ? 'name ILIKE ?' : nil
          description_condition = query_params[:description].present? ? 'description ILIKE ?' : nil
          conditions = [name_condition, description_condition].compact.join(' OR ')
          Material.where(conditions, *query_params.values)
        end
      end

      def create_query_params(params)
        query_params = {}

        query_params[:name] = "%#{params[:name]}%" if params[:name].present?
        query_params[:average_price] = "%#{params[:average_price]}%" if params[:average_price].present?
        query_params[:description] = "%#{params[:description]}%" if params[:description].present?

        query_params
      end
    end
  end
end
