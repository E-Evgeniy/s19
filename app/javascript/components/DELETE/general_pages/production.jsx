import React from "react";
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';


export default function Production() {
    const { t } = useTranslation();

    const class_main = "h-16 w-full bg-black bg-opacity-50"
    const class_main2 = "w-full h-full flex justify-center items-center"
    const class_element = "flex h-full items-center  hover:bg-black hover:bg-opacity-50"
    const class_element1 = "mx-4 text-white"
    const  class_element2 = "h-8 w-px bg-gray-300"

    return (
        <div>
            <div className={class_main}>
                <div className={class_main2}>

                    <div className={class_element}>
                    <div className={class_element2}></div>
                        <div className={class_element1}>
                          <NavLink to="/items"> {t('description.details')} </NavLink>
                        </div>
                        <div className={class_element2}></div>
                    </div>
                    <div className={class_element}>
                    <div className={class_element2}></div>
                        <div className={class_element1}>
                          <NavLink to="/matrices"> {t('description.matrices')} </NavLink>
                        </div>
                        <div className={class_element2}></div>
                    </div>
                    <div className={class_element}>
                        <div className="mx-4 text-white">
                        <NavLink to="/tech_processes"> {t('description.technical_processes')}</NavLink>
                        </div>
                        <div className=" h-8 w-px bg-gray-300"></div>
                    </div>
                    <div className="flex h-full items-center  hover:bg-black hover:bg-opacity-50">
                        <div className="mx-4 text-white">
                        <NavLink to="/materials"> {t('description.materials')} </NavLink>
                        </div>
                        <div className=" h-8 w-px bg-gray-300"></div>
                    </div>

                    <div className={class_element}>
                        <div className="mx-4 text-white">
                        <NavLink to="/users"> {t('description.users')} </NavLink>
                        </div>
                        <div className=" h-8 w-px bg-gray-300"></div>
                    </div>

                    <div className={class_element}>
                        <div className="mx-4 text-white">
                        <NavLink to="/posts"> {t('description.posts')} </NavLink>
                        </div>
                        <div className=" h-8 w-px bg-gray-300"></div>
                    </div>

                    <div className={class_element}>
                        <div className="mx-4 text-white">
                         {t('description.work_schedule')}
                        </div>
                        <div className=" h-8 w-px bg-gray-300"></div>
                    </div>

                    <div className="flex h-full items-center  hover:bg-black hover:bg-opacity-50">
                        <div className="mx-4 text-white">
                            <NavLink to="/"> {t('description.main_page')} </NavLink>
                        </div>
                        <div className=" h-8 w-px bg-gray-300"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

