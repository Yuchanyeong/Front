import React, { useState, useEffect} from "react";
import Tabs from "./Tabs";
import "./Chat.css";
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';
import {getChatRooms} from '../../api/chatroomApi/getChatrooms'


function Chat() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedData, setSelectedData] = useState(null)
    const navigate = useNavigate(); 
    const [chatList, setChatList] = useState(null);
    const token = 'ya29.a0AeDClZCRyzxNkCxW-LrLxHAQ26O70wyCW4a7LVdWA-55p6T3R6NofO9X366Krn8FF-rDPPePFer1qC-jYZlvEu7T5PqK7W9Sp7X4R82Mh2CrXJoQxMsAVrGB4DaD2FzwRpYE6EE_Xwgvpl6wccGVSzp2KeLB2iwmUwaCgYKATkSARESFQHGX2Mi8e-0FJXRrW8rkbRHp-9YeQ0169';
    const dummyList = [
        {
            id:1,
            name:"김선생",
            ment:"월요일 가능한가요?",
            time:"오후 3:00",
            tag:"#문화",
            intro:"한국외국어대학교 영어영문학 전공했습니다. 편하게 문의 주세요~ 주로 한국의 전통 문화에 대해...",
            num:1
        },
        {
            id:2,
            name:"닉네임",
            ment:"이번 주도 3시인가요?",
            time:"오후 1:00",
            num:3
        },
        {
            id:3,
            name:"김선생",
            ment:"안녕하세요^^",
            time:"오후 1:36",
            num:4
        },
        {
            id:1,
            name:"김선생",
            ment:"월요일 가능한가요?",
            time:"오후 3:00",
            num:1
        },
        {
            id:2,
            name:"닉네임",
            ment:"이번 주도 3시인가요?",
            time:"오후 1:00",
            num:3
        },
        {
            id:3,
            name:"김선생",
            ment:"안녕하세요^^",
            time:"오후 1:36",
            num:4
        },
        {
            id:2,
            name:"닉네임",
            ment:"이번 주도 3시인가요?",
            time:"오후 1:00",
            num:3
        },
        {
            id:3,
            name:"김선생",
            ment:"안녕하세요^^",
            time:"오후 1:36",
            num:4
        }
    ]

    const dummyList1 = [
        {
            id:1,
            name:"김선생",
            ment:"월요일 입니다~",
            time:"오후 3:00",
            num:1
        },
        {
            id:2,
            name:"닉네임1",
            ment:"3시인가요?",
            time:"오후 1:00",
            num:3
        },
        {
            id:3,
            name:"김선생1",
            ment:"안녕^^",
            time:"오후 1:36",
            num:4
        }
    ]
    const ChatList=({chatList})=>{
        return(
            <div className="Chat">
                
                {chatList.map((data, index)=>(
                    <button id="chatCont" onClick={() => openModal(data)} key={`${data.id}-${index}`}>
                    <div id="profile"></div>
                    <div id="main_cont">
                        <div id="name">{data.name}</div>
                        <div id="ment">{data.ment}</div>
                    </div>
                    <div id="ect">
                        <div id="time">{data.time}</div>
                        <div id="num">{data.num}</div>
                    </div> 
                    </button>
                ))}
               
            </div>
        );
    };

    const openModal = (data) => {
     
        setSelectedData(data)
        setModalIsOpen(true);
    };
    const closeModal = () => {
        setModalIsOpen(false);
        
    };

    useEffect(() => {
        if (!token) return; // 토큰이 없으면 데이터를 가져오지 않음

        // 마이페이지 정보를 가져오는 함수 호출
        const fetchChatListData = async () => {
            try {
                const ChatListData = await getChatRooms(token);
                setChatList(ChatListData);
                
            } catch (error) {
                console.error('Error fetching mypage data:', error);
            }
        };

        fetchChatListData();
    }, [token]);

    return (
        
           
            <div className="chat">
               
                <div id="tabCont">
                    <Tabs>
                        <div label="전체 |">
                          
                        {chatList ? (
                        <ChatList chatList={chatList} />
                    ) : (
                        <div>Loading...</div> // Optionally show a loading state
                    )}
                        </div>
                        
                            
                        <div label="| 멘토링 중" > 
                        {chatList ? (
                        <ChatList chatList={chatList} />
                    ) : (
                        <div>Loading...</div> // Optionally show a loading state
                    )}
                         </div>
                    </Tabs>
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
                        <div id="modal_name">{selectedData?.name}</div>
                        <div id="modal_tag">{selectedData?.tag}</div>
                    </div>
                    </div>
                    <div id="modal_intro">{selectedData?.intro}</div>
                    <button id="goChat" onClick={()=> navigate('/chatroom')}>채팅하기</button>
                </div>
                 ) : null} 
            </Modal>

            </div>
       
    )
}

export default Chat;