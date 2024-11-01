import React, { useContext, useState } from "react";
import './Login2.css';
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../../context/UserContext";

function Login2() {

    const navigate = useNavigate();
    const { User, updateUser } = useContext(UserContext);

    // 버튼 클릭 시 페이지 이동 함수
    const goToMentorPage = () => {
        updateUser({isMento:true});
        localStorage.setItem('isMento', true);
        navigate('../../Login_Mento1'); // 원하는 경로로 이동
    };
    const goToMenteePage = () => {
        updateUser({isMento:false});
        localStorage.setItem('isMento', false);
        navigate('../../Login_Mentee1'); // 원하는 경로로 이동
    };

    return (
        <div className="login2-container">
            <h1 className="login2-title">어떤 유형으로 가입하시겠어요?</h1>

            <div className="login2-button-group">
                <button id="mentor" className="login2-button" onClick={goToMentorPage}>
                </button>
                <button id="mentee" className="login2-button" onClick={goToMenteePage}>
                </button>
                <button id="parent" className="login2-button" onClick={goToMenteePage}>
                </button>
            </div>
        </div>
    );
}

export default Login2;

