import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { useLocation, NavLink } from 'react-router-dom';

import Files from '../files';
import HeadData from './head_data';
import HeadData2 from './head_data2';
import AddItem from "./add_item"
import ItemOrderTable from "./item_order_table"
import Pagination from "../pagination";

export default function itemShow() {
    const { t } = useTranslation();
    const [loadedItemOrder, setLoadedItemOrder] = useState([])
    const [loading, setloading] = useState(true)
    const [loadedObjects, setLoadedObjects] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [objectsPerPage] = useState(10)
    const [files, setFiles] = useState([]);

    const ROOT_ADDRESS = 'item_orders'

    let location = useLocation().pathname.split(`${ROOT_ADDRESS}/`)[1];

    useEffect(() => {
        const apiEndpoint = `/api/v1/${ROOT_ADDRESS}/` + location

        fetch(apiEndpoint)
            .then(response => response.json())

            .then(data => {
                setLoadedItemOrder(data["item_order"])
                setFiles(data["files"])
                setLoadedObjects(data["items"])
                setloading(false)
            }
            );

    }, [])

    const onItemAdded = () => {
        // Обновление списка при успешном добавлении элемента
        const apiEndpoint = `/api/v1/${ROOT_ADDRESS}/` + location;

        fetch(apiEndpoint)
            .then(response => response.json())
            .then(data => {
                setLoadedItemOrder(data["item_order"]);
                setFiles(data["files"]);
                setLoadedObjects(data["items"]);
                setloading(false);
            });
    };

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
                            <NavLink to={`/${ROOT_ADDRESS}/new`}>{t('description.item_order_new')}</NavLink>
                        </div>
                        <div className=" h-8 w-px bg-gray-300"></div>
                    </div>
                    <div className="flex h-full items-center  hover:bg-black hover:bg-opacity-50">
                        <div className="mx-4 text-white">
                            <NavLink to={`/${ROOT_ADDRESS}/`}>{t('description.item_orders')}</NavLink>
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


            <div className="font-bold text-xl flex items-center justify-center py-5">
                {`${t('description.client')} ${loadedItemOrder['client_name']}`}</div>

            <div className="font-bold text-xl flex items-center justify-center py-2">
                {`${t('description.item_order')} ${loadedItemOrder['name']}`}</div>

            <HeadData loadedItemOrder={loadedItemOrder} loading={loading} />

            <HeadData2 loadedItemOrder={loadedItemOrder} loading={loading} />

           


            <Files files={files} loading={loading} />
            <AddItem order_id={location} onItemAdded={onItemAdded} />

            <div className="w-full px-2">
                <div className="font-bold text-xl flex items-center justify-center py-5">
                    {t('description.items_list_in_order')}</div>
                <table className="w-full h-full" style={{ tableLayout: 'fixed' }}>
                    <thead>
                    <tr className="bg-gray-150 border-b">
                            <th className="p-2 border-r text-sm font-bold text-white bg-blue-600 w-1/4">
                                <div className="flex items-center justify-center">
                                    {t('description.item_name')}
                                </div>
                            </th>

                            <th className="p-2 border-r text-sm font-bold text-white bg-blue-600 w-1/4">
                                <div className="flex items-center justify-center">
                                    {t('description.casting_volume')}
                                </div>
                            </th> 

                            <th className="p-2 border-r text-sm font-bold text-white bg-blue-600 w-1/4">
                                <div className="flex items-center justify-center">
                                    {t('description.name_matrix')}
                                </div>
                            </th>

                            <th className="p-2 border-r text-sm font-bold text-white bg-blue-600 w-1/4">
                                <div className="flex items-center justify-center">
                                    {t('description.matrix_volume')}
                                </div>
                            </th> 
                                                                                   
                            <th className="p-2 text-sm font-bold text-white bg-blue-600 w-1/4" style={{ textAlign: 'right' }}>
                                <div className="flex items-center justify-center">
                                    {t('description.action')}
                                </div>
                            </th>
                        </tr>
                    </thead>
                </table>
            </div>

             < ItemOrderTable loadedObjects={currentObjects} loading={loading} />  
             < Pagination objectsPerPage={objectsPerPage} totalObjects={loadedObjects.length} paginate={paginate} />   
             

        </div >
    )
}
