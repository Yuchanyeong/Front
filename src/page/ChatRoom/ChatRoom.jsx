import React, { useState, useContext, useEffect, useRef } from "react";
import './ChatRoom.css';
import { useNavigate,useLocation} from "react-router-dom";
import Modal from 'react-modal';



function ChatRoom() {
  const navigate = useNavigate(); 
  const location = useLocation();
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null); 
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = (data) => {
     
    
    setModalIsOpen(true);
};
const closeModal = () => {
    setModalIsOpen(false);
    
};
  const Message = ({ id, text, sender }) => {
    const isOwnMessage = sender === 'user';
    const messageClass = isOwnMessage ? 'message-right' : 'message-left';
    return (
      <div className={messageClass}>
        {isOwnMessage && <div className="modi" />}
        <div id={id} className={`message_${messageClass}`}>
          <div className="message-text">{text}</div>
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
            sender={message.sender}
            text={message.text}
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
    const [text, setText] = useState("");

    const handleSubmit = (e) => {
      e.preventDefault();
      const message = {
        text: text,
        sender: 'user'
      };
      onMessageSubmit(message);
      setText('');
    };

    return (
      <div className='message_form'>
        <form id='messageinput' onSubmit={handleSubmit}>
          <input
            placeholder='텍스트를 입력하세요'
            className='textinput'
            onChange={(e) => setText(e.target.value)}
            value={text}
            autoFocus
          />
          <button id='submitbtn' type='submit' > 전송</button>
        </form>
      </div>
    );
  };

  const handleMessageSubmit = async (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);

    

    // try {
    //   const response = await postChat(content, message.text);
      
    //   if (response) {
    //     const aiMessage = {
    //       text: response.chat,
    //       sender: 'ai'
    //     };
    //     setMessages((prevMessages) => [...prevMessages, aiMessage]);
    //     await updateDiaryWithAIMessage(response.chat);
    //     if (response.endpoint === "True") {
    //       setIsChatEnded(true);
    //       console.log("Chatting session ended");
    //     }
    //   }
    // } catch (error) {
    //   console.error('Error sending message:', error);
    // }
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
                        <button id="mypage" onClick={()=> navigate('/mypage')}></button>
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