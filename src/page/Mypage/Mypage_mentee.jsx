import React, { useState, useEffect} from "react";
import "./Mypage.css";
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';


function Mypage_mentee(){
    const [score, setScore] = useState([false, false, false, false, false]);
    const navigate = useNavigate();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const dummyList=[
        {
            name:"중국인",
            age:12,
            tag:"중국/한국어"
        },
        {
            name:"남아공",
            age:8,
            tag:"남아공/한국어"
        }

    ]

    const dummyList1=[
        {
            name:"김이박",
            age:12,
            tag:"미국/한국어",
            status:true
        },
        {
            name:"최감자",
            age:12,
            tag:"캐나다/한국어",
            status:false
        }

    ]

    const userData={
        name:"닉네임",
        age:22,
        tag:"한국/한국어",
        temp:70
    }
    const starScore = index => {
        let star = [...score];
        for (let i = 0; i < 5; i++) {
          star[i] = i <= index ? true : false;
        }
        setScore(star);
      };
    const ChatList=({chatList})=>{
        return(
            <div className="Chat">
                
                {chatList.map((data, index)=>(
                    <button id="chatCont"  key={`${data.id}-${index}`}>
                        <div id="rowCont">
                    <div id="list_profile"></div>
                    <div id="main_cont">
                        <div id="list_name">{data.name} ({data.age}세)</div>
                        <div id="list_tag">#{data.tag}</div>
                       
                    </div>
                    <div id="ing_ect">
                       <button id="review" onClick={()=>{openModal()}}>후기</button>
                    </div> 
                    </div>
                    {index < chatList.length - 1 && <div id="divider"></div>}
                    </button>
                ))}
               
            </div>
        );
    };

    const SubmitList=({submitList})=>{
        return(
            <div className="Chat">
                
                {submitList.map((data, index)=>(
                    <button id="chatCont"  key={`submit${data.id}-${index}`}>
                        <div id="rowCont">
                    <div id="list_profile"></div>
                    <div id="main_cont">
                        <div id="list_name">{data.name} ({data.age}세)</div>
                        <div id="list_tag">#{data.tag}</div>
                       
                    </div>
                    <div id="list_ect" className={`${data.status ? 'status_applied' : 'status_declined'}`}>
                      {data.status ? "대기중" : "거절됨"}
                    </div> 
                    </div>
                    {index < submitList.length - 1 && <div id="divider"></div>}
                    </button>
                ))}
               
            </div>
        );
    };

    const openModal = (data) => {
     
        
        setModalIsOpen(true);
    };
    const closeModal = () => {
        setModalIsOpen(false);
        
    };
    return(
        <div className="Mypage">
            <div id="titleCont">
            <div id="title">프로필</div>
            </div>
            <div id="profile">
                <div id="profile_img"></div>
                <div id="ect">
                    <div id="name">{userData.name} ({userData.age}세)</div>
                    <div id="tag">#{userData.tag}</div>
                </div>
                <div id="toggleCont">

                </div>
            </div>
            <div id="temp">
                <div id="temp_num" style={{marginLeft:`calc(46px + ${userData.temp} * 2.99px - 20px)`}}>{userData.temp}ºC</div>
            <div className="temp-bar">
          <div className="Temp" style={{ width: `${userData.temp}%` }}></div>
             </div>
            </div>
            <div id="intro">
                <div id="intro_title">한줄소개</div>
                <input id="intro_input"></input>
                <button id="modify">프로필 수정</button>
            </div>
            <div id="ing">
                <div id="ing_title">현재 멘토링 현황</div>
                <ChatList chatList={dummyList}/>

            </div>
            <div id="submit">
                <div id="submit_title">멘토링 신청 현황</div>
                <SubmitList submitList={dummyList1}/>
            </div>
            <div id="btnCon">
                <button id="logout">로그아웃</button>
                <button id="delete">계정 탈퇴</button>
            </div>
            <div id="navi-con">
                <div id="navi">
                    <button id="home" onClick={()=> navigate('/home')}></button>
                    <button id="chat" onClick={()=> navigate('/chat')}></button>
                    <button id="search" onClick={()=> navigate('/search')}></button>
                    <button id="mypage" onClick={()=> navigate('/mypage')}></button>
                </div>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Pop up Message"
                ariaHideApp={false}
                className="review_popup"
                overlayClassName="popup-overlay"
            >
               
                <div id="submit_popup">
                  <div id="popup_ment"> 후기를 남겨주세요!</div>
                    <div id="star_cont">
                        {Array.from({ length: 5 }).map((_, index) => (

                        <div className={`${score[index] ? 'smile_active' : 'smile'}`} 
                             key={index} 
                             onClick={()=>starScore(index)}
                             >

                             </div>
                        ))}
                    </div>
                  <button id='review_submit'onClick={()=>closeModal()}>완료</button>
                 
                </div>
            </Modal>

        </div>
    );
}
export default Mypage_mentee;