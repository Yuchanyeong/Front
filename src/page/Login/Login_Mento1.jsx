import React, { useState, useContext } from "react";
import './Login_Mento1.css';  // CSS 파일을 import
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../../context/UserContext";
import BackButton from "../../components/BackButton";
function Login_Mento1() {
    const navigate = useNavigate();
    const [showSubjectSelection, setShowSubjectSelection] = useState(false); // 과목 선택 화면 상태
    const [selectedSubjects, setSelectedSubjects] = useState([]); // 선택된 과목 상태
    const { User, updateUser } = useContext(UserContext);
    const [mentoType, setMentoType] = useState("");
    const goToMento2Page =() => {
        updateUser({mentoType:mentoType,
                    subjectTag:selectedSubjects});
                    console.log(User);
        navigate('../../Login_Mento2'); // 원하는 경로로 이동
    };

    const handleMentorClick = (mentorType) => {
        
        if (mentorType === 'major') {
            setShowSubjectSelection(true);
            const mentoType1 = mentorType;
        setMentoType(mentoType1);
        console.log('멘토타입:',mentoType); // 교과목 멘토 버튼 클릭 시 과목 선택 창 표시
        } else {
            setShowSubjectSelection(false); // 다른 멘토 버튼 클릭 시 과목 선택 창 숨김
            const mentoType1 = mentorType;
            setMentoType(mentoType1);
            console.log('멘토타입:',mentoType);
            goToMento2Page(); // 다른 멘토 선택 시 바로 다음 페이지로 이동
       
        }
    };

    // 과목 선택 시 토글 기능
    const handleSubjectClick = (subject) => {
        if (selectedSubjects.includes(subject)) {
            // 이미 선택된 과목일 경우 제거
            setSelectedSubjects(selectedSubjects.filter(item => item !== subject));
        } else {
            // 선택되지 않은 과목일 경우 추가
            setSelectedSubjects([...selectedSubjects, subject]);
        }
    };

    // 최소 하나 이상의 과목이 선택되어야 확인 버튼이 활성화됨
    const isConfirmButtonDisabled = selectedSubjects.length === 0;

    return (
        
        <div className="Login_Mento1-container">
            <BackButton to="../../Login2" /> 
            <h2 className="mento1-subtitle">안녕하세요, 멘토님!</h2>
            <h1 className="mento1-title">본인은 어떤 멘토인가요?</h1>

            <div className="mento1-button-group">
                <button id="culture" className="mento1-button" onClick={() => handleMentorClick('culture')}></button>
                <button id="korean" className="mento1-button" onClick={() => handleMentorClick('korean')}></button>
                <button id="major" className="mento1-button" onClick={() => handleMentorClick('major')}></button>
                <button id="etc" className="mento1-button" onClick={() => handleMentorClick('etc')}></button>
            </div>

            {/* 과목 선택 팝업 */}
            {showSubjectSelection && (
                <div className="subject-selection-popup">
                    <p className="subject-selection-title">교과목 멘토님, <br></br>어떤 과목의 멘토이신가요?</p>
                    <div className="subject-tags">
                        {['국어', '수학', '영어', '사회', '과학'].map((subject) => (
                            <span
                                key={subject}
                                className={`subject-tag ${selectedSubjects.includes(subject) ? 'selected' : ''}`}
                                onClick={() => handleSubjectClick(subject)}
                            >
                                #{subject}
                            </span>
                        ))}
                    </div>
                    <button
                        className="confirm-button"
                        onClick={goToMento2Page}
                        disabled={isConfirmButtonDisabled} // 선택된 과목이 없으면 버튼 비활성화
                    >
                        확인하기
                    </button>
                </div>
            )}
        </div>
    );
}

export default Login_Mento1;
