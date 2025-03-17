# frozen_string_literal: true

# Controller the API TechProcessesController
module Api
  module V1
    # TechProcessesController
    class TechProcessesController < BaseController
      def index
        objects = TechProcess.all.order(name: :asc)

        render(json: { objects: })
      end

      def create
        data_object = init_object(object_permit)
        files = object_permit[:files]

        if data_object.save
          files&.each do |f|
            data_object.files.attach(io: f, filename: f.original_filename, content_type: f.content_type)
          end

          render(json: {}, status: :created)
        else
          render(json: { error: data_object.errors.messages }, status: '422')
        end
      end

      def update
        object = TechProcess.find(params[:id])

        if object.update(object_permit)
          render(json: {}, status: :created)
        else
          render json: { error: object.errors.messages }, status: :unprocessable_entity
        end
      end

      def show
        object = TechProcess.find(params[:id])
        posts = record_posts(object)

        files_data = object.files

        if files_data.count.positive?
          files = files_data.map do |file|
            { url: url_for(file), name: file.filename.to_s, blob_id: file.blob_id }
          end
        end  

        render(json: { object:, posts:, files: })
      end

      def find_for_create
        name_valid = TechProcess.where(name: params['input_name'].downcase).empty?
        name_valid = true if params[:count_edit_name].nil? && params[:count_edit_name] == '0'

        render(json: { name_valid: })
      end

      private

      def record_posts(object)
        object.post_tech_processes.map do |o|
          { id: o.id,
            name: o.post.name
          }
        end
      end

      def object_permit
        params.require(:object).permit(:name,
                                       :description,
                                       files: [])
      end

      def init_object(data)
        TechProcess.new({ name: data[:name].downcase,
                          description: data[:description] })
      end
    end
  end
end
