import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';

export default function UserTable(props) {
    const { t } = useTranslation();
    const [currentObject, setCurrentObject] = useState()
    const [currentObjectId, setCurrentObjectId] = useState()
    const [delObject, setDelObject] = useState([])
    const navigate = useNavigate()

    let [showModal, setShowModal] = useState(false)

    const RequestDeleteObject = async (id) => {
        await fetch(`/api/v1/users/${id}`, {
            method: 'DELETE',
        }).then((response) => {
            if (response.ok) {
                return response.json()                
            }
        });
        navigate('/users')
    };

    const updateObject = async (id) => {
        navigate(`/users/${id}/edit`)
    };

    const loadingSection = (<div>{t('description.loading')}</div>)

    const deleteObject = (id, name) => {
        setCurrentObject(name)
        setCurrentObjectId(id)
        setShowModal(true)
    };

    const FIO = (last_name, firts_name, patronymic) => {
        return (
            last_name + ' ' + firts_name + ' ' + patronymic
        )
    }

    const needHide = (id) => {

        let needHid = "invisible bg-gray-100 text-center border-b text-sm text-black"

        if (delObject.indexOf(id) == -1) {
            needHid = "visible bg-gray-100 text-center border-b text-sm text-black"
        }

        return needHid
    }

    const classModalDiv0 = "bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0"
    const classModalDiv1 = "bg-white px-16 py-14 rounded-md text-center"
    const classModalH1 = "text-xl mb-4 font-bold text-slate-500"
    const classModalButtonDel = "bg-red-500 px-4 py-2 rounded-md text-md text-white"
    const classModalButtonCancel = "bg-blue-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold"

    const classDiv0 = "w-full px-2"
    const classTable0 = "w-full h-full"
    const classTableTd = "p-2 border-r w-1/5"
    const classTableTdButton = "p-3 px-5 flex justify-center"
    const classTableButtonEdit = "mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
    const classTableButtonDel = "text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
    
    const dataSection = (
        <div>

            <Modal
                isOpen={showModal}
                ariaHideApp={false}
                onRequestClose={() => setShowModal(false)} >
                <div className={classModalDiv0}>
                    <div className={classModalDiv1}>
                        <h1 className={classModalH1}>{t('description.delete_user')} {currentObject}</h1>
                        <button
                            className={classModalButtonDel}
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
                            className={classModalButtonCancel}
                            onClick={() => { setShowModal(false) }}>
                            {t('description.cancel')}</button>
                    </div>
                </div>
            </Modal>

            <div className={classDiv0}>
                <table className={classTable0} style={{ tableLayout: 'fixed' }}>
                    <thead>


                    </thead>
                    <tbody>
                        <tr key={props.loadedObject.id} className={needHide(props.loadedObject.id)}>
                            <td className={classTableTd}>{props.loadedObject.last_name}</td>
                            <td className={classTableTd}>{props.loadedObject.first_name}</td>
                            <td className={classTableTd}>{props.loadedObject.patronymic}</td>
                            <td className={classTableTd}>{props.loadedObject.email}</td>
                            <td className={classTableTdButton}>
                                <button
                                    type="button"
                                    onClick={() => updateObject(props.loadedObject.id)}
                                    className={classTableButtonEdit}>
                                    {t('description.edit')}</button>
                                <button
                                    type="button"
                                    onClick={() => deleteObject(props.loadedObject.id, FIO(props.loadedObject.last_name, props.loadedObject.firts_name, props.loadedObject.patronymic))}
                                    className={classTableButtonDel}>
                                    {t('description.delete')}
                                </button>
                            </td>
                        </tr>
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