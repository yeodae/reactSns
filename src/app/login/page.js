"use client"
import Image from 'next/image'
import '../login.css';
export default function Login() {
  return (
    <form onSubmit={(e)=>{
      e.preventDefault();
      var email = e.target.email.value;
      var pw = e.target.pw.value;
    }}>
      <div className='loginArea'>
        <div className='loginBox'>
          <h2 className='h2'>𝑰𝒏𝒔𝒅𝒐𝒈𝒓𝒂𝒎</h2>
          <div className='loginBox2'>
            <div><input type='text' name="email" placeholder='이메일 주소'></input></div>
            <div><input type='password' name="pw" placeholder='비밀번호'></input></div>
            <div><input type="submit" value="로그인"></input></div>
          </div>

          <div>
            <a href="/pwfind">비밀번호를 잊으셨나요?</a>
          </div>

          <div className='loginGo'>
            계정이 없으신가요? <a href='/join'>회원가입</a>
          </div>
        </div>
      </div>
   </form>
  )
}
