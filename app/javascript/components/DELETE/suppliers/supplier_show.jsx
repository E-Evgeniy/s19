import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { useLocation, NavLink } from 'react-router-dom';
import SupplierTable from "./supplier_table"
import Files from '../../files';

export default function supplierShow() {
    const { t } = useTranslation();
    const [loadedsupplier, setLoadedsupplier] = useState([])
    const [loading, setloading] = useState(true)

    const [files, setFiles] = useState([]);

    let location = useLocation().pathname.split('suppliers/')[1];

    useEffect(() => {
        const apiEndpoint = "/api/v1/suppliers/" + location

        fetch(apiEndpoint)
            .then(response => response.json())

            .then(data => {
                setLoadedsupplier(data["supplier"])
                setFiles(data["files"])
                setloading(false)
            }
            );
    }, [])

    return (
        <div>

            <div className="h-16 w-full bg-black bg-opacity-50">
                <div className="w-full h-full flex justify-center items-center">
                    <div
                        className="flex h-full items-center  hover:bg-black hover:bg-opacity-50">
                        <div className=" h-8 w-px bg-gray-300"></div>
                        <div className="mx-4 text-white">
                            <NavLink to="/suppliers/new">{t('description.supplier_new')}</NavLink>
                        </div>
                        <div className=" h-8 w-px bg-gray-300"></div>
                    </div>
                    <div className="flex h-full items-center  hover:bg-black hover:bg-opacity-50">
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

            <div className="font-bold text-xl flex items-center justify-center py-6">
                {t('description.supplier')}</div>

            <div className="w-full px-2">
                <table className="w-full h-full" style={{ tableLayout: 'fixed' }}>
                    <thead>
                        <tr className="bg-gray-150 border-b">
                            <th className="p-2 border-r text-sm font-bold text-white bg-blue-600 w-1/6">
                                <div className="flex items-center justify-center">
                                    {t('description.supplier_name')}
                                </div>
                            </th>
                            <th className="p-2 border-r text-sm font-bold text-white bg-blue-600 w-1/6">
                                <div className="flex items-center justify-center">
                                    {t('description.supplier_inn')}
                                </div>
                            </th>
                            <th className="p-2 border-r text-sm font-bold text-white bg-blue-600 w-1/6">
                                <div className="flex items-center justify-center">
                                    {t('description.supplier_address')}
                                </div>
                            </th>
                            <th className="p-2 border-r text-sm font-bold text-white bg-blue-600 w-1/6">
                                <div className="flex items-center justify-center">
                                    {t('description.supplier_email')}
                                </div>
                            </th>
                            <th className="p-2 border-r text-sm font-bold text-white bg-blue-600 w-1/6">
                                <div className="flex items-center justify-center">
                                    {t('description.supplier_site')}
                                </div>
                            </th>
                            <th className="p-2 text-sm font-bold text-white bg-blue-600 w-1/6" style={{ textAlign: 'right' }}>
                                <div className="flex items-center justify-center">
                                    {t('description.action')}
                                </div>
                            </th>
                        </tr>

                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>

            <SupplierTable loadedObject={loadedsupplier} loading={loading} />
            <Files files={files} loading={loading} />

        </div >
    )
}

