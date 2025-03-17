# frozen_string_literal: true

# Controller the API PostTechProcessesController
module Api
  module V1
    # PostTechProcessesController
    class PostTechProcessesController < BaseController
      def create
        if PostTechProcess.create(object_params)
          render(json: {}, status: :created)
        else
          render json: { error: object.errors.messages }, status: `422`
        end
      end

      def destroy
        object = PostTechProcess.find(params[:id])

        return if object.destroy

        render json: { error: object.errors.messages }, status: `422`
      end

      def find_for_add_post
        posts_in_tech_process = TechProcess.find(params['tech_process_id']).posts
        obj_exist_in_col = posts_in_tech_process.any? { |post| post.name == params['input_name'].downcase }
        name_id = find_name_id(Post.where(name: params['input_name'].downcase))

        render(json: { name_id:, obj_exist_in_col: })
      end

      private

      def find_name_id(posts)
        if posts.empty?
          0
        else
          posts.last.id
        end
      end

      def object_params
        params.require(:object).permit(:post_id, :tech_process_id)
      end
    end
  end
end
