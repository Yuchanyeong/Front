import React, { useState } from "react";
import './Login_new.css';  // CSS 파일을 import
import {postLogin} from '../../api/loginApi/postLogin';
import { useNavigate } from "react-router-dom";


function Login_login() {
    const [userid, setuserid] = useState('');
    const [userpassword, setuserpassword] = useState('');
    const handleUserIdChange = (e) => setuserid(e.target.value);
    const handleUserPasswordChange = (e) => setuserpassword(e.target.value);
    const navigate = useNavigate();

    const handleNextPage = async() => {
        try {
        await postLogin(userid,userpassword);
        console.log('user data posted successfully');
       navigate('/home');
      } catch (error) {
        console.error('Error posting user data:', error);
        alert('아이디 혹은 비밀번호가 틀립니다.')
      }
      
    };
    const isButtonEnabled_new = userid && userpassword;
    return (
        <div className="login-container">
            <div className="logo_new"></div>
            <div className="input-group">
                <label>아이디</label>
                <input 
                    type="text" 
                    value={userid} 
                    onChange={handleUserIdChange} 
                    placeholder="아이디를 입력하세요." 
                    required
                />
        


                <label>비밀번호</label>
                <input 
                    type="text" 
                    value={userpassword} 
                    onChange={handleUserPasswordChange} 
                    placeholder="비밀번호를 입력하세요." 
                    required
                />
        
            </div>  
            <button 
                onClick={handleNextPage} 
                className="login-new-button" 
                disabled={!isButtonEnabled_new} // 필수 입력값이 없으면 비활성화
            >
                로그인 하기 
            </button>

           
        </div>
    );
}

export default Login_login;
