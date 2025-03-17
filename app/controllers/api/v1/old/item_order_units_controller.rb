# frozen_string_literal: true

# Controller the API ItemOrderUnitsController
module Api
  module V1
    # ItemOrderUnitsController
    class ItemOrderUnitsController < BaseController
      def create
        item_order_unit = ItemOrderUnit.new(item_order_unit_params)

        item_order_unit.matrix_id = Item.find(item_order_unit_params[:item_id].to_i).matrix.id
        item_order_unit.article_matrix = create_article(params, 'matrix')
        item_order_unit.article_item = create_article(params, 'item')

        if item_order_unit.save
          # ManufacturingPlan.create_unit(item_order_unit)
          MpMatrix.mp_create_unit_matrix(item_order_unit)
          MpItem.mp_create_unit_item(item_order_unit)
          render(json: {}, status: :created)
        else
          render json: { error: item_order_unit.errors.messages }, status: `422`
        end
      end

      def destroy
        item_order_unit = ItemOrderUnit.find(params[:id])

        if item_order_unit.destroy
          render(json: {}, status: `200`)
        else
          render json: { error: item_order_unit.errors.messages }, status: `422`
        end
      end

      private

      def create_article(params, ent)
        par = params[:item_order_unit]
        art = if ent == 'matrix'
                "m#{Item.find(par[:item_id].to_i).matrix.article}"
              else
                "i#{Item.find(par[:item_id].to_i).article}"
              end
        o = ItemOrder.find(par[:item_order_id])

        "#{art} - o#{o.article} - c#{o.client.article}"
      end

      def item_order_unit_params
        params.require(:item_order_unit).permit(:item_order_id, :item_id, :matrix_volume, :casting_volume)
      end
    end
  end
end
