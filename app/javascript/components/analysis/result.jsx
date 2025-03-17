import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';



export default function Result() {
    const { t } = useTranslation();
    const class_main_head = "h-16 w-full bg-black bg-opacity-50"
    const class_main1_head = "w-full h-full flex justify-center items-center"
    const class_main2_head = "flex h-full  items-center hover:bg-black hover:bg-opacity-50"
    const class_head0_text = "mx-4 text-white"
    const class_stick = "h-8 w-px bg-gray-300"
    const class_head_text = "font-bold text-xl flex items-center justify-center py-8"


    useEffect(() => {
        const apiEndpoint = "/api/v1/result/"

        fetch(apiEndpoint)
            .then(response => response.json())

            .then(data => {

            }
            );
    }, [])

    return (
        <div>
            <div className={class_main_head}>
                <div className={class_main1_head}>
                    <div className={class_main2_head}>
                        <div className={class_head0_text}>
                            <NavLink to="/load_data"> {t('description.load_data')} </NavLink>
                        </div>
                        <div className={class_stick}></div>
                    </div>

                    <div className={class_main2_head}>
                        <div className={class_head0_text}>
                            <NavLink to="/"> {t('description.main_page')} </NavLink>
                        </div>
                        <div className={class_stick}></div>
                    </div>

                    <div className={class_main2_head}>
                        <div className={class_head0_text}>
                            <a href="api/v1/user/user_destroy_session"> {t('description.exit')} </a>
                        </div>
                        <div className={class_stick}></div>
                    </div>
                </div>
            </div>

            <div className={class_head_text}>
                {t('description.result')}
            </div>

        </div >
    )
}
