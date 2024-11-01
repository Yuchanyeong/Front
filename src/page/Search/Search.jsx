import React, { useState, useEffect } from "react";
import Tabs from "../Chat/Tabs";
import "./Search.css";
import { useNavigate,useLocation } from "react-router-dom";
import Modal from 'react-modal';
import { getUserList } from "../../api/userList/getUserList";
import { io } from "socket.io-client";

function Search() {
    const [userType, setUserType] = useState('')
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
    const navigate = useNavigate();  
    const location = useLocation();
    const [token, setToken] = useState(null);
    const [mentoData, setmentoData] = useState({ FindMentos: [] });
    const [socket, setSocket] = useState(null); // socket을 상태로 관리
    useEffect(() => {
        // 로컬 스토리지에서 토큰 읽어오기
        const storedToken = localStorage.getItem('accessToken');
        const storedUserType = localStorage.getItem('isMento')
        console.log(storedToken);
        if (storedToken) {
            setToken(storedToken);
        } 
        if(storedUserType === true){
            setUserType('mento')
        }else setUserType('mentee')
        
    }, []);
   

    useEffect(() => {
        if (!token) return; // 토큰이 없으면 데이터를 가져오지 않음

        // 마이페이지 정보를 가져오는 함수 호출
        const fetchMypageData = async () => {
            try {
                const mentoData = await getUserList(token);
                setmentoData(mentoData);
            } catch (error) {
                console.error('Error fetching mypage data:', error);
            }
        };

        fetchMypageData();
    }, [token]);

    const ChatList = ({ chatList }) => {
        return (
            <div className="Chat">
                {chatList.map((data, index) => (
                    <button id="chatCont" onClick={() => openModal(data)} key={`${data.id}-${index}`}>
                        <div id="profile"></div>
                        <div id="main_cont">
                            <div id="nameCont">
                                <div id="name">{data.mentoNick}</div>
                                <div id="tag">#{data.subjectTag}</div>
                            </div>
                            <div id="ment">{data.mentoInfo}</div>
                        </div>
                    </button>
                ))}
            </div>
        );
    }; 

    const filteredMentosByCulture = mentoData.FindMentos.filter(data => data.subjectTag === "JavaScript");

    const openModal = (data) => {
        setSelectedData(data);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleJoinChat = async () => {
        if (selectedData) {
            const chatRoomId = selectedData.mentoId; // selectedData에서 mentoId 가져오기
            
            navigate('/chatroom',{ state: { chatRoomId: chatRoomId } })
        } else {
            console.error("No selected data to join the chat");
        }
    };

    return (
        <div className="Search">
            <div id="title">멘토링 찾기</div>
            <div id="tabCont">
                <Tabs>
                    <div label="전체">
                        <ChatList chatList={mentoData.FindMentos} />
                    </div>
                    <div label="#JavaScript"> 
                        <ChatList chatList={filteredMentosByCulture} />
                    </div>
                </Tabs>
            </div>

            <div id="navi-con">
                <div id="navi">
                    <button id="home" onClick={() => navigate('/home')}></button>
                    <button id="chat" onClick={() => navigate('/chat')}></button>
                    <button id="search" onClick={() => navigate('/search')}></button>
                    <button id="mypage" onClick={() => navigate(`/mypage_${userType}`)}></button>
                </div>
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Pop up Message"
                ariaHideApp={false}
                className="modal"
                overlayClassName="overlay"
            >
                {selectedData ? (
                    <div id="modal_profile">
                        <div id="modal_top"> 
                            <button id="modal_close" onClick={closeModal}>x</button>
                        </div>
                        <div id="modal_cont">
                            <div id="modal_img"></div>
                            <div id="modal_ect">
                                <div id="modal_name">{selectedData?.mentoNick}</div>
                                <div id="modal_tag">#{selectedData?.subjectTag}</div>
                            </div>
                        </div>
                        <div id="modal_intro">{selectedData?.mentoInfo}</div>
                        <button id="goChat" onClick={()=>handleJoinChat(selectedData)}>채팅하기</button>
                    </div>
                ) : null} 
            </Modal>
        </div>
    );
}

export default Search;
