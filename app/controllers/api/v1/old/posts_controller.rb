# frozen_string_literal: true

# Controller the API PostsController
module Api
  module V1
    # PostsController
    class PostsController < BaseController

      def index
        posts = Post.all.order(name: :asc)

        render(json: { posts: })
      end

      def create
        data_post = init_post(post_permit)
        files = post_permit[:files]

        if data_post.save
          files&.each do |f|
            data_post.files.attach(io: f, filename: f.original_filename, content_type: f.content_type)
          end

          render(json: {}, status: :created)
        else
          render(json: { error: data_post.errors.messages }, status: '422')
        end
      end

      def show
        post = Post.find(params[:id])

        files_data = post.files

        if files_data.count.positive?
          files = files_data.map do |file|
            { url: url_for(file), name: file.filename.to_s, blob_id: file.blob_id }
          end
        end

        render(json: { post:, files: })
      end

      def update
        post = Post.find(params[:id])

        if post.update(post_permit)
          render(json: {}, status: :created)
        else
          render json: { error: post.errors.messages }, status: :unprocessable_entity
        end
      end

      def destroy
        post = Post.find(params[:id])

        if post.destroy
          render(json: {}, status: `200`)
        else
          render json: { error: post.errors.messages }, status: `422`
        end
      end

      def find_for_create
        name_valid = Post.where(name: params['input_name'].downcase).empty?
        name_valid = true if params[:count_edit_name].nil? && params[:count_edit_name] == 0

        render(json: { name_valid: })
      end

      private


      def post_permit
        params.require(:post).permit(:name,
                                     :description,
                                     files: [])
      end

      def init_post(data)
        Post.new({ name: data[:name].downcase,
                   description: data[:description] })
      end
    end
  end
end
