import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Files(props) {
  const { t } = useTranslation();

  const handleFileRemove = (blob_id) => {
    const apiEndpoint = `/api/v1/file/destroy_by_url?blob_id=${blob_id}`
    fetch(apiEndpoint)
      .then(response => response.json())
      .then(data => {

      }
      );

  };

  const dataFiles = (<div className="w-full px-2">
    <div className="font-bold text-l py-5 pl-4">
      {t('description.attached_files')}</div>

    {props.files != null ? (

      props.files.map((file, index) => (


        <div key={index} className="py-1 pl-8">

          <a href={file.url} download>{file.name}</a>
          { /*<button
                                                type="button"
                                                className="btn btn-sm btn-danger text-[#FF0000]"
                                                onClick={() => handleFileRemove(file.blob_id)}
                                            >
                                                {t('description.file_delete')}
      </button> */}
        </div>
      ))
    ) : (
      <div></div>
    )}
  </div>)

  if ((!props.loading) && (props.files != null)) { return dataFiles; }
}
