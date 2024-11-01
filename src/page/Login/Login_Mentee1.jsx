import React, { useState, useContext, useEffect } from "react";
import './Login_Mentee1.css';
import { useNavigate } from 'react-router-dom';
import BackButton from "../../components/BackButton";
import { UserContext } from "../../context/UserContext";

function Login_Mentee1() {
    const [showSubjectSelection, setShowSubjectSelection] = useState(false);
    const navigate = useNavigate();
    const { User, updateUser } = useContext(UserContext);
    const [mentoType, setMentoType] = useState('');
    const [selectedSubjects, setSelectedSubjects] = useState("");

    // useEffect를 사용하여 mentoType 변경 감지
    useEffect(() => {
        if (mentoType && mentoType !=='major') {
            updateUser({
                mentoType: mentoType,
                subjectTag: selectedSubjects
            });
            console.log("Updated User:", { mentoType, subjectTag: selectedSubjects });
          navigate('../../Login_Mentee2'); 
        }
    }, [mentoType, selectedSubjects, updateUser, navigate]);

    const handleMentorClick = (mentorType) => {
        if (mentorType === 'major') {
            setShowSubjectSelection(true);
            setMentoType(mentorType);
            console.log(mentorType);
        } else {
            setShowSubjectSelection(false);
            setMentoType(mentorType);
            console.log(mentorType);
           
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
    const isConfirmButtonDisabled = selectedSubjects.length === 0;
    const goToMentee2Page =() => {
        updateUser({mentoType:mentoType,
                    subjectTag:selectedSubjects});
                    console.log("Updated User:", { mentoType, subjectTag: selectedSubjects });
                    navigate('../../Login_Mentee2'); // 원하는 경로로 이동
    };
    return (
        <div className="Login_Mentee1-container">
            <BackButton to="../../Login2" />
            <h2 className="mentee1-subtitle">안녕하세요, 멘티/학부모님!</h2>
            <h1 className="mentee1-title">어떤 멘토를 찾고 있나요?</h1>
            <div className="mentee1-button-group">
                <button id="culture" className="mentee1-button" onClick={() => handleMentorClick('culture')} />
                <button id="korean" className="mentee1-button" onClick={() => handleMentorClick('korean')} />
                <button id="major" className="mentee1-button" onClick={() => handleMentorClick('major')} />
                <button id="etc" className="mentee1-button" onClick={() => handleMentorClick('etc')} />
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
                        onClick={()=>goToMentee2Page()}
                        disabled={isConfirmButtonDisabled} // 선택된 과목이 없으면 버튼 비활성화
                    >
                        확인하기
                    </button>
                </div>
            )}
        </div>
    );
}

export default Login_Mentee1;
