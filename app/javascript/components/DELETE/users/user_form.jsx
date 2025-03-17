import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';

export default function UserForm() {
  const { t } = useTranslation();

  const [inputFirstName, setInputFirstName] = useState('')
  const [inputLastName, setInputLastName] = useState('')
  const [inputPatronymic, setInputPatronymic] = useState('')
  const [inputEmail, setInputEmail] = useState('')
  const [inputPassword, setInputPassword] = useState('')
  const [inputPasswordConfirm, setInputPasswordConfirm] = useState('')
  const [inputPost, setInputPost] = useState('')
  const [searchFilelds, setSearchFilelds] = useState('')
  const [emailFromTable, setEmailFromTable] = useState(true)
  const [postFromTable, setPostFromTable] = useState(true)
  const [postId, setPostId] = useState('')

  const createUser = () => {

    fetch(`/api/v1/users/`, {
      method: "POST",
      headers: { "Content-Type": "application/json", },
      body: JSON.stringify({
        user: {
          first_name: inputFirstName,
          last_name: inputLastName,
          patronymic: inputPatronymic,
          email: inputEmail,
         // post_id: postId,
          password: inputPassword,
          password_confirmation: inputPasswordConfirm,
        },
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
      })
      .then((data) => console.log(data.message))
      .catch((error) => console.error(error));
    window.location.replace('/users')
  };

  useEffect(() => {
    const apiEndpoint = `/api/v1/user/find_for_create?input_email=${inputEmail}&input_post=${inputPost}`

    fetch(apiEndpoint)
      .then(response => response.json())
      .then(data => {
        setEmailFromTable(data["email_valid"])
        setPostFromTable(data["post_valid"])
        //setPostId(data["post_id"])
      }
      );
  }, [searchFilelds])


  let classEmailFiled = "w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#f44336] focus:shadow-md"
  let classEmailError = "text-red-600"

  if (emailFromTable) {
    classEmailFiled = "w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
    classEmailError = "invisible"
  }

  const onSearchTextChangeInputFirstName = (e) => {
    setInputFirstName(e.target.value);
  }

  const onSearchTextChangeInputLastName = (e) => {
    setInputLastName(e.target.value);
  }

  const onSearchTextChangeInputPatronymic = (e) => {
    setInputPatronymic(e.target.value);
  }

  const onSearchTextChangePost = (e) => {
    setInputPost(e.target.value);
    setSearchFilelds(e.target.value);
  }

  const onSearchTextChangeInputEmail = (e) => {
    setInputEmail(e.target.value);
    setSearchFilelds(e.target.value);
  }

  const onSearchTextChangePassword = (e) => {
    setInputPassword(e.target.value);
  }

  const onSearchTextChangePasswordConfirm = (e) => {
    setInputPasswordConfirm(e.target.value);
  }

  //let classPostFiled = "w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#f44336] focus:shadow-md"
  //let classPostError = "text-red-600"
  //let text_error = t('description.error_post_empty')

  if (inputPost == '') {
    //text_error = t('description.post_error_exist')
  }
  else if (postFromTable == false) {
    //classPostFiled = "w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
    //classPostError = "invisible"
  }

  let classNameButton = "hover:shadow-form rounded-md bg-blue-600 hover:bg-blue-800 py-3 px-8 text-base font-semibold text-white outline-none  disabled:opacity-75"

  let disableButton = false

  if (inputEmail == '' || emailFromTable == false ||
    inputFirstName == ''   ) {  // || inputPost == '' || postFromTable == true
    disableButton = true
  }



  return (
    <div>
      <div className="font-bold text-xl flex items-center justify-center py-8">
        {t('description.user_create')}
      </div>

      <div className="flex items-center justify-center p-2">
        <div className="mx-auto w-full max-w-[550px]">

          <div className="mb-5">
            <label
              htmlhtmlfor={t('description.last_name')}
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              {t('description.last_name')}
            </label>
            <input
              type={t('description.last_name')}
              name={t('description.last_name')}
              id={t('description.last_name')}
              placeholder={t('description.enter_last_name')}
              onChange={onSearchTextChangeInputLastName}
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
          <div className="mb-5">
            <label
              htmlhtmlfor={t('description.first_name')}
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              {t('description.first_name')}
            </label>
            <input
              type="text"
              name={t('description.first_name')}
              id={t('description.first_name')}
              placeholder={t('description.enter_first_name')}
              onChange={onSearchTextChangeInputFirstName}
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>

          <div className="mb-5">
            <label
              htmlhtmlfor={t('description.patronymic')}
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              {t('description.patronymic')}
            </label>
            <input
              type="text"
              name={t('description.patronymic')}
              id={t('description.patronymic')}
              placeholder={t('description.enter_patronymic')}
              onChange={onSearchTextChangeInputPatronymic}
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
          <div className="mb-5">
            <label
              htmlhtmlfor={t('description.email')}
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              {t('description.email')}
            </label>
            <input
              type="text"
              name={t('description.email')}
              id={t('description.email')}
              placeholder={t('description.enter_email')}
              onChange={onSearchTextChangeInputEmail}
              className={classEmailFiled}
            />
            <div className={classEmailError}>{t('description.error_email')}</div>
          </div>
          

          <div className="mb-5">
            <label
              htmlhtmlfor={t('description.password')}
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              {t('description.password')}
            </label>
            <input
              type="text"
              name={t('description.password')}
              id={t('description.password')}
              placeholder={t('description.enter_password')}
              onChange={onSearchTextChangePassword}
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>

          <div className="mb-5">
            <label
              htmlhtmlfor={t('description.password_confirm')}
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              {t('description.password_confirm')}
            </label>
            <input
              type="text"
              name={t('description.password_confirm')}
              id={t('description.password_confirm')}
              placeholder={t('description.enter_password_confirm')}
              onChange={onSearchTextChangePasswordConfirm}
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>

          <div>
            <button
              className={classNameButton}
              disabled={disableButton}
              onClick={() => createUser()}
            >
              {t('description.create')}
            </button>
          </div>
        </div>
      </div>
    </div >
  )
}
