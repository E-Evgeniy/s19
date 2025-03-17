import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import MaterialsTable from "./materials_table"
import Pagination from "../pagination";



export default function Materials() {
    const { t } = useTranslation();
    const [searchFileld, setSearchFileld] = useState('')
    const [findName, setFindName] = useState('')
    const [findAveragePrice, setFindAveragePrice] = useState('')
    const [findDescription, setFindDescription] = useState('')
    const [loadedObjects, setLoadedObjects] = useState([])
    const [loading, setloading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [objectsPerPage] = useState(10)

    useEffect(() => {
        //Get materials
        const apiEndpoint = `/api/v1/materials?name=${findName}&average_price=${findAveragePrice}&description=${findDescription}`
        fetch(apiEndpoint)
            .then(response => response.json())
            .then(data => {
                setLoadedObjects(data["materials"])
                setloading(false)
            }
            );
    }, [searchFileld, loading])

    const onChangeName = (e) => {
        setFindName(e.target.value.replace());
        setSearchFileld(e.target.value.replace());
    }

    const onChangeAveragePrice = (e) => {
        setFindAveragePrice(e.target.value.replace());
        setSearchFileld(e.target.value.replace());
    }

    const onChangeDescription = (e) => {
        setFindDescription(e.target.value.trim());
        setSearchFileld(e.target.value.trim());
    }

    const lastObjectsIndex = currentPage * objectsPerPage
    const firstObjectsIndex = lastObjectsIndex - objectsPerPage
    const currentObjects = loadedObjects.slice(firstObjectsIndex, lastObjectsIndex)
    const paginate = pageNumber => setCurrentPage(pageNumber)

    return (
        <div>
            <div className="h-16 w-full bg-black bg-opacity-50">
                <div className="w-full h-full flex justify-center items-center">
                    <div
                        className="flex h-full items-center  hover:bg-black hover:bg-opacity-50">
                        <div className=" h-8 w-px bg-gray-300"></div>
                        <div className="mx-4 text-white">
                            <NavLink to="/materials/new">{t('description.material_create')}</NavLink>
                        </div>
                        <div className=" h-8 w-px bg-gray-300"></div>
                    </div>
                    <div className="flex h-full  items-center hover:bg-black hover:bg-opacity-50">
                        <div className="mx-4 text-white">
                            <NavLink to="/production"> {t('description.production')} </NavLink>
                        </div>
                        <div className=" h-8 w-px bg-gray-300"></div>
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
                {t('description.materials')}</div>

            <div className="w-full px-2">
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
                                    {t('description.average_price_kg')}
                                </div>
                            </th>
                            <th className="p-2 border-r text-sm font-bold text-white bg-blue-600 w-1/4">
                                <div className="flex items-center justify-center">
                                    {t('description.material_description')}
                                </div>
                            </th>
                            <th className="p-2 text-sm font-bold text-white bg-blue-600 w-1/4" style={{ textAlign: 'right' }}>
                                <div className="flex items-center justify-center">
                                    {t('description.action')}
                                </div>
                            </th>
                        </tr>
                        <tr className="p-2 border-r">
                            <td className="p-2 border-r">
                                <input
                                    type="text"
                                    className="border p-1 flex items-center justify-center w-full"
                                    placeholder={t('description.material_name')}
                                    onChange={onChangeName}></input>
                            </td>
                            <td className="p-2 border-r">

                            </td>
                            <td className="p-2 border-r">
                                <input
                                    type="text"
                                    className="border p-1 flex items-center justify-center w-full"
                                    placeholder={t('description.material_description')}
                                    onChange={onChangeDescription}></input>
                            </td>
                        </tr>
                    </thead>
                </table>
            </div>

            <MaterialsTable loadedObjects={currentObjects} loading={loading} />
            < Pagination objectsPerPage={objectsPerPage} totalObjects={loadedObjects.length} paginate={paginate} />
        </div >
    )
}
