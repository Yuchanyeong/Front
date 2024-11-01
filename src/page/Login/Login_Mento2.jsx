import React from "react";
import './Login_Mento2.css';
import { useNavigate } from 'react-router-dom';
import BackButton from "../../components/BackButton";
function Login_Mento2() {

    const navigate = useNavigate();

    const goToMento3Page = () => {
        navigate('../../Login_Mento3'); // 원하는 경로로 이동
    }
    return (
        <div className="Login_Mento2-container">
            <BackButton to="../../Login_Mento1" /> 
            <h2 className="login_Mento2-title">본인 인증</h2>

            <div className="login_Mento2-button-group">
                <div id="self-identification" className="login2-button-container">
                    <button id="self-button" className="overlay-button"></button>
                </div>

                <div id="schola-identification" className="login2-button-container">
                    <button id="schola-button" className="overlay-button" onClick={goToMento3Page}></button>
                </div>
            </div>
        </div>
    );
}

export default Login_Mento2;

