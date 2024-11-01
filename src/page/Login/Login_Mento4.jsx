import React, { useState } from "react";
import './Login_Mento4.css';  // CSS 파일을 import
import countryList from '../../data/countries.json'; // country 파일
import defaultProfileImage from '../../asset/account-circle.png';
import BackButton from "../../components/BackButton";
function Login_Mento4() {
    const [nickname, setNickname] = useState('');
    const [introduction, setIntroduction] = useState('');
    const [age, setAge] = useState('');
    const [nationality, setNationality] = useState('');
    const [profileImage, setProfileImage] = useState(defaultProfileImage); // 기본 이미지

    const handleNicknameChange = (e) => setNickname(e.target.value);
    const handleIntroductionChange = (e) => setIntroduction(e.target.value);
    const handleAgeChange = (e) => setAge(e.target.value);
    const handleNationalityChange = (e) => setNationality(e.target.value);

    const handleImageSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            setProfileImage(URL.createObjectURL(file)); // 이미지 미리보기 설정
        }
    };

    const handleImageDelete = () => {
        setProfileImage(defaultProfileImage); // 기본 이미지로 재설정
    };

    const handleNextPage = () => {
        // 다음 페이지로 이동하는 로직 추가 (예: 페이지 이동 함수 또는 라우터)
        console.log("다음 페이지로 이동");
    };

    const ageOptions = Array.from({ length: 100 }, (_, i) => i + 1);

    // 버튼 활성화 조건: 필수 입력값이 모두 채워졌을 때
    const isButtonEnabled = nickname && age && nationality;

    return (
        <div className="profile-container">
            <BackButton to="../../Login_Mento3" /> 
            <h2 id ="profile-done">{isButtonEnabled ? "프로필 완성!" : " "}</h2>

            <div className="profile-image">
                <div className="circle-image" style={{
                    backgroundImage: `url(${profileImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }}></div>
            </div>

            <div className="profile-button-group">
                <input
                    type="file"
                    accept="image/*"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={handleImageSelect}
                />

                <button id="select-profile" className="mento4-button" onClick={() => document.getElementById('fileInput').click()}>
                
                </button>
                <button id="delete-profile" className="mento4-button" onClick={handleImageDelete}>
                
                </button>
            </div>

            <div className="input-group">
                <label>닉네임</label>
                <input 
                    type="text" 
                    value={nickname} 
                    onChange={handleNicknameChange} 
                    placeholder="닉네임을 입력하세요." 
                    required
                />

                <label>나이</label>
                <select value={age} onChange={handleAgeChange} required>
                    <option value="">나이를 선택하세요.</option>
                    {ageOptions.map((age) => (
                        <option key={age} value={age}>{age}</option>
                    ))}
                </select>

                <label>국적</label>
                <select value={nationality} onChange={handleNationalityChange} required>
                    <option value="">국적을 선택하세요.</option>
                    {countryList.map((country) => (
                        <option key={country.code} value={country.name}>
                            {country.name}
                        </option>
                    ))}
                </select>

                <label>한줄소개</label>
                <textarea 
                    value={introduction} 
                    onChange={handleIntroductionChange} 
                    placeholder="멘토님을 소개할 수 있는 한줄 소개를 작성해주세요.&#13;&#13;멘토링을 진행할 때, 중요하게 여기는 부분이나 가치관 등 수업 특성이 잘 드러나도록 적으시면 좋아요 :)"
                />
            </div>

            {/* 다음 페이지 버튼 추가 */}
            <button 
                onClick={handleNextPage} 
                className="next-page-button"
                disabled={!isButtonEnabled} // 필수 입력값이 없으면 비활성화
            >
                프로필 완성 ! 
            </button>
        </div>
    );
}

export default Login_Mento4;
