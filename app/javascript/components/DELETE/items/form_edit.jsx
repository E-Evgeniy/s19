import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";

export default function FormEdit() {
    const { t } = useTranslation();
    const navigate = useNavigate()    

    const [inputName, setInputName] = useState('')
    const [inputAveragePrice, setInputAveragePrice] = useState('')
    const [inputDescription, setInputDescription] = useState('')
    const [inputWeight, setInputWeight] = useState('')
    const [inputLength, setInputLength] = useState('')
    const [inputWidth, setInputWidth] = useState('')
    const [inputHeight, setInputHeight] = useState('')

    const [editName, setEditName] = useState('')
    const [editAveragePrice, setEditAveragePrice] = useState('')
    const [editDescription, setEditDescription] = useState('')
    const [editWeight, setEditWeight] = useState('')
    const [editLength, setEditLength] = useState('')
    const [editWidth, setEditWidth] = useState('')
    const [editHeight, setEditHeight] = useState('')

    const [countEditName, setCountEditName] = useState(0)
    const [countEditAveragePrice, setCountEditAveragePrice] = useState(0)
    const [countEditDescription, setCountEditDescription] = useState(0)
    const [countEditWeight, setCountEditWeight] = useState(0)
    const [countEditLength, setCountEditLength] = useState(0)
    const [countEditWidth, setCountEditWidth] = useState(0)
    const [countEditHeight, setCountEditHeight] = useState(0)

    const [searchFilelds, setSearchFilelds] = useState('')
    const [nameFromTable, setNameFromTable] = useState(true)

    const [files, setFiles] = useState([]);

    const [csrfToken, setCsrfToken] = useState(null);

    const ROOT_ADDRESS = 'items'

    const blue_border = "w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium " +
                        "text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"

    let classSimpleFiled = blue_border

  useEffect(() => {
    // Ищем мета-тег с CSRF Token и сохраняем его значение в состоянии
    const csrfMetaTag = document.querySelector('meta[name="csrf-token"]');
    if (csrfMetaTag) {
      setCsrfToken(csrfMetaTag.content);
    }
  }, []);

    let location = useLocation().pathname.split(`${ROOT_ADDRESS}/`)[1];
    location = location.split('/edit')[0];

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();

        formData.append("item[name]", finalValue(inputName, countEditName, editName));
        formData.append("item[average_price]", finalValue(inputAveragePrice, countEditAveragePrice, editAveragePrice));
        formData.append("item[description]", finalValue(inputDescription, countEditDescription, editDescription));
        formData.append("item[weight]", finalValue(inputWeight, countEditWeight, editWeight));
        formData.append("item[length]", finalValue(inputLength, countEditLength, editLength));
        formData.append("item[width]", finalValue(inputWidth, countEditWidth, editWidth));
        formData.append("item[height]", finalValue(inputHeight, countEditHeight, editHeight));
        
        for (const file of files) {
            formData.append("item[files][]", file);
        }

        try {
            await axios.patch(`/api/v1/${ROOT_ADDRESS}/${location}`, formData, {
                headers: {
                    'X-CSRF-TOKEN': csrfToken
                }
            });
            navigate(`/${ROOT_ADDRESS}/${location}`);
        } catch (error) {
            console.log(error.response);
            // обработать ошибки и отобразить их пользователю
        }
        navigate(`/${ROOT_ADDRESS}/${location}`);
    };

    useEffect(() => {

        const apiEndpoint = `/api/v1/${ROOT_ADDRESS.slice(0, -1)}/find_for_edit?id=${location}&input_name=${inputName}&count_edit_name=${countEditName}`

        fetch(apiEndpoint)
            .then(response => response.json())
            .then(data => {
                setNameFromTable(data["name_valid"])
                setEditName(data["object_edit"].name)
                setEditAveragePrice(data["object_edit"].average_price)
                setEditDescription(data["object_edit"].description)
                setEditWeight(data["object_edit"].weight)
                setEditLength(data["object_edit"].length)
                setEditWidth(data["object_edit"].width)
                setEditHeight(data["object_edit"].height)
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

    const handleWeightChange = (event) => {
        setInputWeight(event.target.value);
        setCountEditWeight(countEditWeight + 1)
    };

    const handleLengthChange = (event) => {
        setInputLength(event.target.value);
        setCountEditLength(countEditLength + 1)
    };

    const handleWidthChange = (event) => {
        setInputWidth(event.target.value);
        setCountEditWidth(countEditWidth + 1)
    };

    const handleHeightChange = (event) => {
        setInputHeight(event.target.value);
        setCountEditHeight(countEditHeight + 1)
    };

    let classNameButton = "hover:shadow-form rounded-md bg-blue-600 hover:bg-blue-800 py-3 px-8 text-base font-semibold text-white outline-none  disabled:opacity-75"

    let disableButton = false

    if (finalValue(inputName, countEditName, editName) == '' || nameFromTable == false ) {
        disableButton = true
    }

    return (
        <div>
            <div className="font-bold text-xl flex items-center justify-center py-8">
                {t('description.item_edit')}
            </div>

            <form onSubmit={handleSubmit}>
                <div className="flex items-center justify-center p-2">
                    <div className="mx-auto w-full max-w-[550px]">

                        <div className="mb-5">
                            <div className="mb-3 block text-base font-medium text-[#07074D]">
                                <label htmlFor="name" style={{ paddingBottom: '100px' }}>{t('description.material_name')} </label>
                                <input
                                    id={t('description.item_name')}
                                    type={t('description.item_name')}
                                    name={t('description.item_name')}
                                    value={finalValue(inputName, countEditName, editName)}
                                    onChange={handleNameChange}
                                    className={classNameFiled}
                                    placeholder={t('description.enter_material_name')}                                    
                                /><div className={classNameError}>{t('description.error_name')}</div>
                            </div>
                        </div>

                        <div className="mb-5">
                            <div className="mb-3 block text-base font-medium text-[#07074D]">
                                <label htmlFor={t('description.item_weight')} >{t('description.item_weight')}</label>
                                <input
                                    id={t('description.item_weight')}
                                    type="number"
                                    min="0"
                                    name={t('description.item_weight')}
                                    value={finalValue(inputWeight, countEditWeight, editWeight)}
                                    onChange={handleWeightChange}
                                    className={classSimpleFiled}
                                    placeholder={t('description.item_weight_enter')}
                                />                                
                            </div>
                        </div>

                        <div className="mb-5">
                            <div className="mb-3 block text-base font-medium text-[#07074D]">
                                <label htmlFor={t('description.item_length')} >{t('description.item_length')}</label>
                                <input
                                    id={t('description.item_length')}
                                    type="number"
                                    min="0"
                                    name={t('description.item_length')}
                                    value={finalValue(inputLength, countEditLength, editLength)}
                                    onChange={handleLengthChange}
                                    className={classSimpleFiled}
                                    placeholder={t('description.item_length_enter')}
                                />                                
                            </div>
                        </div>

                        <div className="mb-5">
                            <div className="mb-3 block text-base font-medium text-[#07074D]">
                                <label htmlFor={t('description.item_width')} >{t('description.item_width')}</label>
                                <input
                                    id={t('description.item_width')}
                                    type="number"
                                    min="0"
                                    name={t('description.item_width')}
                                    value={finalValue(inputWidth, countEditWidth, editWidth)}
                                    onChange={handleWidthChange}
                                    className={classSimpleFiled}
                                    placeholder={t('description.item_width_enter')}
                                />                                
                            </div>
                        </div>

                        <div className="mb-5">
                            <div className="mb-3 block text-base font-medium text-[#07074D]">
                                <label htmlFor={t('description.item_height')} >{t('description.item_height')}</label>
                                <input
                                    id={t('description.item_height')}
                                    type="number"
                                    min="0"
                                    name={t('description.item_height')}
                                    value={finalValue(inputHeight, countEditHeight, editHeight)}
                                    onChange={handleHeightChange}
                                    className={classSimpleFiled}
                                    placeholder={t('description.item_height_enter')}
                                />                                
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
                                    className={classSimpleFiled}
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
                                    className={classSimpleFiled}
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
                            {t('description.item_edit')}
                        </button>

                    </div>
                </div>



            </form>
        </div >
    )
}
