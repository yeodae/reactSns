"use client"
import React, { useState,useEffect } from 'react';
import styled from '@emotion/styled';
import MenuBar from '../MenuBar';
import Header from '../Header';
import './add.css';
import ReactCrop from 'react-image-crop';
import { useRouter } from 'next/navigation';
import 'react-image-crop/dist/ReactCrop.css';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
const Container = styled.div  `padding: 20px;`;

const Form = styled.form``;
const Label = styled.label  `display: block;   margin-bottom: 5px;`;
const Input = styled.input  `display: block;   width: 100%;   padding: 12px 20px;   margin: 0 0 20px;   box-sizing: border-box;   border: 1px solid #ccc;   border-radius: 4px;`;
const Textarea = styled.textarea  `display: block;   width: 100%;   height : 150px;   padding: 12px 20px;   margin: 0 0 20px;   box-sizing: border-box;   border: 1px solid #ccc;   border-radius: 4px;`;


const Button = styled.button  `background-color: #4caf50;   border: none;   color: white;   padding: 15px 32px;   text-align: center;   text-decoration: none;   display: inline-block;   font-size: 16px;   margin: 4px 2px;   cursor: pointer;   border-radius: 4px;`;

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
width : 100%;
margin-top: 10px;
`; // 사진미리보기

export default function PlusSquare(){
const [file, setFile] = useState(null);
const [crop, setCrop] = useState({ aspect: 1 });
const [croppedImage, setCroppedImage] = useState(null);
const [uId, setUId] = useState('');
const router = useRouter();

useEffect(() => {
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

const handleSocialShare = (platform) => {
// Implement social sharing logic here
};
return(
<div className='upload'>
<Header/>
<Container>
<div className='uploadArea'>
<Form onSubmit={async (e)=>{
e.preventDefault();
var title = e.target.title.value;
var content = e.target.content.value;
var tag = e.target.tag.value;
var userId = uId;

             // 파일 테이블 업로드
             console.log("file ==> ", file);
    const formData = new FormData(); // FormData 객체 생성
    if (file !== null) {
      formData.append('title', title);
      formData.append('content', content);
      formData.append('tag', tag);
      formData.append('userId', userId);
      formData.append('file', file);
    }
    try {
      const response = await fetch('/api/post', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('서버 응답이 실패했습니다.');
      }else{
        alert('게시물 등록이 완료되었습니다.');
        router.push('/home'); // 로그인 페이지로 이동
        return response.json();
      }

      const data = await response.json();
      console.log('서버 응답:', data);
    } catch (error) {
      console.error('POST 요청 중 오류 발생:', error);
    }
    }}>

        <Label>글 제목
        <Input type="text" name="title" id="caption" placeholder="Write a Title" /></Label>
        <Label>글 내용
        <Textarea
                 name="content"
                 type="text"
                 id="location"
                 placeholder="Write a Content"
               /></Label>
        <Label>HashTag
        <Input
                 name="tag"
                 type="text"
                 id="tags"
                 placeholder="Tag users by their username..."
               /></Label>

        <Label  Label htmlFor="file-input">Upload a photo or video:</Label>
        <Input
          type="file"
          id="file-input"
          accept="image/*,video/*"
          onChange={onFileChange}

        />
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
        <div className='posbtnArea'>
          <Button className='postbtn' type="submit">Post</Button>
        </div>

        </Form>
        </div>

        <SocialShare className='SocialShare'>
        <a href="<https://www.facebook.com/>">
            <SocialIcon onClick={() => handleSocialShare('facebook')}>
            <FaFacebookF />
            </SocialIcon>
        </a>
        <a href="<https://www.twitter.com/>">
            <SocialIcon onClick={() => handleSocialShare('twitter')}>
            <FaTwitter />
            </SocialIcon>
        </a>
        <a href="<https://www.instagram.com/>">
            <SocialIcon onClick={() => handleSocialShare('instagram')}>
            <FaInstagram />
            </SocialIcon>
        </a>
        </SocialShare>

        </Container>
        <MenuBar />
        </div>
    );
};
