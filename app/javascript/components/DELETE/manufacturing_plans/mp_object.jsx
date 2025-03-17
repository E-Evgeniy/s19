import React, { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Modal from 'react-modal';
import { useLocation } from 'react-router-dom';

export default function MpObject(props) {
    const { t } = useTranslation();
    const loadingSection = (<div>{t('description.loading')}</div>)
    const [inputValues, setInputValues] = useState({});
    const [nameInputVolume, setNameInputVolume] = useState('');

    const [inputVolume, setInputVolume] = useState('');   // количество которое необходимо вообще
    const [inputMade, setInputMade] = useState('');       // количество которое уже сделано
    const [inputMatrixId, setInputMatrixId] = useState('');
    const [inputItemId, setInpuItemId] = useState('');
    const [inputMatrixTechProcId, setInputMatrixTechProcId] = useState('');
    const [inputItemTechProcId, setInputItemTechProcId] = useState('');

    const [changeVolume, setChangeVolume] = useState(0);

    const handleInputChange = (e) => {
        setInputValues(e.target.value);
    };

    const class_div_table_with_data = "px-2"
    const class_table_with_data = "w-full h-full"
    const class_tr = "visible bg-gray-100 text-center border-b text-sm text-black"

    const class_modal_main = "bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0"
    const class_modal_div_second = "bg-white px-16 py-14 rounded-md text-center"
    const class_modal_h1 = "text-xl mb-4 font-bold text-slate-500"
    const class_modal_h3 = "text-s mb-4 font-bold text-slate-500"
    const class_modal_button_2 = "bg-blue-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold"

    const width_td_small = "w-1/16"
    const width_td_average = "w-1/6"
    const width_td_big = "w-1/4"

    let [showModal, setShowModal] = useState(false)
    let [showModalEditVolume, setShowModalEditVolume] = useState(false)
    let [currentArticle, setCurrentArticle] = useState('')

    let object_data = props.loadedObjects[0]


    console.log(`orderName = ${props.objectName}`)

    if (object_data == undefined) {
        object_data = {}
    }

    useEffect(() => {
        props.loadData;
      }, [changeVolume]);


    const showArticle = (name) => {
        setCurrentArticle(name)
        setShowModal(true)
    };

    const editVolume = (mp_matrix_id, mp_item_id, mp_matrix_tech_process_id, mp_item_tech_process_id, item_name, tech_process_name, item_volume, item_made) => {
        setNameInputVolume(find_name(item_name, tech_process_name))

        setInputMatrixId(mp_matrix_id)
        setInpuItemId(mp_item_id)
        setInputMatrixTechProcId(mp_matrix_tech_process_id)
        setInputItemTechProcId(mp_item_tech_process_id)
        setInputVolume(item_volume)
        setInputMade(item_made)

        setShowModalEditVolume(true)
    };

    const find_name = (item, tech_proc) => {
        let result = item
        if (item == null) {
            result = tech_proc
        }
        return result
    }


    // Тут определяем как будет выглядеть ячейка. Как матрица, деталь или тех процесс
    const find_class_td = (item, tech_proc, matrix_true, width_td, tech_proc_true, art_true) => {
        let result = `p-2 border-r ${width_td} hover:cursor-pointer hover:bg-gray-300`;

        if (matrix_true == true && item != '' && tech_proc == false) {
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

    const encodedData = (mp_matrix_tech_process_id, mp_item_tech_process_id) => {
        const data = { MpMatrixTechProcessId: mp_matrix_tech_process_id,
                       MpItemTechProcessId: mp_item_tech_process_id };
        return encodeURIComponent(JSON.stringify(data))

    }

    const handleSubmit = async (event) => {   // Запрос для изменения сделанного количества чего-нибудь
        event.preventDefault();
        
        setShowModalEditVolume(false)

        const address = '/api/v1/mp_order/enter_made_volume'

        const pamName0 = 'mp_matrix_id'
        const pamVol0 = inputMatrixId

        const pamName1 = 'mp_item_id'
        const pamVol1 = inputItemId

        const pamName2 = 'mp_matrix_tech_process_id'
        const pamVol2 = inputMatrixTechProcId

        const pamName3 = 'mp_item_tech_process_id'
        const pamVol3 = inputItemTechProcId

        const pamName4 = 'made_volume'
        const pamVol4 = inputValues

        const apiEndpoint = `${address}?${pamName0}=${pamVol0}&${pamName1}=${pamVol1}&${pamName2}=${pamVol2}&${pamName3}=${pamVol3}&${pamName4}=${pamVol4}`
        
        setChangeVolume(changeVolume + 1)
        //window.location.reload()
        
        fetch(apiEndpoint)
            .then(response => {
                if (response.ok) {
                    props.updateData(props.volumeUpdateDate + 1)
                }})

    };

    const dataSection = (     // Модальное окно для показа артикля
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

            <Modal    //  Модальное окно для ввода сделанного количества
                isOpen={showModalEditVolume}
                ariaHideApp={false}
                onRequestClose={() => setShowModalEditVolume(false)} >
                <div className={class_modal_main}>
                    <div className={class_modal_div_second}>
                        <h1 className={class_modal_h1}>{t('description.enter_volume')} {nameInputVolume}</h1>
                        <h3 className={class_modal_h3}>{t('description.volume_less')} {inputVolume - inputMade}</h3>
                        <input   // тут вот вводим количество
                            type="integer"
                            onChange={(e) => handleInputChange(e)}
                            className="border w-1/17"
                        />
                        <button
                            className={class_modal_button_2}
                            onClick={handleSubmit}>
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
                                        object.tech_process_true,
                                        object.matrix_true,
                                        width_td_small,
                                        false,
                                        false)}>
                                        {object.id}</td>

                                    <td className={find_class_td(
                                        object.item_name,
                                        object.tech_process_true,
                                        object.matrix_true,
                                        width_td_big,
                                        false,
                                        false)}>

                                        {find_name(
                                            object.item_name,
                                            object.tech_process_name)}
                                    </td>
                                    
                                    <td className={find_class_td(
                                        object.item_name,
                                        object.tech_process_true,
                                        object.matrix_true,
                                        width_td_average,
                                        false,
                                        true)}

                                        onClick={() => showArticle(object.article_description)}>
                                        {object.article}</td>

                                    <td className={find_class_td(
                                        object.item_name,
                                        object.tech_process_true,
                                        object.matrix_true,
                                        width_td_average,
                                        false,
                                        false)}>
                                        {object.post_name}</td>
                                  
                                   {/* Ячейка для записи сотрудника */}
                                   <td className={find_class_td(
                                        object.item_name,
                                        object.tech_process_true,
                                        object.matrix_true,
                                        width_td_average,
                                        false,
                                        false)}>
                                        
                                        {/* if object.user != nil то формируем ссылку на страницу с добавлением сотрудника */}
                                        {object.user && (
                                            <NavLink
                                            to={{
                                              pathname: '/manufacturing_plans/add_users_in_plan',
                                              search: "?sort=name",
                                              hash: `#${encodedData(object.mp_matrix_tech_process_id, 
                                                object.mp_item_tech_process_id
                                               )}`,
                                              state: { fromDashboard: true }
                                              
                                            }}
                                          >
                                            {object.user}
                                          </NavLink>
                                        )}</td>

                                    
                                    <td className={find_class_td(
                                        object.item_name,
                                        object.tech_process_true,
                                        object.matrix_true,
                                        width_td_small,
                                        false,
                                        false)}>
                                        {object.item_volume}

                                    </td>

                                    <td className={find_class_td(
                                        object.item_name,
                                        object.tech_process_true,
                                        object.matrix_true,
                                        width_td_small,
                                        false,
                                        false)}

                                        onClick={() => editVolume(object.mp_matrix_id,
                                            object.mp_item_id,
                                            object.mp_matrix_tech_process_id,
                                            object.mp_item_tech_process_id,
                                            object.item_name,
                                            object.tech_process_name,
                                            object.item_volume,
                                            object.item_made)}
                                    >
                                        <div className="hover:cursor-pointer hover:bg-gray-300">
                                        {object.item_made}
                                        </div>
                                    </td>

                                    <td className={find_class_td(
                                        object.item_name,
                                        object.tech_process_true,
                                        object.matrix_true,
                                        width_td_small,
                                        false,
                                        false)}>
                                        {object.item_volume - object.item_made}</td>
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