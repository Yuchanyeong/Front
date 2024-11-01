import React, { useState, useEffect} from "react";
import './Login_Mentee2.css';  // CSS 파일을 import
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import BackButton from "../../components/BackButton";
function Login_Mentee2() {
    const navigate = useNavigate();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const openModal = (data) => {
        setModalIsOpen(true);
    };
    const closeModal = () => {
        setModalIsOpen(false);  
        navigate('/Login_Mentee3') ;
    };
    const goToMentee3Page = () => {
        openModal();
       // 원하는 경로로 이동
    };
    return (
        
        <div className="Login_Mentee2-container">
            <BackButton to="../../Login_Mentee1" /> 
            <h2 className="login_Mentee2-title">본인인증</h2>
            <div id="self-identification" className="solo-login2-button-container">
                <button id="self-button" className="overlay-button" onClick={goToMentee3Page}>
                </button>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Pop up Message"
                ariaHideApp={false}
                className="signup_popup"
                overlayClassName="popup-overlay"
            >
               
                <div id="signup_popup">
                  <div id="popup_ment"> 휴대폰 본인 인증 </div>
                   <input id="phoneNum"></input>
                   <input id="authNum"></input>
                  <button id='review_submit'onClick={()=>closeModal()}>완료</button>
                 
                </div>
            </Modal>
        </div>
        
        
    );
}

export default Login_Mentee2;


