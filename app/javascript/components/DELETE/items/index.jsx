import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import ItemsTable from "./items_table"
import Pagination from "../pagination";

export default function ItemsIndex() {
    const [p0D, setP0D] = useState('')
    const [p1D, setP1D] = useState('')
    const [p2D, setP2D] = useState('')
    const [p3D, setP3D] = useState('')
    const [loadedObjects, setLoadedObjects] = useState([])
    const [loading, setloading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [objectsPerPage] = useState(10)
    const [searchFileld, setSearchFileld] = useState('')

    const { t } = useTranslation();
    const ROOT_ADDRESS = 'items'
    const P0 = 'name'
    const P1 = 'weight'
    const P2 = 'description'
    const P3 = 'average_price'


    useEffect(() => {
        const apiEndpoint = `/api/v1/${ROOT_ADDRESS}?${P0}=${p0D}&${P1}=${p1D}&${P2}=${p2D}&${P3}=${p3D}`
        fetch(apiEndpoint)
            .then(response => response.json())
            .then(data => {
                setLoadedObjects(data[`${ROOT_ADDRESS}`])
                let t = data[`${ROOT_ADDRESS}`]
                setloading(false)
            }
            );
    }, [searchFileld, loading])

    const onChangeName = (e) => {
        setP0D(e.target.value.replace());
        setSearchFileld(e.target.value.replace());
    }

    const onChangeWeight = (e) => {
        setP1D(e.target.value.replace());
        setSearchFileld(e.target.value.replace());
    }

    const onChangeDescription = (e) => {
        setP2D(e.target.value.trim());
        setSearchFileld(e.target.value.trim());
    }

    const onChangeAveragePrice = (e) => {
        setP3D(e.target.value.replace());
        setSearchFileld(e.target.value.replace());
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
                            <NavLink to="/items/new">{t('description.item_new')}</NavLink>
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
                {t('description.items')}
            </div>
            <div className="w-full px-2">
                <table className="w-full h-full" style={{ tableLayout: 'fixed' }}>
                    <thead>
                        <tr className="bg-gray-150 border-b">
                            <th className="p-2 border-r text-sm font-bold text-white bg-blue-600 w-1/5">
                                <div className="flex items-center justify-center">
                                    {t('description.item_name')}
                                </div>
                            </th>
                            <th className="p-2 border-r text-sm font-bold text-white bg-blue-600 w-1/5">
                                <div className="flex items-center justify-center">
                                    {t('description.item_weight')}
                                </div>
                            </th>
                            <th className="p-2 border-r text-sm font-bold text-white bg-blue-600 w-1/5">
                                <div className="flex items-center justify-center">
                                    {t('description.item_description')}
                                </div>
                            </th>
                            <th className="p-2 border-r text-sm font-bold text-white bg-blue-600 w-1/5">
                                <div className="flex items-center justify-center">
                                    {t('description.average_price')}
                                </div>
                            </th>
                            <th className="p-2 border-r text-sm font-bold text-white bg-blue-600 w-1/5">
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
                                    placeholder={t('description.item_name_enter')}
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
                            <td className="p-2 border-r">
                               
                            </td>
                        </tr>
                    </thead>
                </table>
            </div>

            <ItemsTable loadedObjects={currentObjects} loading={loading} />
            <Pagination objectsPerPage={objectsPerPage} totalObjects={loadedObjects.length} paginate={paginate} />

        </div >
    )
}
