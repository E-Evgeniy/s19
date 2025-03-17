# frozen_string_literal: true

# Controller the API UserPostsController
module Api
  module V1
    # UserPostsController
    class UserPostsController < BaseController
      def create
        if UserPost.create(object_params)
          render(json: {}, status: :created)
        else
          render json: { error: object.errors.messages }, status: `422`
        end
      end

      def destroy
        object = UserPost.find(params[:id])
        return if object.destroy

        render json: { error: object.errors.messages }, status: `422`
      end

      def find_for_add_object
        user = User.find(params['user_id'])
        tpi = user.posts # tech_processes_in_item
        obj_exist_in_col = tpi.any? { |tp| tp.name == params['input_name'].downcase } # post_exist_in_user
        obj = Post.where(name: params['input_name'].downcase)  # post

        name_id = find_name_id(obj)

        render(json: { name_id:, obj_exist_in_col: })
      end

      private

      def find_name_id(obj)
        if obj.empty?
          0
        else
          obj.last.id
        end
      end

      def object_params
        params.require(:object).permit(:user_id, :post_id)
      end
    end
  end
end
