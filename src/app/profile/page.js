"use client"
import Image from 'next/image'
import '../login.css';
import styled from '@emotion/styled';
import Footer from '../footer';
import ReactCrop from 'react-image-crop';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import 'react-image-crop/dist/ReactCrop.css';
const SocialShare = styled.div  `display: flex;   justify-content: center;   align-items: center;   margin-top: 20px;`;

const SocialIcon = styled.div`
color: #fff;
background-color: #3b5998;
display: flex;
justify-content: center;
align-items: center;
width: 40px;
height: 40px;
border-radius: 50%;
margin-right: 10px;
cursor: pointer;
transition: background-color 0.2s;

&:last-child {
margin-right: 0;
}

&:hover {
background-color: #4c70ba;
}
`; const PreviewImage = styled.img`
width: 100px;
height: 100px;
margin-top: 10px;
border-radius: 50%;

`; // 사진미리보기
const ProfileImagePreview = styled.div`
  width: 150px; /* Adjust the width as needed */
  height: 150px; /* Adjust the height as needed */
  border: 1px solid #ccc;
  margin-bottom: 10px;
`;
const Input = styled.input  `   width: 100%;   padding: 12px 20px;   margin: 0 auto;   box-sizing: border-box;   border: 1px solid #ccc;   border-radius: 4px;`;

export default function Profile() {
  const [posts, setPosts] = useState([]); // 여기서부터 Login
  var param1 = "test";
  const router = useRouter();
  const [crop, setCrop] = useState({ aspect: 1 });
  const [croppedImage, setCroppedImage] = useState(null);
  const [file, setFile] = useState(null);
  const [uId, setUId] = useState('');
  const [userData, setUserData] = useState(null);

  const onUpload = (e)=>{
    const file = e.target.files[0];
    setFile(file);
  }
  useEffect(() => {

    const fetchUserData = async () => {
        try {
          const response = await fetch(`/api/user`);
          if (!response.ok) {
            throw new Error('Failed to fetch user data.');
          }
          const data = await response.json();
          setUserData(data); // Set the user data
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
  
      fetchUserData();

    const savedUId = sessionStorage.getItem('uId');
    setUId(savedUId);
    console.log("uId ==>",uId);
    }, []);// 세션값 추가 코드 끝

    const onFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
    console.log("reader==>", reader);
    setFile(e.target.files[0]);
    // 이미지 파일을 미리보기로 설정
    setCroppedImage(reader.result);
    });
    reader.readAsDataURL(e.target.files[0]);
    }
    };
    
    const onImageLoaded = (image) => {
        setCroppedImage(image);
    };
        
        const onCropComplete = (crop) => {
        if (croppedImage && crop.width && crop.height) {
        // Implement image cropping logic here
        }
    };

  return (
    <form onSubmit={async (e)=>{
      e.preventDefault();
      var email = e.target.email.value;
      //var profile = "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA4MTlfMTE4%2FMDAxNjkyMzk1MjU1MDg4.BymuAbE_wepgAb9T7GXelEtxs5livMt4ONbPjWJyLnYg.KvIS2ZwjfOydOaVJg3K9y2aQZ4hDW4fhWAPCOFqfthUg.PNG.jjungaang%2Fpfp%25A3%25DFlightgrey%25A3%25DFuzubaong.png&type=sc960_832";

      //조건식 거는부분 
      if (email != uId) {
        alert('이메일 또는 아이디를 확인해주세요.');
        return;
      }

      const formData = new FormData(); // FormData 객체 생성
    if (file !== null) {
      formData.append('email', email);
      formData.append('file', file);
    }
    try {
      const response = await fetch('/api/user', {
        method: 'PUT',
        body: formData
      });
      
      const data = await response.json();      
      console.log('서버 응답:', data);
      if (!response.ok) {
        throw new Error('서버 응답이 실패했습니다.1');
      }else{
        alert('프로필 수정이 완료되었습니다.');
        router.push('/user'); 
      } 
    } catch (error) {
      console.error('POST 요청 중 오류 발생:2', error);
    }
    }}>
      <div className='loginArea'>
        <div className='loginBox'>
          <h2 className='h2'>𝑰𝒏𝒔𝒅𝒐𝒈𝒓𝒂𝒎</h2>
          <div className='loginBox2'>
            <h3 className='stadyInfo'>프로필 수정</h3>
            <div><input type='text' name="email" placeholder=' Email or ID Check' required></input></div>
            <div>
            <Input
                type="file"
                id="file-input"
                accept="image/*,video/*"
                onChange={onFileChange}
                />    
            </div>
            {croppedImage && <PreviewImage src={croppedImage} alt="Preview" className='PreviewImage'/>}
        {file && (
        <ReactCrop
        src={file}
        crop={crop}
        onChange={(newCrop) => setCrop(newCrop)}
        onImageLoaded={onImageLoaded}
        onComplete={onCropComplete}
        />
        )}
            <div><input type="submit" value="수정"></input></div>
          </div>
          <div className='loginGo'>
             <a href='/home'>홈페이지로 돌아가기</a>
          </div>
        </div>
      </div>
      <Footer/>
   </form>
   
  )
}
