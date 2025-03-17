import React from "react";
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';


export default function IndexHeadTable() {

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
                <div className={class_hat_div_element}></div>
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
    
        <div className="font-bold text-xl flex items-center justify-center py-4">
            {t('description.manufacturing_plan_common')}
        </div>
        
    </div >
      )
    }
