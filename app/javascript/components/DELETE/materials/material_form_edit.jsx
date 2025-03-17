import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";

export default function MaterialFormEdit() {
    const { t } = useTranslation();
    const navigate = useNavigate()

    const [inputName, setInputName] = useState('')
    const [inputAveragePrice, setInputAveragePrice] = useState('')
    const [inputDescription, setInputDescription] = useState('')

    const [editName, setEditName] = useState('')
    const [editAveragePrice, setEditAveragePrice] = useState('')
    const [editDescription, setEditDescription] = useState('')

    const [countEditName, setCountEditName] = useState(0)
    const [countEditAveragePrice, setCountEditAveragePrice] = useState(0)
    const [countEditDescription, setCountEditDescription] = useState(0)

    const [searchFilelds, setSearchFilelds] = useState('')
    const [nameFromTable, setNameFromTable] = useState(true)

    const [files, setFiles] = useState([]);
    //const [filesOld, setFilesOld] = useState([]);

    const [csrfToken, setCsrfToken] = useState(null);

  useEffect(() => {
    // Ищем мета-тег с CSRF Token и сохраняем его значение в состоянии
    const csrfMetaTag = document.querySelector('meta[name="csrf-token"]');
    if (csrfMetaTag) {
      setCsrfToken(csrfMetaTag.content);
    }
  }, []);

    let location = useLocation().pathname.split('materials/')[1];
    location = location.split('/edit')[0];

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();

        formData.append("material[name]", finalValue(inputName, countEditName, editName));
        formData.append("material[average_price]", finalValue(inputAveragePrice, countEditAveragePrice, editAveragePrice));
        formData.append("material[description]", finalValue(inputDescription, countEditDescription, editDescription));

        for (const file of files) {
            formData.append("material[files][]", file);
        }

        try {
            await axios.patch(`/api/v1/materials/${location}`, formData, {
                headers: {
                    'X-CSRF-TOKEN': csrfToken
                }
            });
            navigate(`/materials/${location}`);
        } catch (error) {
            console.log(error.response);
            // обработать ошибки и отобразить их пользователю
        }
        navigate(`/materials/${location}`);
    };

    useEffect(() => {

        const apiEndpoint = `/api/v1/material/find_for_edit?id=${location}&input_name=${inputName}&count_edit_name=${countEditName}`

        fetch(apiEndpoint)
            .then(response => response.json())
            .then(data => {
                setNameFromTable(data["name_valid"])
                setEditName(data["material_edit"].name)
                setEditAveragePrice(data["material_edit"].average_price)
                setEditDescription(data["material_edit"].description)
                //setFilesOld(data["files"])
            }
            );
    }, [searchFilelds])


    let classNameFiled = "w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#f44336] focus:shadow-md"
    let classNameError = "text-red-600"

    if (nameFromTable) {
        classNameFiled = "w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        classNameError = "invisible"
    }

    const handleFilesChange = (event) => {
        const newFiles = Array.from(event.target.files);
        setFiles([...files, ...newFiles]);
    };

    const handleFileRemove = (index) => {
        const newFiles = [...files];
        newFiles.splice(index, 1);
        setFiles(newFiles);
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

    const handleNameChange = (event) => {
        setInputName(event.target.value);
        setSearchFilelds(event.target.value);
        setCountEditName(countEditName + 1)
    };

    const handleDescriptionChange = (event) => {
        setInputDescription(event.target.value);
        setCountEditDescription(countEditDescription + 1)
    };

    const handleAveragePriceChange = (event) => {
        setInputAveragePrice(event.target.value);
        setCountEditAveragePrice(countEditAveragePrice + 1)
    };

    let classNameButton = "hover:shadow-form rounded-md bg-blue-600 hover:bg-blue-800 py-3 px-8 text-base font-semibold text-white outline-none  disabled:opacity-75"

    let disableButton = false

    if (finalValue(inputName, countEditName, editName) == '' || nameFromTable == false ) {
        disableButton = true
    }

    return (
        <div>
            <div className="font-bold text-xl flex items-center justify-center py-8">
                {t('description.material_edit')}
            </div>

            <form onSubmit={handleSubmit}>
                <div className="flex items-center justify-center p-2">
                    <div className="mx-auto w-full max-w-[550px]">

                        <div className="mb-5">
                            <div className="mb-3 block text-base font-medium text-[#07074D]">
                                <label htmlFor="name" style={{ paddingBottom: '100px' }}>{t('description.material_name')} </label>
                                <input
                                    id={t('description.material_name')}
                                    type={t('description.material_name')}
                                    name={t('description.material_name')}
                                    value={finalValue(inputName, countEditName, editName)}
                                    onChange={handleNameChange}
                                    className={classNameFiled}
                                    placeholder={t('description.enter_material_name')}                                    
                                /><div className={classNameError}>{t('description.error_name')}</div>
                            </div>
                        </div>
                        <div className="mb-5">
                            <div className="mb-3 block text-base font-medium text-[#07074D]">

                                <label htmlFor={t('description.average_price_kg')} >{t('description.average_price_kg')}</label>
                                <input
                                    id={t('description.average_price_kg')}
                                    type={t('description.average_price_kg')}
                                    name={t('description.average_price_kg')}
                                    value={finalValue(inputAveragePrice, countEditAveragePrice, editAveragePrice)}
                                    onChange={handleAveragePriceChange}
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                    placeholder={t('description.enter_average_price_kg')}
                                />
                                
                            </div>
                        </div>

                        <div className="mb-5">
                            <div className="mb-3 block text-base font-medium text-[#07074D]">

                                <label htmlFor={t('description.material_description')} >{t('description.material_description')}</label>
                                <input
                                    id={t('description.material_description')}
                                    type={t('description.material_description')}
                                    name={t('description.material_description')}
                                    value={finalValue(inputDescription, countEditDescription, editDescription)}
                                    onChange={handleDescriptionChange}
                                    placeholder={t('description.enter_material_description')}
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
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
                            {t('description.material_edit')}
                        </button>

                    </div>
                </div>



            </form>
        </div >
    )
}
