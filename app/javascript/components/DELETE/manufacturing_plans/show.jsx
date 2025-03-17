import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { useLocation, NavLink } from 'react-router-dom';
import ManufacturingPlanTable from "./manufacturing_plan_table"

import Files from '../files';

export default function ManufacturingPlansShow() {
    const { t } = useTranslation();
    const [loadedObjects, setLoadedObjects] = useState([])
    const [clientName, setClientName] = useState([])
    const [orderName, setOrderName] = useState([])
    const [loading, setloading] = useState(true)

    const [files, setFiles] = useState([]);

    const ROOT_ADDRESS = 'manufacturing_plans'

    let location = useLocation().pathname.split(`${ROOT_ADDRESS}/`)[1];

    useEffect(() => {
        const apiEndpoint = `/api/v1/${ROOT_ADDRESS}/` + location
        fetch(apiEndpoint)
            .then(response => response.json())

            .then(data => {
                setLoadedObjects(data["objects"])
                setClientName(data["client_name"])
                setOrderName(data["order_name"])
                setFiles(data["files"])
                setloading(false)
            }
            );
    }, [])

    const class_hat_main = "h-16 w-full bg-black bg-opacity-50"
    const class_hat_div_1 = "w-full h-full flex justify-center items-center"
    const class_hat_div_element_active = "flex h-full items-center  hover:bg-black hover:bg-opacity-50"
    const class_hat_div_element = "h-8 w-px bg-gray-300"
    const class_hat_text = "mx-4 text-white"

    const class_div_table_with_data = "px-2"
    const class_table_with_data = "w-full h-full"
    const class_tr = "bg-gray-150 border-b"
    const class_td_small = "p-2 border-r text-sm font-bold text-white bg-blue-600 w-1/16"
    const class_average = "p-2 border-r text-sm font-bold text-white bg-blue-600 w-1/6"
    const class_td_usually = "p-2 border-r text-sm font-bold text-white bg-blue-600 w-1/4"
    const class_head_center = "flex items-center justify-center"


    return (
        <div>

            <div className={class_hat_main}>
                <div className={class_hat_div_1}>
                    <div className={class_hat_div_element}></div>
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

            <div className="font-bold text-xl flex Posts-center justify-center py-5">
                {t('description.manufacturing_plan_for')} {orderName}  {t('description.for_client')} {clientName}</div>


            <div className={class_div_table_with_data}>
                <table className={class_table_with_data} style={{ tableLayout: 'fixed' }}>
                    <thead>
                        <tr className={class_tr}>
                            <th className={class_td_small}>
                                <div className={class_head_center}>
                                    {t('description.num')}
                                </div>
                            </th>

                            <th className={class_td_usually}>
                                <div className={class_head_center}>
                                    {t('description.designation')}
                                </div>
                            </th>

                            <th className={class_average}>
                                <div className={class_head_center}>
                                    {t('description.article')}
                                </div>
                            </th>

                            <th className={class_average}>
                                <div className={class_head_center}>
                                    {t('description.post')}
                                </div>
                            </th>

                            <th className={class_average}>
                                <div className={class_head_center}>
                                    {t('description.user')}
                                </div>
                            </th>

                            <th className={class_td_small}>
                                <div className={class_head_center}>
                                    {t('description.quantity')}
                                </div>
                            </th>
                            <th className={class_td_small}>
                                <div className={class_head_center}>
                                    {t('description.quantity_made')}
                                </div>
                            </th>
                            <th className={class_td_small}>
                                <div className={class_head_center}>
                                    {t('description.quantity_need')}
                                </div>
                            </th>
                        </tr>
                    </thead>
                </table>
            </div>
            <ManufacturingPlanTable loadedObjects={loadedObjects} loading={loading} />
            <Files files={files} loading={loading} />

        </div >
    )

}

