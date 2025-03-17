import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom'; 
import { useNavigate } from 'react-router';
import Modal from 'react-modal';

export default function UsersTable(props) {
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
    };

    const classTdLink = `p-2 border-r w-1/6 hover:cursor-pointer hover:bg-gray-300`

    const loadingSection = (<div>{t('description.loading')}</div>)

    const deleteObject = (id, name) => {
        setCurrentObject(name)
        setCurrentObjectId(id)
        setShowModal(true)
    };

    const editObject = async (id, name) => {
        navigate(`/users/${id}/edit`);
    };


    const FIO = (last_name, firts_name, patronymic) => {
        if (last_name == null) { last_name = '' }
        if (patronymic == null) { patronymic = '' }

        return(
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


    const dataSection = (
        <div>

            <Modal
                isOpen={showModal}
                ariaHideApp={false}
                onRequestClose={() => setShowModal(false)} >
                <div className="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
                    <div className="bg-white px-16 py-14 rounded-md text-center">
                        <h1 className="text-xl mb-4 font-bold text-slate-500">{t('description.delete_user')} {currentObject}</h1>
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
                            className="bg-blue-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold"
                            onClick={() => { setShowModal(false) }}>
                            {t('description.cancel')}</button>
                    </div>
                </div>
            </Modal>

            <div className="w-full px-2">
                <table className="w-full h-full" style={{ tableLayout: 'fixed' }}>
                    <thead>


                    </thead>
                    <tbody>
                        {props.loadedObjects.map((user, index) => {
                            return (
                               
                                <tr key={user.id} className={needHide(user.id)}>
                                    <td className="p-2 border-r w-1/6">
                                       {user.last_name} 
                                    </td>
                                    <td className={classTdLink}>
                                        <NavLink to={String(user.id)}>{user.first_name}</NavLink> 
                                        </td>
                                    <td className="p-2 border-r w-1/6">{user.patronymic}</td>
                                    <td className="p-2 border-r w-1/6">{user.post_name}</td>
                                    <td className="p-2 border-r w-1/6">{user.email}</td>
                                    <td className=" p-3 px-5 flex justify-center">
                                        <button
                                            type="button"
                                            onClick={() => editObject(user.id, user.first_name)}
                                            className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">
                                            {t('description.edit')}</button>
                                        <button
                                            type="button"
                                            onClick={() => deleteObject(user.id, FIO(user.last_name, user.first_name, user.patronymic))}
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