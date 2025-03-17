import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function Form() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [files, setFiles] = useState([]);
    const [inputName, setInputName] = useState('');
    const [inputSupplierName, setInputSupplierName] = useState('');
    const [inputSupplierId, setInputSupplierId] = useState('');
    const [searchFilelds, setSearchFilelds] = useState('');
    const [supplierNameFromTable, setSupplierNameFromTable] = useState(false);

    const handleFilesChange = (event) => {
        const newFiles = Array.from(event.target.files);
        setFiles([...files, ...newFiles]);
    };

    const handleFileRemove = (index) => {
        const newFiles = [...files];
        newFiles.splice(index, 1);
        setFiles(newFiles);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();

        formData.append("material_order[name]", inputName);
        formData.append("material_order[supplier_id]", inputSupplierId);

        for (const file of files) {
            formData.append("material_order[files][]", file);
        }

        try {
            await axios.post("/api/v1/material_orders/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            navigate(`/material_orders/${location}`);
        } catch (error) {
            console.log(error.response);
            // обработать ошибки и отобразить их пользователю
        }
        navigate(`/material_orders`);
    };

    const handleNameChange = (event) => {
        setInputName(event.target.value);
    };

    const handleSupplierNameChange = (event) => {
        setInputSupplierName(event.target.value);
        setSearchFilelds(event.target.value);
    }

    let classSupplierNameFiled = "w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#f44336] focus:shadow-md"
    let classSupplierNameError = "text-red-600"
    let text_error = ''

    if (inputSupplierName == '') {
      text_error = t('description.no_empty_field')
      
    } else if (supplierNameFromTable) {
        text_error = t('description.error_supplier_name')
    } else {
        classSupplierNameError = "invisible"
        classSupplierNameFiled = "w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
    }

    useEffect(() => {
        const apiEndpoint = `/api/v1/material_order/find_for_create?input_supplier_name=${inputSupplierName}`

        fetch(apiEndpoint)
            .then(response => response.json())
            .then(data => {
                setSupplierNameFromTable(data["supplier_name_valid"])
                setInputSupplierId(data["supplier_id"])
            }
            );
    }, [searchFilelds])

    let disableButton = false


    if (inputName == '' || supplierNameFromTable == true) {
        disableButton = true
    }

    let classDescriptionButton = "hover:shadow-form rounded-md bg-blue-600 hover:bg-blue-800 py-3 px-8 text-base font-semibold text-white outline-none  disabled:opacity-75"
    let classNameFiled = "w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"

    return (
        <div>
            <div className="font-bold text-xl flex items-center justify-center py-8">
                {t('description.contract_new')}
            </div>

            <form onSubmit={handleSubmit}>
                <div className="flex items-center justify-center p-2">
                    <div className="mx-auto w-full max-w-[550px]">

                        <div className="mb-5">
                            <div className="mb-3 block text-base font-medium text-[#07074D]">
                                <label htmlFor={t('description.contract_name')} >{t('description.contract_name')}</label>
                                <input
                                    id={t('description.contract_name')}
                                    type={t('description.contract_name')}
                                    name={t('description.contract_name')}
                                    value={inputName}
                                    onChange={handleNameChange}
                                    className={classNameFiled}
                                    placeholder={t('description.enter_contract_name')}
                                />                                
                            </div>
                        </div>

                        <div className="mb-5">
                            <div className="mb-3 block text-base font-medium text-[#07074D]">
                                <label htmlFor={t('description.supplier_name')} >{t('description.supplier_name')}</label>
                                <input
                                    id={t('description.supplier_name')}
                                    type={t('description.supplier_name')}
                                    name={t('description.supplier_name')}
                                    value={inputSupplierName}
                                    onChange={handleSupplierNameChange}
                                    className={classSupplierNameFiled}
                                    placeholder={t('description.enter_supplier_name')}
                                />
                                <div className={classSupplierNameError}>{text_error}</div>
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
                            {t('description.contract_create')}
                        </button>

                    </div>
                </div>



            </form>
        </div >
    )
}