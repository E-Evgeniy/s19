import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

export default function UserFormEdit() {
  const { t } = useTranslation();
  const navigate = useNavigate()

  const [inputFirstName, setInputFirstName] = useState('')
  const [inputLastName, setInputLastName] = useState('')
  const [inputPatronymic, setInputPatronymic] = useState('')
  const [inputEmail, setInputEmail] = useState('')
  //const [inputPost, setInputPost] = useState('')
 // const [postId, setPostId] = useState('')

  const [searchFilelds, setSearchFilelds] = useState('')
  const [emailFromTable, setEmailFromTable] = useState(true)

  const [editFirstName, setEditFirstName] = useState('')
  const [editLastName, setEditLastName] = useState('')
  const [editPatronymic, setEditPatronymic] = useState('')
  const [editEmail, setEditEmail] = useState('')
  //const [editPost, setEditPost] = useState('')

  const [countEditFirstName, setCountEditFirstName] = useState(0)
  const [countEditLastName, setCountEditLastName] = useState(0)
  const [countEditPatronymic, setCountEditPatronymic] = useState(0)
  const [countEditEmail, setCountEditEmail] = useState(0)
  //const [countEditPost, setCountEditPost] = useState(0)

  let location = useLocation().pathname.split('users/')[1];
  location = location.split('/edit')[0];

  const updateUser = (id) => {

    fetch(`/api/v1/users/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", },
      body: JSON.stringify({
        user: {
          first_name: get_data(inputFirstName, countEditFirstName, editFirstName),
          last_name: get_data(inputLastName, countEditLastName, editLastName),
          patronymic: get_data(inputPatronymic, countEditPatronymic, editPatronymic),
          email: get_data(inputEmail, countEditEmail, editEmail),
         // post_id: get_data(postId, countEditPost, editPost)
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
    navigate(`/users/${location}`);
  };

  let get_data = (inputData, countEdit, editData) => {
    let rezult = inputData
    if (countEdit == 0) {
      rezult = editData
    }
    return rezult
  }



  useEffect(() => {
    //Hit the server and get the places

    const apiEndpoint = `/api/v1/user/find_for_edit?id=${location}&input_email=${inputEmail}&count_edit_email=${countEditEmail}` //&input_post=${inputPost}&count_post=${countEditPost}

    fetch(apiEndpoint)
      .then(response => response.json())
      .then(data => {
        setEmailFromTable(data["email_valid"])
        setEditLastName(data["user_edit"].last_name)
        setEditFirstName(data["user_edit"].first_name)
        setEditPatronymic(data["user_edit"].patronymic)
        setEditEmail(data["user_edit"].email)
        //setEditPost(data["post_name"])
        //setPostId(data["post_id"])
      }
      );
  }, [searchFilelds])

  let disableButton = false

  if (countEditEmail > 0) {
    if (inputEmail == '' || emailFromTable == false) {
      disableButton = true
    }
  }

  if (countEditFirstName > 0) {
    if (get_data(inputFirstName, countEditFirstName, editFirstName) == '') {
      disableButton = true
    }
  }

  let classEmailFiled = "w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#f44336] focus:shadow-md"
  let classEmailError = "text-red-600"

  if (emailFromTable) {
    classEmailFiled = "w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
    classEmailError = "invisible"
  }


  const onSearchTextChangeInputFirstName = (e) => {
    setInputFirstName(e.target.value);
    setCountEditFirstName(countEditFirstName + 1)
  }

  const onSearchTextChangeInputLastName = (e) => {
    setInputLastName(e.target.value);
    setCountEditLastName(countEditLastName + 1)
  }

  const onSearchTextChangeInputPatronymic = (e) => {
    setInputPatronymic(e.target.value);
    setCountEditPatronymic(countEditPatronymic + 1)
  }

  const onSearchTextChangeInputEmail = (e) => {
    setInputEmail(e.target.value);
    setSearchFilelds(e.target.value);
    setCountEditEmail(countEditEmail + 1)
  }

  let classNameButton = "hover:shadow-form rounded-md bg-blue-600 hover:bg-blue-800 py-3 px-8 text-base font-semibold text-white outline-none  disabled:opacity-75"

  return (
    <div>
      <div className="font-bold text-xl flex items-center justify-center py-8">
        {t('description.edit_user')}
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
              defaultValue={editLastName}
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
              defaultValue={editFirstName}
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
              defaultValue={editPatronymic}
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
              defaultValue={editEmail}
              className={classEmailFiled}
            />
            <div className={classEmailError}>{t('description.error_email')}</div>
          </div>
         
          <div>
            <button
              className={classNameButton}
              disabled={disableButton}
              onClick={() => updateUser(location)}
            >
              {t('description.update')}
            </button>
          </div>
        </div>
      </div>
    </div >
  )
}
