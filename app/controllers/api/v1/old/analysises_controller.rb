# frozen_string_literal: true

# Controller the API AnalisysController
module Api
    module V1
      # AnalisAnalysisesControllerysController
      class AnalysisesController < BaseController
        def create
            analysis = Analysis.new

            files = params[:analysis][:files]
    
            if analysis.save
              files&.each do |f|
                analysis.files.attach(io: f, filename: f.original_filename, content_type: f.content_type)
              end
    
              render(json: {}, status: :created)
            else
              render json: { error: analysis.errors.messages }, status: `422`
            end
          end

          def result
            Analysis.result
            render json: { message: 'Result processed' }, status: :ok
          end

      end
    end
  end
  