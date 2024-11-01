import React, { useState } from "react";
import "./Main.css";
import { useNavigate } from "react-router-dom";
import CountryQuizGame from "./CountryQuizGame";

function Main() {
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false); // 팝업 상태 추가

    const handleNotificationClick = () => {
        setShowPopup(true); // notification 클릭 시 팝업 표시
    };

    const closePopup = () => {
        setShowPopup(false); // 닫기 버튼 클릭 시 팝업 숨김
    };

    return (
        <div className="Main">
            <div className="content-wrapper">
                <div className="header">
                    <div className="main-logo"></div>
                    <div className="notification" onClick={handleNotificationClick}></div> {/* notification 클릭 이벤트 추가 */}
                </div>

                {/* Game Section */}
                <div className="game-section">
                    <CountryQuizGame /> {/* 퀴즈 컴포넌트 추가 */}
                </div>

                {/* Feature Section */}
                <div className="feature-section">
                    <button id="mentoring-image" className="feature" onClick={() => navigate('/chat')}></button>
                    <button id="find-image" className="feature" onClick={() => navigate('/search')}></button>
                </div>

                <div>
                    {/* QnA Section */}
                    <button id="qna-image" className="qna-section" onClick={() => window.location.href = "https://open.kakao.com/o/sqsPzJXg"}></button>
                </div>
            </div>

            {/* Navigation Bar */}
            <div id="navi-con">
                <div id="navi">
                    <button id="home" onClick={() => navigate('/home')}></button>
                    <button id="chat" onClick={() => navigate('/chat')}></button>
                    <button id="search" onClick={() => navigate('/search')}></button>
                    <button id="mypage" onClick={() => navigate('/mypage')}></button>
                </div>
            </div>

            {/* Popup Modal */}
            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <div id = "notice">알림</div>
                        <p>알림이 없습니다.</p>
                        <button onClick={closePopup} className="close-button">닫기</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Main;
