import React from "react";
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import Form from "./form"


export default function NamePairsNew() {
    const { t } = useTranslation();
    const classMainHead = "h-16 w-full bg-black bg-opacity-50"
    const classMain1Head = "w-full h-full flex justify-center items-center"
    const classMain2Head = "flex h-full  items-center hover:bg-black hover:bg-opacity-50"
    const classHead0Text = "mx-4 text-white"
    const classStick = "h-8 w-px bg-gray-300"
    const classHeadText = "font-bold text-xl flex items-center justify-center py-8"
    
    return (
        <div>
            <div className={classMainHead}>
                <div className={classMain1Head}>

                <div className={classMain2Head}>
                        <div className={classHead0Text}>
                            <NavLink to="/name_pairs"> {t('description.namePairs')} </NavLink>
                        </div>
                        <div className={classStick}></div>
                    </div>

                    <div className={classMain2Head}>
                        <div className={classHead0Text}>
                        <NavLink to="/"> {t('description.main_page')} </NavLink>
                        </div>
                        <div className={classStick}></div>
                    </div> 

                    <div className={classMain2Head}>
                        <div className={classHead0Text}>
                            <a href="api/v1/user/user_destroy_session"> {t('description.exit')} </a>
                        </div>
                        <div className={classStick}></div>
                    </div>                   
                </div>
            </div>
            
            <div className={classHeadText}>
                {t('description.name_pairs_new')}
            </div>
            <Form />
        </div >
    )
}
