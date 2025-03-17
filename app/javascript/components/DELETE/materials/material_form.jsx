import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function MaterialForm() {
    const { t } = useTranslation();
    const navigate = useNavigate()

    const [inputDescription, setInputDescription] = useState('')
    const [inputName, setInputName] = useState('')
    const [inputAveragePrice, setInputAveragePrice] = useState('')
    const [searchFilelds, setSearchFilelds] = useState('')
    const [nameFromTable, setNameFromTable] = useState(true)

    const [files, setFiles] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();

        formData.append("material[description]", inputDescription);
        formData.append("material[name]", inputName);
        formData.append("material[average_price]", inputAveragePrice);

        for (const file of files) {
            formData.append("material[files][]", file);
        }

        try {
            await axios.post("/api/v1/materials/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            navigate(`/materials/${location}`);
        } catch (error) {
            console.log(error.response);
            // обработать ошибки и отобразить их пользователю
        }
        navigate(`/materials`);
    };

    useEffect(() => {
        const apiEndpoint = `/api/v1/material/find_for_create?input_name=${inputName}`
    
        fetch(apiEndpoint)
          .then(response => response.json())
          .then(data => {            
            setNameFromTable(data["name_valid"])
          }
          );
      }, [searchFilelds])

      let classNameFiled = "w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#f44336] focus:shadow-md"
      let classNameError = "text-red-600"
    
      if (nameFromTable)  {
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

    const handleNameChange = (event) => {
        setInputName(event.target.value);
        setSearchFilelds(event.target.value);
    };

    const handleAveragePriceChange = (event) => {
        setInputAveragePrice(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setInputDescription(event.target.value);
    };


    let classDescriptionButton = "hover:shadow-form rounded-md bg-blue-600 hover:bg-blue-800 py-3 px-8 text-base font-semibold text-white outline-none  disabled:opacity-75"

    let disableButton = false

    if (inputName == '' || nameFromTable == false) {
        disableButton = true
    }

    return (
        <div>
            <div className="font-bold text-xl flex items-center justify-center py-8">
                {t('description.material_new')}
            </div>

            <form onSubmit={handleSubmit}>
                <div className="flex items-center justify-center p-2">
                    <div className="mx-auto w-full max-w-[550px]">

                    <div className="mb-5">
                            <div className="mb-3 block text-base font-medium text-[#07074D]">
                                <label htmlFor={t('description.material_name')} >{t('description.material_name')}</label>
                                <input
                                    id={t('description.material_name')}
                                    type={t('description.material_name')}
                                    name={t('description.material_name')}
                                    value={inputName}
                                    onChange={handleNameChange}
                                    className={classNameFiled}
                                    placeholder={t('description.enter_material_name')}                                    
                                />
                                <div className={classNameError}>{t('description.error_name')}</div>
                            </div>
                        </div>

                        <div className="mb-5">
                            <div className="mb-3 block text-base font-medium text-[#07074D]">
                                <label htmlFor={t('description.average_price_kg')} >{t('description.average_price_kg')}</label>
                                <input
                                    id={t('description.average_price_kg')}
                                    type="number"
                                    name={t('description.average_price_kg')}
                                    value={inputAveragePrice}
                                    onChange={handleAveragePriceChange}
                                    className={classNameFiled}
                                    placeholder={t('description.enter_average_price_kg')}                                    
                                />                                
                            </div>
                        </div>

                        <div className="mb-5">
                            <div className="mb-3 block text-base font-medium text-[#07074D]">
                                <label htmlFor="Description" style={{ paddingBottom: '100px' }}>{t('description.material_description')} </label>                                
                            <textarea
                            rows="3"
                            id={t('description.material_description')}
                                    type="text"
                                    name={t('description.material_description')}
                                    value={inputDescription}
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
                            className={classDescriptionButton}
                            disabled={disableButton}>
                            {t('description.material_create')}
                        </button>

                    </div>
                </div>



            </form>
        </div >
    )
}
