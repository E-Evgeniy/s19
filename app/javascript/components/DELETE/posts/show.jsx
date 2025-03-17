import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { useLocation, NavLink } from 'react-router-dom';
import PostTable from "./post_table"
import Files from '../files';

export default function PostShow() {
    const { t } = useTranslation();
    const [loadedPost, setLoadedPost] = useState([])
    const [loading, setloading] = useState(true)

    const [files, setFiles] = useState([]);

    const ROOT_ADDRESS = 'posts'

    let location = useLocation().pathname.split(`${ROOT_ADDRESS}/`)[1];

    useEffect(() => {
        const apiEndpoint = `/api/v1/${ROOT_ADDRESS}/` + location

        fetch(apiEndpoint)
            .then(response => response.json())

            .then(data => {
                setLoadedPost(data["post"])
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
                            <NavLink to="/posts/new">{t('description.post_new')}</NavLink>
                        </div>
                        <div className=" h-8 w-px bg-gray-300"></div>
                    </div>
                    <div className="flex h-full items-center  hover:bg-black hover:bg-opacity-50">
                        <div className="mx-4 text-white">
                            <NavLink to="/posts/">{t('description.posts')}</NavLink>
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


            <div className="font-bold text-xl flex Posts-center justify-center py-5">
                {t('description.post')} {loadedPost.name}</div>

            
                <div className="w-full px-2">
                <table className="w-full h-full" style={{ tableLayout: 'fixed' }}>
                    <thead>
                        <tr className="bg-gray-150 border-b">
                            <th className="p-2 border-r text-sm font-bold text-white bg-blue-600 w-1/3">
                                <div className="flex items-center justify-center">
                                    {t('description.post')}
                                </div>
                            </th>
                            <th className="p-2 border-r text-sm font-bold text-white bg-blue-600 w-1/3">
                                <div className="flex items-center justify-center">
                                    {t('description.description')}
                                </div>
                            </th>                           
                            <th className="p-2 border-r text-sm font-bold text-white bg-blue-600 w-1/3">
                                <div className="flex items-center justify-center">
                                    {t('description.action')}
                                </div>
                            </th>                           
                        </tr>
                    </thead>
                </table>
            </div>
            <PostTable loadedObject={loadedPost} loading={loading} />
            <Files files={files} loading={loading} />

        </div >
    )

}

