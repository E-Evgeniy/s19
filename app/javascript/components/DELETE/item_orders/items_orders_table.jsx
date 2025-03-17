import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router';
import Modal from 'react-modal';

export default function ItemsOrdersTable(props) {
    const { t } = useTranslation();
    const [currentObject, setCurrentObject] = useState()
    const [currentObjectId, setCurrentObjectId] = useState()
    const [currentObjectClientName, setCurrentObjectClientName] = useState()
    const [delObject, setDelObject] = useState([])
    const navigate = useNavigate()

    const ROOT_ADDRESS = 'item_orders'

    let [showModal, setShowModal] = useState(false)
    let [inputPriority, setInputPriority] = useState(false)
    let [showModalEditPriority, setShowModalEditPriority] = useState(false)

    const RequestDeleteObject = async (id) => {
        await fetch(`/api/v1/${ROOT_ADDRESS}/${id}`, {
            method: 'DELETE',
        }).then((response) => {
            if (response.ok) {
                return response.json()
            }
        });
    };

    const RequestChangePriorityObject = async () => {

        setShowModalEditPriority(false)
        
        const address = '/api/v1/mp_order/change_priority_object'
        pam0 = 'MpOrderId'
        pam0Data = currentObjectId
        pam1 = 'priority'
        pam1Data = inputPriority

        const apiEndpoint = `${address}?${pam0}=${pam0Data}&${pam1}=${pam1Data}`

        fetch(apiEndpoint)
            .then(response => {
                if (response.ok) {
                    props.updateData(props.volumeUpdateDate + 1)
                }
            });
    };

    const editObject = async (id) => {
        navigate(`/${ROOT_ADDRESS}/${id}/edit`);
    };

    const loadingSection = (<div>{t('description.loading')}</div>)

    const deleteObject = (id, name) => {
        setCurrentObject(name)
        setCurrentObjectId(id)
        setShowModal(true)
    };

    const needHide = (id) => {

        let needHid = "invisible bg-gray-100 text-center border-b text-sm text-black"

        if (delObject.indexOf(id) == -1) {
            needHid = "visible bg-gray-100 text-center border-b text-sm text-black"
        }

        return needHid
    }

    const findStatus = (status) => {
        if (status == true) {
            return t('description.order_complete')
        } else {
            return t('description.order_no_complete')
        }
    }

    const enterPriority = (e) => {
        setInputPriority(e.target.value);
    };

    const colorStatus = (status) => {
        if (status == true) {
            return "bg-green-200 hover:cursor-pointer"
        } else {
            return "bg-orange-200 hover:cursor-pointer"
        }
    }

    const objectExists = (object) => {
        if (object != null) {
            return "hover:cursor-pointer hover:bg-blue-100"
        } 
    }

    // Эта функция вызывающая модальное окно для смены статуса и приоритета
    const editStatus = (objectId, objectClientName, objectName) => {
        setCurrentObject(objectName)
        setCurrentObjectClientName(objectClientName)
        setCurrentObjectId(objectId)

        setShowModalEditPriority(true)
    };


    const class_div_table_with_data = "w-full px-2"
    const class_table_with_data = "w-full h-full"
    const class_small_head = "p-2 border-r w-1/10"
    const class_usually_head = "p-2 border-r w-1/5"
    const classTdLink = `p-2 border-r hover:cursor-pointer hover:bg-gray-300 w-1/5`
    const class_button_head = "p-2 border-r w-1/5"

    const class_modal_main = "bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0"
    const class_modal_div_second = "bg-white px-16 py-14 rounded-md text-center"
    const class_modal_h1 = "text-xl mb-4 font-bold text-slate-500"
    const class_modal_h3 = "text-s mb-4 font-bold text-slate-500"
    const class_modal0 = "text-s font-bold text-slate-500"
    const class_modal_button_2 = "bg-blue-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold"
    const class_modal_button_2_ok = "bg-green-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold"
    const class_modal_button_cancel = "bg-blue-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold"

    const dataSection = (
        <div>

            <Modal    //  Модальное окно для изменения статуста заказа в плане производства
                isOpen={showModalEditPriority}
                ariaHideApp={false}
                onRequestClose={() => setShowModalEditPriority(false)} >
                <div className={class_modal_main}>
                    <div className={class_modal_div_second}>
                        <h1 className={class_modal_h1}>
                            {t('description.change_priority_for')} {currentObject} {t('description.for_client')} {currentObjectClientName}</h1>
                        <h3 className={class_modal_h3}>
                            {t('description.for_changeStatus')} </h3>
                        <div className={class_modal0}>
                            {t('description.enter_priority')} </div>
                        <input   // тут вот вводим приоритет 
                            type="integer"
                            onChange={(e) => enterPriority(e)}
                            className="border w-1/17"
                        />
                        <br></br>
                        <br></br>
                        <button
                            className={class_modal_button_2_ok}
                            onClick={() => { RequestChangePriorityObject() }}>
                            {t('description.ok')}
                        </button>
                        <button
                            className={class_modal_button_2}
                            onClick={() => { setShowModalEditPriority(false) }}>
                            {t('description.cancel')}
                        </button>
                    </div>
                </div>
            </Modal>


            <Modal //  Модальное окно для удаления и редактирования
                isOpen={showModal}
                ariaHideApp={false}
                onRequestClose={() => setShowModal(false)} >
                <div className="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
                    <div className="bg-white px-16 py-14 rounded-md text-center">
                        <h1 className="text-xl mb-4 font-bold text-slate-500">{t('description.item_order_delete')} {currentObject}</h1>
                        <button
                            className="bg-red-500 px-4 py-2 rounded-md text-md text-white"
                            onClick={() => {

                                RequestDeleteObject(currentObjectId);
                                let buffer_object = delObject
                                buffer_object.push(currentObjectId)
                                setDelObject(buffer_object)
                                setShowModal(false)

                            }}
                        > {t('description.delete')}
                        </button>

                        <button
                            className={class_modal_button_cancel}
                            onClick={() => { setShowModal(false) }}>
                            {t('description.cancel')}</button>
                    </div>
                </div>
            </Modal>

            <div className={class_div_table_with_data}>
                <table className={class_table_with_data} style={{ tableLayout: 'fixed' }}>
                    <tbody>
                        {props.loadedObjects.map((object, index) => {
                            return (
                                <tr key={object.id} className={needHide(object.id)}>
                                    <td className={class_small_head} 
                                    onClick={() => editStatus(object.id, object.client_name, object.contract_name)}
                                    > <div className={objectExists(object.priority)}>
                                        {object.priority}
                                        </div></td>

                                    <td className={class_small_head}
                                        onClick={() => editStatus(object.id, object.client_name, object.contract_name)}>
                                        <div className={colorStatus(object.status)}>
                                            {findStatus(object.status)}
                                        </div>
                                    </td>

                                    <td className={class_usually_head}>{object.client_name}</td>
                                    <td className={classTdLink}>
                                        <NavLink to={String(object.id)}>{object.contract_name}</NavLink>
                                    </td>
                                    <td className={class_usually_head}>{object.data_order}</td>
                                    <td className={class_button_head}>
                                        <button
                                            type="button"
                                            onClick={() => editObject(object.id, object.name)}
                                            className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">
                                            {t('description.edit')}</button>
                                        <button
                                            type="button"
                                            onClick={() => deleteObject(object.id, object.name)}
                                            className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">
                                            {t('description.delete')}
                                        </button>
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