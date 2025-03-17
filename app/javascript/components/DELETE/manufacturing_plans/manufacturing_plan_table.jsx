import React, { useState, useEffect } from "react";

import { useTranslation } from 'react-i18next';
import Modal from 'react-modal';

export default function ManufacturingPlanTable(props) {
    const { t } = useTranslation();
    const loadingSection = (<div>{t('description.loading')}</div>)

    const class_div_table_with_data = "px-2"
    const class_table_with_data = "w-full h-full"
    const class_tr = "visible bg-gray-100 text-center border-b text-sm text-black"

    const class_modal_main = "bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0"
    const class_modal_div_second = "bg-white px-16 py-14 rounded-md text-center"
    const class_modal_h1 = "text-xl mb-4 font-bold text-slate-500"
    const class_modal_button_2 = "bg-blue-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold"

    const width_td_small = "w-1/16"
    const width_td_average = "w-1/6"
    const width_td_big = "w-1/4"

    let [showModal, setShowModal] = useState(false)
    let [currentArticle, setCurrentArticle] = useState('')

    let object_data = props.loadedObjects

    if (object_data == undefined) {
        object_data = {}

    }

    const showArticle = (name) => {
        console.log(`name = ${name}`)
        setCurrentArticle(name)
        setShowModal(true)
    };

    const find_name = (item, tech_proc) => {
        let result = item
        if (item == null) {
            result = tech_proc
        }
        return result
    }

    const find_class_td = (item, tech_proc, matrix_true, width_td, tech_proc_true, art_true) => {
        let result = `p-2 border-r ${width_td} hover:cursor-pointer hover:bg-gray-300`;

        if (matrix_true == true && item != '') {
            result = find_result_matrix(width_td, art_true)
        }
        else if (item != null) {
            result = find_result_item(width_td, art_true)
        }

        else if (tech_proc != null) {

            result = `p-2 border-r ${width_td}`
        }

        return result
    }

    const find_result_matrix = (width_td, art_true) => {
        let result = `bg-orange-600 font-bold p-2 border-r ${width_td}`

        if (art_true == true) {
            result = `bg-orange-600 font-bold p-2 border-r ${width_td} hover:cursor-pointer hover:bg-gray-300`
        }

        return result
    }

    const find_result_item = (width_td, art_true) => {
        let result = `bg-green-600 font-bold p-2 border-r ${width_td}`

        if (art_true == true) {
            result = `bg-green-600 font-bold p-2 border-r ${width_td} hover:cursor-pointer hover:bg-gray-300`
        }

        return result
    }

    const dataSection = (
        <div>

            <Modal
                isOpen={showModal}
                ariaHideApp={false}
                onRequestClose={() => setShowModal(false)} >
                <div className={class_modal_main}>
                    <div className={class_modal_div_second}>
                        <h1 className={class_modal_h1}>{currentArticle}</h1>

                        <button
                            className={class_modal_button_2}
                            onClick={() => { setShowModal(false) }}>
                            {t('description.ok')}
                        </button>
                    </div>
                </div>
            </Modal>

            <div className={class_div_table_with_data}>
                <table className={class_table_with_data} style={{ tableLayout: 'fixed' }}>
                    <tbody>
                        {object_data.map((object, index) => {
                            return (
                                <tr key={index} className={class_tr}>
                                    <td className={find_class_td(
                                        object.item_name,
                                        object.tech_process,
                                        object.matrix_true,
                                        width_td_small,
                                        false,
                                        false)}>

                                        {object.id}</td>
                                    <td className={find_class_td(
                                        object.item_name,
                                        object.tech_process,
                                        object.matrix_true,
                                        width_td_big,
                                        false,
                                        false)}>

                                        {find_name(
                                            object.item_name,
                                            object.tech_process)}
                                    </td>
                                    <td className={find_class_td(
                                        object.item_name,
                                        object.tech_process,
                                        object.matrix_true,
                                        width_td_average,
                                        false,
                                        true)}

                                        onClick={() => showArticle(object.article_description)}>
                                        {object.article}</td>

                                    <td className={find_class_td(
                                        object.item_name,
                                        object.tech_process,
                                        object.matrix_true,
                                        width_td_average,
                                        false,
                                        false)}>
                                        {object.post}</td>
                                    <td className={find_class_td(
                                        object.item_name,
                                        object.tech_process,
                                        object.matrix_true,
                                        width_td_average,
                                        false,
                                        false)}>{object.user}</td>

                                    <td className={find_class_td(
                                        object.item_name,
                                        object.tech_process,
                                        object.matrix_true,
                                        width_td_small,
                                        false,
                                        false)}>
                                        {object.item_volume}</td>

                                    <td className={find_class_td(
                                        object.item_name,
                                        object.tech_process,
                                        object.matrix_true,
                                        width_td_small,
                                        false,
                                        false)}>
                                        {object.item_volume}</td>

                                    <td className={find_class_td(
                                        object.item_name,
                                        object.tech_process,
                                        object.matrix_true,
                                        width_td_small,
                                        false,
                                        false)}>
                                        {object.item_volume}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

        </div>
    );

    if (props.loading) {
        return loadingSection
    } else {
        return dataSection
    }
}