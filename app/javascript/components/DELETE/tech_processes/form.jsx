import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function Form() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [files, setFiles] = useState([]);
    const [inputName, setInputName] = useState('');
    const [inputDescribe, setInputDescribe] = useState('');
    const [nameFromTable, setNameFromTable] = useState('');
    const [searchFilelds, setSearchFilelds] = useState('');

    const ROOT_ADDRESS = 'tech_process'
    const PLURAR = 'es'

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

        formData.append(`object[name]`, inputName);
        formData.append(`object[description]`, inputDescribe);

        for (const file of files) {
            formData.append(`object[files][]`, file);
        }

        try {
            await axios.post(`/api/v1/${ROOT_ADDRESS}${PLURAR}/`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            navigate(`/${ROOT_ADDRESS}${PLURAR}/${location}`);
        } catch (error) {
            console.log(error.response);
            // обработать ошибки и отобразить их пользователю
        }
        navigate(`/${ROOT_ADDRESS}${PLURAR}`);
    };

    const handleNameChange = (event) => {
        setInputName(event.target.value);
        setSearchFilelds(event.target.value);
    };

    const handleDescribeChange = (event) => {
        setInputDescribe(event.target.value);        
    }

    let classNameFiled = "w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#f44336] focus:shadow-md"
    let classNameError = "text-red-600"
    let text_error = ''

    if (inputName == '') {
      text_error = t('description.no_empty_field')
      
    } else if (nameFromTable != true) {
        text_error = t('description.error_exits')
    } else {
        classNameError = "invisible"
        classNameFiled = "w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
    }

    useEffect(() => {
        const apiEndpoint = `/api/v1/${ROOT_ADDRESS}/find_for_create?input_name=${inputName}`

        fetch(apiEndpoint)
            .then(response => response.json())
            .then(data => {
                setNameFromTable(data["name_valid"])
            }
            );
    }, [searchFilelds])

    let disableButton = false


    if (inputName == '' || nameFromTable == false) {
        disableButton = true
    }

    let classButton = "hover:shadow-form rounded-md bg-blue-600 hover:bg-blue-800 py-3 px-8 text-base font-semibold text-white outline-none  disabled:opacity-75"
    let classSimpleFiled = "w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"

    return (
        <div>
            <div className="font-bold text-xl flex items-center justify-center py-8">
                {t('description.tech_process_new')}
            </div>

            <form onSubmit={handleSubmit}>
                <div className="flex items-center justify-center p-2">
                    <div className="mx-auto w-full max-w-[550px]">

                        <div className="mb-5">
                            <div className="mb-3 block text-base font-medium text-[#07074D]">
                                <label htmlFor={t('description.designation')} >{t('description.designation')}</label>
                                <input
                                    id={t('description.designation')}
                                    type={t('description.designation')}
                                    name={t('description.designation')}
                                    value={inputName}
                                    onChange={handleNameChange}
                                    className={classNameFiled}
                                    placeholder={t('description.designation_enter')}
                                />                                
                            </div>
                            <div className={classNameError}>{text_error}</div>
                        </div>

                        <div className="mb-5">
                            <div className="mb-3 block text-base font-medium text-[#07074D]">
                                <label htmlFor={t('description.description')} >{t('description.description')}</label>
                                <input
                                    id={t('description.description')}
                                    type={t('description.description')}
                                    name={t('description.description')}
                                    value={inputDescribe}
                                    onChange={handleDescribeChange}
                                    className={classSimpleFiled}
                                    placeholder={t('description.enter_description')}
                                />                                
                            </div>
                        </div>

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
                            {t('description.create')}
                        </button>

                    </div>
                </div>



            </form>
        </div >
    )
}