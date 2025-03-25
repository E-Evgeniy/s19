import React from "react";
import ReactDOM from "react-dom/client";
import './components/i18n';
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import MainPage from "./components/main_page"
import MultiplicationTableBefore from "./components/exams/multiplication_table/mt_before"

function App() {
    return (
        <div>
            <BrowserRouter>
            <Routes>            
                <Route path="*" element={<MainPage />} />
                <Route path="multiplication_table_before/" element={<MultiplicationTableBefore />} />
            </Routes>
            </BrowserRouter>
        </div>
    )
}

const app = ReactDOM.createRoot(document.getElementById("App"));
app.render(<App />);