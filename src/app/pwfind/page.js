"use client"
import Image from 'next/image'
import { BiErrorCircle } from "react-icons/bi";
import Footer from '../footer';
import '../login.css';
export default function pwFind() {
  return (
    <form onSubmit={(e)=>{
      e.preventDefault();
      var email = e.target.email.value;
      var pw = e.target.name.value;
    }}>
      <div className='loginArea'>
        <div className='loginBox'>
          <h2 className='h2'><BiErrorCircle/><div>FIND PW</div></h2>          
          <div className='loginBox2'>
            <div><input type='text' name="email" placeholder='이메일 주소'></input></div>
            <div><input type='password' name="name" placeholder='이름'></input></div>
            <div><input type="submit" value="찾기"></input></div>
          </div>

          <div>
            <a href="/login">계정이 있으신가요?</a>
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
