import React from "react";
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import MultiplicationTableForm from "./mt_form_before"
import {
    mainClass, mainHeadClass, menuHeadClass,
    menuHead0Class, main0Class, menuNavClass
} from "../../constants/classes";  // Импортируем классы

import MenuLink from "../../constants/menu_link";         // Импортируем элемент МЕНЮ
import MainPage from "../../constants/main_page";         // Импортируем элемент Главная страница
import Profile from "../../constants/profile";            // Импортируем элемент Профиль
import Exams from "../../constants/exams_element";        // Импортируем элемент Экзамены
import Logout from "../../constants/logout_element";      // Импортируем элемент Экзамены

export default function MultiplicationTableBefore() {
    const { t } = useTranslation();

    return (
        <div className={mainClass}>
            <div className={mainHeadClass}>                    
                <div className={menuHeadClass}>
                    <nav className={menuNavClass}>
                        <MenuLink t={t} />                     {/* Вставляем элемент МЕНЮ */}
                        <div className={menuHead0Class}>
                            <MainPage t={t} />                 {/* Вставляем элемент Главная страница */}    
                            <Profile t={t} />                  {/* Вставляем элемент Профиль */}  
                            <Exams t={t} />                    {/* Импортируем элемент Экзамены */}            
                        </div>
                    </nav>
                </div>
            </div>

            <div className={main0Class}>
               <Logout t={t}/>
               <MultiplicationTableForm />
            </div>
        </div>
    )
}