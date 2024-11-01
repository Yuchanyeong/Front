import React, { useState, useContext,useEffect } from "react";
import './Login_Mentee1.css';
import { useNavigate } from 'react-router-dom';
import BackButton from "../../components/BackButton";
import { UserContext } from "../../context/UserContext";

function Login_Mentee1() {
    const [showSubjectSelection, setShowSubjectSelection] = useState(false); // 과목 선택 화면 상태
    const navigate = useNavigate();
    const { User, updateUser } = useContext(UserContext);
    const [mentoType, setMentoType] = useState('');
    const [selectedSubjects, setSelectedSubjects] = useState([]); // 선택된 과목 상태
    const goToMentee2Page = () => {
        updateUser({
            mentoType: mentoType,
            subjectTag: selectedSubjects
        });
        console.log("Updated User:", { mentoType, subjectTag: selectedSubjects });
        navigate('../../Login_Mentee2'); // 원하는 경로로 이동
    };
  
    const handleMentorClick = (mentorType) => {
        
        if (mentorType === 'major') {
            setShowSubjectSelection(true); 
            setMentoType(mentorType);
             console.log(mentorType);// 교과목 멘토 버튼 클릭 시 과목 선택 창 표시
        } else {
            setShowSubjectSelection(false); // 다른 멘토 버튼 클릭 시 과목 선택 창 숨김
            
            setMentoType(mentorType);
            console.log(mentorType); 
            goToMentee2Page();
        }
    };
    return (
        <div className="Login_Mentee1-container">
          <BackButton to="../../Login2" /> 
           <h2 className="mentee1-subtitle">안녕하세요, 멘티/학부모님!</h2>
           <h1 className="mentee1-title">어떤 멘토를 찾고 있나요?</h1>
            <div className="mentee1-button-group">
                <button id="culture" className="mentee1-button" onClick={()=>handleMentorClick('culture')} >
                </button>
                <button id="korean" className="mentee1-button" onClick={()=>handleMentorClick('korean')}>
                </button>
                <button id="major" className="mentee1-button" onClick={()=>handleMentorClick('major')}>
                </button>
                <button id="etc" className="mentee1-button" onClick={()=>handleMentorClick('etc')}>
                </button>
            </div>
        </div>
    );
}

export default Login_Mentee1;

