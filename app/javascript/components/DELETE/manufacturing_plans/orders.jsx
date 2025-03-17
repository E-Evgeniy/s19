import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import MpObject from "./mp_object"

export default function Orders(props) {

    const { t } = useTranslation();

    const [data, setData] = useState();


    let object_name = props.orderName
    let object_data = props.loadedObject
    let loading = props.loading

     // Функция для обновления данных
    const updateData = (newData) => {
      setData(newData);
      props.updateDataBegin(newData)
     };

    const class_table_head = "font-bold text-l flex items-center justify-center py-2"

    const class_div_table_with_data = "px-2"
    const class_table_with_data = "w-full h-full"
    const class_tr = "bg-gray-150 border-b"
    const class_td_small = "p-2 border-r text-sm font-bold text-white bg-blue-600 w-1/16"
    const class_average = "p-2 border-r text-sm font-bold text-white bg-blue-600 w-1/6"
    const class_td_usually = "p-2 border-r text-sm font-bold text-white bg-blue-600 w-1/4"
    const class_head_center = "flex items-center justify-center"

    const dataSection = (
        <div>
           
            <div className={class_table_head}> {object_name}</div >
           
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
            <MpObject
             loadedObjects={object_data}
             loading={loading}
             key={object_name} // Здесь key используется для уникальной идентификации компонента
             updateData={updateData} 
             volumeUpdateDate={props.volumeUpdateDateBegin}
             objectName={object_name} // Передача objectName как отдельного пропса
             />
            </div>        
    )

    return dataSection

}
