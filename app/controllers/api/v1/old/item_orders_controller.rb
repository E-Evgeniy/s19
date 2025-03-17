# frozen_string_literal: true

# Controller the API ItemOrdersController
module Api
  module V1
    # ItemOrdersController
    class ItemOrdersController < BaseController

      Module.const_set('ENTITY', 'item_order')

      def index
        item_orders = record_mo_v1(ItemOrder.includes(:client).all)
        render(json: { item_orders: })
      end

      def record_mo_v1(mat_orders)
        mat_orders.map do |m|
          { id: m.id,
            client_name: m.client.name,
            contract_name: m.name,
            data_order: m.created_at.to_date.strftime('%d.%m.%Y'),
            priority: m.mp_order[0].priority,
            status: m.mp_order[0].status }
        end
      end

      def create
        data_item_order = item_order_permit
        files = data_item_order[:files]

        client_id_order = init_client(data_item_order)

        client_id_order.article = ItemOrder.find_article_for_entity(Module::ENTITY)

        if client_id_order.save
          files&.each do |f|
            client_id_order.files.attach(io: f, filename: f.original_filename, content_type: f.content_type)
          end

          MpOrder.mp_create_unit(client_id_order)

          render(json: {}, status: :created)
        else
          render(json: { error: client_id_order.errors.messages }, status: '422')
        end
      end

      def update
        io = ItemOrder.find(params[:id])

        if io.update(item_order_permit)
          render(json: {}, status: :created)
        else
          render json: { error: io.errors.messages }, status: :unprocessable_entity
        end
      end

      def show
        item_order_show = ItemOrder.find(params[:id])
        items = rec_items(item_order_show.item_order_units)
        item_order = ItemOrder.record_item_order(item_order_show, item_order_show.items)
        files = output_files(item_order_show.files)

        render(json: { item_order:, files:, items: })
      end

      def destroy
        io = ItemOrder.find(params[:id])

        if io.destroy
          render(json: {}, status: `200`)
        else
          render json: { error: io.errors.messages }, status: `422`
        end
      end

      def find_for_create
        client_name_valid = Client.where(name: params['input_client_name'])
        client_id = client_name_valid.first.id unless client_name_valid.empty?

        render(json: { client_name_valid: client_name_valid.empty?, client_id: })
      end

      def find_for_edit
        object_edit = ItemOrder.includes(:client).find(params[:id])
        client_name_params = rec_client_name_params(params, object_edit)
        response_json = build_json_response(object_edit, client_name_params)
        render(json: response_json)
      end

      private

      def rec_client_name_params(params, object_edit)
        if params[:count_edit_name] == '0'
          { name_valid: true, id: object_edit.client.id, name: object_edit.client.name }
        else
          rec_params_if_count_large_zero(params)
        end
      end

      def rec_params_if_count_large_zero(params)
        clients = Client.where(name: params[:input_client_name])

        if clients.empty?
          { name_valid: false, id: nil, name: nil }
        else
          { name_valid: true, id: clients.first.id, name: clients.first.name }
        end
      end

      def build_json_response(order, client_name_params)
        { order_name: order.name,
          client_name_valid: client_name_params[:name_valid],
          client_id: client_name_params[:id],
          client_name: client_name_params[:name],
          coefficient_weight: order.coefficient_weight,
          coefficient_size: order.coefficient_size,
          coefficient_first_for_matrix: order.coefficient_first_for_matrix,
          coefficient_second_for_matrix: order.coefficient_second_for_matrix,
          divider: order.divider,
          coefficient_printing_works: order.coefficient_printing_works,
          coefficient_make_master_model: order.coefficient_make_master_model,
          coefficient_make_matrix: order.coefficient_make_matrix,
          coefficient_work_plastic_casting: order.coefficient_work_plastic_casting,
          coefficient_client_printing: order.coefficient_client_printing,
          coefficient_make_matrix_unit: order.coefficient_make_matrix_unit,
          coefficient_casting_unit: order.coefficient_casting_unit,
          coefficient_tax: order.coefficient_tax,
          the_cost_of_silicone_per_kg: order.the_cost_of_silicone_per_kg,
          the_cost_of_plastic_per_kg: order.the_cost_of_plastic_per_kg,
          the_cost_of_photopolymer: order.the_cost_of_photopolymer,
          the_cost_of_PLA: order.the_cost_of_PLA,
        }
      end

      def rec_items(iou)
        iou.map do |m|
          { id: m.id,
            name: m.item.name,
            matrix_name: m.matrix.name,
            matrix_volume: m.matrix_volume,
            casting_volume: m.casting_volume }
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


      def item_order_permit
        params.require(:item_order).permit(:name,
                                           :client_id,
                                           :coefficient_weight,
                                           :coefficient_size,
                                           :coefficient_first_for_matrix,
                                           :coefficient_second_for_matrix,
                                           :divider,
                                           :coefficient_printing_works,
                                           :coefficient_make_master_model,
                                           :coefficient_make_matrix,
                                           :coefficient_work_plastic_casting,
                                           :coefficient_client_printing,
                                           :coefficient_make_matrix_unit,
                                           :coefficient_casting_unit,
                                           :coefficient_tax,
                                           :the_cost_of_silicone_per_kg,
                                           :the_cost_of_plastic_per_kg,
                                           :the_cost_of_photopolymer,
                                           :the_cost_of_PLA,
                                           files: [])
      end

      def init_client(data)
        ItemOrder.new({ name: data[:name],
                        client_id: data[:client_id],
                        coefficient_weight: data[:coefficient_weight],
                        coefficient_size: data[:coefficient_size],
                        coefficient_first_for_matrix: data[:coefficient_first_for_matrix],
                        coefficient_second_for_matrix: data[:coefficient_second_for_matrix],
                        divider: data[:divider],
                        coefficient_printing_works: data[:coefficient_printing_works],
                        coefficient_make_master_model: data[:coefficient_make_master_model],
                        coefficient_make_matrix: data[:coefficient_make_matrix],
                        coefficient_work_plastic_casting: data[:coefficient_work_plastic_casting],
                        coefficient_client_printing: data[:coefficient_client_printing],
                        coefficient_make_matrix_unit: data[:coefficient_make_matrix_unit],
                        coefficient_casting_unit: data[:coefficient_casting_unit],
                        coefficient_tax: data[:coefficient_tax],
                        the_cost_of_silicone_per_kg: data[:the_cost_of_silicone_per_kg],
                        the_cost_of_plastic_per_kg: data[:the_cost_of_plastic_per_kg],
                        the_cost_of_photopolymer: data[:the_cost_of_photopolymer],
                        the_cost_of_PLA: data[:the_cost_of_PLA] })
      end
    end
  end
end
