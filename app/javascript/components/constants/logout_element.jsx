import React from "react";
import { NavLink } from 'react-router-dom';
import { logout0Class, logout1Class, logout2Class } from "./classes"; // Импортируем классы

const Logout = ({ t }) => {
    return (
        <div className={logout0Class}>
            <div className={logout1Class}>
                <div className={logout2Class}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M5 11h8v2H5v3l-5-4l5-4zm-1 7h2.708a8 8 0 1 0 0-12H4a9.985 9.985 0 0 1 8-4c5.523 0 10 4.477 10 10s-4.477 10-10 10a9.985 9.985 0 0 1-8-4" />
                    </svg>
                    <span className="font-bold">
                        <NavLink to="/">   {t('description.exit')} </NavLink>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Logout;

