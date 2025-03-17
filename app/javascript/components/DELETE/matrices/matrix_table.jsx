import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';

export default function MatrixTable(props) {
    const { t } = useTranslation();
    const [currentObject, setCurrentObject] = useState()
    const [currentObjectId, setCurrentObjectId] = useState()
    const [delObject, setDelObject] = useState([])
    const navigate = useNavigate()
    const ROOT_ADDRESS = 'matrices'

    let [showModal, setShowModal] = useState(false)

    const RequestDeleteObject = async (id) => {
        await fetch(`/api/v1/${ROOT_ADDRESS}/${id}`, {
            method: 'DELETE',
        }).then((response) => {
            if (response.ok) {
                return response.json()                
            }
        });
        navigate(`/${ROOT_ADDRESS}`)
    };

    const updateObject = async (id) => {
        navigate(`/${ROOT_ADDRESS}/${id}/edit`)
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

    const dataSection = (
        <div>

            <Modal
                isOpen={showModal}
                ariaHideApp={false}
                onRequestClose={() => setShowModal(false)} >
                <div className="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
                    <div className="bg-white px-16 py-14 rounded-md text-center">
                        <h1 className="text-xl mb-4 font-bold text-slate-500">{t('description.item_delete')} {currentObject}</h1>
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
                        <tr className="bg-gray-150 border-b">
                            <th className="p-2 border-r text-sm font-bold text-white bg-blue-600 w-1/6">
                                <div className="flex items-center justify-center">
                                    {t('description.item_weight')}
                                </div>
                            </th>
                            <th className="p-2 border-r text-sm font-bold text-white bg-blue-600 w-1/6">
                                <div className="flex items-center justify-center">
                                    {t('description.item_description')}
                                </div>
                            </th>
                            <th className="p-2 border-r text-sm font-bold text-white bg-blue-600 w-1/6">
                                <div className="flex items-center justify-center">
                                    {t('description.item_length')}
                                </div>
                            </th>
                            <th className="p-2 border-r text-sm font-bold text-white bg-blue-600 w-1/6">
                                <div className="flex items-center justify-center">
                                    {t('description.item_width')}
                                </div>
                            </th>
                            <th className="p-2 border-r text-sm font-bold text-white bg-blue-600 w-1/6">
                                <div className="flex items-center justify-center">
                                    {t('description.item_height')}
                                </div>
                            </th>
                            <th className="p-2 border-r text-sm font-bold text-white bg-blue-600 w-1/6">
                                <div className="flex items-center justify-center">
                                    {t('description.average_price')}
                                </div>
                            </th>                   
                            <th className="p-2 px-57 text-sm font-bold text-white bg-blue-600 w-1/6" style={{ textAlign: 'right' }}>
                                <div className="flex items-center justify-center">
                                    {t('description.action')}
                                </div>
                            </th>
                        </tr>                                        
                    </thead>
                    <tbody>
                        <tr key={props.loadedObject.id} style={{ tableLayout: 'fixed' }}>
                            <td className="p-2 border-r w-1/7">
                            <div className="flex items-center justify-center">{props.loadedObject.weight}</div></td>
                            
                            <td className="p-2 border-r w-1/7 ">
                            <div className="flex items-center justify-center">{props.loadedObject.description}</div></td>
                            
                            <td className="p-2 border-r w-1/7">
                            <div className="flex items-center justify-center">{props.loadedObject.length}</div></td>
                           
                            <td className="p-2 border-r w-1/7">
                            <div className="flex items-center justify-center">{props.loadedObject.width}</div></td>

                            <td className="p-2 border-r w-1/7">
                            <div className="flex items-center justify-center">{props.loadedObject.height}</div></td>
                            
                            <td className="p-2 border-r w-1/3">
                            <div className="flex items-center justify-center">{props.loadedObject.average_price}</div></td>
                            
                            
                            <td className="p-2 px-5 flex justify-center w-2/7">

                            <button
                                    type="button"
                                    onClick={() => updateObject(props.loadedObject.id)}
                                    className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">
                                    {t('description.edit')}</button>
                                <button
                                    type="button"
                                    onClick={() => deleteObject(props.loadedObject.id, props.loadedObject.name)}
                                    className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">
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