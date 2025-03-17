import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { useLocation, NavLink } from 'react-router-dom';

import Files from '../files';
import AddMaterial from "./add_material"
import MaterialsOrderTable from "./materials_order_table"
import Pagination from "../pagination";

export default function materialShow() {
    const { t } = useTranslation();
    const [loadedMaterialOrder, setLoadedMaterialOrder] = useState([])
    const [loading, setloading] = useState(true)
    const [loadedObjects, setLoadedObjects] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [objectsPerPage] = useState(10)
    
    const [files, setFiles] = useState([]);

    const ROOT_ADDRESS = 'material_orders'

    let location = useLocation().pathname.split(`${ROOT_ADDRESS}/`)[1];

    useEffect(() => {
        const apiEndpoint = `/api/v1/${ROOT_ADDRESS}/` + location

        fetch(apiEndpoint)
            .then(response => response.json())

            .then(data => {
                setLoadedMaterialOrder(data["material_order"])
                setFiles(data["files"])
                setLoadedObjects(data["materials_order_item"])
                setloading(false)
            }
            );
    }, [])

    const onMaterialAdded = () => {
        // Обновление списка при успешном добавлении элемента
        const apiEndpoint = `/api/v1/${ROOT_ADDRESS}/` + location;
    
        fetch(apiEndpoint)
          .then(response => response.json())
          .then(data => {
            setLoadedMaterialOrder(data["material_order"]);
            setFiles(data["files"]);
            setLoadedObjects(data["materials_order_item"]);
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
                            <NavLink to={`/${ROOT_ADDRESS}/new`}>{t('description.material_order_new')}</NavLink>
                        </div>
                        <div className=" h-8 w-px bg-gray-300"></div>
                    </div>
                    <div className="flex h-full items-center  hover:bg-black hover:bg-opacity-50">
                        <div className="mx-4 text-white">
                            <NavLink to={`/${ROOT_ADDRESS}/`}>{t('description.material_orders')}</NavLink>
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
                {`${t('description.material_order')} ${loadedMaterialOrder['name']}`}</div>
            <div className="w-full px-2">
            <div className="text-l py-5 pl-4">
            <span className="font-bold">{`${t('description.supplier')} `} </span>
            {loadedMaterialOrder['supplier_name']}</div>

            <div className="text-l py-5 pl-4">
             <span className="font-bold">{`${t('description.order_summ')} `} </span>
             {loadedMaterialOrder['total_price']}
             </div>
             </div>

             
            
             
            <Files files={files} loading={loading} />
            <AddMaterial order_id={location} onMaterialAdded={onMaterialAdded} />

            <div className="w-full px-2">
            <div className="font-bold text-xl flex items-center justify-center py-5">
                    {t('description.material_list_in_order')}</div>
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
                                    {t('description.material_delivery_period')}
                                </div>
                            </th>
                            <th className="p-2 border-r text-sm font-bold text-white bg-blue-600 w-1/4">
                                <div className="flex items-center justify-center">
                                    {t('description.material_massa_in_order')}
                                </div>
                            </th>
                            <th className="p-2 border-r text-sm font-bold text-white bg-blue-600 w-1/4">
                                <div className="flex items-center justify-center">
                                    {t('description.material_price_in_order')}
                                </div>
                            </th>
                            
                            <th className="p-2 border-r text-sm font-bold text-white bg-blue-600 w-1/4">
                                <div className="flex items-center justify-center">
                                    {t('description.material_total_price')}
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

             < MaterialsOrderTable loadedObjects={currentObjects} loading={loading} />  
             < Pagination objectsPerPage={objectsPerPage} totalObjects={loadedObjects.length} paginate={paginate} />   
             
                       
        </div >
    )
}
