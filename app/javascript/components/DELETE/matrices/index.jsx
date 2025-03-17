import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import MatricesTable from "./matrices_table"
import Pagination from "../pagination";

export default function MatrixIndex() {
    const [p0D, setP0D] = useState('')
    const [p1D, setP1D] = useState('')
    const [p2D, setP2D] = useState('')
    const [p3D, setP3D] = useState('')
    const [loadedObjects, setLoadedObjects] = useState([])
    const [loading, setloading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [objectsPerPage] = useState(10)
    const [searchFileld, setSearchFileld] = useState('')

    const { t } = useTranslation();
    const ROOT_ADDRESS = 'matrices'
    const P0 = 'name'
    const P1 = 'weight'
    const P2 = 'description'
    const P3 = 'average_price'


    useEffect(() => {
        const apiEndpoint = `/api/v1/${ROOT_ADDRESS}?${P0}=${p0D}&${P1}=${p1D}&${P2}=${p2D}&${P3}=${p3D}`
        fetch(apiEndpoint)
            .then(response => response.json())
            .then(data => {
                setLoadedObjects(data[`${ROOT_ADDRESS}`])
                let t = data[`${ROOT_ADDRESS}`]
                setloading(false)
            }
            );
    }, [searchFileld, loading])

    const onChangeName = (e) => {
        setP0D(e.target.value.replace());
        setSearchFileld(e.target.value.replace());
    }

    const onChangeWeight = (e) => {
        setP1D(e.target.value.replace());
        setSearchFileld(e.target.value.replace());
    }

    const onChangeDescription = (e) => {
        setP2D(e.target.value.trim());
        setSearchFileld(e.target.value.trim());
    }

    const onChangeAveragePrice = (e) => {
        setP3D(e.target.value.replace());
        setSearchFileld(e.target.value.replace());
    }

    const lastObjectsIndex = currentPage * objectsPerPage
    const firstObjectsIndex = lastObjectsIndex - objectsPerPage
    const currentObjects = loadedObjects.slice(firstObjectsIndex, lastObjectsIndex)
    const paginate = pageNumber => setCurrentPage(pageNumber)

    const class_head0 = "h-16 w-full bg-black bg-opacity-50"
    const class_head1 = "w-full h-full flex justify-center items-center"
    const class_head_el_com = "flex h-full items-center  hover:bg-black hover:bg-opacity-50"
    const class_head_el_stick = "h-8 w-px bg-gray-300"
    const class_head_text = "mx-4 text-white"

    const class_main_head = "font-bold text-xl flex items-center justify-center py-4"

    const class_table = "w-full px-2"
    const class_table0 = "w-full h-full"
    const class_tr = "bg-gray-150 border-b"
    const class_th = "p-2 border-r text-sm font-bold text-white bg-blue-600 w-1/5"
    const class_table_div = "flex items-center justify-center"

    const class_tr0 = "p-2 border-r"
    const class_td0 ="border p-1 flex items-center justify-center w-full"

    return (
        <div>
            <div className={class_head0}>
                <div className={class_head1}>
                    <div className={class_head_el_com}>
                        <div className={class_head_el_stick}></div>
                        <div className={class_head_text}>
                            <NavLink to="/matrices/new">{t('description.matrix_new')}</NavLink>
                        </div>
                        <div className={class_head_el_stick}></div>
                    </div>
                    <div className={class_head_el_com}>
                        <div className={class_head_text}>
                            <NavLink to="/production"> {t('description.production')} </NavLink>
                        </div>
                        <div className={class_head_el_stick}></div>
                    </div>
                    <div className={class_head_el_com}>
                        <div className={class_head_text}>
                            <NavLink to="/"> {t('description.main_page')} </NavLink>
                        </div>
                        <div className={class_head_el_stick}></div>
                    </div>
                </div>
            </div>

            <div className={class_main_head}>
                {t('description.matrices')}
            </div>

            <div className={class_table}>
                <table className={class_table0} style={{ tableLayout: 'fixed' }}>
                    <thead>
                        <tr className={class_tr}>
                            <th className={class_th}>
                                <div className={class_table_div}>
                                    {t('description.matrix_name')}
                                </div>
                            </th>
                            <th className={class_th}>
                                <div className={class_table_div}>
                                    {t('description.item_weight')}
                                </div>
                            </th>
                            <th className={class_th}>
                                <div className={class_table_div}>
                                    {t('description.item_description')}
                                </div>
                            </th>
                            <th className={class_th}>
                                <div className={class_table_div}>
                                    {t('description.average_price')}
                                </div>
                            </th>
                            <th className={class_th}>
                                <div className={class_table_div}>
                                    {t('description.action')}
                                </div>
                            </th>
                        </tr>
                        <tr className={class_tr0}>
                            <td className={class_tr0}>
                                <input
                                    type="text"
                                    className={class_td0}
                                    placeholder={t('description.name_matrix_enter')}
                                    onChange={onChangeName}></input>
                            </td>
                            <td className={class_tr0}>                              

                            </td>
                            <td className={class_tr0}>
                                <input
                                    type="text"
                                    className={class_td0}
                                    placeholder={t('description.material_description')}
                                    onChange={onChangeDescription}></input>
                            </td>
                            <td className={class_tr0}>
                               
                            </td>
                        </tr>
                    </thead>
                </table>
            </div>

            <MatricesTable loadedObjects={currentObjects} loading={loading} />
            <Pagination objectsPerPage={objectsPerPage} totalObjects={loadedObjects.length} paginate={paginate} />

        </div >
    )
}
