import React, { useState } from "react";
import './Login_new.css';  // CSS 파일을 import
import { useNavigate } from "react-router-dom";
import { postSignup } from "../../api/loginApi/postSignup";
function Login_new() {
    const [userid, setuserid] = useState('');
    const [userpassword, setuserpassword] = useState('');
    const navigate = useNavigate();
    const handleUserIdChange = (e) => setuserid(e.target.value);
    const handleUserPasswordChange = (e) => setuserpassword(e.target.value);

    const validateInput = () => {
        
        const isUserIdValid = userid.length >= 5 && userid.length <= 20;
        
        // 비밀번호 조건: 숫자, 영문자, 특수문자 조합 (8자 이상)
        const isPasswordValid = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/.test(userpassword);

        if (!isUserIdValid) {
            alert("아이디는 5자 이상 20자 이하로 설정해 주세요.");
            return false;
        }
        
        if (!isPasswordValid) {
            alert("비밀번호는 숫자, 영문자, 특수문자 조합으로 8자 이상 설정해 주세요.");
            return false;
        }
        
        return true;
    };

    const handleNextPage = () => {
        if (validateInput()) {
            const PostSignup = async()=>{
                try {
                    const loginResponse = await postSignup( userid, userpassword);
                    console.log("다음 페이지로 이동");
                    const accessToken = loginResponse.token // Optional chaining 추가
                    if (!accessToken) {
                        throw new Error("Access token not found in response headers");
                    }
                     localStorage.setItem('accessToken', accessToken);
                    navigate('/login2')
                } catch (error) {
                    console.error('Error fetching mypage data:', error);
                    
                        const errorMessage = error.response.data.message || error.message;
                        if (errorMessage === "이미 존재하는 아이디입니다.") {
                            alert('이미 존재하는 아이디입니다.');
                        } 
                }
            };
            PostSignup();
            
            // 실제 회원가입 처리나 페이지 이동 로직을 여기에 추가
        }
       
    };

    const isButtonEnabled_new = userid && userpassword;

    return (
        <div className="login-container">
            <div className="logo_new"></div>
            <div className="input-group">
                <label>아이디</label>
                <div className="input-container">
                    <input 
                        type="text" 
                        value={userid} 
                        onChange={handleUserIdChange} 
                        placeholder="아이디를 입력하세요." 
                        required
                    />
                </div>
                <div className="info-login">*아이디는 5자 이상 20자 이하로 가능합니다.</div>

                <label>비밀번호</label>
                <input 
                    type="password" 
                    value={userpassword} 
                    onChange={handleUserPasswordChange} 
                    placeholder="비밀번호를 입력하세요." 
                    required
                />
                <div className="info-login">*비밀번호는 숫자, 영문자, 특수문자 조합으로 설정 가능합니다.</div>
            </div>  
            <button 
                onClick={handleNextPage} 
                className="login-new-button" 
                disabled={!isButtonEnabled_new}
            >
                회원가입하기 
            </button>
        </div>
    );
}

export default Login_new;
