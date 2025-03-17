import React from "react";
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import NamePairsTable from "./name_pairs_table"
import Pagination from "../pagination";

export default function NamePairsIndex() {
    const { t } = useTranslation();
    const class_main_head = "h-16 w-full bg-black bg-opacity-50"
    const class_main1_head = "w-full h-full flex justify-center items-center"
    const class_main2_head = "flex h-full  items-center hover:bg-black hover:bg-opacity-50"
    const class_head0_text = "mx-4 text-white"
    const class_stick = "h-8 w-px bg-gray-300"
    const class_head_text = "font-bold text-xl flex items-center justify-center py-8"
    const class_table_0 = "w-full px-2"
    const class_table_head = "w-full h-full"
    const class_table_tr = "bg-gray-150 border-b"
    const class_table_th = "p-2 border-r text-sm font-bold text-white bg-blue-600 w-1/3"
    const class_table_th_div = "flex items-center justify-center"
    const class_table_tr0 = "p-2 border-r"
    const class_table_th0 = "border p-1 flex items-center justify-center w-full"

    const ROOT_ADDRESS = 'name_pairs'

    const [searchFileld, setSearchFileld] = useState('')
    const [findName, setFindName] = useState('')

    useEffect(() => {
        //Get clients
        const apiEndpoint = `/api/v1/${ROOT_ADDRESS}?name=${findName}`
        fetch(apiEndpoint)
            .then(response => response.json())
            .then(data => {
                setLoadedObjects(data["name_pairs"])
                setloading(false)
            }
            );
    }, [searchFileld, loading])

    const onChangeName = (e) => {
        setFindName(e.target.value.replace());
        setSearchFileld(e.target.value.replace());
    }

    const lastObjectsIndex = currentPage * objectsPerPage
    const firstObjectsIndex = lastObjectsIndex - objectsPerPage
    const currentObjects = loadedObjects.slice(firstObjectsIndex, lastObjectsIndex)
    const paginate = pageNumber => setCurrentPage(pageNumber)

    return (
        <div>
            <div className={class_main_head}>
                <div className={class_main1_head}>
                   
                    <div className={class_main2_head}>
                        <div className={class_head0_text}>
                            <NavLink to="/name_pairs/new"> {t('description.name_pairs_new')} </NavLink>
                        </div>
                        <div className={class_stick}></div>
                    </div>
                    <div
                        className={class_main2_head}>
                        <div className={class_stick}></div>
                        <div className={class_head0_text}>
                            <NavLink to="/"> {t('description.main_page')} </NavLink>
                        </div>
                        <div className={class_stick}></div>
                    </div>

                </div>
            </div>

            <div className={class_head_text}>
                {t('description.namePairs')}
            </div>

            <div className={class_table_0}>
                <table className={class_table_head} style={{ tableLayout: 'fixed' }}>
                    <thead>
                        <tr className={class_table_tr}>
                            <th className={class_table_th}>
                                <div className={class_table_th_div}>
                                    {t('description.name_pairs')}
                                </div>
                            </th>
                            <th className={class_table_th}>
                                <div className={class_table_th_div}>
                                    {t('description.multiplier')}
                                </div>
                            </th>
                            
                            <th className={class_table_th_div}>
                                <div className={class_table_th_div}>
                                    {t('description.action')}
                                </div>
                            </th>
                        </tr>
                        <tr className={class_table_tr0}>
                            <td className={class_table_tr0}>
                                <input
                                    type="text"
                                    className={class_table_th0}
                                    placeholder={t('description.item_name_enter')}
                                    onChange={onChangeName}></input>
                            </td>
                            <td className={class_table_tr0}>

                            </td>
                            
                            <td className={class_table_tr0}>

                            </td>
                        </tr>
                    </thead>
                </table>
            </div>

            <NamePairsTable loadedObjects={currentObjects} loading={loading} />
            <Pagination objectsPerPage={objectsPerPage} totalObjects={loadedObjects.length} paginate={paginate} />

        </div >
    )
}
