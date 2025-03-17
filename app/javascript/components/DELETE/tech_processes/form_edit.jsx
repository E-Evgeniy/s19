import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import axios from "axios";
import { useNavigate, useLocation } from 'react-router-dom';

export default function FormEdit() {
    const { t } = useTranslation();
    const navigate = useNavigate()

    const [inputName, setInputName] = useState('')
    const [inputDescription, setInputDescription] = useState('')
    const [nameFromTable, setNameFromTable] = useState(true)

    const [editName, setEditName] = useState('')
    const [editDescription, setEditDescription] = useState('')

    const [countEditName, setCountEditName] = useState(0)
    const [countEditDescription, setCountEditDescription] = useState(0)

    const [searchFilelds, setSearchFilelds] = useState('')
    

    const [files, setFiles] = useState([]);
    const [csrfToken, setCsrfToken] = useState(null);

    const ROOT_ADDRESS = 'tech_process'
    const PLURAR = 'es'

  useEffect(() => {
    // Ищем мета-тег с CSRF Token и сохраняем его значение в состоянии
    const csrfMetaTag = document.querySelector('meta[name="csrf-token"]');
    if (csrfMetaTag) {
      setCsrfToken(csrfMetaTag.content);
    }
  }, []);

    let location = useLocation().pathname.split(`${ROOT_ADDRESS}${PLURAR}/`)[1];
    location = location.split('/edit')[0];

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();

        formData.append("object[name]", finalValue(inputName, countEditName, editName));
        formData.append("object[description]", finalValue(inputDescription, countEditDescription, editDescription));

        for (const file of files) {
            formData.append("object[files][]", file);
        }

        try {
            await axios.patch(`/api/v1/${ROOT_ADDRESS}${PLURAR}/${location}`, formData, {
                headers: {
                    'X-CSRF-TOKEN': csrfToken
                }
            });
            navigate(`/${ROOT_ADDRESS}${PLURAR}/${location}`);
        } catch (error) {
            console.log(error.response);
            // обработать ошибки и отобразить их пользователю
        }
        navigate(`/${ROOT_ADDRESS}${PLURAR}/${location}`);
    };

    useEffect(() => {
        //Hit the server and get the places

        const apiEndpoint = `/api/v1/${ROOT_ADDRESS}/find_for_create?input_name=${inputName}&count_edit_name=${countEditDescription}`

        fetch(apiEndpoint)
            .then(response => response.json())
            .then(data => {
                setNameFromTable(data["name_valid"])
            }
            );
    }, [searchFilelds])

    useEffect(() => {
        //Hit the server and get the places

        const apiEndpoint = `/api/v1/${ROOT_ADDRESS}${PLURAR}/${location}`

        fetch(apiEndpoint)
            .then(response => response.json())
            .then(data => {
                setEditName(data["object"]["name"])
                setInputName(data["object"]["name"])
                setEditDescription(data["object"]["description"])
            }
            );
    }, [])

    let classNameFiled = "w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#f44336] focus:shadow-md"
    let classNameError = "text-red-600"
    let text_error = ''

    if (inputName == '') {
      text_error = t('description.no_empty_field')
      
    } else if (nameFromTable != true && editName != inputName) {
        text_error = t('description.error_exits')
    } else {
        classNameError = "invisible"
        classNameFiled = "w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
    }

    console.log(`inputName = ${inputName} text_error = ${text_error}`)

    const handleFilesChange = (event) => {
        const newFiles = Array.from(event.target.files);
        setFiles([...files, ...newFiles]);
    };

    const handleFileRemove = (index) => {
        const newFiles = [...files];
        newFiles.splice(index, 1);
        setFiles(newFiles);
    };

    const handleNameChange = (event) => {
        setInputName(event.target.value);
        setCountEditName(countEditName + 1);
        setSearchFilelds(event.target.value);       
    };

    let finalValue = (inputObject, countEditObject, editObject) => {      
        let rezult = inputObject
        if (countEditObject == 0) {
          rezult = editObject
        }
        if (rezult == null) {
            rezult = ''
        }       
        return rezult
      }

    const handleDescriptionChange = (event) => {
        setEditDescription(event.target.value);
    };

    let classSimpleFiled = "w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"

    let classNameButton = "hover:shadow-form rounded-md bg-blue-600 hover:bg-blue-800 py-3 px-8 text-base font-semibold text-white outline-none  disabled:opacity-75"

    let disableButton = false

    return (
        <div>
            <div className="font-bold text-xl flex items-center justify-center py-8">
                {t('description.tech_process_edit')}
            </div>

            <form onSubmit={handleSubmit}>
                <div className="flex items-center justify-center p-2">
                    <div className="mx-auto w-full max-w-[550px]">

                        <div className="mb-5">
                            <div className="mb-3 block text-base font-medium text-[#07074D]">
                                <label htmlFor="name" style={{ paddingBottom: '100px' }}>{t('description.post')} </label>
                                <input
                                    id={t('description.designation')}
                                    type={t('description.designation')}
                                    name={t('description.designation')}
                                    value={finalValue(inputName, countEditName, editName)}
                                    onChange={handleNameChange}
                                    placeholder={t('description.enter_designation')}
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />
                                <div className={classNameError}>{text_error}</div>
                            </div>
                        </div>
                        <div className="mb-5">
                            <div className="mb-3 block text-base font-medium text-[#07074D]">

                                <label htmlFor={t('description.description')} >{t('description.enter_description')}</label>
                                <input
                                    id={t('description.description')}
                                    type={t('description.description')}
                                    name={t('description.description')}
                                    value={editDescription}
                                    onChange={handleDescriptionChange}
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
                            className={classNameButton}
                            disabled={disableButton}>
                            {t('description.update')}
                        </button>

                    </div>
                </div>

            </form>
        </div >
    )
}
