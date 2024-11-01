import React, { useState, useEffect} from "react";
import Tabs from "../Chat/Tabs";
import "./Search.css";
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';
import { getUserList } from "../../api/userList/getUserList";

function Search(){

const [modalIsOpen, setModalIsOpen] = useState(false);
const [selectedData, setSelectedData] = useState(null)
const navigate = useNavigate();  
const token = 'ya29.a0AeDClZCRyzxNkCxW-LrLxHAQ26O70wyCW4a7LVdWA-55p6T3R6NofO9X366Krn8FF-rDPPePFer1qC-jYZlvEu7T5PqK7W9Sp7X4R82Mh2CrXJoQxMsAVrGB4DaD2FzwRpYE6EE_Xwgvpl6wccGVSzp2KeLB2iwmUwaCgYKATkSARESFQHGX2Mi8e-0FJXRrW8rkbRHp-9YeQ0169';
const [mentoData,setmentoData]=useState({FindMentos:[]})
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

const ChatList=({chatList})=>{
    return(
        <div className="Chat">
            
            {chatList.map((data, index)=>(
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
 
    setSelectedData(data)
    setModalIsOpen(true);
};
const closeModal = () => {
    setModalIsOpen(false);
    
};

return (
    
       
        <div className="Search">
           <div id="title">멘토링 찾기</div>
            <div id="tabCont">
                <Tabs>
                    <div label="전체">
                      
                    <ChatList chatList={mentoData.FindMentos}/>
                    </div>
                    
                        
                    <div label="#JavaScript" > 
                    <ChatList chatList={filteredMentosByCulture}/>
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
                    <div id="modal_name">{selectedData?.mentoNick}</div>
                    <div id="modal_tag">#{selectedData?.subjectTag}</div>
                </div>
                </div>
                <div id="modal_intro">{selectedData?.mentoInfo}</div>
                <button id="goChat" onClick={()=> navigate('/chatroom')}>채팅하기</button>
            </div>
             ) : null} 
        </Modal>

        </div>
   
)
}

export default Search;