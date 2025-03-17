import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router';

export default function ManufacturingPlansTable(props) {
    const { t } = useTranslation();
    const [currentObject, setCurrentObject] = useState()
    const [currentObjectId, setCurrentObjectId] = useState()
    const [delObject, setDelObject] = useState([])
    const navigate = useNavigate()

    const ROOT_ADDRESS = 'manufacturing_plans'

    let [showModal, setShowModal] = useState(false)

    const openObject = async (id) => {
        navigate(`/${ROOT_ADDRESS}/${id}`);
    };

    const loadingSection = (<div>{t('description.loading')}</div>)

    const needHide = (id) => {

        let needHid = "invisible bg-gray-100 text-center border-b text-sm text-black"

        if (delObject.indexOf(id) == -1) {
            needHid = "visible bg-gray-100 text-center border-b text-sm text-black"
        }

        return needHid
    }

    const classTdLink = `p-2 border-r w-1/6 hover:cursor-pointer hover:bg-gray-300`

    const class_div_table_with_data = "px-2"
    const class_table_with_data = "w-full h-full"
    const class_td_small = "p-2 border-r w-1/12"
    const class_td_usually = "p-2 border-r w-1/6"
    const class_button_open = "mr-3 text-sm bg-green-600 hover:bg-green-800 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"

    const dataSection = (
        <div>
            <div className={class_div_table_with_data}>
                <table className={class_table_with_data} style={{ tableLayout: 'fixed' }}>
                    <tbody>
                        {props.loadedObjects.map((object, index) => {
                            return (
                                <tr key={object.id} className={needHide(object.id)}>
                                    <td className={class_td_small}>{object.priority}</td>
                                    <td className={class_td_usually}>{object.client_name}</td>
                                    <td className={classTdLink}>
                                        <NavLink to={String(object.id)}>{object.order_name}</NavLink>
                                    </td>
                                    <td className={class_td_usually}>{object.data_create}</td>
                                    <td className={class_td_usually}>{object.status}</td>

                                    <td className={class_td_usually}>
                                    <button
                                            type="button"
                                            onClick={() => openObject(object.id, object.name)}
                                            className={class_button_open}>
                                            {t('description.open')}</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )

    if (props.loading) {
        return loadingSection
    } else {
        return dataSection
    }
}