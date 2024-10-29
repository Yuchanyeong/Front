import React from "react";
import './Login_Mento1.css';  // CSS 파일을 import
import { useNavigate } from 'react-router-dom';

function Login_Mento1() {

    const navigate = useNavigate();

    const goToMento2Page = () => {
        navigate('../../Login_Mento2'); // 원하는 경로로 이동
    }
    return (
        <div className="Login_Mento1-container">
           <h2 className="mento1-subtitle">안녕하세요, 멘토님!</h2>
           <h1 className="mento1-title">어떤 멘토를 찾고 있나요?</h1>
            <div className="mento1-button-group">
                <button id="culture" className="mento1-button" onClick={goToMento2Page} >
                </button>
                <button id="korean" className="mento1-button" onClick={goToMento2Page}>
                </button>
                <button id="major" className="mento1-button" onClick={goToMento2Page}>
                </button>
                <button id="etc" className="mento1-button" onClick={goToMento2Page}>
                </button>
            </div>
        </div>
    );
}

export default Login_Mento1;



