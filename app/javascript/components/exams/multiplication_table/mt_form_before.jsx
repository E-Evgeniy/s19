import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import {
    headTextClass, headTex0tClass, formClass, form0Class, formElementClass, formElement0Class
} from "../../constants/classes";

export default function MultiplicationTableFormBefore() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [inputMultiplierA0, setInputMultiplierA0] = useState('');
    const [inputMultiplierAn, setInputMultiplierAn] = useState('');
    const [inputMultiplierB0, setInputMultiplierB0] = useState('');
    const [inputMultiplierBn, setInputMultiplierBn] = useState('');
    const [showTooltip, setShowTooltip] = useState(false);

    const ROOT_ADDRESS = 'multiplication_table';
    const PLURAR = 's';

    const blue_border = "w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium " +
        "text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md";

    // Проверяем, все ли поля заполнены
    const isFormValid = inputMultiplierA0 && inputMultiplierAn && inputMultiplierB0 && inputMultiplierBn;

    const multiplierChangeA0 = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setInputMultiplierA0(value);
        }
    };

    const multiplierChangeAn = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setInputMultiplierAn(value);
        }
    };

    const multiplierChangeB0 = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setInputMultiplierB0(value);
        }
    };

    const multiplierChangeBn = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setInputMultiplierBn(value);
        }
    };

    let classMultiplierFiled = blue_border;
    let classButton = `hover:shadow-form rounded-md py-3 px-8 text-base font-semibold text-white outline-none 
        ${isFormValid 
            ? 'bg-blue-600 hover:bg-blue-800 cursor-pointer' 
            : 'bg-gray-400 cursor-not-allowed'}`;

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (!isFormValid) {
            setShowTooltip(true);
            setTimeout(() => setShowTooltip(false), 3000);
            return;
        }

        const formData = new FormData();
        formData.append("tb[a0]", inputMultiplierA0);
        formData.append("tb[an]", inputMultiplierAn);
        formData.append("tb[b0]", inputMultiplierB0);
        formData.append("tb[bn]", inputMultiplierBn);

        try {
            await axios.post(`/api/v1/${ROOT_ADDRESS}${PLURAR}/`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            navigate(`/${ROOT_ADDRESS}${PLURAR}/${location}`);
        } catch (error) {
            console.log(error.response);
        }
        navigate(`/${ROOT_ADDRESS}`);
    };

    return (
        <div>
            <div className={headTextClass}>
                {t('description.choice_range')}
            </div>
            <div className={headTex0tClass}>
                {t('description.a0_b0')}
            </div>
            <div className={headTex0tClass}>
                {t('description.mp')}
            </div>
            <div className={headTex0tClass}>
                {t('description.a1_b1')}
            </div>

            <form onSubmit={handleSubmit}>
                <div className={formClass}>
                    <div className={form0Class}>
                    <div className={formElementClass}>
                            <div className={formElement0Class}>
                                <label htmlFor={t('description.a0')} >{t('description.a0')}</label>
                                <input
                                    id={t('description.a0')}
                                    type="text" // Меняем на text, чтобы избежать стрелок вверх/вниз
                                    inputMode="numeric" // На мобильных устройствах покажет цифровую клавиатуру
                                    pattern="[0-9]*" // Для браузерной валидации
                                    name={t('description.multiplier')}
                                    value={inputMultiplierA0}
                                    onChange={multiplierChangeA0}
                                    className={classMultiplierFiled}
                                    placeholder={t('description.a0')}
                                    onKeyDown={(e) => {
                                        if (!/[0-9]|Backspace|Delete|ArrowLeft|ArrowRight|Tab/.test(e.key)) {
                                            e.preventDefault();
                                        }
                                    }}
                                />
                            </div>
                        </div>

                        <div className={formElementClass}>
                            <div className={formElement0Class}>
                                <label htmlFor={t('description.an')} >{t('description.an')}</label>
                                <input
                                    id={t('description.an')}
                                    type="text" // Меняем на text, чтобы избежать стрелок вверх/вниз
                                    inputMode="numeric" // На мобильных устройствах покажет цифровую клавиатуру
                                    pattern="[0-9]*" // Для браузерной валидации
                                    name={t('description.multiplier')}
                                    value={inputMultiplierAn}
                                    onChange={multiplierChangeAn}
                                    className={classMultiplierFiled}
                                    placeholder={t('description.an')}
                                    onKeyDown={(e) => {
                                        if (!/[0-9]|Backspace|Delete|ArrowLeft|ArrowRight|Tab/.test(e.key)) {
                                            e.preventDefault();
                                        }
                                    }}
                                />
                            </div>
                        </div>

                        <div className={formElementClass}>
                            <div className={formElement0Class}>
                                <label htmlFor={t('description.b0')} >{t('description.b0')}</label>
                                <input
                                    id={t('description.bn')}
                                    type="text" // Меняем на text, чтобы избежать стрелок вверх/вниз
                                    inputMode="numeric" // На мобильных устройствах покажет цифровую клавиатуру
                                    pattern="[0-9]*" // Для браузерной валидации
                                    name={t('description.multiplier')}
                                    value={inputMultiplierB0}
                                    onChange={multiplierChangeB0}
                                    className={classMultiplierFiled}
                                    placeholder={t('description.b0')}
                                    onKeyDown={(e) => {
                                        if (!/[0-9]|Backspace|Delete|ArrowLeft|ArrowRight|Tab/.test(e.key)) {
                                            e.preventDefault();
                                        }
                                    }}
                                />
                            </div>
                        </div>

                        <div className={formElementClass}>
                            <div className={formElement0Class}>
                                <label htmlFor={t('description.bn')} >{t('description.bn')}</label>
                                <input
                                    id={t('description.a0')}
                                    type="text" // Меняем на text, чтобы избежать стрелок вверх/вниз
                                    inputMode="numeric" // На мобильных устройствах покажет цифровую клавиатуру
                                    pattern="[0-9]*" // Для браузерной валидации
                                    name={t('description.multiplier')}
                                    value={inputMultiplierBn}
                                    onChange={multiplierChangeBn}
                                    className={classMultiplierFiled}
                                    placeholder={t('description.bn')}
                                    onKeyDown={(e) => {
                                        if (!/[0-9]|Backspace|Delete|ArrowLeft|ArrowRight|Tab/.test(e.key)) {
                                            e.preventDefault();
                                        }
                                    }}
                                />
                            </div>
                        </div>

                        <div className="relative">
                            <button
                                type="submit"
                                className={classButton}
                                disabled={!isFormValid}
                                onMouseEnter={() => !isFormValid && setShowTooltip(true)}
                                onMouseLeave={() => setShowTooltip(false)}
                            >
                                {t('description.exam_begin')}
                            </button>
                            
                            {showTooltip && !isFormValid && (
                                <div className="absolute bottom-full mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-md">
                                    {t('description.fill_all_fields')}
                                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-gray-800"></div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </form>

            <div>
                {t('description.choice_range')}
            </div>
        </div>
    );
}