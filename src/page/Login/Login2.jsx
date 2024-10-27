import React from "react";
import './Login2.css';

function Login2() {
    return (
        <div className="login2-container">
            <h1 className="login2-title">어떤 유형으로 가입하시겠어요?</h1>

            <div className="login2-button-group">
                <button id="mentor" className="login2-button">
                </button>
                <button id="mentee" className="login2-button">
                </button>
                <button id="parent" className="login2-button">
                </button>
            </div>
        </div>
    );
}

export default Login2;

