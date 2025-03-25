import React from "react";
import { menu0Class, menu1Class } from "./classes"; // Импортируем классы

const MenuLink = ({ t }) => {
  return (
    <div>
      <a className={menu0Class}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={menu1Class}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
        {t('description.menu')}
      </a>
    </div>
  );
};

export default MenuLink;