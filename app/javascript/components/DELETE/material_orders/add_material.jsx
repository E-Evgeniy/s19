import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import axios from "axios";

export default function AddMaterial(prop) {
    const navigate = useNavigate()

    const { t } = useTranslation();
    const [inputMaterialName, setInputMaterialName] = useState('')
    const [idMaterial, setIdMaterial] = useState('')
    const [materialValid, setMaterialValid] = useState('')

    const [inputMaterialPrice, setInputMaterialPrice] = useState('')

    const [totalMaterialPrice, setTotalMaterialPrice] = useState('')
    const [countTotalMaterialPrice, setCountTotalMaterialPrice] = useState(0)
    const [oldCountTotalMaterialPrice, setCountOldTotalMaterialPrice] = useState(0)
    const [inputMaterialMass, setInputMaterialMass] = useState('')
    const [inputMaterialDeliveryPeriod, setInputMaterialDeliveryPeriod] = useState('')
    const [searchFilelds, setSearchFilelds] = useState('')


    const handleMaterialNameChange = (event) => {
        setInputMaterialName(event.target.value);
        setSearchFilelds(event.target.value);
    };

    const handleMaterialDeliveryPeriodChange = (event) => {
        setInputMaterialDeliveryPeriod(event.target.value);
    };

    const {order_id, onMaterialAdded} = prop;

    const handleMaterialPriceChange = (event) => {
        const newValue = (event.target.value);
        const decimalRegex = /^-?[0-9]*\.?[0-9]{0,2}$/;

    if (newValue === '' || decimalRegex.test(newValue)) {
        setInputMaterialPrice(newValue);
        setCountTotalMaterialPrice(countTotalMaterialPrice + 1)
    }
    };

    const handleMaterialMassChange = (event) => {
        const newValue = (event.target.value);
        const decimalRegex = /^-?[0-9]*\.?[0-9]{0,2}$/;

    if (newValue === '' || decimalRegex.test(newValue)) {
        setInputMaterialMass(newValue);
        setCountTotalMaterialPrice(countTotalMaterialPrice + 1)
    }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();

        formData.append("material_order_item[material_id]", idMaterial);
        formData.append("material_order_item[material_order_id]", order_id);
        formData.append("material_order_item[price]", inputMaterialPrice);
        formData.append("material_order_item[quantity]", inputMaterialMass);
        formData.append("material_order_item[delivery_period]", inputMaterialDeliveryPeriod);

        try {
            await axios.post("/api/v1/material_order_items/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            onMaterialAdded();
            
        } catch (error) {
            console.log(error.response);
            // обработать ошибки и отобразить их пользователю
        }
        setInputMaterialName('')
        setIdMaterial('')
        setMaterialValid('')
        setTotalMaterialPrice('')
        setInputMaterialPrice('')
        setInputMaterialMass('')
        navigate(`/material_orders/${order_id}`);
    };

    useEffect(() => {
        const apiEndpoint = `/api/v1/material/check_for_create_order?&input_name=${inputMaterialName}`

        fetch(apiEndpoint)
            .then(response => response.json())
            .then(data => {
                setMaterialValid(data["material_valid"])
                setIdMaterial(data["material_id"])
            }
            );
    }, [searchFilelds])

    

    if ((inputMaterialPrice != 0 && inputMaterialMass != 0 ) && (countTotalMaterialPrice != oldCountTotalMaterialPrice)) {
        const totalMaterialPrice = parseFloat(inputMaterialPrice) * parseFloat(inputMaterialMass);
        setTotalMaterialPrice(totalMaterialPrice.toFixed(2));
        setCountOldTotalMaterialPrice(countTotalMaterialPrice)
    } 

    let classMaterialNameFiled = "w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#f44336] focus:shadow-md"
    let classMaterialPriceFiled = "w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#f44336] focus:shadow-md"
    const dataSection = (
        <div>
            <div className="w-full px-2">
                <div className="font-bold text-xl flex items-center justify-center py-5">
                    {t('description.material_add')}</div>
                <table className="w-full h-full" style={{ tableLayout: 'fixed' }}>

                    <thead>
                        <tr className="bg-gray-150 border-b">
                            <th className="p-2 border-r text-sm font-bold text-white bg-blue-600 w-1/4">
                                <div className="flex items-center justify-center">
                                    {t('description.material_name')}
                                </div>
                            </th>
                            <th className="p-2 border-r text-sm font-bold text-white bg-blue-600 w-1/4">
                                <div className="flex items-center justify-center">
                                    {t('description.material_delivery_period')}
                                </div>
                            </th>
                            <th className="p-2 border-r text-sm font-bold text-white bg-blue-600 w-1/4">
                                <div className="flex items-center justify-center">
                                    {t('description.material_massa_in_order')}
                                </div>
                            </th>
                            <th className="p-2 border-r text-sm font-bold text-white bg-blue-600 w-1/4">
                                <div className="flex items-center justify-center">
                                    {t('description.material_price_in_order')}
                                </div>
                            </th>                            
                            <th className="p-2 border-r text-sm font-bold text-white bg-blue-600 w-1/4">
                                <div className="flex items-center justify-center">
                                    {t('description.material_total_price')}
                                </div>
                            </th>
                            
                            <th className="p-2 text-sm font-bold text-white bg-blue-600 w-1/4" style={{ textAlign: 'right' }}>
                                <div className="flex items-center justify-center">
                                    {t('description.action')}
                                </div>
                            </th>
                        </tr>
                        <tr>

                            <td><label htmlFor={t('description.material_name')} ></label>
                                <input
                                    id={t('description.material_name')}
                                    type="text"
                                    value={inputMaterialName}
                                    onChange={handleMaterialNameChange}
                                    className={`${classMaterialNameFiled} text-center`}
                                    placeholder={t('description.enter_material_name')}
                                />
                            </td>
                            <td>
                                <label htmlFor={t('description.material_delivery_period')} ></label>
                                <input
                                    id={t('description.material_delivery_period')}
                                    type="number"
                                    value={inputMaterialDeliveryPeriod}
                                    onChange={handleMaterialDeliveryPeriodChange}
                                    className={`${classMaterialPriceFiled} text-center`}
                                    placeholder={t('description.material_delivery_period')}
                                />
                            </td>
                            <td>
                                <label htmlFor={t('description.material_massa_in_order')} ></label>
                                <input
                                    id={t('description.material_massa_in_order')}
                                    type="text"
                                    value={inputMaterialMass}
                                    onChange={handleMaterialMassChange}
                                    className={`${classMaterialPriceFiled} text-center`}
                                    placeholder={t('description.material_mass_in_order_enter')}
                                />
                            </td> 
                            <td>
                                <label htmlFor={t('description.material_price_in_order')} ></label>
                                <input
                                    id={t('description.material_price_in_order')}
                                    type="text"
                                    value={inputMaterialPrice}
                                    onChange={handleMaterialPriceChange}
                                    className={`${classMaterialPriceFiled} text-center`}
                                    placeholder={t('description.material_price_in_order_enter')}
                                />
                            </td>

                           
                            <td className='text-center'>{totalMaterialPrice}</td>
                            <td className="flex items-center justify-center w-full py-3 px-6 ">
                            <button
                                    type="button"
                                    onClick={handleSubmit}
                                    className="text-sm bg-green-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">
                                    {t('description.add')}
                                </button>
                            </td>

                        </tr>
                    </thead>
                </table>
            </div>
        </div>

    )


    return dataSection
}