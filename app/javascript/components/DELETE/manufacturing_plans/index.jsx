import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
//import Pagination from "../pagination";
import Orders from "./orders"
import IndexHeadTable from "./index_head_table"


export default function ManufacturingPlansIndex() {

    const { t } = useTranslation();
    const ROOT_ADDRESS = 'manufacturing_plans'
    const [loading, setloading] = useState(true)
    const [loadedObjects, setLoadedObjects] = useState({})
    const [dataBegin, setDataBegin] = useState(0);

    useEffect(() => {
        const apiEndpoint = `/api/v1/${ROOT_ADDRESS}/`
        fetch(apiEndpoint)
            .then(response => response.json())

            .then(data => {
                setLoadedObjects(data["mpo"])
                setloading(false)
            }
            );
    }, [dataBegin])

    const updateDataBegin = (newData) => {
        setDataBegin(newData);
    };

    if (loading) {
        return (
            <div >
                < IndexHeadTable />
                <div className="text-xl flex items-center justify-center py-4">
                    {t('description.loading')}
                </div>
            </div>
        )
    } else if (loadedObjects == false) {
        return (
            <div >
                < IndexHeadTable />
                <div className="text-xl flex items-center justify-center py-4">
                    {t('description.no_manufacturing_plan')}
                </div>
            </div>
        )
    } else {
        return (
            <div >
                < IndexHeadTable />


                {Object.entries(loadedObjects).map(([orderName, orderData]) => (
                    <Orders loadedObject={orderData} orderName={orderName} key={orderName} loading={loading} updateDataBegin={updateDataBegin} volumeUpdateDateBegin={dataBegin} />
                ))}

            </div >
        )
    }
}

