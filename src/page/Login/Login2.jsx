import React from "react";
import './Login2.css';
import { useNavigate } from 'react-router-dom';

function Login2() {


    const navigate = useNavigate();

    // 버튼 클릭 시 페이지 이동 함수
    const goToMentorPage = () => {
        navigate('../../Login_Mento1'); // 원하는 경로로 이동
    };
    const goToMenteePage = () => {
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

