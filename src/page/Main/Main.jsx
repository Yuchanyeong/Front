
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect} from "react";
import "../Search/Search.css";
function Main(){
    const navigate = useNavigate();  
    return(
    <div className="Main">
            메인페이지 안녕s
        
        


        <div id="navi-con">
            <div id="navi">
            <button id="home" onClick={()=> navigate('/home')}></button>
            <button id="chat" onClick={()=> navigate('/chat')}></button>
            <button id="search" onClick={()=> navigate('/search')}></button>
            <button id="mypage" onClick={()=> navigate('/mypage')}></button>
         </div>
        </div>
    </div>

    
    );
}

export default Main;