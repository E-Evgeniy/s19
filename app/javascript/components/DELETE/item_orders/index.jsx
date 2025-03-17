import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import Pagination from "../pagination";
import ItemsOrdersTable from "./items_orders_table"

export default function ItemsIndex() {

    const { t } = useTranslation();

    const ROOT_ADDRESS = 'item_orders'

    const [loadedObjects, setLoadedObjects] = useState([])
    const [loading, setloading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [objectsPerPage] = useState(10)
    //const [searchFileld, setSearchFileld] = useState('')
    const [dataBegin, setDataBegin] = useState(0);

    //const [findSuplierName, setFindSuplierName] = useState('')
    //const [findContractName, setFindContractName] = useState('')

    useEffect(() => {
        const apiEndpoint = `/api/v1/${ROOT_ADDRESS}`
        fetch(apiEndpoint)
            .then(response => response.json())
            .then(data => {
                setLoadedObjects(data["item_orders"])
                setloading(false)
            }
            );
    }, [dataBegin])

    const updateDataBegin = (newData) => {
        setDataBegin(newData);
    };

    //const onChangeSuplierName = (e) => {
    //    setFindSuplierName(e.target.value.replace());
    //    setSearchFileld(e.target.value.replace());
    //}

    //<tr className="p-2 border-r">
                           
                //            <td className="p-2 border-r">
              //                  <input
            //                        type="text"
          //                          className="border p-1 flex items-center justify-center w-full"
        //                            placeholder={t('description.enter_contract_name')}
      //                              onChange={onChangeContractName}></input>
     //                       </td>
    //                    </tr>

    //const onChangeContractName = (e) => {
    //    setFindContractName(e.target.value.replace());
    //    setSearchFileld(e.target.value.replace());
    //}

    const lastObjectsIndex = currentPage * objectsPerPage
    const firstObjectsIndex = lastObjectsIndex - objectsPerPage
    const currentObjects = loadedObjects.slice(firstObjectsIndex, lastObjectsIndex)
    const paginate = pageNumber => setCurrentPage(pageNumber)

    const class_hat_main = "h-16 w-full bg-black bg-opacity-50"
    const class_hat_div_1 = "w-full h-full flex justify-center items-center"
    const class_hat_div_element_active = "flex h-full items-center  hover:bg-black hover:bg-opacity-50"
    const class_hat_div_element = "h-8 w-px bg-gray-300"
    const class_hat_text = "mx-4 text-white"

    const class_div_table_with_data = "w-full px-2"
    const class_table_with_data = "w-full h-full"
    const class_tr = "bg-gray-150 border-b"
    const class_small_head = "p-2 border-r text-sm font-bold text-white bg-blue-600 w-1/10"
    const class_usually_head = "p-2 border-r text-sm font-bold text-white bg-blue-600 w-1/5"
    const class_head_center = "flex items-center justify-center"

    return (
        <div>
            <div className={class_hat_main}>
                <div className={class_hat_div_1}>
                    <div
                        className={class_hat_div_element_active}>
                        <div className={class_hat_div_element}></div>
                        <div className={class_hat_text}>
                            <NavLink to="/item_orders/new">
                                {t('description.item_order_new')}
                            </NavLink>
                        </div>
                        <div className={class_hat_div_element}></div>
                        </div>
                    <div className={class_hat_div_element_active}>
                        <div className={class_hat_text}>
                            <NavLink to="/manufacturing_plans">
                                {t('description.manufacturing_plan')}
                            </NavLink>
                        </div>
                        <div className={class_hat_div_element}></div>
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
                    <div className={class_hat_div_element_active}>
                        <div className={class_hat_text}>
                            <NavLink to="/">
                                {t('description.main_page')}
                            </NavLink>
                        </div>
                        <div className={class_hat_div_element}></div>
                    </div>
                </div>
            </div>

            <div className="font-bold text-xl flex items-center justify-center py-4">
                {t('description.item_orders')}
            </div>

            <div className={class_div_table_with_data}>
                <table className={class_table_with_data} style={{ tableLayout: 'fixed' }}>
                    <thead>
                        <tr className={class_tr}>
                        <th className={class_small_head}>
                                <div className={class_head_center}>
                                    {t('description.priority')}
                                </div>
                            </th>
                            <th className={class_small_head}>
                                <div className={class_head_center}>
                                    {t('description.status')}
                                </div>
                            </th>
                            <th className={class_usually_head}>
                                <div className={class_head_center}>
                                    {t('description.supplier_name')}
                                </div>
                            </th>
                            <th className={class_usually_head}>
                                <div className={class_head_center}>
                                    {t('description.contract_name')}
                                </div>
                            </th>
                            <th className={class_usually_head}>
                                <div className={class_head_center}>
                                    {t('description.material_order_created_at')}
                                </div>
                            </th>                           
                            <th className={class_usually_head}>
                                <div className={class_head_center}>
                                    {t('description.action')}
                                </div>
                            </th>
                        </tr>
                        
                    </thead>
                </table>
            </div>
            < ItemsOrdersTable loadedObjects={currentObjects} loading={loading} updateData={updateDataBegin} volumeUpdateDate={dataBegin}/>
            < Pagination objectsPerPage={objectsPerPage} totalObjects={loadedObjects.length} paginate={paginate} />
        </div >
    )
}
