import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import ClientsTable from "./clients_table"
import Pagination from "../pagination";



export default function Clients() {
    const { t } = useTranslation();
    const [searchFileld, setSearchFileld] = useState('')
    const [findName, setFindName] = useState('')
    const [findInn, setFindInn] = useState('')
    const [findAddress, setFindAddress] = useState('')
    const [findSite, setFindSite] = useState('')
    const [findEmail, setFindEmail] = useState('')
    const [loadedObjects, setLoadedObjects] = useState([])
    const [loading, setloading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [objectsPerPage] = useState(10)

    useEffect(() => {
        //Get clients
        const apiEndpoint = `/api/v1/clients?name=${findName}&inn=${findInn}&address=${findAddress}&site=${findSite}&email=${findEmail}`
        fetch(apiEndpoint)
            .then(response => response.json())
            .then(data => {
                setLoadedObjects(data["clients"])
                setloading(false)
            }
            );
    }, [searchFileld, loading])

    const onChangeName = (e) => {
        setFindName(e.target.value.replace());
        setSearchFileld(e.target.value.replace());
    }

    const onChangeInn = (e) => {
        setFindInn(e.target.value.trim());
        setSearchFileld(e.target.value.trim());
    }

    const onChangeAddress = (e) => {
        setFindAddress(e.target.value.trim());
        setSearchFileld(e.target.value.trim());
    }

    const onChangeSite = (e) => {
        setFindSite(e.target.value.trim());
        setSearchFileld(e.target.value.trim());
    }

    const onChangeEmail = (e) => {
        setFindEmail(e.target.value.trim());
        setSearchFileld(e.target.value.trim());
    }

    const lastObjectsIndex = currentPage * objectsPerPage
    const firstObjectsIndex = lastObjectsIndex - objectsPerPage
    const currentObjects = loadedObjects.slice(firstObjectsIndex, lastObjectsIndex)
    const paginate = pageNumber => setCurrentPage(pageNumber)

    const class_hat_div_element_active = "flex h-full items-center  hover:bg-black hover:bg-opacity-50"
    const class_hat_div_element = "h-8 w-px bg-gray-300"
    const class_hat_text = "mx-4 text-white"

    return (
        <div>
            <div className="h-16 w-full bg-black bg-opacity-50">
                <div className="w-full h-full flex justify-center items-center">
                    <div
                        className="flex h-full items-center  hover:bg-black hover:bg-opacity-50">
                        <div className=" h-8 w-px bg-gray-300"></div>
                        <div className="mx-4 text-white">
                            <NavLink to="/clients/new">{t('description.client_new')}</NavLink>
                        </div>
                        <div className=" h-8 w-px bg-gray-300"></div>
                    </div>
                    <div className={class_hat_div_element_active}>
                        <div className={class_hat_text}>
                            <NavLink to="/supply_of_products">
                                {t('description.supply_of_products')}
                            </NavLink>
                        </div>
                        <div className={class_hat_div_element}></div>
                    </div>                    
                    <div className={class_hat_div_element_active}>
                        <div className={class_hat_text}>
                            <NavLink to="/purchases_materials">
                                {t('description.purchases_materials')}
                            </NavLink>
                        </div>
                        <div className={class_hat_div_element}></div>
                    </div>
                    <div className={class_hat_div_element_active}>
                        <div className={class_hat_text}>
                            <NavLink to="/production">
                                {t('description.production')}
                            </NavLink>
                        </div>
                        <div className={class_hat_div_element}></div>
                    </div>
                    <div className="flex h-full items-center  hover:bg-black hover:bg-opacity-50">
                        <div className="mx-4 text-white">
                            <NavLink to="/"> {t('description.main_page')} </NavLink>
                        </div>
                        <div className=" h-8 w-px bg-gray-300"></div>
                    </div>
                </div>
            </div>

            <div className="font-bold text-xl flex items-center justify-center py-6">
                {t('description.clients')}</div>

            <div className="w-full px-2">
                <table className="w-full h-full" style={{ tableLayout: 'fixed' }}>
                    <thead>
                        <tr className="bg-gray-150 border-b">
                            <th className="p-2 border-r text-sm font-bold text-white bg-blue-600 w-1/6">
                                <div className="flex items-center justify-center">
                                    {t('description.client_name')}
                                </div>
                            </th>
                            <th className="p-2 border-r text-sm font-bold text-white bg-blue-600 w-1/6">
                                <div className="flex items-center justify-center">
                                    {t('description.client_inn')}
                                </div>
                            </th>
                            <th className="p-2 border-r text-sm font-bold text-white bg-blue-600 w-1/6">
                                <div className="flex items-center justify-center">
                                    {t('description.client_address')}
                                </div>
                            </th>
                            <th className="p-2 border-r text-sm font-bold text-white bg-blue-600 w-1/6">
                                <div className="flex items-center justify-center">
                                    {t('description.client_email')}
                                </div>
                            </th>
                            <th className="p-2 border-r text-sm font-bold text-white bg-blue-600 w-1/6">
                                <div className="flex items-center justify-center">
                                    {t('description.client_site')}
                                </div>
                            </th>
                            <th className="p-2 text-sm font-bold text-white bg-blue-600 w-1/6" style={{ textAlign: 'right' }}>
                                <div className="flex items-center justify-center">
                                    {t('description.action')}
                                </div>
                            </th>
                        </tr>
                        <tr className="p-2 border-r w-1/6">
                            <td className="p-2 border-r w-1/6">
                                <input 
                                   type="text"
                                   className="border p-1 w-5/6"
                                   placeholder={t('description.client_name')}
                                   onChange={onChangeName}></input>
                            </td>
                            <td className="p-2 border-r w-1/6">
                                <input 
                                   type="text"
                                   className="border p-1 w-5/6"
                                   placeholder={t('description.client_inn')}
                                   onChange={onChangeInn}></input>
                            </td>
                            <td className="p-2 border-r w-1/6">
                            <input 
                                   type="text"
                                   className="border p-1 w-5/6"
                                   placeholder={t('description.client_address')}
                                   onChange={onChangeAddress}></input>
                            </td>
                            <td className="p-2 border-r w-1/6">
                            <input 
                                   type="text"
                                   className="border p-1 w-5/6"
                                   placeholder={t('description.client_email')}
                                   onChange={onChangeEmail}></input>
                            </td>
                            <td className="p-2 border-r w-1/6">
                            <input 
                                   type="text"
                                   className="border p-1 w-5/6"
                                   placeholder={t('description.client_site')}
                                   onChange={onChangeSite}></input>
                            </td>
                            <td className="p-2 w-1/6">

                            </td>
                        </tr>
                        
                    </thead>
                    <tbody>
                                          
                    </tbody>
                </table>
            </div>

            <ClientsTable loadedObjects={currentObjects} loading={loading}/>
            < Pagination objectsPerPage={objectsPerPage} totalObjects={loadedObjects.length} paginate={paginate} />
        </div >
    )
}

