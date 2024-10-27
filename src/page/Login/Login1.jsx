import React from "react";
import './Login1.css';  // CSS 파일을 import

function Login1() {
    return (
        <div className="login-container">
            <div className="logo"></div>
            <div className="login-button-group">
                <button id="google" className="login-button"></button>
                <button id="kakao" className="login-button"></button>
                <button id="naver" className="login-button"></button>
            </div>
        </div>
    );
}

export default Login1;
