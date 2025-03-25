import React from "react";
import { useTranslation } from 'react-i18next';


export default function MainPage() {
    const { t } = useTranslation();
    return (
        <div>        
            <main>
                <section>
                    <div className="bg-gray-100 sm:grid grid-cols-7 px-4 py-6 min-h-full lg:min-h-screen space-y-6 sm:space-y-0 sm:gap-4">
                        <div className="h-96 col-span-1 ">
                            <div className="bg-white  rounded-md">
                                <h1 className="bg-blue-200 text-center text-xl py-2 rounded-md border-b-2 text-gray-600 font-bold">{t('description.exams')}</h1>
                                <div className="bg-white rounded-md list-none  text-center ">                                                                        
                                    <li className="py-3 border-b-2  hover:bg-indigo-200"><a href="/multiplication_table_before" className="list-none  hover:text-indigo-900 hover:text-lg hover:font-bold">{t('description.multiplication_table')}</a></li>
                                    <li className="py-3 border-b-2  hover:bg-indigo-200"><a href="/clients" className="list-none  hover:text-indigo-900 hover:text-lg hover:font-bold">{t('description.clients')}</a></li>
                                    <li className="py-3 border-b-2  hover:bg-indigo-200"><a href="/types_of_keys" className="list-none  hover:text-indigo-900 hover:text-lg hover:font-bold">{t('description.types_of_keys')}</a></li>
                                    <li className="py-3 border-b-2  hover:bg-indigo-200"><a href="#" className="list-none  hover:text-indigo-900 hover:text-lg hover:font-bold">{t('description.report')}</a></li>
                                    <li className="py-3  hover:bg-green-200"><a href="#" className="list-none border-b-2 hover:text-indigo-900 hover:text-lg hover:font-bold">{t('description.exit')}</a></li>
                                </div>
                            </div>
                        </div>

                        <div className="h-70 col-span-6 bg-gradient-to-tr from-indigo-400 to-indigo-100 rounded-md h-100">
                            <div className="ml-10 w-100">
                                <h2 className="text-white text-4xl text-center my-10">Добро пожаловать</h2>                                
                            </div>
                        </div>
                    </div>

                </section>

            </main>
        </div>
    )
}
