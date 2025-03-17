import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import Pagination from "../pagination";
import TechProcessesTable from "./tech_processes_table"

export default function TechProcessesIndex() {

    const { t } = useTranslation();

    const ROOT_ADDRESS = 'tech_processes'

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
                setLoadedObjects(data["objects"])
                console.log(`${data["objects"]}`)
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
                            <NavLink to="/tech_processes/new">{t('description.tech_process_new')}</NavLink>
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
                {t('description.tech_processes')}
            </div>
            <div className="w-full px-2">
                <table className="w-full h-full" style={{ tableLayout: 'fixed' }}>
                    <thead>
                        <tr className="bg-gray-150 border-b">
                            <th className="p-2 border-r text-sm font-bold text-white bg-blue-600 w-1/3">
                                <div className="flex items-center justify-center">
                                    {t('description.designation')}
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
                    </thead>
                </table>
            </div>
            < TechProcessesTable loadedObjects={currentObjects} loading={loading} />
            < Pagination objectsPerPage={objectsPerPage} totalObjects={loadedObjects.length} paginate={paginate} />
        </div >
    )
}
