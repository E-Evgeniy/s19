import React from "react";
import { NavLink } from 'react-router-dom';
import { menuElementClass } from "./classes"; // Импортируем классы

const Exams = ({ t }) => {
    return (
        <div className={menuElementClass}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ marginRight: '8px' }}>
                <path fill="none" stroke="currentColor" strokeWidth="2" d="M16 7h3v4h-3zm-7 8h11M9 11h4M9 7h4M6 18.5a2.5 2.5 0 1 1-5 0V7h5.025M6 18.5V3h17v15.5a2.5 2.5 0 0 1-2.5 2.5h-17" />
            </svg>
            <NavLink to="/"> {t('description.exams')} </NavLink>
        </div>
    );
};

export default Exams;