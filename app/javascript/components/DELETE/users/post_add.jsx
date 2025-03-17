import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import axios from "axios";

export default function PostAdd(prop) {
    const navigate = useNavigate()

    const { t } = useTranslation();

    const [inputObjectName, setInputObjectName] = useState('')
    const [idObject, setIdObject] = useState('')
    const [addObjectExist, setAddObjectExist] = useState('')
    const [searchFilelds, setSearchFilelds] = useState('')

    const ROOT_ADDRESS = 'user_post'
    const PLURAR = 's'
    const NAVIGATE_ADDRESS = 'users'

    const handleTechProcessNameChange = (event) => {
        setInputObjectName(event.target.value);
        setSearchFilelds(event.target.value);
    };

    const { user_id, onPostAdd } = prop;

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();

        formData.append("object[user_id]", user_id);
        formData.append("object[post_id]", idObject);

        try {
            await axios.post(`/api/v1/${ROOT_ADDRESS}${PLURAR}/`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            onPostAdd();

        } catch (error) {
            console.log(error.response);
            // обработать ошибки и отобразить их пользователю
        }
        setInputObjectName('')
        navigate(`/${NAVIGATE_ADDRESS}/${user_id}`);
    };

    useEffect(() => {
        const apiEndpoint = `/api/v1/${ROOT_ADDRESS}/find_for_add_object?input_name=${inputObjectName}&user_id=${user_id}`

        fetch(apiEndpoint)
            .then(response => response.json())
            .then(data => {
                setIdObject(data["name_id"])
                setAddObjectExist(data["obj_exist_in_col"])
            }
            );
    }, [searchFilelds])

    let classObjectNameError = "text-red-600"
    let text_error = ''
    let disableButton = true        
    let classButton = "text-sm bg-green-400 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"

    if (addObjectExist == true) {
        //text_error = t('description.tech_process_error_add')
        disableButton = false
    } else if (idObject == 0 && inputObjectName != '') {
        text_error = t('description.post_error_empty')
    } else {
        classButton = "text-sm bg-green-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
        disableButton = false
    }

    const class_table_head = "w-2/5 h-full mb-4 py-10"
    const class_tr_head_1 = "bg-gray-150 border-b"
    const class_th_head_0 = "p-2 border-r text-sm font-bold text-white bg-green-600 "
    const class_th_head_1 = "p-2 border-r text-sm font-bold text-white bg-blue-600 w-1/2"
    const class_div_head_1 = "flex items-center justify-center"
    const class_div_button = "flex items-center justify-center w-full py-3 px-6"

    let classTechProcessNameFiled = "w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#f44336] focus:shadow-md"

    const dataSection = (
        <div className="mt-10">
            <div className="w-full px-2">
                <table className={class_table_head} style={{ tableLayout: 'fixed' }}>
                    <thead>
                        <tr className={class_tr_head_1}>
                            <th className={class_th_head_0} colSpan="2">
                                <div className={class_div_head_1}>
                                    {t('description.post_add')}</div>
                            </th>
                        </tr>
                        <tr className={class_tr_head_1}>
                            <th className={class_th_head_1}>
                                <div className={class_div_head_1}>
                                    {t('description.designation')}
                                </div>                                
                            </th>

                            <th className={class_th_head_1} style={{ textAlign: 'right' }}>
                                <div className={class_div_head_1}>
                                    {t('description.action')}
                                </div>
                            </th>
                        </tr>
                        <tr>

                            <td><label htmlFor={t('description.object_name')} ></label>
                                <input
                                    id={t('description.post_name')}
                                    type="text"
                                    value={inputObjectName}
                                    onChange={handleTechProcessNameChange}
                                    className={`${classTechProcessNameFiled} text-center`}
                                    placeholder={t('description.designation_enter')}
                                />
                            </td>
                            

                            <td className={class_div_button}>
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    className={classButton}
                                    disabled={disableButton}>
                                    {t('description.add')}
                                </button>
                            </td>

                        </tr>
                    </thead>
                </table>
                <div className={classObjectNameError}>{text_error}</div>
            </div>
        </div>

    )


    return dataSection
}