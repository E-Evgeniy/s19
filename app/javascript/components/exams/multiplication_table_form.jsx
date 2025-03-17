import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function MultiplicationTableForm() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [inputName, setInputName] = useState('');
    const [countInputName, setCountInputName] = useState(0)
    const [searchFilelds, setSearchFilelds] = useState('')

    const [inputMultiplier, setInputMultiplier] = useState('');

    const ROOT_ADDRESS = 'name_pair'
    const PLURAR = 's'

    const blue_border = "w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium " +
                        "text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"

    const nameChange = (event) => {
        setInputName(event.target.value);
        setCountInputName(countInputName + 1)
        setSearchFilelds(event.target.value)
    };

    let classNameFiled = blue_border
    let text_error = t('description.pair_duplicate')
    let classNameError = "invisible"
    let disableButton = false
    let classButton = "hover:shadow-form rounded-md bg-blue-600 hover:bg-blue-800 py-3 px-8 text-base font-semibold text-white outline-none  disabled:opacity-75"
   
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
                                <label htmlFor={t('description.result_enter')} >{t('description.result_enter')}</label>
                                <input
                                    id={t('description.result_enter')}
                                    type={t('description.result_enter')}
                                    name={t('description.result_enter')}
                                    value={inputName}
                                    onChange={nameChange}
                                    className={classNameFiled}
                                    placeholder={t('description.result_enter')}
                                />  
                               <div className={classNameError}>{text_error}</div>                               
                            </div>
                        </div>

                        <button
                            type="submit"
                            className={classButton}
                            disabled={disableButton}>
                            {t('description.send')}
                        </button>

                    </div>
                </div>
            </form>
        </div >
    )
}