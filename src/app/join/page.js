"use client"
import Image from 'next/image'
import '../login.css';
export default function Join() {
  return (
    <form onSubmit={(e)=>{
      e.preventDefault();
      var email = e.target.email.value;
      var pw = e.target.name.value;
      var pw = e.target.name2.value;
      var pw = e.target.pw.value;
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
   </form>
  )
}
