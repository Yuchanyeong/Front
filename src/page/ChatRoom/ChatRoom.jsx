import React, { useState, useContext, useEffect, useRef } from "react";
import './ChatRoom.css';
import { useNavigate, useLocation} from "react-router-dom";
import Modal from 'react-modal';
import { getChatData } from "../../api/chatDataApi/getChatData";
import { io } from "socket.io-client";
function ChatRoom() {
  const navigate = useNavigate(); 
  const [socket, setSocket] = useState(null); // socket을 상태로 관리
  const [userType, setUserType] = useState('')
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null); 
  const [token, setToken] = useState(null);
  const location = useLocation();
  const { state } = location;
  const [modalIsOpen, setModalIsOpen] = useState(false);
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
  if (!token) return; // 토큰이 없으면 작업하지 않음

  // 소켓 초기화
  const newSocket = io("https://luckymozzi.store", {
    extraHeaders: {
      Authorization: token
    }
  });

  newSocket.on('connect', () => {
    console.log('소켓 연결됨:', newSocket.id);
    // 방에 참여
    newSocket.emit("joinRoom", newSocket.id, (response) => {
      console.log('소켓 연결 완료', response);
    });
  });

  newSocket.on('connect_error', (error) => {
    console.error('소켓 연결 실패:', error);
  });

  setSocket(newSocket);

  // 마이페이지 정보를 가져오는 함수 호출
  const fetchChatData = async () => {
    try {
      const ChatData = await getChatData(token, state);
      setMessages(ChatData.chatMessages);
    } catch (error) {
      console.error('Error fetching mypage data:', error);
    }
  };

  fetchChatData();

  return () => {
    newSocket.disconnect(); // 컴포넌트 언마운트 시 소켓 연결 해제
  };
}, [token, state]); // state도 의존성 배열에 추가

  const openModal = (data) => {
     
    
    setModalIsOpen(true);
};
const closeModal = () => {
    setModalIsOpen(false);
    
};
  const Message = ({ id, messageContent, sender }) => {
    const isOwnMessage = sender === 'user';
    const messageClass = isOwnMessage ? 'message-right' : 'message-left';
    return (
      <div className={messageClass}>
        {isOwnMessage && <div className="modi" />}
        <div id={id} className={`message_${messageClass}`}>
          <div className="message-text">{messageContent}</div>
        </div>
      </div>
    );
  };

  const MessageList = ({ messages }) => {
    return (
      <div className='messages' style={{ overflowY: 'scroll', maxHeight: '660px' }}>
        {messages.map((message, i) => (
          <Message
            key={i}
            writerId={message.writerId }
            messageContent={message.messageContent}
          />
        ))}
        <div ref={messagesEndRef}/>
      </div>
    );
  };

  useEffect(() => {
    // 새로운 메시지가 추가될 때마다 스크롤을 최하단으로 이동
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const MessageForm = ({ onMessageSubmit }) => {
    const [messageContent, setMessageContent] = useState("");

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('전송할 메시지:', messageContent);
      const message = {
        messageContent: messageContent,
        sender: 'user'
      };
      onMessageSubmit(message);
     
    };

    return (
      <div className='message_form'>
        <form id='messageinput' onSubmit={handleSubmit}>
          <input
            placeholder='텍스트를 입력하세요'
            className='textinput'
            onChange={(e) => setMessageContent(e.target.value)}
            value={messageContent}
            autoFocus
          />
          <button id='submitbtn' type='submit' > 전송</button>
        </form>
      </div>
    );
  };

  const handleMessageSubmit = async (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
    const newChatMessage = {
      writerId:message.sender,
      messageContent:message.messageContent,
      created_at:""
    }
    if (socket) {
    socket.emit("sendChat", state, newChatMessage);
    console.log(newChatMessage);
   
    }else{console.log('소켓노')} 
  };

  

  return (
    <div className="ChatRoom">
      <div id="secondBox">
        <button id="backbtn" onClick={()=>navigate('/chat')}> {`<`} </button>
        <div id="profile_img"></div>
        <div id="name">닉네임</div>
        <button id="mentoring" onClick={()=>openModal()}>멘토링 신청</button>
      </div>
      <div id="inputbox">
        <div id="chatbox">
          <MessageList messages={messages} />
        </div> 
        <MessageForm onMessageSubmit={handleMessageSubmit} />
      </div>
      <div id="nevi">
       
      </div>
      <div id="navi-con">
                    <div id="navi">
                        <button id="home" onClick={()=> navigate('/home')}></button>
                        <button id="chat" onClick={()=> navigate('/chat')}></button>
                        <button id="search" onClick={()=> navigate('/search')}></button>
                        <button id="mypage" onClick={()=> navigate(`/mypage_${userType}`)}></button>
                    </div>
                </div>
                <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Pop up Message"
                ariaHideApp={false}
                className="popup"
                overlayClassName="popup-overlay"
            >
               
                <div id="submit_popup">
                  <div id="popup_ment"> 멘토링 신청이 완료되었습니다!</div>
                  <button id='popup_close'onClick={()=>closeModal()}>닫기</button>
                 
                </div>
            </Modal>

    </div>
  );
}

export default ChatRoom;