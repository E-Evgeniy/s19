# frozen_string_literal: true

# Controller the API ItemTechProcessesController
module Api
  module V1
    # ItemTechProcessesController
    class ItemTechProcessesController < BaseController
      def create
        item_tp = ItemTechProcess.new(object_params)
        item_tp.order_tech_proc = if ItemTechProcess.where(item_id: params[:object][:item_id]).empty?
                                    0
                                  else
                                    ItemTechProcess.where(item_id: params[:object][:item_id]).maximum(:order_tech_proc) + 1
                                  end
        if item_tp.save
          render(json: {}, status: :created)
        else
          render json: { error: object.errors.messages }, status: `422`
        end
      end

      def destroy
        object = ItemTechProcess.find(params[:id])

        return if object.destroy

        render json: { error: object.errors.messages }, status: `422`
      end

      def find_for_add_object
        item = Item.find(params['item_id'])
        tpi = item.tech_processes # tech_processes_in_item
        obj_exist_in_col = tpi.any? { |tp| tp.name == params['input_name'].downcase } # tech_process_exist_in_item
        obj = TechProcess.where(name: params['input_name'].downcase)  # TechProcess

        name_id = if obj.empty?
                    0
                  else
                    obj.last.id
                  end

        render(json: { name_id:, obj_exist_in_col: })
      end

      private

      def object_params
        params.require(:object).permit(:item_id, :tech_process_id)
      end
    end
  end
end
