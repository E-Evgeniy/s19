import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import UsersTable from "./users_table"
import Pagination from "../pagination";



export default function Users() {
    const { t } = useTranslation();
    const [searchFileld, setSearchFileld] = useState('')
    const [findFirstName, setFindFirstName] = useState('')
    const [findLastName, setFindLastName] = useState('')
    const [findPatronymic, setFindPatronymic] = useState('')
    const [findJobTitle, setFindJobTitle] = useState('')
    const [findEmail, setFindEmail] = useState('')
    const [loadedUsers, setLoadedUsers] = useState([])
    const [loading, setloading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [objectsPerPage] = useState(10)

    useEffect(() => {
        //Get users
        const apiEndpoint = `/api/v1/users?first_name=${findFirstName}&last_name=${findLastName}&patronymic=${findPatronymic}&job_title=${findJobTitle}&email=${findEmail}`
        fetch(apiEndpoint)
            .then(response => response.json())
            .then(data => {
                setLoadedUsers(data["users"])
                setloading(false)
            }
            );
    }, [searchFileld, loading])

    const onChangeFirstName = (e) => {
        setFindFirstName(e.target.value.replace());
        setSearchFileld(e.target.value.replace());
    }

    const onChangeLastName = (e) => {
        setFindLastName(e.target.value.trim());
        setSearchFileld(e.target.value.trim());
    }

    const onChangePatronymic = (e) => {
        setFindPatronymic(e.target.value.trim());
        setSearchFileld(e.target.value.trim());
    }

    const onChangeJobTitle = (e) => {
        setFindJobTitle(e.target.value.trim());
        setSearchFileld(e.target.value.trim());
    }

    const onChangeEmail = (e) => {
        setFindEmail(e.target.value.trim());
        setSearchFileld(e.target.value.trim());
    }

    const lastObjectsIndex = currentPage * objectsPerPage
    const firstObjectsIndex = lastObjectsIndex - objectsPerPage
    const currentObjects = loadedUsers.slice(firstObjectsIndex, lastObjectsIndex)
    const paginate = pageNumber => setCurrentPage(pageNumber)

    return (
        <div>
            <div className="h-16 w-full bg-black bg-opacity-50">
                <div className="w-full h-full flex justify-center items-center">
                    <div
                        className="flex h-full items-center  hover:bg-black hover:bg-opacity-50">
                        <div className=" h-8 w-px bg-gray-300"></div>
                        <div className="mx-4 text-white">
                            <NavLink to="/users/new">{t('description.new_user')}</NavLink>
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

            <div className="font-bold text-xl flex items-center justify-center py-6">
                {t('description.users')}</div>

            <div className="w-full px-2">
                <table className="w-full h-full" style={{ tableLayout: 'fixed' }}>
                    <thead>
                        <tr className="bg-gray-150 border-b">
                            <th className="p-2 border-r text-sm font-bold text-white bg-blue-600 w-1/6">
                                <div className="flex items-center justify-center">
                                    {t('description.last_name')}
                                </div>
                            </th>
                            <th className="p-2 border-r text-sm font-bold text-white bg-blue-600 w-1/6">
                                <div className="flex items-center justify-center">
                                    {t('description.first_name')}
                                </div>
                            </th>
                            <th className="p-2 border-r text-sm font-bold text-white bg-blue-600 w-1/6">
                                <div className="flex items-center justify-center">
                                    {t('description.patronymic')}
                                </div>
                            </th>
                            <th className="p-2 border-r text-sm font-bold text-white bg-blue-600 w-1/6">
                                <div className="flex items-center justify-center">
                                    {t('description.job_title')}
                                </div>
                            </th>
                            <th className="p-2 border-r text-sm font-bold text-white bg-blue-600 w-1/6">
                                <div className="flex items-center justify-center">
                                    {t('description.email')}
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
                                   placeholder={t('description.find_last_name')}
                                   onChange={onChangeLastName}></input>
                            </td>
                            <td className="p-2 border-r w-1/6">
                                <input 
                                   type="text"
                                   className="border p-1 w-5/6"
                                   placeholder={t('description.find_first_name')}
                                   onChange={onChangeFirstName}></input>
                            </td>
                            <td className="p-2 border-r w-1/6">
                            <input 
                                   type="text"
                                   className="border p-1 w-5/6"
                                   placeholder={t('description.find_patronymic')}
                                   onChange={onChangePatronymic}></input>
                            </td>
                            <td className="p-2 border-r w-1/6">
                            
                            </td>
                            <td className="p-2 border-r w-1/6">
                            <input 
                                   type="text"
                                   className="border p-1 w-5/6"
                                   placeholder={t('description.find_email')}
                                   onChange={onChangeEmail}></input>
                            </td>
                            <td className="p-2 w-1/6">

                            </td>
                        </tr>
                        
                    </thead>
                    <tbody>
                                          
                    </tbody>
                </table>
            </div>

            <UsersTable loadedObjects={currentObjects} loading={loading}/>
            < Pagination objectsPerPage={objectsPerPage} totalObjects={loadedUsers.length} paginate={paginate} />
        </div >
    )
}

