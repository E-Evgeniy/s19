import React from "react";
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

//import UserForm from "./user_form"


export default function AddUsersInPlan() {
    const { t } = useTranslation();
    //const { search } = useLocation();
   // const searchParams = new URLSearchParams(search);
    //const orderName = searchParams.get('orderName');

    const location = useLocation();
    console.log('location.state:', location.state);
    console.log('location:', location);

    //  Функция для изменения атрибута user_id
    const handleSubmit = async (event) => {
        event.preventDefault();

        

        const formData = new FormData();

        formData.append("object[user_id]", user_id);
        formData.append("object[post_id]", idObject);

        try {
            await axios.post(`/api/v1/${ROOT_ADDRESS}${PLURAR}/`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            onPostAdd();

        } catch (error) {
            console.log(error.response);
            // обработать ошибки и отобразить их пользователю
        }
        setInputObjectName('')
        navigate(`/${NAVIGATE_ADDRESS}/${user_id}`);
    };

    const class_table_head = "font-bold text-l flex items-center justify-center py-2"
    const dataSection = (
        <div>
            <div className="h-16 w-full bg-black bg-opacity-50">
                <div className="w-full h-full flex justify-center items-center">
                    <div
                        className="flex h-full items-center  hover:bg-black hover:bg-opacity-50">
                            <div className=" h-8 w-px bg-gray-300"></div>
                        <div className="mx-4 text-white">
                        <NavLink to="/users/">{t('description.users')}</NavLink>
                        </div>
                        <div className=" h-8 w-px bg-gray-300"></div>
                    </div>
                    <div className="flex h-full  items-center hover:bg-black hover:bg-opacity-50">
                        <div className="mx-4 text-white">
                            <NavLink to="/production"> {t('description.production')} </NavLink>
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
            
            
            
        </div >
    )

    return dataSection
}
