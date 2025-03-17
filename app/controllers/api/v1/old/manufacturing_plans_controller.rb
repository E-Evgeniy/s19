# frozen_string_literal: true

# Controller the API ManufacturingPlansController
module Api
  module V1
    # ManufacturingPlansController
    class ManufacturingPlansController < BaseController
      def index
        mpo = MpOrder.forming_mp_orders(MpOrder.where(status: false).order(priority: :asc))
        mpo = false if mpo.empty?
        render(json: { mpo: })
        # objects = create_objects
        #objects = 1
        #render(json: { objects: })
      end

      def create
        mp = ManufacturingPlan.new(item_order_id: params[:item_order_id])

        until mp.save
          render json: { error: mp.errors.messages }, status: `422`
        end
      end

      def show
        io = ItemOrder.find(params[:id])
        client_name = io.client.name
        order_name = io.name
        objects = ManufacturingPlan.show_mp(io)

        render(json: { objects:, client_name:, order_name: })
      end

      private

      def create_object(io)
        io.map do |i|
          { id: i.id,
            client_name: i.client.name,
            order_name: i.name,
            priority: i.find_priority,
            status: i.find_status,
            data_create: i.created_at.strftime("%d.%m.%Y") }
        end

      end

      def create_objects
        forming_mp(ItemOrder.all.order(name: :asc))
      end

      def forming_mp(tps)
        tps.map do |i|
          { id: i.id,
            client_name: i.client.name,
            order_name: i.name,
            priority: i.find_priority,
            status: i.find_status,
            data_create: i.created_at.strftime('%d.%m.%Y') }
        end
      end
    end
  end
end
