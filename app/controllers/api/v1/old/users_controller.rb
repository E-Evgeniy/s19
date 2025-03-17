# frozen_string_literal: true

# Controller the API UserssController
module Api
  module V1
    # UsersController
    class UsersController < BaseController
      def user_destroy_session
        reset_session
        redirect_to root_path
      end

      def index
        users_data = get_users_first(params).order(last_name: :asc)
        users = get_users(users_data)

        render(json: { users: })
      end

      def show
        user = User.find(params[:id])
        posts_name = record_posts(user)

        render(json: { user:, posts_name:})
      end

      def create
        if User.create(user_params)
          render(json: {}, status: :created)
        else
          render json: { error: user.errors.messages }, status: :unprocessable_entity
        end
      end

      def update
        user = User.find(params[:id])

        if user.update(user_params)
          render(json: {}, status: :created)
        else
          render json: { error: user.errors.messages }, status: :unprocessable_entity
        end
      end

      def destroy
        user = User.find(params[:id])

        if user.destroy
          render(json: {}, status: ok)
        else
          render json: { error: user.errors.messages }, status: unprocessable_entity
        end
      end

      def find_for_create
        email_valid = User.where(email: params['input_email']).empty?
        post_valid = Post.where(name: params['input_post'].downcase).empty?
        post_id = Post.where(name: params['input_post'].downcase).first.id unless post_valid

        render(json: { email_valid:, post_valid:, post_id: })
      end

      def find_for_edit
        user_edit = User.find(params[:id])
        #post_name = user_edit.posts.name.capitalize

        email_valid = User.where(email: params['input_email']).empty?
        email_valid = true if params[:count_edit_email] == '0' || user_edit.email == params['input_email']

        post_id = find_post_ip(user_edit, params)

        render(json: { email_valid:, user_edit:, post_id:, post_name: })
      end

      private

      def record_posts(object)
        object.user_posts.map do |o|
          { id: o.id,
            name: o.post.name
          }
        end
      end

      def find_post_ip(user_edit, params)
        if params['count_post'] == '0'
          user_edit.post_id
        else
          res = Post.where(name: params['input_post'].downcase)
          if !res.empty?
            res.first.id
          else
            0
          end
        end
      end

      def user_params
        params.require(:user).permit(:first_name, :last_name, :patronymic, :email, :post_id, :password,
                                     :password_confirmation)
      end

      def get_users_first(params)
        query_params = {}

        query_params[:first_name] = "%#{params[:first_name]}%" if params[:first_name].present?
        query_params[:last_name] = "%#{params[:last_name]}%" if params[:last_name].present?
        query_params[:patronymic] = "%#{params[:patronymic]}%" if params[:patronymic].present?

        # query_params[:post_id] = post_id if query_params[:post].present?
        query_params[:email] = "%#{params[:email]}%" if query_params[:email].present?

        query_params = {} if query_params.blank?

        if query_params.blank?
          User.all
        else
          User.where('first_name ILIKE ? OR last_name ILIKE ? OR patronymic ILIKE ? OR email ILIKE ?',
                     query_params[:first_name], query_params[:last_name], query_params[:patronymic], query_params[:email])
        end
      end

      def get_users(users_data)
        users_data.map do |m|
          post_name = find_post(m)

          { id: m.id,
            first_name: m.first_name,
            last_name: m.last_name,
            patronymic: m.patronymic,
            email: m.email,
            post_name: }
        end
      end

      def find_post(obj)
        if obj.posts.first.nil?
          ''
        else
          obj.posts.first.name
        end
      end
    end
  end
end
