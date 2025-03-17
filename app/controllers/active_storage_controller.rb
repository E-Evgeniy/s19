# frozen_string_literal: true

class ActiveStorageController < ApplicationController
  def download_file
    attachment = ActiveStorage::Attachment.find(params[:id])
    if attachment.present?
      disposition = attachment.content_type.start_with?('image/') ? 'inline' : 'attachment'
      redirect_to rails_blob_path(attachment.blob, disposition:)
    else
      redirect_to root_path, alert: 'File not found'
    end
  end

  def destroy_by_url
    # Получаем URL файла из параметров запроса
    url = params[:file_url]
    # Находим присоединенный файл по URL
    file = ActiveStorage::Attachment.find_by(url: url)
    # Удаляем файл
    file.purge if file.present?
    # Редирект или рендер в соответствии с вашими требованиями
    redirect_to root_path
  end
end
