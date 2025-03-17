import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import Modal from 'react-modal';

export default function PostsIn(props) {
    const { t } = useTranslation();
    const [currentObject, setCurrentObject] = useState()
    const [currentObjectId, setCurrentObjectId] = useState()
    const [delObject, setDelObject] = useState([])
    const navigate = useNavigate()

    const ROOT_ADDRESS = 'user_posts'

    let [showModal, setShowModal] = useState(false)

    const RequestDeleteObject = async (id) => {
        await fetch(`/api/v1/${ROOT_ADDRESS}/${id}`, {
            method: 'DELETE',
        }).then((response) => {
            if (response.ok) {
                return response.json()
            }
        });
    };

    let outputName = (word) => {
        if (word !== undefined) {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }
    }

    const editObject = async (id, name) => {
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

    const class_table = "w-full px-2 mt-10"

    const class_table_head = "w-2/5 h-full"
    const class_post_head = 'p-2 border-r text-sm font-bold text-white bg-violet-500 w-1/2'
    const class_post = 'p-2 border-r w-1/2'
    const class_tr_head_1 = "bg-gray-150 border-b"
    const class_th_head_0 = "p-2 border-r text-sm font-bold text-white bg-neutral-500"
    const class_div_head_1 = "flex items-center justify-center"
    
    const class_button_modal_del_cancel = "bg-blue-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold"
    const class_button_modal_del_ok = "bg-red-500 px-4 py-2 rounded-md text-md text-white"

    const dataSection = (
        <div>

            <Modal
                isOpen={showModal}
                ariaHideApp={false}
                onRequestClose={() => setShowModal(false)} >
                <div className="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
                    <div className="bg-white px-16 py-14 rounded-md text-center">
                        <h1 className="text-xl mb-4 font-bold text-slate-500">{t('description.post_delete')} {currentObject}</h1>
                        <button
                            className={class_button_modal_del_ok}
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
                            className={class_button_modal_del_cancel}
                            onClick={() => { setShowModal(false) }}>
                            {t('description.cancel')}</button>
                    </div>
                </div>
            </Modal>


            <div className={class_table}>
                <table className={class_table_head} style={{ tableLayout: 'fixed' }}>
                    <thead>
                        <tr className={class_tr_head_1}>
                            <th className={class_th_head_0} colSpan="2">
                                <div className={class_div_head_1}>
                                    {t('description.posts_user')}</div>
                            </th>
                        </tr>
                        <tr className="bg-gray-150 border-b">
                            <th className={class_post_head}>
                                <div className="flex items-center justify-center">
                                    {t('description.designation')}
                                </div>
                            </th>
                            <th className={class_post_head}>
                                <div className="flex items-center justify-center">
                                    {t('description.action')}
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.loadedObjects.map((object, index) => {
                            return (
                                <tr key={object.id} className={needHide(object.id)}>
                                    <td className={class_post}>
                                        {outputName(object.name)}
                                    </td>

                                    <td className=" p-3 px-5 flex justify-center ">
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