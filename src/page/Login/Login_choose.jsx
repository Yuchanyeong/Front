import React from "react";
import './Login_new.css';  // CSS 파일을 import
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



function Login_choose() {

    const navigate = useNavigate();
    const goToLogin_Login = () => {
        navigate('../../Login_login'); // 원하는 경로로 이동
    };
    const goToLogin_New = () => {
        navigate('../../Login_new'); // 원하는 경로로 이동
    };
    
    return (
        <div className="login-container">
            <div className="logo_new"></div>
        
        
            <button className = "login-new-button" onClick={goToLogin_Login} 
            >
                로그인 하기 
            </button>

            
            <button className = "login-new-button" onClick={goToLogin_New} 
            >
                회원가입하기 
            </button>

           
        </div>
    );
}


export default Login_choose;
