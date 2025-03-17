import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";

export default function SupplierFormEdit() {
    const { t } = useTranslation();
    const navigate = useNavigate()

    const [inputName, setInputName] = useState('')
    const [inputInn, setInputInn] = useState('')
    const [inputAddress, setInputAddress] = useState('')
    const [inputSite, setInputSite] = useState('')
    const [inputEmail, setInputEmail] = useState('')

    const [editName, setEditName] = useState('')
    const [editInn, setEditInn] = useState('')
    const [editAddress, setEditAddress] = useState('')
    const [editEmail, setEditEmail] = useState('')
    const [editSite, setEditSite] = useState('')

    const [countEditName, setCountEditName] = useState(0)
    const [countEditInn, setCountEditInn] = useState(0)
    const [countEditAddress, setCountEditAddress] = useState(0)
    const [countEditEmail, setCountEditEmail] = useState(0)
    const [countEditSite, setCountEditSite] = useState(0)

    const [searchFilelds, setSearchFilelds] = useState('')
    const [innFromTable, setInnFromTable] = useState(true)

    const [files, setFiles] = useState([]);
    //const [filesOld, setFilesOld] = useState([]);

    const [csrfToken, setCsrfToken] = useState(null);

  useEffect(() => {
    // Ищем мета-тег с CSRF Token и сохраняем его значение в состоянии
    const csrfMetaTag = document.querySelector('meta[name="csrf-token"]');
    if (csrfMetaTag) {
      setCsrfToken(csrfMetaTag.content);
    }
  }, []);

    let location = useLocation().pathname.split('suppliers/')[1];
    location = location.split('/edit')[0];

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();

        formData.append("supplier[name]", finalValue(inputName, countEditName, editName));
        formData.append("supplier[inn]", finalValue(inputInn, countEditInn, editInn));
        formData.append("supplier[address]", finalValue(inputAddress, countEditAddress, editAddress));
        formData.append("supplier[site]", finalValue(inputSite, countEditSite, editSite));
        formData.append("supplier[email]", finalValue(inputEmail, countEditEmail, editEmail));

        for (const file of files) {
            formData.append("supplier[files][]", file);
        }

        try {
            await axios.patch(`/api/v1/suppliers/${location}`, formData, {
                headers: {
                    'X-CSRF-TOKEN': csrfToken
                }
            });
            navigate(`/suppliers/${location}`);
        } catch (error) {
            console.log(error.response);
            // обработать ошибки и отобразить их пользователю
        }
        navigate(`/suppliers/${location}`);
    };

    useEffect(() => {
        //Hit the server and get the places

        const apiEndpoint = `/api/v1/supplier/find_for_edit?id=${location}&input_inn=${inputInn}&count_edit_inn=${countEditInn}`

        fetch(apiEndpoint)
            .then(response => response.json())
            .then(data => {
                setInnFromTable(data["inn_valid"])
                setEditName(data["supplier_edit"].name)
                setEditInn(data["supplier_edit"].inn)
                setEditAddress(data["supplier_edit"].patronymic)
                setEditEmail(data["supplier_edit"].email)
                setEditSite(data["supplier_edit"].site)
                //setFilesOld(data["files"])
            }
            );
    }, [searchFilelds])

    let classInnFiled = "w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#f44336] focus:shadow-md"
    let classInnError = "text-red-600"

    if (innFromTable) {
        classInnFiled = "w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        classInnError = "invisible"
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

    const handleNameChange = (event) => {
        setInputName(event.target.value);
        setCountEditName(countEditName + 1)        
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

    const handleInnChange = (event) => {
        setInputInn(event.target.value);
        setSearchFilelds(event.target.value);
        setCountEditInn(countEditInn + 1)
    };

    const handleAddressChange = (event) => {
        setInputAddress(event.target.value);
        setCountEditAddress(countEditAddress + 1)
    };

    const handleEmailChange = (event) => {
        setInputEmail(event.target.value);
        setCountEditEmail(countEditEmail + 1)
    };

    const handleSiteChange = (event) => {
        setInputSite(event.target.value);
        setCountEditSite(countEditSite + 1)
    };

    let classNameButton = "hover:shadow-form rounded-md bg-blue-600 hover:bg-blue-800 py-3 px-8 text-base font-semibold text-white outline-none  disabled:opacity-75"

    let disableButton = false

    if (finalValue(inputInn, countEditInn, editInn) == '' || innFromTable == false || finalValue(inputName, countEditName, editName) == '') {
        disableButton = true
    }

    return (
        <div>
            <div className="font-bold text-xl flex items-center justify-center py-8">
                {t('description.supplier_new')}
            </div>

            <form onSubmit={handleSubmit}>
                <div className="flex items-center justify-center p-2">
                    <div className="mx-auto w-full max-w-[550px]">

                        <div className="mb-5">
                            <div className="mb-3 block text-base font-medium text-[#07074D]">
                                <label htmlFor="name" style={{ paddingBottom: '100px' }}>{t('description.supplier_name')} </label>
                                <input
                                    id={t('description.supplier_name')}
                                    type={t('description.supplier_name')}
                                    name={t('description.supplier_name')}
                                    value={finalValue(inputName, countEditName, editName)}
                                    onChange={handleNameChange}
                                    placeholder={t('description.enter_supplier_name')}
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />
                            </div>
                        </div>
                        <div className="mb-5">
                            <div className="mb-3 block text-base font-medium text-[#07074D]">

                                <label htmlFor={t('description.supplier_inn')} >{t('description.supplier_inn')}</label>
                                <input
                                    id={t('description.supplier_inn')}
                                    type={t('description.supplier_inn')}
                                    name={t('description.supplier_inn')}
                                    value={finalValue(inputInn, countEditInn, editInn)}
                                    onChange={handleInnChange}
                                    className={classInnFiled}
                                    placeholder={t('description.enter_supplier_inn')}
                                />
                                <div className={classInnError}>{t('description.error_inn')}</div>
                            </div>
                        </div>

                        <div className="mb-5">
                            <div className="mb-3 block text-base font-medium text-[#07074D]">

                                <label htmlFor={t('description.supplier_address')} >{t('description.supplier_address')}</label>
                                <input
                                    id={t('description.supplier_address')}
                                    type={t('description.supplier_address')}
                                    name={t('description.supplier_address')}
                                    value={finalValue(inputAddress, countEditAddress, editAddress)}
                                    onChange={handleAddressChange}
                                    placeholder={t('description.enter_supplier_address')}
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />
                            </div>
                        </div>

                        <div className="mb-5">
                            <div className="mb-3 block text-base font-medium text-[#07074D]">

                                <label htmlFor={t('description.supplier_email')} >{t('description.supplier_email')}</label>
                                <input
                                    id={t('description.supplier_email')}
                                    type={t('description.supplier_email')}
                                    name={t('description.supplier_email')}
                                    value={finalValue(inputEmail, countEditEmail, editEmail)}
                                    onChange={handleEmailChange}
                                    placeholder={t('description.enter_supplier_email')}
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />
                            </div>
                        </div>

                        <div className="mb-5">
                            <div className="mb-3 block text-base font-medium text-[#07074D]">

                                <label htmlFor={t('description.supplier_site')} >{t('description.supplier_site')}</label>
                                <input
                                    id={t('description.supplier_site')}
                                    type={t('description.supplier_site')}
                                    name={t('description.supplier_site')}
                                    value={finalValue(inputSite, countEditSite, editSite)}
                                    onChange={handleSiteChange}
                                    placeholder={t('description.enter_supplier_site')}
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
                            className={classNameButton}
                            disabled={disableButton}>
                            {t('description.supplier_create')}
                        </button>

                    </div>
                </div>



            </form>
        </div >
    )
}
