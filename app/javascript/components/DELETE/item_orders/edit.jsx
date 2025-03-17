import React from "react";
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import FormEdit from "./form_edit"


export default function ItemOrderEdit() {
    const { t } = useTranslation();
    const class_hat_div_element_active = "flex h-full items-center  hover:bg-black hover:bg-opacity-50"
    const class_hat_div_element = "h-8 w-px bg-gray-300"
    const class_hat_text = "mx-4 text-white"
    return (
        <div>
            <div className="h-16 w-full bg-black bg-opacity-50">
                <div className="w-full h-full flex justify-center items-center">
                    <div
                        className="flex h-full items-center  hover:bg-black hover:bg-opacity-50">
                        <div className=" h-8 w-px bg-gray-300"></div>
                        <div className="mx-4 text-white">
                            <NavLink to="/item_orders/">{t('description.item_orders')}</NavLink>
                        </div>
                        <div className=" h-8 w-px bg-gray-300"></div>
                    </div>
                    <div className={class_hat_div_element_active}>
                        <div className={class_hat_text}>
                            <NavLink to="/supply_of_products">
                                {t('description.supply_of_products')}
                            </NavLink>
                        </div>
                        <div className={class_hat_div_element}></div>
                    </div>                    
                    <div className={class_hat_div_element_active}>
                        <div className={class_hat_text}>
                            <NavLink to="/purchases_materials">
                                {t('description.purchases_materials')}
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
                    <div className="flex h-full items-center  hover:bg-black hover:bg-opacity-50">
                        <div className="mx-4 text-white">
                            <NavLink to="/"> {t('description.main_page')} </NavLink>
                        </div>
                        <div className=" h-8 w-px bg-gray-300"></div>
                    </div>
                </div>
            </div>
            <FormEdit />
        </div >
    )
}