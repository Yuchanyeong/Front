import React from "react";
import './Login_Mento3.css';  // CSS 파일을 import

function Login_Mento3() {
    return (
        <div className="Login_Mento3-container">
            <h1 className="mento3-title">학력 인증</h1>
            <h2 className="mento3-subtitle">
                학적상태를 확인할 수 있는<br />
                학생증, 재학/휴학/재적/졸업<br />
                증명서 등을 준비해주세요.
            </h2>
            <div className="certify-div">
                

            </div>
            <button id="schola-button" className="mento3-button"></button>
           
        </div>
    );
}

export default Login_Mento3;
