import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";

export default function FormEdit() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [files, setFiles] = useState([]);

    const [inputName, setInputName] = useState('');
    const [inputClientName, setInputClientName] = useState('');
    const [inputClientId, setInputClientId] = useState('');

    const [editName, setEditName] = useState('')
    const [editClientName, setEditClientName] = useState('');

    const [countEditName, setCountEditName] = useState(0)
    const [countEditClientName, setCountEditClientName] = useState(0)

    const [inputCoefWeight, setInputCoefWeight] = useState(0);  // коэффициент для вычисления веса с поддержками
    const [inputCoefSize, setInputCoefSize] = useState(0);      // коэффициент для вычисления размеров
    const [inputCoefFirstForMatrix, setInputCoefFirstForMatrix] = useState(0);      // первый коэффициент для вычисления веса матрицы
    const [inputCoefSecondForMatrix, setInputCoefSecondForMatrix] = useState(0);    // второй коэффициент для вычисления веса матрицы
    const [inputDevider, setInputDevider] = useState(0);        // делитель
    const [inputCoefWorkPrint, setInputCoefWorkPrint] = useState(0);  // коэффициент для вычисления стоимости работы по печати
    const [inputCoefMakeMasterModel, setInputCoefMakeMasterModel] = useState(0);    // коэффициент для вычисления стоимости работы по изготовлению мастер модели
    const [inputCoefMakeMatrix, setInputCoefMakeMatrix] = useState(0);    // коэффициент для вычисления стоимости работы по изготовлению мастер модели
    const [inputCoefPlasticCasting, setInputCoefPlasticCasting] = useState(0);    // коэффициент для вычисления стоимости работы по изготовлению мастер модели
    const [inputCoefClientPrinting, setInputCoefClientPrinting] = useState(0);    // коэффициент для вычисления стоимости работы по клиент печати
    const [inputCoefMakeMatrixUnit, setInputCoefMakeMatrixUnit] = useState(0);    //  коэффициент для вычления стоимости литья за шт
    const [inputTax, setInputTax] = useState(0);    // налог в процентах
    const [inputCostSilicone, setInputCostSilicone] = useState('');    // стоимость силикона за кгисления стоимости работы по изготовлению матрицы за единицу
    const [inputCoefCastingUnit, setInputCoefCastingUnit] = useState(0);    // коэффициент для вычис
    const [inputCostPlastic, setInputCostPlastic] = useState('');      // стоимость пластика за кг
    const [inputCostPhotopolymer, setInputCostPhotopolymer] = useState('');      // стоимость фотополимера
    const [inputCostPLA, setInputCostPLA] = useState('');      // стоимость ПЛА


    const [searchFilelds, setSearchFilelds] = useState('');
    const [clientNameFromTable, setClientNameFromTable] = useState(false);

    const [csrfToken, setCsrfToken] = useState(null);

    useEffect(() => {
        // Ищем мета-тег с CSRF Token и сохраняем его значение в состоянии
        const csrfMetaTag = document.querySelector('meta[name="csrf-token"]');
        if (csrfMetaTag) {
          setCsrfToken(csrfMetaTag.content);
        }
      }, []);


    const ROOT_ADDRESS = 'item_orders'

    let location = useLocation().pathname.split(`${ROOT_ADDRESS}/`)[1];
    location = location.split('/edit')[0];

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();

        formData.append("item_order[name]", finalValue(inputName, countEditName, editName));
        formData.append("item_order[client_id]", inputClientId);

        formData.append("item_order[coefficient_weight]", inputCoefWeight);
        formData.append("item_order[coefficient_size]", inputCoefSize);
        formData.append("item_order[coefficient_first_for_matrix]", inputCoefFirstForMatrix);
        formData.append("item_order[coefficient_second_for_matrix]", inputCoefSecondForMatrix);
        formData.append("item_order[divider]", inputDevider);
        formData.append("item_order[coefficient_printing_works]", inputCoefWorkPrint);
        formData.append("item_order[coefficient_make_master_model]", inputCoefMakeMasterModel);
        formData.append("item_order[coefficient_make_matrix]", inputCoefMakeMatrix);
        formData.append("item_order[coefficient_work_plastic_casting]", inputCoefPlasticCasting);        
        formData.append("item_order[coefficient_client_printing]", inputCoefClientPrinting);
        formData.append("item_order[coefficient_make_matrix_unit]", inputCoefMakeMatrixUnit);
        formData.append("item_order[coefficient_casting_unit]", inputCoefCastingUnit);
        formData.append("item_order[coefficient_tax]", inputTax);
        formData.append("item_order[the_cost_of_silicone_per_kg]", inputCostSilicone);
        formData.append("item_order[the_cost_of_plastic_per_kg]", inputCostPlastic);
        formData.append("item_order[the_cost_of_photopolymer]", inputCostPhotopolymer);
        formData.append("item_order[the_cost_of_PLA]", inputCostPLA);

        for (const file of files) {
            formData.append("item_order[files][]", file);
        }

        try {
            await axios.patch(`/api/v1/${ROOT_ADDRESS}/${location}`, formData, {
                headers: {
                    'X-CSRF-TOKEN': csrfToken
                }
            });
            navigate(`/${ROOT_ADDRESS}/${location}`);
        } catch (error) {
            console.log(error.response);
            // обработать ошибки и отобразить их пользователю
        }
        navigate(`/${ROOT_ADDRESS}/${location}`);
    };


    const handleFilesChange = (event) => {
        const newFiles = Array.from(event.target.files);
        setFiles([...files, ...newFiles]);
    };

    const handleFileRemove = (index) => {
        const newFiles = [...files];
        newFiles.splice(index, 1);
        setFiles(newFiles);
    };

    const handleNameChange = (event) => {
        setInputName(event.target.value);
        setCountEditName(countEditName + 1)
    };

    const handleClientNameChange = (event) => {
        setInputClientName(event.target.value);
        setCountEditClientName(countEditClientName + 1)
        setSearchFilelds(event.target.value);
    }

    const handleCoefWeight = (event) => {
        setInputCoefWeight(event.target.value);
    };

    const handleCoefSize = (event) => {
        setInputCoefSize(event.target.value);
    };

    const handleCoefFirstForMatrix = (event) => {
        setInputCoefFirstForMatrix(event.target.value);
    };

    const handleCoefSecondForMatrix = (event) => {
        setInputCoefSecondForMatrix(event.target.value);
    };

    const handleDevider = (event) => {
        setInputDevider(event.target.value);
    };

    const handleCoefWorkPrint = (event) => {
        setInputCoefWorkPrint(event.target.value);
    };

    const handleCoefMakeMasterModel = (event) => {
        setInputCoefMakeMasterModel(event.target.value);
    };

    const handleCoefMakeMatrix = (event) => {
        setInputCoefMakeMatrix(event.target.value);
    };

    const handleCoefPlasticCasting = (event) => {
        setInputCoefPlasticCasting(event.target.value);
    };

    const handleCoefClientPrinting = (event) => {
        setInputCoefClientPrinting(event.target.value);
    };

    const handleCoefMakeMatrixUnit = (event) => {
        setInputCoefMakeMatrixUnit(event.target.value);
    };

    const handleCoefCastingUnit = (event) => {
        setInputCoefCastingUnit(event.target.value);
    };

    const handleTax = (event) => {
        setInputTax(event.target.value);
    };

    const handleCostSilicone = (event) => {
        setInputCostSilicone(event.target.value);
    };

    const handleCostPlastic = (event) => {
        setInputCostPlastic(event.target.value);
    };

    const handleCostPhotopolymer = (event) => {
        setInputCostPhotopolymer(event.target.value);
    };

    const handleCostPLA = (event) => {
        setInputCostPLA(event.target.value);
    };

    let classClientNameFiled = "w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#f44336] focus:shadow-md"
    let classClientNameError = "text-red-600"
    let text_error = ''

    if (inputClientName == '' && countEditClientName > 0) {
      text_error = t('description.no_empty_field')
      
    } else if (clientNameFromTable == false) {
        text_error = t('description.error_client_name')
    } else if  (countEditClientName == 0) {
        classClientNameError = "invisible"
        classClientNameFiled = "w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
    }

    useEffect(() => {
        const apiEndpoint = `/api/v1/${ROOT_ADDRESS.slice(0, -1)}/find_for_edit?id=${location}&input_client_name=${inputClientName}&count_edit_name=${countEditClientName}`

        fetch(apiEndpoint)
            .then(response => response.json())
            .then(data => {
                setClientNameFromTable(data["client_name_valid"])
                setEditClientName(data["client_name"])
                setEditName(data["order_name"])
                setInputClientId(data["client_id"])
                setInputCoefWeight(data["coefficient_weight"])
                setInputCoefSize(data["coefficient_size"])
                setInputCoefFirstForMatrix(data["coefficient_first_for_matrix"])
                setInputCoefSecondForMatrix(data["coefficient_second_for_matrix"])
                setInputDevider(data["divider"])
                setInputCoefWorkPrint(data["coefficient_printing_works"])
                setInputCoefMakeMasterModel(data["coefficient_make_master_model"])
                setInputCoefMakeMatrix(data["coefficient_make_matrix"])
                setInputCoefPlasticCasting(data["coefficient_work_plastic_casting"])
                setInputCoefClientPrinting(data["coefficient_client_printing"])
                setInputCoefMakeMatrixUnit(data["coefficient_make_matrix_unit"])
                setInputTax(data["coefficient_casting_unit"])
                setInputCostSilicone(data["coefficient_tax"])
                setInputCoefCastingUnit(data["the_cost_of_silicone_per_kg"])
                setInputCostPlastic(data["the_cost_of_plastic_per_kg"])
                setInputCostPhotopolymer(data["the_cost_of_photopolymer"])
                setInputCostPLA(data["the_cost_of_PLA"])
            }
            );
    }, [searchFilelds])

    let disableButton = false

    
    if ((inputClientName == '' || clientNameFromTable == false) && (countEditClientName > 0)) {
        disableButton = true
    
    } else if (clientNameFromTable == true && countEditClientName > 0) {
        disableButton = false
    }
    
    let finalValue = (inputObject, countEditObject, editObject) => {      
        let rezult = inputObject
        if (countEditObject == 0) {
          rezult = editObject
        }
        if (rezult == null) {
            rezult = ''
        }       
        return rezult
      }

    let classNameFiled = "w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
    let classDescriptionButton = "hover:shadow-form rounded-md bg-blue-600 hover:bg-blue-800 py-3 px-8 text-base font-semibold text-white outline-none  disabled:opacity-75"
    let classSimpleFiled = "w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"

    return (
        <div>
            <div className="font-bold text-xl flex items-center justify-center py-8">
                {t('description.item_order_edit')}
            </div>

            <form onSubmit={handleSubmit}>
                <div className="flex items-center justify-center p-2">
                    <div className="mx-auto w-full max-w-[550px]">

                        <div className="mb-5">
                            <div className="mb-3 block text-base font-medium text-[#07074D]">
                                <label htmlFor={t('description.contract_name')} >{t('description.contract_name')}</label>
                                <input
                                    id={t('description.contract_name')}
                                    type={t('description.contract_name')}
                                    name={t('description.contract_name')}
                                    value={finalValue(inputName, countEditName, editName)}
                                    onChange={handleNameChange}
                                    className={classNameFiled}
                                    placeholder={t('description.enter_contract_name')}
                                />                                
                            </div>
                        </div>

                        <div className="mb-5">
                            <div className="mb-3 block text-base font-medium text-[#07074D]">
                                <label htmlFor={t('description.client_name')} >{t('description.client_name')}</label>
                                <input
                                    id={t('description.client_name')}
                                    type={t('description.client_name')}
                                    name={t('description.client_name')}
                                    value={finalValue(inputClientName, countEditClientName, editClientName)}
                                    onChange={handleClientNameChange}
                                    className={classClientNameFiled}
                                    placeholder={t('description.enter_client_name')}
                                />
                                <div className={classClientNameError}>{text_error}</div>
                            </div>
                        </div>

                        <div className="mb-5">
                            <div className="mb-3 block text-base font-medium text-[#07074D]">
                                <label htmlFor={t('description.coef_weight')} >{t('description.coef_weight')}</label>
                                <input
                                    id={t('description.coef_weight')}
                                    type={t('description.coef_weight')}
                                    name={t('description.coef_weight')}
                                    value={inputCoefWeight}
                                    onChange={handleCoefWeight}
                                    className={classSimpleFiled}
                                    placeholder={t('description.enter_coef')}
                                />
                            </div>
                        </div>

                        <div className="mb-5">
                            <div className="mb-3 block text-base font-medium text-[#07074D]">
                                <label htmlFor={t('description.coef_size')} >{t('description.coef_size')}</label>
                                <input
                                    id={t('description.coef_size')}
                                    type={t('description.coef_size')}
                                    name={t('description.coef_size')}
                                    value={inputCoefSize}
                                    onChange={handleCoefSize}
                                    className={classSimpleFiled}
                                    placeholder={t('description.enter_coef')}
                                />
                            </div>
                        </div>

                        <div className="mb-5">
                            <div className="mb-3 block text-base font-medium text-[#07074D]">
                                <label htmlFor={t('description.coef_first_for_matrix')} >{t('description.coef_first_for_matrix')}</label>
                                <input
                                    id={t('description.coef_first_for_matrix')}
                                    type={t('description.coef_first_for_matrix')}
                                    name={t('description.coef_first_for_matrix')}
                                    value={inputCoefFirstForMatrix}
                                    onChange={handleCoefFirstForMatrix}
                                    className={classSimpleFiled}
                                    placeholder={t('description.enter_coef')}
                                />
                            </div>
                        </div>

                        <div className="mb-5">
                            <div className="mb-3 block text-base font-medium text-[#07074D]">
                                <label htmlFor={t('description.coef_second_for_matrix')} >{t('description.coef_second_for_matrix')}</label>
                                <input
                                    id={t('description.coef_second_for_matrix')}
                                    type={t('description.coef_second_for_matrix')}
                                    name={t('description.coef_second_for_matrix')}
                                    value={inputCoefSecondForMatrix}
                                    onChange={handleCoefSecondForMatrix}
                                    className={classSimpleFiled}
                                    placeholder={t('description.enter_coef')}
                                />
                            </div>
                        </div>


                        <div className="mb-5">
                            <div className="mb-3 block text-base font-medium text-[#07074D]">
                                <label htmlFor={t('description.coef_devider')} >{t('description.coef_devider')}</label>
                                <input
                                    id={t('description.coef_devider')}
                                    type={t('description.coef_devider')}
                                    name={t('description.coef_devider')}
                                    value={inputDevider}
                                    onChange={handleDevider}
                                    className={classSimpleFiled}
                                    placeholder={t('description.enter_coef')}
                                />
                            </div>
                        </div>

                        <div className="mb-5">
                            <div className="mb-3 block text-base font-medium text-[#07074D]">
                                <label htmlFor={t('description.coef_work_print')} >{t('description.coef_work_print')}</label>
                                <input
                                    id={t('description.coef_work_print')}
                                    type={t('description.coef_work_print')}
                                    name={t('description.coef_work_print')}
                                    value={inputCoefWorkPrint}
                                    onChange={handleCoefWorkPrint}
                                    className={classSimpleFiled}
                                    placeholder={t('description.enter_coef')}
                                />
                            </div>
                        </div>

                        <div className="mb-5">
                            <div className="mb-3 block text-base font-medium text-[#07074D]">
                                <label htmlFor={t('description.coef_make_master_model')} >{t('description.coef_make_master_model')}</label>
                                <input
                                    id={t('description.coef_make_master_model')}
                                    type={t('description.coef_make_master_model')}
                                    name={t('description.coef_make_master_model')}
                                    value={inputCoefMakeMasterModel}
                                    onChange={handleCoefMakeMasterModel}
                                    className={classSimpleFiled}
                                    placeholder={t('description.enter_coef')}
                                />
                            </div>
                        </div>

                        <div className="mb-5">
                            <div className="mb-3 block text-base font-medium text-[#07074D]">
                                <label htmlFor={t('description.coef_make_matrix')} >{t('description.coef_make_matrix')}</label>
                                <input
                                    id={t('description.coef_make_matrix')}
                                    type={t('description.coef_make_matrix')}
                                    name={t('description.coef_make_matrix')}
                                    value={inputCoefMakeMatrix}
                                    onChange={handleCoefMakeMatrix}
                                    className={classSimpleFiled}
                                    placeholder={t('description.enter_coef')}
                                />
                            </div>
                        </div>

                        <div className="mb-5">
                            <div className="mb-3 block text-base font-medium text-[#07074D]">
                                <label htmlFor={t('description.coef_plastic_casting')} >{t('description.coef_plastic_casting')}</label>
                                <input
                                    id={t('description.coef_plastic_casting')}
                                    type={t('description.coef_plastic_casting')}
                                    name={t('description.coef_plastic_casting')}
                                    value={inputCoefPlasticCasting}
                                    onChange={handleCoefPlasticCasting}
                                    className={classSimpleFiled}
                                    placeholder={t('description.enter_coef')}
                                />
                            </div>
                        </div>

                        <div className="mb-5">
                            <div className="mb-3 block text-base font-medium text-[#07074D]">
                                <label htmlFor={t('description.coef_printing')} >{t('description.coef_printing')}</label>
                                <input
                                    id={t('description.coef_printing')}
                                    type={t('description.coef_printing')}
                                    name={t('description.coef_printing')}
                                    value={inputCoefClientPrinting}
                                    onChange={handleCoefClientPrinting}
                                    className={classSimpleFiled}
                                    placeholder={t('description.enter_coef')}
                                />
                            </div>
                        </div>

                        <div className="mb-5">
                            <div className="mb-3 block text-base font-medium text-[#07074D]">
                                <label htmlFor={t('description.coef_make_matrix_unit')} >{t('description.coef_make_matrix_unit')}</label>
                                <input
                                    id={t('description.coef_make_matrix_unit')}
                                    type={t('description.coef_make_matrix_unit')}
                                    name={t('description.coef_make_matrix_unit')}
                                    value={inputCoefMakeMatrixUnit}
                                    onChange={handleCoefMakeMatrixUnit}
                                    className={classSimpleFiled}
                                    placeholder={t('description.enter_coef')}
                                />
                            </div>
                        </div>

                        <div className="mb-5">
                            <div className="mb-3 block text-base font-medium text-[#07074D]">
                                <label htmlFor={t('description.coef_casting_unit')} >{t('description.coef_casting_unit')}</label>
                                <input
                                    id={t('description.coef_casting_unit')}
                                    type={t('description.coef_casting_unit')}
                                    name={t('description.coef_casting_unit')}
                                    value={inputCoefCastingUnit}
                                    onChange={handleCoefCastingUnit}
                                    className={classSimpleFiled}
                                    placeholder={t('description.enter_coef')}
                                />
                            </div>
                        </div>

                        <div className="mb-5">
                            <div className="mb-3 block text-base font-medium text-[#07074D]">
                                <label htmlFor={t('description.tax')} >{t('description.tax')}</label>
                                <input
                                    id={t('description.tax')}
                                    type={t('description.tax')}
                                    name={t('description.tax')}
                                    value={inputTax}
                                    onChange={handleTax}
                                    className={classSimpleFiled}
                                    placeholder={t('description.enter_coef')}
                                />
                            </div>
                        </div>

                        <div className="mb-5">
                            <div className="mb-3 block text-base font-medium text-[#07074D]">
                                <label htmlFor={t('description.cost_silicone')} >{t('description.cost_silicone')}</label>
                                <input
                                    id={t('description.cost_silicone')}
                                    type={t('description.cost_silicone')}
                                    name={t('description.cost_silicone')}
                                    value={inputCostSilicone}
                                    onChange={handleCostSilicone}
                                    className={classSimpleFiled}
                                    placeholder={t('description.enter_cost')}
                                />
                            </div>
                        </div>

                        <div className="mb-5">
                            <div className="mb-3 block text-base font-medium text-[#07074D]">
                                <label htmlFor={t('description.cost_plastic')} >{t('description.cost_plastic')}</label>
                                <input
                                    id={t('description.cost_plastic')}
                                    type={t('description.cost_plastic')}
                                    name={t('description.cost_plastic')}
                                    value={inputCostPlastic}
                                    onChange={handleCostPlastic}
                                    className={classSimpleFiled}
                                    placeholder={t('description.enter_cost')}
                                />
                            </div>
                        </div>

                        <div className="mb-5">
                            <div className="mb-3 block text-base font-medium text-[#07074D]">
                                <label htmlFor={t('description.cost_photopolymer')} >{t('description.cost_photopolymer')}</label>
                                <input
                                    id={t('description.cost_photopolymer')}
                                    type={t('description.cost_photopolymer')}
                                    name={t('description.cost_photopolymer')}
                                    value={inputCostPhotopolymer}
                                    onChange={handleCostPhotopolymer}
                                    className={classSimpleFiled}
                                    placeholder={t('description.enter_cost')}
                                />
                            </div>
                        </div>

                        <div className="mb-5">
                            <div className="mb-3 block text-base font-medium text-[#07074D]">
                                <label htmlFor={t('description.cost_PLA')} >{t('description.cost_PLA')}</label>
                                <input
                                    id={t('description.cost_PLA')}
                                    type={t('description.cost_PLA')}
                                    name={t('description.cost_PLA')}
                                    value={inputCostPLA}
                                    onChange={handleCostPLA}
                                    className={classSimpleFiled}
                                    placeholder={t('description.enter_cost')}
                                />
                            </div>
                        </div>

                        <div className="mb-5">
                            <div className="mb-3 block text-base font-medium text-[#07074D]">
                                <label htmlFor={t('description.add_files')}>{t('description.add_files')}</label>
                                <p></p>
                                <input
                                    type="file"
                                    className="form-control-file"
                                    id="files"
                                    multiple
                                    onChange={handleFilesChange}
                                />
                                <p className="invisible">.</p>
                                <ul>
                                    {files.map((file, index) => (
                                        <li key={index}>
                                            {file.name}{" "}
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-danger text-[#FF0000]"
                                                onClick={() => handleFileRemove(index)}
                                            >
                                                {t('description.file_delete')}
                                            </button>
                                        </li>
                                    ))}
                                </ul>

                            </div>
                        </div>

                        <button
                            type="submit"
                            className={classDescriptionButton}
                            disabled={disableButton}>
                            {t('description.material_order_update')}
                        </button>

                    </div>
                </div>



            </form>
        </div >
    )
}