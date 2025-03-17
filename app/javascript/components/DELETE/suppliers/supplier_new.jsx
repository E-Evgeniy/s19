import React from "react";
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import SupplierForm from "./supplier_form"


export default function SupplierNew() {
    const { t } = useTranslation();
    return (
        <div>
            <div className="h-16 w-full bg-black bg-opacity-50">
                <div className="w-full h-full flex justify-center items-center">
                    <div
                        className="flex h-full items-center  hover:bg-black hover:bg-opacity-50">
                            <div className=" h-8 w-px bg-gray-300"></div>
                        <div className="mx-4 text-white">
                        <NavLink to="/suppliers/">{t('description.suppliers')}</NavLink>
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
            
            <SupplierForm />
        </div >
    )
}
