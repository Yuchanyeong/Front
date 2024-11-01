import React from "react";
import './Login1.css';  // CSS 파일을 import
import axios from 'axios';
const BASE_URL = 'https://luckymozzi.store';


function Login1() {
    const Login_google = async () => {
        window.location.href = `${BASE_URL}/auth/login`;
        /*try{
            const response = await axios.get(`${BASE_URL}/auth/login`,{
                withCredentials: true, // 쿠키를 포함하는 경우
              }); 
        }
        catch{
            console.log("안녕")
        }*/
        
    }
    return (
        <div className="login-container">
            <div className="logo"></div>
            <div className="login-button-group">
                <button id="google" className="login-button" onClick={Login_google}></button>



                <button id="kakao" className="login-button"></button>



                <button id="naver" className="login-button"></button>
            </div>
        </div>
    );
}

export default Login1;
