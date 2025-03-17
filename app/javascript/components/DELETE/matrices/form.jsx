import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function Form() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [files, setFiles] = useState([]);
    
    const [inputName, setInputName] = useState('');
    const [countInputName, setCountInputName] = useState(0)
    const [searchFilelds, setSearchFilelds] = useState('')
    const [nameValid, setNameValid] = useState('')

    const [inputWeight, setInputWeight] = useState('');
    const [countInputWeight, setCountInputWeight] = useState(0)

    const [inputLength, setInputLength] = useState('');
    const [countInputLength, setCountInputLength] = useState(0)

    const [inputWidth, setInputWidth] = useState('');
    const [countInputWidth, setCountInputWidth] = useState(0)

    const [inputHeight, setInputHeight] = useState('');
    const [countInputHeight, setCountInputHeight] = useState(0)

    const [inputAveragePrice, setInputAveragePrice] = useState(0);
    const [inputDescription, setInputDescription] = useState('')

    const ROOT_ADDRESS = 'matrices'
    const red_border = "w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium " +
                       "text-[#6B7280] outline-none focus:border-[#f44336] focus:shadow-md"
    const blue_border = "w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium " +
                        "text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"

    const handleFilesChange = (event) => {
        const newFiles = Array.from(event.target.files);
        setFiles([...files, ...newFiles]);
    };

    const handleFileRemove = (index) => {
        const newFiles = [...files];
        newFiles.splice(index, 1);
        setFiles(newFiles);
    };

    const nameChange = (event) => {
        setInputName(event.target.value);
        setCountInputName(countInputName + 1)
        setSearchFilelds(event.target.value)
    };

    const weightChange = (event) => {
        setInputWeight(event.target.value);
        setCountInputWeight(countInputWeight + 1)
    };

    const lengthChange = (event) => {
        setInputLength(event.target.value);
        setCountInputLength(countInputLength + 1)
    };

    const widthChange = (event) => {
        setInputWidth(event.target.value);
        setCountInputWidth(countInputWidth + 1)
    };

    const heightChange = (event) => {
        setInputHeight(event.target.value);
        setCountInputHeight(countInputHeight + 1)
    };

    const averagePriceChange = (event) => {
        setInputAveragePrice(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setInputDescription(event.target.value);
    };

    let classNameFiled = red_border
    let classWeightFiled = red_border
    let classLengthFiled = red_border
    let classWidthFiled = red_border
    let classHeightFiled = red_border

    let text_error = t('description.matrix_error_add')
    let classNameError = "text-red-600"
    let disableButton = true


    if (countInputName == 0 || nameValid == true)  {
        classNameFiled = "w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        classNameError = "invisible"
        disableButton = false
    }

  
    if (inputName == '') {
        disableButton = true
    }

    let classButton = "hover:shadow-form rounded-md bg-blue-600 hover:bg-blue-800 py-3 px-8 text-base font-semibold text-white outline-none  disabled:opacity-75"
    

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();

        formData.append("matrix[name]", inputName);
        formData.append("matrix[weight]", inputWeight);
        formData.append("matrix[length]", inputLength);
        formData.append("matrix[width]", inputWidth);
        formData.append("matrix[height]", inputHeight);
        formData.append("matrix[average_price]", inputAveragePrice);
        formData.append("matrix[description]", inputDescription);

        for (const file of files) {
            formData.append("matrix[files][]", file);
        }

        try {
            await axios.post(`/api/v1/${ROOT_ADDRESS}/`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            navigate(`/${ROOT_ADDRESS}/${location}`);
        } catch (error) {
            console.log(error.response);
            // обработать ошибки и отобразить их пользователю
        }
        navigate(`/${ROOT_ADDRESS}`);
    };

    useEffect(() => {
        const apiEndpoint = `/api/v1/${ROOT_ADDRESS.slice(0, -3)}x/find_for_create?input_name=${inputName}&count_name=${countInputName}`
    
        fetch(apiEndpoint)
          .then(response => response.json())
          .then(data => {            
            setNameValid(data["name_valid"])
          }
          );
      }, [searchFilelds])

    
    return (
        <div>
            <div className="font-bold text-xl flex items-center justify-center py-8">
                {t('description.matrix_new')}
            </div>

            <form onSubmit={handleSubmit}>
                <div className="flex items-center justify-center p-2">
                    <div className="mx-auto w-full max-w-[550px]">

                        <div className="mb-5">
                            <div className="mb-3 block text-base font-medium text-[#07074D]">
                                <label htmlFor={t('description.matrix_name')} >{t('description.matrix_name')}</label>
                                <input
                                    id={t('description.matrix_name')}
                                    type={t('description.matrix_name')}
                                    name={t('description.matrix_name')}
                                    value={inputName}
                                    onChange={nameChange}
                                    className={classNameFiled}
                                    placeholder={t('description.matrix_name_enter')}
                                />  
                                <div className={classNameError}>{text_error}</div>                              
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
                                    value={inputWeight}
                                    onChange={weightChange}
                                    className={classWeightFiled}
                                    placeholder={t('description.matrix_weight_enter')}
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
                                    value={inputLength}
                                    onChange={lengthChange}
                                    className={classLengthFiled}
                                    placeholder={t('description.matrix_length_enter')}
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
                                    value={inputWidth}
                                    onChange={widthChange}
                                    className={classWidthFiled}
                                    placeholder={t('description.matrix_width_enter')}
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
                                    value={inputHeight}
                                    onChange={heightChange}
                                    className={classHeightFiled}
                                    placeholder={t('description.matrix_height_enter')}
                                />                                
                            </div>
                        </div>

                        <div className="mb-5">
                            <div className="mb-3 block text-base font-medium text-[#07074D]">
                                <label htmlFor={t('description.average_price')} >{t('description.average_price')}</label>
                                <input
                                    id={t('description.average_price')}
                                    type="number"
                                    min="0"
                                    name={t('description.average_price')}
                                    value={inputAveragePrice}
                                    onChange={averagePriceChange}
                                    className={blue_border}
                                    placeholder={t('description.average_price_enter')}
                                />                                
                            </div>
                        </div>

                        <div className="mb-5">
                            <div className="mb-3 block text-base font-medium text-[#07074D]">
                                <label htmlFor="Description" style={{ paddingBottom: '100px' }}>{t('description.matrix_description')} </label>                                
                            <textarea
                            rows="3"
                            id={t('description.matrix_description')}
                                    type="text"
                                    name={t('description.matrix_description')}
                                    value={inputDescription}
                                    onChange={handleDescriptionChange}
                                    placeholder={t('description.matrix_description_enter')}
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
                            className={classButton}
                            disabled={disableButton}>
                            {t('description.matrix_create')}
                        </button>

                    </div>
                </div>



            </form>
        </div >
    )
}