// BackButton.js
import React from "react";
import { useNavigate } from "react-router-dom";
import './BackButton.css';

function BackButton({ to }) {
    const navigate = useNavigate();

    const goBack = () => {
        if (to) {
            navigate(to); // 지정된 경로로 이동
        } else {
            navigate(-1); // to가 없으면 이전 페이지로 이동
        }
    };

    return (
        <button className="back-button" onClick={goBack}>
            ← 뒤로가기
        </button>
    );
}

export default BackButton;
