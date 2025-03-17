import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import Pagination from "../pagination";
import MaterialsOrdersTable from "./materials_orders_table"


export default function materialIndex() {
    const { t } = useTranslation();

    const ROOT_ADDRESS = 'material_orders'

    const [loadedObjects, setLoadedObjects] = useState([])
    const [loading, setloading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [objectsPerPage] = useState(10)
    const [searchFileld, setSearchFileld] = useState('')

    const [findSuplierName, setFindSuplierName] = useState('')
    const [findContractName, setFindContractName] = useState('')

    useEffect(() => {
        const apiEndpoint = `/api/v1/${ROOT_ADDRESS}?supplier_name=${findSuplierName}&contract_name=${findContractName}`
        fetch(apiEndpoint)
            .then(response => response.json())
            .then(data => {
                setLoadedObjects(data["material_orders"])
                setloading(false)
            }
            );
    }, [searchFileld])

    const onChangeSuplierName = (e) => {
        setFindSuplierName(e.target.value.replace());
        setSearchFileld(e.target.value.replace());
    }

    const onChangeContractName = (e) => {
        console.log(`name = ${e.target.value.replace()}`)
        setFindContractName(e.target.value.replace());
        setSearchFileld(e.target.value.replace());
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
                            <NavLink to="/material_orders/new">{t('description.material_order_create')}</NavLink>
                        </div>
                        <div className=" h-8 w-px bg-gray-300"></div>
                    </div>
                    <div className="flex h-full  items-center hover:bg-black hover:bg-opacity-50">
                        <div className="mx-4 text-white">
                            <NavLink to="/supply_of_products"> {t('description.supply_of_products')} </NavLink>
                        </div>
                        <div className=" h-8 w-px bg-gray-300"></div>
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

            <div className="font-bold text-xl flex items-center justify-center py-4">
                {t('description.material_orders')}
            </div>
            <div className="w-full px-2">
                <table className="w-full h-full" style={{ tableLayout: 'fixed' }}>
                    <thead>
                        <tr className="bg-gray-150 border-b">
                            <th className="p-2 border-r text-sm font-bold text-white bg-blue-600 w-1/4">
                                <div className="flex items-center justify-center">
                                    {t('description.supplier_name')}
                                </div>
                            </th>
                            <th className="p-2 border-r text-sm font-bold text-white bg-blue-600 w-1/4">
                                <div className="flex items-center justify-center">
                                    {t('description.contract_name')}
                                </div>
                            </th>
                            <th className="p-2 border-r text-sm font-bold text-white bg-blue-600 w-1/4">
                                <div className="flex items-center justify-center">
                                    {t('description.material_order_created_at')}
                                </div>
                            </th>
                            <th className="p-2 border-r text-sm font-bold text-white bg-blue-600 w-1/4">
                                <div className="flex items-center justify-center">
                                    {t('description.material_total_price')}
                                </div>
                            </th>  
                            <th className="p-2 border-r text-sm font-bold text-white bg-blue-600 w-1/4">
                                <div className="flex items-center justify-center">
                                    {t('description.action')}
                                </div>
                            </th>                           
                        </tr>
                        <tr className="p-2 border-r">
                          <td className="p-2 border-r">

                            </td>
                            <td className="p-2 border-r">
                                <input
                                    type="text"
                                    className="border p-1 flex items-center justify-center w-full"
                                    placeholder={t('description.enter_contract_name')}
                                    onChange={onChangeContractName}></input>
                            </td> 
                        </tr>
                    </thead>
                </table>
            </div>
            < MaterialsOrdersTable loadedObjects={currentObjects} loading={loading} />
            < Pagination objectsPerPage={objectsPerPage} totalObjects={loadedObjects.length} paginate={paginate} />
        </div >
    )
}
