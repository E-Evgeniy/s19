import React from "react";
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import FormEdit from "./form_edit"


export default function TechProcessesEdit() {
    const { t } = useTranslation();

    const class_hat_main = "h-16 w-full bg-black bg-opacity-50"
    const class_hat_div_1 = "w-full h-full flex justify-center items-center"
    const class_hat_div_element_active = "flex h-full items-center  hover:bg-black hover:bg-opacity-50"
    const class_hat_div_element = "h-8 w-px bg-gray-300"
    const class_hat_text = "mx-4 text-white"


    return (
        <div>

            <div className={class_hat_main}>
                <div className={class_hat_div_1}>
                    <div
                        className={class_hat_div_element_active}>
                        <div className={class_hat_div_element}></div>
                        <div className={class_hat_text}>
                            <NavLink to="/tech_processes/new">
                                {t('description.tech_process_new')}
                            </NavLink>
                        </div>
                        <div className={class_hat_div_element}></div>
                    </div>
                    <div className={class_hat_div_element_active}>
                        <div className={class_hat_text}>
                            <NavLink to="/tech_processes">
                                {t('description.tech_processes')}
                            </NavLink>
                        </div>
                        <div className={class_hat_div_element}></div>
                    </div>
                    <div className={class_hat_div_element_active}>
                        <div className={class_hat_text}>
                            <NavLink to="/production">
                                {t('description.production')}
                            </NavLink>
                        </div>
                        <div className={class_hat_div_element}></div>
                    </div>
                    <div className={class_hat_div_element_active}>
                        <div className={class_hat_text}>
                            <NavLink to="/">
                                {t('description.main_page')}
                            </NavLink>
                        </div>
                        <div className={class_hat_div_element}></div>
                    </div>
                </div>
            </div>
            <FormEdit />
        </div >
    )
}