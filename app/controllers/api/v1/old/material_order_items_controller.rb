# frozen_string_literal: true

# Controller the API MaterialOrderItemsController
module Api
  module V1
    # MaterialOrderItemsController
    class MaterialOrderItemsController < BaseController
      def create
        data_material = params['material_order_item']
        if MaterialOrderItem.create(material_order_item_params)
          price_moi = data_material['quantity'].to_f * data_material['price'].to_f
          mo = MaterialOrder.find(data_material['material_order_id'])
          mo.total_price += price_moi
          mo.save
          render(json: {}, status: :created)
        else
          render json: { error: material_order_item.errors.messages }, status: `422`
        end
      end

      def destroy
        material_order_item = MaterialOrderItem.find(params[:id])

        if material_order_item.destroy
          render(json: {}, status: `200`)
        else
          render json: { error: material_order_item.errors.messages }, status: `422`
        end
      end

      private

      def material_order_item_params
        params.require(:material_order_item).permit(:material_order_id, :material_id, :quantity, :price,
                                                    :delivery_period)
      end
    end
  end
end
