import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function ClientForm() {
    const { t } = useTranslation();
    const navigate = useNavigate()

    const [inputName, setInputName] = useState('')
    const [inputInn, setInputInn] = useState('')
    const [inputAddress, setInputAddress] = useState('')
    const [inputSite, setInputSite] = useState('')
    const [inputEmail, setInputEmail] = useState('')
    const [searchFilelds, setSearchFilelds] = useState('')
    const [innFromTable, setInnFromTable] = useState(true)

    const [files, setFiles] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();

        formData.append("client[name]", inputName);
        formData.append("client[inn]", inputInn);
        formData.append("client[address]", inputAddress);
        formData.append("client[site]", inputSite);
        formData.append("client[email]", inputEmail);

        for (const file of files) {
            formData.append("client[files][]", file);
        }

        try {
            await axios.post("/api/v1/clients/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            navigate(`/clients/${location}`);
        } catch (error) {
            console.log(error.response);
            // обработать ошибки и отобразить их пользователю
        }
        navigate(`/clients`);
    };

    useEffect(() => {
        const apiEndpoint = `/api/v1/client/find_for_create?input_inn=${inputInn}`
    
        fetch(apiEndpoint)
          .then(response => response.json())
          .then(data => {            
            setInnFromTable(data["inn_valid"])
          }
          );
      }, [searchFilelds])

      let classInnFiled = "w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#f44336] focus:shadow-md"
      let classInnError = "text-red-600"
    
      if (innFromTable)  {
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
    };

    const handleInnChange = (event) => {
        setInputInn(event.target.value);
        setSearchFilelds(event.target.value);
    };

    const handleAddressChange = (event) => {
        setInputAddress(event.target.value);
    };

    const handleEmailChange = (event) => {
        setInputEmail(event.target.value);
    };

    const handleSiteChange = (event) => {
        setInputSite(event.target.value);
    };

    let classNameButton = "hover:shadow-form rounded-md bg-blue-600 hover:bg-blue-800 py-3 px-8 text-base font-semibold text-white outline-none  disabled:opacity-75"

    let disableButton = false

    if (inputInn == '' || innFromTable == false || inputName == '') {
        disableButton = true
    }

    return (
        <div>
            <div className="font-bold text-xl flex items-center justify-center py-8">
                {t('description.client_new')}
            </div>

            <form onSubmit={handleSubmit}>
                <div className="flex items-center justify-center p-2">
                    <div className="mx-auto w-full max-w-[550px]">

                        <div className="mb-5">
                            <div className="mb-3 block text-base font-medium text-[#07074D]">
                                <label htmlFor="name" style={{ paddingBottom: '100px' }}>{t('description.client_name')} </label>
                                <input
                                    id={t('description.client_name')}
                                    type={t('description.client_name')}
                                    name={t('description.client_name')}
                                    value={inputName}
                                    onChange={handleNameChange}
                                    placeholder={t('description.enter_client_name')}
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />
                            </div>
                        </div>
                        <div className="mb-5">
                            <div className="mb-3 block text-base font-medium text-[#07074D]">

                                <label htmlFor={t('description.client_inn')} >{t('description.client_inn')}</label>
                                <input
                                    id={t('description.client_inn')}
                                    type={t('description.client_inn')}
                                    name={t('description.client_inn')}
                                    value={inputInn}
                                    onChange={handleInnChange}
                                    className={classInnFiled}
                                    placeholder={t('description.enter_client_inn')}                                    
                                />
                                <div className={classInnError}>{t('description.error_inn')}</div>
                            </div>
                        </div>

                        <div className="mb-5">
                            <div className="mb-3 block text-base font-medium text-[#07074D]">

                                <label htmlFor={t('description.client_address')} >{t('description.client_address')}</label>
                                <input
                                    id={t('description.client_address')}
                                    type={t('description.client_address')}
                                    name={t('description.client_address')}
                                    value={inputAddress}
                                    onChange={handleAddressChange}
                                    placeholder={t('description.enter_client_address')}
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />
                            </div>
                        </div>

                        <div className="mb-5">
                            <div className="mb-3 block text-base font-medium text-[#07074D]">

                                <label htmlFor={t('description.client_email')} >{t('description.client_email')}</label>
                                <input
                                    id={t('description.client_email')}
                                    type={t('description.client_email')}
                                    name={t('description.client_email')}
                                    value={inputEmail}
                                    onChange={handleEmailChange}
                                    placeholder={t('description.enter_client_email')}
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />
                            </div>
                        </div>

                        <div className="mb-5">
                            <div className="mb-3 block text-base font-medium text-[#07074D]">

                                <label htmlFor={t('description.client_site')} >{t('description.client_site')}</label>
                                <input
                                    id={t('description.client_site')}
                                    type={t('description.client_site')}
                                    name={t('description.client_site')}
                                    value={inputSite}
                                    onChange={handleSiteChange}
                                    placeholder={t('description.enter_client_site')}
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
                            {t('description.client_create')}
                        </button>

                    </div>
                </div>



            </form>
        </div >
    )
}
