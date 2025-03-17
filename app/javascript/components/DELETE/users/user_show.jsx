import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { useLocation, NavLink } from 'react-router-dom';
import UserTable from "./user_table"
import PostsIn from "./posts_in"
import PostAdd from "./post_add"


export default function UserShow() {
    const { t } = useTranslation();
    const [loadedUser, setLoadedUser] = useState([])
    const [postName, setPostName] = useState([])
    const [loading, setloading] = useState(true)

    let location = useLocation().pathname.split('users/')[1];

    const ROOT_ADDRESS = 'users'

    useEffect(() => {

        const apiEndpoint = "/api/v1/users/" + location

        fetch(apiEndpoint)
            .then(response => response.json())
            .then(data => {
                setLoadedUser(data["user"])
                setPostName(data["posts_name"])
                setloading(false)
            }
            );
    }, [])

    const onPostAdd = () => {
        // Обновление списка при успешном добавлении элемента
        const apiEndpoint = `/api/v1/${ROOT_ADDRESS}/` + location;

        fetch(apiEndpoint)
            .then(response => response.json())
            .then(data => {
                setLoadedUser(data["user"])
                setPostName(data["posts_name"])
                setFiles(data["files"])
                setloading(false)
            });
    };

    const class_hat_main = "h-16 w-full bg-black bg-opacity-50"
    const class_hat_div_1 = "w-full h-full flex justify-center items-center"
    const class_hat_div_element_active = "flex h-full items-center  hover:bg-black hover:bg-opacity-50"
    const class_hat_div_element = "h-8 w-px bg-gray-300"
    const class_hat_text = "mx-4 text-white"

    const class_head_text = "font-bold text-xl flex items-center justify-center py-5"

    const classDiv0 = "w-full px-2"
    const classTable0 = "w-full h-full"
    const classTableTr = "bg-gray-150 border-b"
    const classTableTh = "p-2 border-r text-sm font-bold text-white bg-blue-600 w-1/5"
    const classTableThDiv = "flex items-center justify-center"
    const classTableThAction = "p-2 text-sm font-bold text-white bg-blue-600 w-1/5"


    return (
        <div>

            <div className={class_hat_main}>
                <div className={class_hat_div_1}>
                    <div
                        className={class_hat_div_element_active}>
                        <div className={class_hat_div_element}></div>
                        <div className={class_hat_text}>
                            <NavLink to="/users/new">{t('description.new_user')}</NavLink>
                        </div>
                        <div className={class_hat_div_element}></div>
                    </div>
                    <div className={class_hat_div_element_active}>
                        <div className={class_hat_text}>
                            <NavLink to="/users/">{t('description.users')}</NavLink>
                        </div>
                        <div className={class_hat_div_element}></div>
                    </div>
                    <div className={class_hat_div_element_active}>
                        <div className={class_hat_text}>
                            <NavLink to="/production"> {t('description.production')} </NavLink>
                        </div>
                        <div className={class_hat_div_element}></div>
                    </div>
                    <div className={class_hat_div_element_active}>
                        <div className={class_hat_text}>
                            <NavLink to="/"> {t('description.main_page')} </NavLink>
                        </div>
                        <div className={class_hat_div_element}></div>
                    </div>
                </div>
            </div>

            <div className={class_head_text}>
                {t('description.users')}</div>

            <div className={classDiv0}>
                <table className={classTable0} style={{ tableLayout: 'fixed' }}>
                    <thead>
                        <tr className={classTableTr}>
                            <th className={classTableTh}>
                                <div className={classTableThDiv}>
                                    {t('description.last_name')}
                                </div>
                            </th>
                            <th className={classTableTh}>
                                <div className={classTableThDiv}>
                                    {t('description.first_name')}
                                </div>
                            </th>
                            <th className={classTableTh}>
                                <div className={classTableThDiv}>
                                    {t('description.patronymic')}
                                </div>
                            </th>
                            <th className={classTableTh}>
                                <div className={classTableThDiv}>
                                    {t('description.email')}
                                </div>
                            </th>
                            <th className={classTableThAction} style={{ textAlign: 'right' }}>
                                <div className={classTableThDiv}>
                                    {t('description.action')}
                                </div>
                            </th>
                        </tr>

                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>

            <UserTable loadedObject={loadedUser} loading={loading} />
            <PostsIn loadedObjects={postName} loading={loading} />
            <PostAdd user_id={location} onPostAdd={onPostAdd} />

        </div >
    )
}

