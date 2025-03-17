# frozen_string_literal: true

# Controller the API MatrixsController
module Api
  module V1
    # MatricesController
    class MatricesController < BaseController

      Module.const_set('ENTITY', 'matrix')
      
      def index
        matrices = get_matrixs(params)

        render(json: { matrices: })
      end

      def create
        matrix = matrix_new(params[:matrix])
        files = params[:matrix][:files]
        matrix.article = ItemOrder.find_article_for_entity(Module::ENTITY)

        if matrix.save
          files&.each do |f|
            matrix.files.attach(io: f, filename: f.original_filename, content_type: f.content_type)
          end

          render(json: {}, status: :created)
        else
          render json: { error: matrix.errors.messages }, status: `422`
        end
      end

      def show
        object = Matrix.find(params[:id])
        tech_processes = record_tech_processes(object)

        files_data = object.files

        if files_data.count.positive?
          files = files_data.map do |file|
            { url: url_for(file), name: file.filename.to_s, blob_id: file.blob_id }
          end
        end

        render(json: { object:, tech_processes:, files: })
      end

      def update
        matrix = Matrix.find(params[:id])

        if matrix.update(matrix_params)
          render(json: {}, status: :created)
        else
          render json: { error: matrix.errors.messages }, status: :unprocessable_entity
        end
      end

      def destroy
        matrix = Matrix.find(params[:id])

        if matrix.destroy
          render(json: {}, status: `200`)
        else
          render json: { error: matrix.errors.messages }, status: `422`
        end
      end

      def find_for_create
        name_valid = find_name_valid(params['count_name'], params['input_name'])

        render(json: { name_valid: })
      end

      def find_for_edit
        object_edit = Matrix.find(params[:id])
        name_valid = Matrix.where(name: params['input_name']).empty?
        name_valid = true if params[:count_edit_name] == '0' || object_edit.name == params['input_name']

        render(json: { name_valid:, object_edit: })
      end

      def check_for_create_order
        matrix = Matrix.where(name: params[:input_name]).first

        if matrix.nil?
          matrix_valid = false
          matrix_id = nil
        else
          matrix_valid = true
          matrix_id = matrix.id
        end

        render(json: { matrix_valid:, matrix_id: })
      end

      def check_for_create_order_matrix
        object = Matrix.where(name: params[:input_name]).first

        if object.nil?
          object_valid = false
          object_id = nil
        else
          object_valid = true
          object_id = object.id
        end

        render(json: { object_valid:, object_id: })
      end

      private

      def record_tech_processes(object)
        object.matrix_tech_processes.map do |o|
          { id: o.id,
            name: o.tech_process.name
          }
        end
      end

      def matrix_params
        params.require(:matrix).permit(:name, :average_price, :description, :weight, :length, :width, :height, files: [])
      end

      def get_matrixs(params)
        query_params = create_query_params(params)
        if query_params.blank?
          record_matrixs(Matrix.all.order(name: :asc))
        else
          name_condition = query_params[:name].present? ? 'name ILIKE ?' : nil
          description_condition = query_params[:description].present? ? 'description ILIKE ?' : nil

          conditions = [name_condition, description_condition].compact.join(' OR ')
          matrix.where(conditions, *query_params.values)
        end
      end

      def record_matrixs(matrixs)
        matrixs.map do |i|
          { id: i.id,
            name: i.name,
            weight: i.weight,
            description: i.description,
            average_price: i.average_price }
        end
      end

      def create_query_params(params)
        query_params = {}
        query_params[:name] = "%#{params[:name]}%" if params[:name].present?
        query_params[:weight] = "%#{params[:weight]}%" if params[:weight].present?
        query_params[:description] = "%#{params[:description]}%" if params[:description].present?
        query_params[:average_price] = "%#{params[:average_price]}%" if params[:average_price].present?

        query_params
      end

      def matrix_new(i)
        Matrix.new(name: i[:name],
                 weight: i[:weight],
                 length: i[:length],
                 width: i[:width],
                 height: i[:height],
                 average_price: i[:average_price],
                 description: i[:description])
      end

      def find_name_valid(count_name, name)
        if count_name == '0'
          true
        else
          Matrix.where(name:).empty?
        end
      end
    end
  end
end
