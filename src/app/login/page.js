"use client"
import Image from 'next/image'
import '../login.css';
import Footer from '../footer';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SiNaver } from "react-icons/si";


export default function Login() {
  const [posts, setPosts] = useState([]); // 여기서부터 Login
  var param1 = "test";
  const router = useRouter();

  useEffect(() => {
    fetch(`/api/user`) // API 라우트를 호출
    // param1 파람값 보내는 방법 
      .then((response) => {
        if (!response.ok) {
          throw new Error('서버 응답이 실패했습니다.');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setPosts(data);
      })
      .catch((error) => {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      });
  }, []); // Login Code End
console.log("posts==>",posts);
  return (
    <form onSubmit={(e)=>{
      e.preventDefault();
      var email = e.target.email.value;
      var pw = e.target.pw.value;
      
      if (email && pw) { // 예시: 간단한 유효성 검사, 이메일과 비밀번호가 입력되었는지 확인
        try {
          // 여기에서 서버로 로그인 요청을 보내고, 로그인 성공 여부를 확인하는 로직을 추가하세요.
          for(var i = 0; i<=posts.length; i++){
            if(posts[i].email == email && posts[i].pw == pw){
              sessionStorage.setItem('uId', email);
              router.push('/home');
              return;
            }
          }
        } catch (error) {
          alert("이메일이나 패스워드가 틀립니다.");
        }
      } else {
        alert('이메일과 비밀번호를 모두 입력하세요.');
      }
    
    }}>
      
      <div className='loginArea'>
        <div className='loginBox'>
          <h2 className='h2'>𝑰𝒏𝒔𝒅𝒐𝒈𝒓𝒂𝒎</h2>
          <div className='loginBox2'>
            <div><input type='text' name="email" placeholder='이메일 주소'></input></div>
            <div><input type='password' name="pw" placeholder='비밀번호'></input></div>
            <div><input type="submit" value="로그인"></input></div>
          </div>

          <div className='loginBox3'>
          <div className='naver'><a href="#" onClick={()=>{
            alert("서비스 준비중입니다.");
          }}><SiNaver style={{ color: 'white', marginRight: '30px' }}/>네이버 아이디로 로그인</a></div>
            <a href="/pwfind">비밀번호를 잊으셨나요?</a>
          </div>

          <div className='loginGo'>
            계정이 없으신가요? <a href='/join'>회원가입</a>
          </div>
        </div>
        <Footer/>
      </div>
   </form>
  )
}
