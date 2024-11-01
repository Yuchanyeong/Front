import React from "react";
import './Login_Mentee2.css';  // CSS 파일을 import
import { useNavigate } from 'react-router-dom';
import BackButton from "../../components/BackButton";
function Login_Mentee2() {
    const navigate = useNavigate();

    const goToMentee3Page = () => {
        navigate('../../Login_Mentee3'); // 원하는 경로로 이동
    };
    return (
        
        <div className="Login_Mentee2-container">
            <BackButton to="../../Login_Mentee1" /> 
            <h2 className="login_Mentee2-title">본인인증</h2>
            <div id="self-identification" className="solo-login2-button-container">
                <button id="self-button" className="overlay-button" onClick={goToMentee3Page}>
                </button>
            </div>
        </div>
        
        
    );
}

export default Login_Mentee2;


