# frozen_string_literal: true

# Controller the API MatrixTechProcessesController
module Api
  module V1
    # MatrixTechProcessesController
    class MatrixTechProcessesController < BaseController
      def create
        matrix_tp = MatrixTechProcess.new(object_params)
        matrix_tp.order_tech_proc = if MatrixTechProcess.where(matrix_id: params[:object][:matrix_id]).empty?
                                      0
                                    else
                                      MatrixTechProcess.where(matrix_id: params[:object][:matrix_id]).maximum(:order_tech_proc) + 1
                                    end
        if matrix_tp.save
          render(json: {}, status: :created)
        else
          render json: { error: object.errors.messages }, status: `422`
        end
      end

      def destroy
        object = MatrixTechProcess.find(params[:id])

        return if object.destroy

        render json: { error: object.errors.messages }, status: `422`
      end

      def find_for_add_object
        matrix = Matrix.find(params['matrix_id'])
        tpi = matrix.tech_processes # tech_processes_in_matrix
        obj_exist_in_col = tpi.any? { |tp| tp.name == params['input_name'].downcase } # tech_process_exist_in_matrix
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
        params.require(:object).permit(:matrix_id, :tech_process_id)
      end
    end
  end
end
