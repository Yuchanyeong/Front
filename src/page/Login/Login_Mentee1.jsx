import React from "react";
import './Login_Mentee1.css';
import { useNavigate } from 'react-router-dom';

function Login_Mentee1() {
    
    const navigate = useNavigate();

    const goToMentee2Page = () => {
        navigate('../../Login_Mentee2'); // 원하는 경로로 이동
    };

    return (
        <div className="Login_Mentee1-container">
           <h2 className="mentee1-subtitle">안녕하세요, 멘티/학부모님!</h2>
           <h1 className="mentee1-title">어떤 멘토를 찾고 있나요?</h1>
            <div className="mentee1-button-group">
                <button id="culture" className="mentee1-button" onClick={goToMentee2Page}>
                </button>
                <button id="korean" className="mentee1-button" onClick={goToMentee2Page}>
                </button>
                <button id="major" className="mentee1-button" onClick={goToMentee2Page}>
                </button>
                <button id="etc" className="mentee1-button" onClick={goToMentee2Page}>
                </button>
            </div>
        </div>
    );
}

export default Login_Mentee1;

