# frozen_string_literal: true

# Controller the API ItemsController
module Api
  module V1
    # ItemsController
    class ItemsController < BaseController
      Module.const_set('ENTITY', 'item')

      def index
        items = get_items(params)

        render(json: { items: })
      end

      def create
        item = item_new(params[:item])
        files = params[:item][:files]

        item.article = ItemOrder.find_article_for_entity(Module::ENTITY)

        if item.save
          files&.each do |f|
            item.files.attach(io: f, filename: f.original_filename, content_type: f.content_type)
          end

          Matrix.create(item)

          render(json: {}, status: :created)
        else
          render json: { error: item.errors.messages }, status: `422`
        end
      end

      def show
        object = Item.find(params[:id])
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
        item = Item.find(params[:id])

        if item.update(item_params)
          render(json: {}, status: :created)
        else
          render json: { error: item.errors.messages }, status: :unprocessable_entity
        end
      end

      def destroy
        item = Item.find(params[:id])

        if item.destroy
          render(json: {}, status: `200`)
        else
          render json: { error: item.errors.messages }, status: `422`
        end
      end

      def find_for_create
        name_valid = find_name_valid(params['count_name'], params['input_name'])

        render(json: { name_valid: })
      end

      def find_for_edit
        object_edit = Item.find(params[:id])
        name_valid = Item.where(name: params['input_name']).empty?
        name_valid = true if params[:count_edit_name] == '0' || object_edit.name == params['input_name']

        render(json: { name_valid:, object_edit: })
      end

      def check_for_create_order
        item = Item.where(name: params[:input_name]).first

        if item.nil?
          item_valid = false
          item_id = nil
        else
          item_valid = true
          item_id = item.id
        end

        render(json: { item_valid:, item_id: })
      end

      private

      def record_tech_processes(object)
        object.item_tech_processes.map do |o|
          { id: o.id,
            name: o.tech_process.name }
        end
      end

      def item_params
        params.require(:item).permit(:name, :average_price, :description, :weight, :length, :width, :heigth,
                                     files: [])
      end

      def get_items(params)
        query_params = create_query_params(params)
        if query_params.blank?
          record_items(Item.all.order(name: :asc))
        else
          name_condition = query_params[:name].present? ? 'name ILIKE ?' : nil
          description_condition = query_params[:description].present? ? 'description ILIKE ?' : nil

          conditions = [name_condition, description_condition].compact.join(' OR ')
          Item.where(conditions, *query_params.values)
        end
      end

      def record_items(items)
        items.map do |i|
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

      def item_new(i)
        Item.new(name: i[:name],
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
          Item.where(name:).empty?
        end
      end
    end
  end
end
