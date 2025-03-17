import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { useLocation, NavLink } from 'react-router-dom';
import ItemTable from "./item_table"
import TechProcessIn from "./tech_process_in"
import TechProcessAdd from "./tech_process_add"
import Files from '../files';

export default function ItemShow() {
    const { t } = useTranslation();
    const [loadedObject, setLoadedObject] = useState([])
    const [loadedObject0, setLoadedObject0] = useState([])
    const [loading, setloading] = useState(true)

    const [files, setFiles] = useState([]);

    const ROOT_ADDRESS = 'items'

    let location = useLocation().pathname.split(`${ROOT_ADDRESS}/`)[1];

    useEffect(() => {
        const apiEndpoint = `/api/v1/${ROOT_ADDRESS}/` + location

        fetch(apiEndpoint)
            .then(response => response.json())

            .then(data => {
                setLoadedObject(data["object"])
                setLoadedObject0(data["tech_processes"])
                setFiles(data["files"])
                setloading(false)
            }
            );
    }, [])

    const onTechProcessAdd = () => {
        // Обновление списка при успешном добавлении элемента
        const apiEndpoint = `/api/v1/${ROOT_ADDRESS}/` + location;

        fetch(apiEndpoint)
            .then(response => response.json())
            .then(data => {
                setLoadedObject(data["object"])
                setLoadedObject0(data["tech_processes"])
                setFiles(data["files"])
                setloading(false)
            });
    };


    const class_hat_main = "h-16 w-full bg-black bg-opacity-50"
    const class_hat_div_1 = "w-full h-full flex justify-center items-center"
    const class_hat_div_element_active = "flex h-full items-center  hover:bg-black hover:bg-opacity-50"
    const class_hat_div_element = "h-8 w-px bg-gray-300"
    const class_hat_text = "mx-4 text-white"

    const class_head_text = "font-bold text-xl flex items-center justify-center py-5"

    return (
        <div>
            <div className={class_hat_main}>
                <div className={class_hat_div_1}>
                    <div
                        className={class_hat_div_element_active}>
                        <div className=" h-8 w-px bg-gray-300"></div>
                        <div className={class_hat_text}>
                            <NavLink to="/items/new">{t('description.item_new')}</NavLink>
                        </div>
                        <div className={class_hat_div_element}></div>
                    </div>
                    <div className={class_hat_div_element_active}>
                        <div className={class_hat_text}>
                            <NavLink to="/items/">{t('description.items')}</NavLink>
                        </div>
                        <div className={class_hat_div_element}></div>
                    </div>
                    <div className={class_hat_div_element_active}>
                        <div className={class_hat_text}>
                            <NavLink to="/production"> {t('description.production')} </NavLink>
                        </div>
                        <div className={class_hat_div_element}></div>
                    </div>
                    <div className={class_hat_div_element_active}>
                        <div className={class_hat_text}>
                            <NavLink to="/"> {t('description.main_page')} </NavLink>
                        </div>
                        <div className={class_hat_div_element}></div>
                    </div>
                </div>
            </div>

            <div className={class_head_text}>
                {t('description.item')} {loadedObject.name}</div>

            <ItemTable loadedObject={loadedObject} loading={loading} />
            <Files files={files} loading={loading} />
            <TechProcessIn loadedObjects={loadedObject0} loading={loading} />
            <TechProcessAdd item_id={location} onTechProcessAdd={onTechProcessAdd} />

        </div >
    )
}

