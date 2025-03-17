import React from "react";
import { useTranslation } from 'react-i18next';

export default function HeadData2(props) {
    const { t } = useTranslation();

    const loadingSection = (<div>{t('description.loading')}</div>)

    const class_table_head = "w-2/5 h-full"
    const class_tr_head = "bg-gray-150 border-b"
    const class_th0_head = "p-2 border-1 border-black text-sm  text-black w-1/6"
    const class_th_head = "p-2 border-1 border-black text-sm  text-black bg-yellow-200 w-1/6"
    const class_td_head = "p-2 border-1 border-black text-center align-middle w-1/6"
    const class_div_head = "flex items-center justify-center"
    

    const dataSection = (
        <div>
            <div className="w-full px-2">
                <table className={class_table_head} style={{ tableLayout: 'fixed' }}>
                    <thead>
                        <tr className={class_tr_head}>
                            <th className={class_th0_head}>
                                <div className={class_div_head}>
                                    {t('description.data_order')}
                                </div>
                            </th>
                            <td className={class_td_head}>
                                </td>
                        </tr>
                        <tr className={class_tr_head}>
                            <th className={class_th_head}>
                                <div className={class_div_head}>
                                    {t('description.matrix_gr')}
                                </div>
                            </th>
                            <td className={class_td_head}>
                                {props.loadedItemOrder['weight']}</td>
                        </tr>
                        <tr className={class_tr_head}>
                            <th className={class_th_head}>
                                <div className={class_div_head}>
                                    {t('description.cost_of_printing')}
                                </div>
                            </th>
                            <td className={class_td_head}>
                                {props.loadedItemOrder['cost_price_print']}</td>
                        </tr>
                        <tr className={class_tr_head}>
                            <th className={class_th_head}>
                                <div className={class_div_head}>
                                    {t('description.cost_of_printing_unit')}
                                </div>
                            </th>
                            <td className={class_td_head}>
                                {props.loadedItemOrder['cost_price_matrix_unit']}</td>
                        </tr>
                        <tr className={class_tr_head}>
                            <th className={class_th_head}>
                                <div className={class_div_head}>
                                    {t('description.cost_of_printing_vol')}
                                </div>
                            </th>
                            <td className={class_td_head}>
                                {props.loadedItemOrder['cost_price_matrix_volume']}</td>
                        </tr>
                        <tr className={class_tr_head}>
                            <th className={class_th_head}>
                                <div className={class_div_head}>
                                    {t('description.casting_cost_of_plastic_per_unit')}
                                </div>
                            </th>
                            <td className={class_td_head}>
                                {props.loadedItemOrder['casting_cost_of_plastic_per_unit']}</td>
                        </tr>

                        <tr className={class_tr_head}>
                            <th className={class_th_head}>
                                <div className={class_div_head}>
                                    {t('description.casting_total_cost_of_the_material')}
                                </div>
                            </th>
                            <td className={class_td_head}>
                            {props.loadedItemOrder['casting_total_cost_of_the_material']}</td>
                        </tr>

                        <tr className={class_tr_head}>
                            <th className={class_th_head}>
                                <div className={class_div_head}>
                                    {t('description.printin_works')}
                                </div>
                            </th>
                            <td className={class_td_head}>
                                {props.loadedItemOrder['printin_works']}</td>
                        </tr>

                        <tr className={class_tr_head}>
                            <th className={class_th_head}>
                                <div className={class_div_head}>
                                    {t('description.work_on_the_production_of_the_master_model')}
                                </div>
                            </th>
                            <td className={class_td_head}>
                                {props.loadedItemOrder['work_make_master_model']}</td>
                        </tr>

                        <tr className={class_tr_head}>
                            <th className={class_th_head}>
                                <div className={class_div_head}>
                                    {t('description.work_make_matrix_1gr')}
                                </div>
                            </th>
                            <td className={class_td_head}>
                                {props.loadedItemOrder['work_make_matrix_1gr']}</td>
                        </tr>

                        <tr className={class_tr_head}>
                            <th className={class_th_head}>
                                <div className={class_div_head}>
                                    {t('description.work_casting_plastic')}
                                </div>
                            </th>
                            <td className={class_td_head}>
                                {props.loadedItemOrder['work_plastic_casting']}</td>
                        </tr>

                        <tr className={class_tr_head}>
                            <th className={class_th_head}>
                                <div className={class_div_head}>
                                    {t('description.work_casting_total')}
                                </div>
                            </th>
                            <td className={class_td_head}>
                                {props.loadedItemOrder['work_casting_total']}</td>
                        </tr>

                        <tr className={class_tr_head}>
                            <th className={class_th_head}>
                                <div className={class_div_head}>
                                    {t('description.client_print')}
                                </div>
                            </th>
                            <td className={class_td_head}>
                                {props.loadedItemOrder['client_printing']}</td>
                        </tr>

                        <tr className={class_tr_head}>
                            <th className={class_th_head}>
                                <div className={class_div_head}>
                                    {t('description.mm_print_make_mm')}
                                </div>
                            </th>
                            <td className={class_td_head}>
                                {props.loadedItemOrder['mm_print_make_mm']}</td>
                        </tr>

                        <tr className={class_tr_head}>
                            <th className={class_th_head}>
                                <div className={class_div_head}>
                                    {t('description.service_mm_unit')}
                                </div>
                            </th>
                            <td className={class_td_head}>
                                {props.loadedItemOrder['service_mm_unit']}</td>
                        </tr>

                        <tr className={class_tr_head}>
                            <th className={class_th_head}>
                                <div className={class_div_head}>
                                    {t('description.service_matrix')}
                                </div>
                            </th>
                            <td className={class_td_head}>
                                {props.loadedItemOrder['service_matrix']}</td>
                        </tr>

                        <tr className={class_tr_head}>
                            <th className={class_th_head}>
                                <div className={class_div_head}>
                                    {t('description.casting_unit')}
                                </div>
                            </th>
                            <td className={class_td_head}>
                                {props.loadedItemOrder['casting_unit']}</td>
                        </tr>

                        <tr className={class_tr_head}>
                            <th className={class_th_head}>
                                <div className={class_div_head}>
                                    {t('description.casting_volume')}
                                </div>
                            </th>
                            <td className={class_td_head}>
                                {props.loadedItemOrder['casting_volume']}</td>
                        </tr>

                        <tr className={class_tr_head}>
                            <th className={class_th_head}>
                                <div className={class_div_head}>
                                    {t('description.casting_sum')}
                                </div>
                            </th>
                            <td className={class_td_head}>
                                {props.loadedItemOrder['casting_sum']}</td>
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