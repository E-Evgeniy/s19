import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import axios from "axios";

export default function PostAdd(prop) {
    const navigate = useNavigate()

    const { t } = useTranslation();
    const [inputPostName, setInputPostName] = useState('')
    const [idPost, setIdPost] = useState('')
    const [postExist, setPostExist] = useState('')
    const [searchFilelds, setSearchFilelds] = useState('')

    const ROOT_ADDRESS = 'post_tech_process'
    const PLURAR = 'es'

    const handlePostNameChange = (event) => {
        setInputPostName(event.target.value);
        setSearchFilelds(event.target.value);
    };

    const { tech_process_id, onPostAdd } = prop;

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();

        formData.append("object[post_id]", idPost);
        formData.append("object[tech_process_id]", tech_process_id);

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
        setInputPostName('')
        navigate(`/tech_processes/${tech_process_id}`);
    };

    useEffect(() => {
        const apiEndpoint = `/api/v1/${ROOT_ADDRESS}/find_for_add_post?input_name=${inputPostName}&tech_process_id=${tech_process_id}`

        fetch(apiEndpoint)
            .then(response => response.json())
            .then(data => {
                setIdPost(data["name_id"])
                setPostExist(data["obj_exist_in_col"])
            }
            );
    }, [searchFilelds])

    let classPostNameError = "text-red-600"
    let text_error = ''
    let disableButton = true        
    let classButton = "text-sm bg-green-400 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"

    if (postExist == true) {
        text_error = t('description.post_error_add')
    } else if (idPost == 0 && inputPostName != '') {
        text_error = t('description.error_post_empty')
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

    let classPostNameFiled = "w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#f44336] focus:shadow-md"

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
                                    {t('description.post_name')}
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
                                    value={inputPostName}
                                    onChange={handlePostNameChange}
                                    className={`${classPostNameFiled} text-center`}
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
                <div className={classPostNameError}>{text_error}</div>
            </div>
        </div>

    )


    return dataSection
}