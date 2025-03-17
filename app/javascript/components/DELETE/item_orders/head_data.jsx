import React from "react";
import { useTranslation } from 'react-i18next';

export default function HeadData(props) {
    const { t } = useTranslation();

    const loadingSection = (<div>{t('description.loading')}</div>)

    const class_table_head = "w-2/5 h-full"
    const class_tr_head = "bg-gray-150 border-b"
    const class_th_head = "p-2 border-1 border-black text-sm  text-black bg-blue-200 w-1/6"
    const class_th_head_1 = "p-2 border-1 border-black text-sm  text-black bg-green-500 w-1/6"
    const class_td_head = "p-2 border-1 border-black text-center align-middle w-1/6"
    const class_descr_head = "flex items-center justify-center"

    const dataSection = (
        <div>
            <div className="w-full px-2">
                <table className={class_table_head} style={{ tableLayout: 'fixed' }}>
                    <thead>
                        <tr className={class_tr_head}>
                            <th className={class_th_head}>
                                <div className={class_descr_head}>
                                    {t('description.cost_silicone')}
                                </div>
                            </th>
                            <td className={class_td_head}>
                                {props.loadedItemOrder['the_cost_of_silicone_per_kg']}</td>
                        </tr>
                        <tr className={class_tr_head}>
                            <th className={class_th_head}>
                                <div className={class_descr_head}>
                                    {t('description.cost_plastic')}
                                </div>
                            </th>
                            <td className={class_td_head}>
                                {props.loadedItemOrder['the_cost_of_plastic_per_kg']}</td>
                        </tr>
                        <tr className={class_tr_head}>
                            <th className={class_th_head}>
                                <div className={class_descr_head}>
                                    {t('description.cost_photopolymer')}
                                </div>
                            </th>
                            <td className={class_td_head}>
                                {props.loadedItemOrder['the_cost_of_photopolymer']}</td>
                        </tr>
                        <tr className={class_tr_head}>
                            <th className={class_th_head}>
                                <div className={class_descr_head}>
                                    {t('description.cost_PLA')}
                                </div>
                            </th>
                            <td className={class_td_head}>
                                {props.loadedItemOrder['the_cost_of_PLA']}</td>
                        </tr>
                        <tr className={class_tr_head}>
                            <th className={class_th_head}>
                                <div className={class_descr_head}>
                                    {t('description.revenue')}
                                </div>
                            </th>
                            <td className={class_td_head}>
                                {props.loadedItemOrder['revenue']}</td>
                        </tr>
                        <tr className={class_tr_head}>
                            <th className={class_th_head}>
                                <div className={class_descr_head}>
                                    {t('description.tax_money')}
                                </div>
                            </th>
                            <td className={class_td_head}>
                                {props.loadedItemOrder['tax']}</td>
                        </tr>

                        <tr className={class_tr_head}>
                            <th className={class_th_head}>
                                <div className={class_descr_head}>
                                    {t('description.salary_expenses')}
                                </div>
                            </th>
                            <td className={class_td_head}>
                                {props.loadedItemOrder['salary_expenses']}</td>
                        </tr>

                        <tr className={class_tr_head}>
                            <th className={class_th_head}>
                                <div className={class_descr_head}>
                                    {t('description.silicone_expenses')}
                                </div>
                            </th>
                            <td className={class_td_head}>
                                {props.loadedItemOrder['silicone_expenses']}</td>
                        </tr>

                        <tr className={class_tr_head}>
                            <th className={class_th_head}>
                                <div className={class_descr_head}>
                                    {t('description.plastic_expenses')}
                                </div>
                            </th>
                            <td className={class_td_head}>
                                {props.loadedItemOrder['plastic_expenses']}</td>
                        </tr>

                        <tr className={class_tr_head}>
                            <th className={class_th_head}>
                                <div className={class_descr_head}>
                                    {t('description.print_expenses')}
                                </div>
                            </th>
                            <td className={class_td_head}>
                                {props.loadedItemOrder['print_expenses']}</td>
                        </tr>

                        <tr className={class_tr_head}>
                            <th className={class_th_head_1}>
                                <div className={class_descr_head}>
                                    {t('description.profit')}
                                </div>
                            </th>
                            <td className={class_td_head}>
                                {props.loadedItemOrder['profit']}</td>
                        </tr>

                        <tr className={class_tr_head}>
                            <th className={class_th_head_1}>
                                <div className={class_descr_head}>
                                    {t('description.profit_percent')}
                                </div>
                            </th>
                            <td className={class_td_head}>
                                {props.loadedItemOrder['profit_percent']}</td>
                        </tr>
                    </thead>
                </table>
            </div>



        </div>

    )

    if (props.loading) {
        return loadingSection
    } else {
        return dataSection
    }
}