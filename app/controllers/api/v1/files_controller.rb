# frozen_string_literal: true

# Controller the API ActiveStorageController
module Api
  module V1
    # ActiveStorageController
    class FilesController < BaseController
      def destroy_by_url
        file = ActiveStorage::Attachment.find_by(blob_id: params[:blob_id])
        # Удаляем файл
        file.purge if file.present?
        render(json: {}, status: `200`)
      end
    end
  end
end
