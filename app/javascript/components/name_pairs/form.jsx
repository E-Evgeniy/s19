import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function Form() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [inputName, setInputName] = useState('');
    const [countInputName, setCountInputName] = useState(0)
    const [searchFilelds, setSearchFilelds] = useState('')
    const [nameValid, setNameValid] = useState('')

    const [inputMultiplier, setInputMultiplier] = useState('');
    const [countInputMultiplier, setCountInputMultiplier] = useState(0)

    const ROOT_ADDRESS = 'name_pair'
    const PLURAR = 's'

    const red_border = "w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium " +
                       "text-[#6B7280] outline-none focus:border-[#f44336] focus:shadow-md"
    const blue_border = "w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium " +
                        "text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"

    const nameChange = (event) => {
        setInputName(event.target.value);
        setCountInputName(countInputName + 1)
        setSearchFilelds(event.target.value)
    };

    const multiplierChange = (event) => {
        setInputMultiplier(event.target.value);
        setCountInputMultiplier(countInputMultiplier + 1)
    };

    let classNameFiled = red_border
    let classMultiplierFiled = blue_border

    let text_error = t('description.pair_duplicate')
    let classNameError = "text-red-600"
    let disableButton = true
    let classButton = "hover:shadow-form rounded-md bg-blue-600 hover:bg-blue-800 py-3 px-8 text-base font-semibold text-white outline-none  disabled:opacity-75"
   


    if (countInputName == 0 || nameValid == true)  {
        classNameFiled = blue_border
        classNameError = "invisible"
        disableButton = false
    }

  
    if (inputName == '') {
        disableButton = true
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();

        formData.append("pair[name]", inputName);
        formData.append("pair[mutiplier]", inputMultiplier);
        
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
        navigate(`/${ROOT_ADDRESS}`);
    };

    useEffect(() => {
        const apiEndpoint = `/api/v1/${ROOT_ADDRESS}/find_for_create?name=${inputName}&count_name=${countInputName}`
    
        fetch(apiEndpoint)
          .then(response => response.json())
          .then(data => {            
            setNameValid(data["name_valid"])
          }
          );
      }, [searchFilelds])

    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="flex items-center justify-center p-2">
                    <div className="mx-auto w-full max-w-[550px]">

                        <div className="mb-5">
                            <div className="mb-3 block text-base font-medium text-[#07074D]">
                                <label htmlFor={t('description.name_pair')} >{t('description.name_pair')}</label>
                                <input
                                    id={t('description.name_pair')}
                                    type={t('description.name_pair')}
                                    name={t('description.name_pair')}
                                    value={inputName}
                                    onChange={nameChange}
                                    className={classNameFiled}
                                    placeholder={t('description.name_pair_enter')}
                                />  
                               <div className={classNameError}>{text_error}</div>                               
                            </div>
                        </div>

                        <div className="mb-5">
                            <div className="mb-3 block text-base font-medium text-[#07074D]">
                                <label htmlFor={t('description.multiplier')} >{t('description.multiplier')}</label>
                                <input
                                    id={t('description.multiplier')}
                                    type="number"
                                    min="0"
                                    name={t('description.multiplier')}
                                    value={inputMultiplier}
                                    onChange={multiplierChange}
                                    className={classMultiplierFiled}
                                    placeholder={t('description.multiplier_enter')}
                                />                                
                            </div>
                        </div>
                       

                        <button
                            type="submit"
                            className={classButton}
                            disabled={disableButton}>
                            {t('description.add')}
                        </button>

                    </div>
                </div>
            </form>
        </div >
    )
}