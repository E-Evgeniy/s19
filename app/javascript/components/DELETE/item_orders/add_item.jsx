import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import axios from "axios";

export default function AddItem(prop) {
    const navigate = useNavigate()

    const { t } = useTranslation();
    const [inputItemName, setInputItemName] = useState('')
    const [idItem, setIdItem] = useState('')
    //const [idMatrix, setIdMatrix] = useState('')
    const [itemValid, setItemValid] = useState('')
    //const [matrixValid, setMatrixValid] = useState('')
    //const [inputItemDescription, setInputItemDescription] = useState('')
    //const [inputMatrixName, setInputMatrixName] = useState('')
    const [inputMatrixVolume, setInputMatrixVolume] = useState('')
    const [inputCastingVolume, setInputCastingVolume] = useState('')
    const [searchFilelds, setSearchFilelds] = useState('')
    //const [searchFilelds1, setSearchFilelds1] = useState('')

    const handleItemNameChange = (event) => {
        setInputItemName(event.target.value);
        setSearchFilelds(event.target.value);
    };

    // const handlesetInputMatrixNameChange = (event) => {
    //    setInputMatrixName(event.target.value);
    //    setSearchFilelds1(event.target.value);
   // };

    const handleMatrixVolumeChange = (event) => {
        setInputMatrixVolume(event.target.value);
    };

    const handleCastingVolumeChange = (event) => {
        setInputCastingVolume(event.target.value);
    };


    const {order_id, onItemAdded} = prop;

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();

        formData.append("item_order_unit[item_id]", idItem);
        formData.append("item_order_unit[item_order_id]", order_id);
        //formData.append("item_order_unit[matrix_id]", idMatrix);
        formData.append("item_order_unit[matrix_volume]", inputMatrixVolume);
        formData.append("item_order_unit[casting_volume]", inputCastingVolume);

        try {
            await axios.post("/api/v1/item_order_units/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            onItemAdded();
            
        } catch (error) {
            console.log(error.response);
            // обработать ошибки и отобразить их пользователю
        }
        setInputItemName('')
       // setInputMatrixName('')
        setIdItem('')
        setItemValid('')
        setInputMatrixVolume('')
        setInputCastingVolume('')
        navigate(`/item_orders/${order_id}`);
    };

    useEffect(() => {
        const apiEndpoint = `/api/v1/item/check_for_create_order?&input_name=${inputItemName}`

        fetch(apiEndpoint)
            .then(response => response.json())
            .then(data => {
                setItemValid(data["item_valid"])
                setIdItem(data["item_id"])
            }
            );
    }, [searchFilelds])

    let classItemNameError = "visible"
    let text_error = ''
    let disableButton = false
    let classButton="text-sm bg-green-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"

    if (itemValid == false && inputItemName != '') {
        text_error = t('description.error_item_name')
        classButton="text-sm bg-green-400 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
        disableButton = true
        
      } else if (inputItemName == '') {
          classItemNameError = "invisible"
          classButton="text-sm bg-green-400 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
          disableButton = true
      } else {
          classItemNameError = "invisible"
      }

      const class_tr_head_1 = "bg-gray-150 border-b"
      const class_th_head_0 = "p-2 border-r text-sm font-bold text-white bg-blue-600 w-1/4"
      const class_div_head_1 = "flex items-center justify-center"

    let classItemNameFiled = "w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#f44336] focus:shadow-md"
    let classItemPriceFiled = "w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#f44336] focus:shadow-md"
    const dataSection = (
        <div>
            <div className="w-full px-2">
                <div className="font-bold text-xl flex items-center justify-center py-5">
                    {t('description.item_add')}</div>
                <table className="w-full h-full" style={{ tableLayout: 'fixed' }}>

                    <thead>
                        <tr className={class_tr_head_1}>
                            <th className={class_th_head_0}>
                                <div className={class_div_head_1}>
                                    {t('description.item_name')}
                                </div>
                            </th>

                            <th className={class_th_head_0}>
                                <div className={class_div_head_1}>
                                    {t('description.casting_volume')}
                                </div>
                            </th>   

                            <th className={class_th_head_0}>
                                <div className={class_div_head_1}>
                                    {t('description.matrix_volume')}
                                </div>
                            </th> 

                                                     
                            
                            <th className={class_th_head_0} style={{ textAlign: 'right' }}>
                                <div className={class_div_head_1}>
                                    {t('description.action')}
                                </div>
                            </th>
                        </tr>
                        <tr>

                            <td><label htmlFor={t('description.item_name')} ></label>
                                <input
                                    id={t('description.item_name')}
                                    type="text"
                                    value={inputItemName}
                                    onChange={handleItemNameChange}
                                    className={`${classItemNameFiled} text-center`}
                                    placeholder={t('description.item_name_enter')}
                                />
                            </td>

                            <td>
                                <label htmlFor={t('description.casting_volume')} ></label>
                                <input
                                    id={t('description.casting_volume')}
                                    type="text"
                                    value={inputCastingVolume}
                                    onChange={handleCastingVolumeChange}
                                    className={`${classItemPriceFiled} text-center`}
                                    placeholder={t('description.enter_casting_volume')}
                                />
                            </td>

                            <td>
                                <label htmlFor={t('description.matrix_volume')} ></label>
                                <input
                                    id={t('description.matrix_volume')}
                                    type="text"
                                    value={inputMatrixVolume}
                                    onChange={handleMatrixVolumeChange}
                                    className={`${classItemPriceFiled} text-center`}
                                    placeholder={t('description.enter_matrix_volume')}
                                />
                            </td>

                           

                            <td className="flex items-center justify-center w-full py-3 px-6 ">
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
                <div className={classItemNameError}>{text_error}</div>
            </div>
        </div>

    )


    return dataSection
}