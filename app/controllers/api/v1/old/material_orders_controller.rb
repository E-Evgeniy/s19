# frozen_string_literal: true

# Controller the API MaterialOrdersController
module Api
  module V1
    # MaterialOrdersController
    class MaterialOrdersController < BaseController
      def index
        material_orders = record_mo1(params)

        render(json: { material_orders: })
      end

      def create
        name = params[:material_order][:name]
        supplier_id = params[:material_order][:supplier_id]
        files = params[:material_order][:files]

        material_order = MaterialOrder.new({ name:, supplier_id:, total_price: 0 })

        if material_order.save
          files&.each do |f|
            material_order.files.attach(io: f, filename: f.original_filename, content_type: f.content_type)
          end

          render(json: {}, status: :created)
        else
          render(json: { error: material_order.errors.messages }, status: '422')
        end
      end

      def update
        mo = MaterialOrder.find(params[:id])

        if mo.update(material_order_params)
          render(json: {}, status: :created)
        else
          render json: { error: mo.errors.messages }, status: :unprocessable_entity
        end
      end

      def destroy
        mo = MaterialOrder.find(params[:id])

        if mo.destroy
          render(json: {}, status: `200`)
        else
          render json: { error: mo.errors.messages }, status: `422`
        end
      end

      def record_materials_order_item(materials_order_item_all)
        materials_order_item_all.map do |moi|
          { id: moi.id,
            name: moi.material.name,
            price: moi.price,
            massa: moi.quantity,
            delivery_period: moi.delivery_period,
            total_price: (moi.price * moi.quantity).round(2) }
        end
      end

      def output_files(files_data)
        if files_data.count.positive?
          files = files_data.map do |file|
            { url: url_for(file), name: file.filename.to_s, blob_id: file.blob_id }
          end
        end
        files
      end

      def show
        material_order_show = MaterialOrder.find(params[:id])
        material_order = record_material_order(material_order_show)
        materials_order_item = record_material_s_order_item(material_order_show.material_order_items)
        files = output_files(material_order_show.files)

        render(json: { material_order:, files:, materials_order_item: })
      end

      def find_for_create
        supplier_name_valid = Supplier.where(name: params['input_supplier_name'])
        supplier_id = supplier_name_valid.first.id unless supplier_name_valid.empty?

        render(json: { supplier_name_valid: supplier_name_valid.empty?, supplier_id: })
      end

      def find_for_edit
        object_edit = MaterialOrder.includes(:supplier).find(params[:id])
        supplier_name_params = rec_supplier_name_params(params, object_edit)
        response_json = build_json_response(object_edit.name, supplier_name_params)

        render(json: response_json)
      end

      def build_json_response(order_name, supplier_name_params)
        { order_name:,
          name_valid: supplier_name_params[:name_valid],
          supplier_id: supplier_name_params[:id],
          supplier_name: supplier_name_params[:name]
        }
      end

      def rec_supplier_name_params(params, object_edit)
        if params[:count_edit_name] == '0'
          { name_valid: true, id: object_edit.supplier.id, name: object_edit.supplier.name }
        else
          rec_params_if_count_large_zero(params)
        end
      end

      def rec_params_if_count_large_zero(params)
        suppliers = Supplier.where(name: params[:input_supplier_name])
        if suppliers.empty?
          { name_valid: false, id: nil, name: nil }
        else
          { name_valid: true, id: suppliers.first.id, name: suppliers.first.name }
        end
      end


=begin
      def rec_params_for_find_edit(params, klass, atribut, object_edit)
        hash_with_params = {}
        hash_with_params[:input_atribut] = params[:input_name]
        hash_with_params[:count_edit_atribut] = params[:count_edit_name].to_i
        hash_with_params[:klass] = klass
        hash_with_params[:atribut] = atribut
        hash_with_params[:object_edit] = object_edit
        hash_with_params
      end

      def find_atribut(hash_with_params, atribut_valid)
        object = {}
        if hash_with_params[:count_edit_atribut].to_i.zero?
          object[:id] = hash_with_params[:object_edit].id
          object[":#{hash_with_params[:atribut]}"] = hash_with_params[:klass].send(hash_with_params[:atribut])
    
        elsif atribut_valid
          object_find = hash_with_params[:klass].where("#{hash_with_params[:atribut]}": hash_with_params[:input_atribut]).first
          object[:id] = object_find.id
          object["#{hash_with_params[:atribut]}".to_sym] = object_find.send(hash_with_params[:atribut])
        end
        object
      end

      def check_atribut(hash_with_params)
        atribut_valid = hash_with_params[:klass].where("#{hash_with_params[:atribut]}": hash_with_params[:input_atribut]).empty?
        atribut_valid = true if hash_with_params[:count_edit_atribut].zero? || (hash_with_params[:object_edit].public_send(hash_with_params[:atribut]) == hash_with_params[:input_atribut])
        atribut_valid
      end
=end

      def objects_files(object)
        files_data = object.files
        return unless files_data.count.positive?

        files_data.map do |file|
          { url: url_for(file), name: file.filename.to_s }
        end
      end

      private

      def material_order_params
        params.require(:material_order).permit(:name, :supplier_id, files: [])
      end

      def record_mo1(params)
        if create_query_params(params).blank?
          record_mo_v1(MaterialOrder.includes(:supplier).all)
        else
          query_params = create_query_params(params)
          name_condition = query_params[:name].present? ? 'name ILIKE ?' : nil
          supplier_id_condition = query_params[:description].present? ? 'description ILIKE ?' : nil
          conditions = [name_condition, description_condition].compact.join(' OR ')
          #Material.where(conditions, *query_params.values)
          #record_mo_v1(MaterialOrder.includes(:supplier).where(conditions, *query_params.values))

          record_mo_v1(MaterialOrder.where(conditions, *query_params.values))
        end
      end

      def create_query_params(params)
        query_params = {}

        query_params[:supplier_id] = "%#{params[:supplier_name]}%" if params[:supplier_name].present?
        query_params[:name] = "%#{params[:contract_name]}%" if params[:contract_name].present?

        query_params
      end

      def record_mo_v1(mat_orders)
        mat_orders.map do |m|
          { id: m.id,
            supplier_name: m.supplier.name,
            contract_name: m.name,
            data_order: m.created_at.to_date.strftime('%d.%m.%Y'),
            total_price: m.total_price }
        end
      end

      def record_material_order(material_order_show)
        material_order = {}
        material_order[:id] = material_order_show.id
        material_order[:name] = material_order_show.name
        material_order[:supplier_name] = material_order_show.supplier.name
        material_order[:total_price] = material_order_show.total_price

        material_order
      end

      def record_material_s_order_item(materials_order_item_all)
        if materials_order_item_all.count.positive?
          record_materials_order_item(materials_order_item_all)
        else
          []
        end
      end

    end
  end
end
