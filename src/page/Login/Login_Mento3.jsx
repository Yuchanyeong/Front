import React, { useState, useRef } from "react";
import './Login_Mento3.css';  // CSS 파일을 import

function Login_Mento3() {
    const [selectedFile, setSelectedFile] = useState(null); // 업로드한 파일 상태
    const [cameraEnabled, setCameraEnabled] = useState(false); // 카메라 상태
    const [photo, setPhoto] = useState(null); // 촬영한 사진 상태
    const videoRef = useRef(null); // 비디오 스트림 참조

    // 파일 선택 핸들러
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(URL.createObjectURL(file)); // 파일을 미리보기 URL로 저장
            setPhoto(null); // 파일 업로드 시 촬영된 사진 초기화
            setCameraEnabled(false); // 파일 선택 시 카메라 비활성화
        }
    };

    // 카메라 활성화
    const enableCamera = async () => {
        setCameraEnabled(true);
        setPhoto(null); // 카메라 열 때 파일 업로드 미리보기 초기화
        setSelectedFile(null); // 카메라 열 때 파일 선택 초기화
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoRef.current.srcObject = stream;
            videoRef.current.play();
        } catch (error) {
            console.error("Error accessing camera:", error);
            setCameraEnabled(false);
        }
    };

    // 사진 촬영
    const takePhoto = () => {
        const video = videoRef.current;
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const context = canvas.getContext("2d");
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        setPhoto(canvas.toDataURL("image/png")); // 촬영한 사진 저장
        setCameraEnabled(false); // 카메라 종료
        video.srcObject.getTracks().forEach(track => track.stop()); // 비디오 스트림 종료
    };

    return (
        <div className="Login_Mento3-container">
            <h1 className="mento3-title">학력 인증</h1>
            <h2 className="mento3-subtitle">
                학적 상태를 확인할 수 있는<br />
                학생증, 재학/휴학/재적/졸업<br />
                증명서 등을 준비해주세요.
            </h2>
            <div className="certify-div">
                <input 
                    type="file" 
                    id="fileUpload" 
                    style={{ display: 'none' }} 
                    onChange={handleFileChange} 
                    accept="image/*" // 이미지 파일만 허용
                />
                <label htmlFor="fileUpload" className="upload-label">
                    파일 선택
                </label>

                <button className="camera-button" onClick={enableCamera}>카메라 열기</button>

                {/* 이미지 또는 비디오 표시 영역 */}
                <div className="image-container">
                    {cameraEnabled ? (
                        <>
                            <video ref={videoRef} className="video-feed"></video>
                            <button className="capture-button" onClick={takePhoto}>사진 촬영</button>
                        </>
                    ) : photo ? (
                        <img src={photo} alt="Captured" className="captured-photo" />
                    ) : selectedFile ? (
                        <img src={selectedFile} alt="Uploaded" className="captured-photo" />
                    ) : (
                        <div className="placeholder">여기에 미리보기가 표시됩니다.</div>
                    )}
                </div>
            </div>
            <button id="schola-button" className="mento3-button"></button>
        </div>
    );
}

export default Login_Mento3;
