import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function Form() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [files, setFiles] = useState([]);


    const ROOT_ADDRESS = 'analysis'
    const ROOT_PLURAR = 'es'
    const ROOT_RESULT = 'result'

    const handleFilesChange = (event) => {
        const newFiles = Array.from(event.target.files);
        setFiles([...files, ...newFiles]);
    };

    const handleFileRemove = (index) => {
        const newFiles = [...files];
        newFiles.splice(index, 1);
        setFiles(newFiles);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();

        for (const file of files) {
            formData.append(`${ROOT_ADDRESS}[files][]`, file);
        }

        try {
            await axios.post(`/api/v1/${ROOT_ADDRESS}${ROOT_PLURAR}/`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            navigate(`/${ROOT_ADDRESS}${ROOT_PLURAR}/${location}`);
        } catch (error) {
            console.log(error.response);
            // обработать ошибки и отобразить их пользователю
        }
        navigate(`/${ROOT_RESULT}`);
    };

    let disableButton = false

    let classButton = "hover:shadow-form rounded-md bg-blue-600 hover:bg-blue-800 py-3 px-8 text-base font-semibold text-white outline-none  disabled:opacity-75"
    
    return (
        <div>

            <form onSubmit={handleSubmit}>
                <div className="flex items-center justify-center p-2">
                    <div className="mx-auto w-full max-w-[550px]">


                        <div className="mb-5">
                            <div className="mb-3 block text-base font-medium text-[#07074D]">
                                <label htmlFor={t('description.add_files')}>{t('description.add_files')}</label>
                                <p></p>
                                <input
                                    type="file"
                                    className="form-control-file"
                                    id="files"
                                    multiple
                                    onChange={handleFilesChange}
                                />
                                <p className="invisible">.</p>
                                <ul>
                                    {files.map((file, index) => (
                                        <li key={index}>
                                            {file.name}{" "}
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-danger text-[#FF0000]"
                                                onClick={() => handleFileRemove(index)}
                                            >
                                                {t('description.file_delete')}
                                            </button>
                                        </li>
                                    ))}
                                </ul>

                            </div>
                        </div>

                        <button
                            type="submit"
                            className={classButton}
                            disabled={disableButton}>
                            {t('description.analys')}
                        </button>

                    </div>
                </div>



            </form>
        </div >
    )
}