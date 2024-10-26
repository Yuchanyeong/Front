import React, { useState, useEffect} from "react";
import Tabs from "./Tabs";
import "./Chat.css";
import { useNavigate } from "react-router-dom";


function Chat() {
    const navigate = useNavigate();  
    const dummyList = [
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
                
                {chatList.map((data)=>(
                    <div id="chatCont">
                    <div id="profile"></div>
                    <div id="main_cont">
                        <div id="name">{data.name}</div>
                        <div id="ment">{data.ment}</div>
                    </div>
                    <div id="ect">
                        <div id="time">{data.time}</div>
                        <div id="num">{data.num}</div>
                    </div> 
                    </div>
                ))}
               
            </div>
        );
    };

    return (
        
           
            <div className="chat">
               
                <div id="tabCont">
                    <Tabs>
                        <div label="전체 |">
                          
                        <ChatList chatList={dummyList}/>
                        </div>
                        
                            
                        <div label="| 멘토링 중" > 
                        <ChatList chatList={dummyList1}/>
                         </div>
                    </Tabs>
                </div>
                <div id="divider">
                            
                        </div>
                <div id="navi-con">
                    <div id="navi">
                        <div id="home" onClick={navigate('./home')}></div>
                        <div id="chat" onClick={navigate('./chat')}></div>
                        <div id="search" onClick={navigate('./search')}></div>
                        <div id="mypage" onClick={navigate('./mypage')}></div>
                    </div>
                </div>

            </div>
       
    )
}

export default Chat;