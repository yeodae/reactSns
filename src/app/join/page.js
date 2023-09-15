"use client"
import Image from 'next/image'
import '../login.css';
import Footer from '../footer';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

export default function Join() {
  const [posts, setPosts] = useState([]); // 여기서부터 Login
  var param1 = "test";
  const router = useRouter();

  return (
    <form onSubmit={(e)=>{
      e.preventDefault();
      var email = e.target.email.value;
      var name = e.target.name.value;
      var name2 = e.target.name2.value;
      var pw = e.target.pw.value;

      //조건식 거는부분 
      if (!email || !name || !name2 || !pw) {
        alert('모든 정보를 입력해주세요.');
        return;
      }

      fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, pw : pw, name : name, name2 : name2}), // JSON 데이터를 전송합니다.
      }) // 여러개 보낼때 body 옆에 계속 추가하면된다.
        .then((response) => {
          if (!response.ok) {
            throw new Error('서버 응답이 실패했습니다.');
          }else{
            alert('회원가입이 성공적으로 완료되었습니다.');
            router.push('/login'); // 로그인 페이지로 이동
            return response.json();
          }
        })
        .then((data) => {
          console.log('서버 응답:', data);
        })
        .catch((error) => {
          console.error('POST 요청 중 오류 발생:', error);
        });
    }}>
      <div className='loginArea'>
        <div className='loginBox'>
          <h2 className='h2'>𝑰𝒏𝒔𝒅𝒐𝒈𝒓𝒂𝒎</h2>
          <div className='loginBox2'>
            <h3 className='stadyInfo'>기본정보</h3>
            <div><input type='text' name="email" placeholder='이메일 주소'></input></div>
            <div><input type='text' name="name" placeholder='성명'></input></div>
            <div><input type='text' name="name2" placeholder='사용자 이름'></input></div>
            <div><input type='password' name="pw" placeholder='비밀번호'></input></div>
            <div><input type="submit" value="가입"></input></div>
          </div>
          <div className='loginGo'>
            계정이 있으신가요? <a href='/login'>로그인</a>
          </div>
        </div>
      </div>
      <Footer/>
   </form>
   
  )
}
