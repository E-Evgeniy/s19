import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import Pagination from "../pagination";
import PostsTable from "./posts_table"

export default function PostsIndex() {

    const { t } = useTranslation();

    const ROOT_ADDRESS = 'posts'

    const [loadedObjects, setLoadedObjects] = useState([])
    const [loading, setloading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [objectsPerPage] = useState(10)
    const [searchFileld, setSearchFileld] = useState('')

    //const [findSuplierName, setFindSuplierName] = useState('')
    //const [findContractName, setFindContractName] = useState('')

    useEffect(() => {
        const apiEndpoint = `/api/v1/${ROOT_ADDRESS}`
        fetch(apiEndpoint)
            .then(response => response.json())
            .then(data => {
                setLoadedObjects(data["posts"])
                setloading(false)
            }
            );
    }, [searchFileld])

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
                            <NavLink to="/posts/new">{t('description.post_new')}</NavLink>
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
                {t('description.posts')}
            </div>
            <div className="w-full px-2">
                <table className="w-full h-full" style={{ tableLayout: 'fixed' }}>
                    <thead>
                        <tr className="bg-gray-150 border-b">
                            <th className="p-2 border-r text-sm font-bold text-white bg-blue-600 w-1/3">
                                <div className="flex items-center justify-center">
                                    {t('description.post')}
                                </div>
                            </th>
                            <th className="p-2 border-r text-sm font-bold text-white bg-blue-600 w-1/3">
                                <div className="flex items-center justify-center">
                                    {t('description.description')}
                                </div>
                            </th>                           
                            <th className="p-2 border-r text-sm font-bold text-white bg-blue-600 w-1/3">
                                <div className="flex items-center justify-center">
                                    {t('description.action')}
                                </div>
                            </th>                           
                        </tr>
                        <tr className="p-2 border-r">
                          <td className="p-2 border-r">

                            </td>
                        </tr>
                    </thead>
                </table>
            </div>
            < PostsTable loadedObjects={currentObjects} loading={loading} />
            < Pagination objectsPerPage={objectsPerPage} totalObjects={loadedObjects.length} paginate={paginate} />
        </div >
    )
}
