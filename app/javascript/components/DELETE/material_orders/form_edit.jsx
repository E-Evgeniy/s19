import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";

export default function FormEdit() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [files, setFiles] = useState([]);

    const [inputName, setInputName] = useState('');
    const [inputSupplierName, setInputSupplierName] = useState('');
    const [inputSupplierId, setInputSupplierId] = useState('');

    const [editName, setEditName] = useState('')
    const [editSupplierName, setEditSupplierName] = useState('');

    const [countEditName, setCountEditName] = useState(0)
    const [countEditSupplierName, setCountEditSupplierName] = useState(0)


    const [searchFilelds, setSearchFilelds] = useState('');
    const [supplierNameFromTable, setSupplierNameFromTable] = useState(false);

    const [csrfToken, setCsrfToken] = useState(null);

    useEffect(() => {
        // Ищем мета-тег с CSRF Token и сохраняем его значение в состоянии
        const csrfMetaTag = document.querySelector('meta[name="csrf-token"]');
        if (csrfMetaTag) {
          setCsrfToken(csrfMetaTag.content);
        }
      }, []);



    const ROOT_ADDRESS = 'material_orders'

    let location = useLocation().pathname.split(`${ROOT_ADDRESS}/`)[1];
    location = location.split('/edit')[0];

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();

        formData.append("material_order[name]", finalValue(inputName, countEditName, editName));
        formData.append("material_order[supplier_id]", inputSupplierId);

        for (const file of files) {
            formData.append("material_order[files][]", file);
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
        setCountEditName(countEditName + 1)
    };

    const handleSupplierNameChange = (event) => {
        setInputSupplierName(event.target.value);
        setCountEditSupplierName(countEditSupplierName + 1)
        setSearchFilelds(event.target.value);
    }

    let classSupplierNameFiled = "w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#f44336] focus:shadow-md"
    let classSupplierNameError = "text-red-600"
    let text_error = ''

    if (inputSupplierName == '' && countEditSupplierName > 0) {
      text_error = t('description.no_empty_field')
      
    } else if (supplierNameFromTable) {
        text_error = t('description.error_supplier_name')
    } else if  (countEditSupplierName == 0) {
        classSupplierNameError = "invisible"
        classSupplierNameFiled = "w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
    }

    useEffect(() => {
        const apiEndpoint = `/api/v1/${ROOT_ADDRESS.slice(0, -1)}/find_for_edit?id=${location}&input_supplier_name=${inputSupplierName}&count_edit_name=${countEditSupplierName}`

        fetch(apiEndpoint)
            .then(response => response.json())
            .then(data => {
                setSupplierNameFromTable(data["supplier_name_valid"])
                setEditSupplierName(data["supplier_name"])
                setEditName(data["order_name"])
                setInputSupplierId(data["supplier_id"])
            }
            );
    }, [searchFilelds])

    let disableButton = false


    if ((inputName == '' || supplierNameFromTable == true) && (countEditSupplierName > 0)) {
        disableButton = true
    }

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

    let classDescriptionButton = "hover:shadow-form rounded-md bg-blue-600 hover:bg-blue-800 py-3 px-8 text-base font-semibold text-white outline-none  disabled:opacity-75"
    let classNameFiled = "w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"

    return (
        <div>
            <div className="font-bold text-xl flex items-center justify-center py-8">
                {t('description.material_order_edit')}
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
                                    value={finalValue(inputName, countEditName, editName)}
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
                                    value={finalValue(inputSupplierName, countEditSupplierName, editSupplierName)}
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
                            {t('description.material_order_update')}
                        </button>

                    </div>
                </div>



            </form>
        </div >
    )
}