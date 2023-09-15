import Image from 'next/image'
import '/src/app/footer.css';
import React from 'react';

export default function Footer() {
  return (
   <footer className="footer">
    <a href="#">Meta</a>
    <a href="#">소개</a>
    <a href="#">블로그</a>
    <a href="#">반려견 생활 정보</a>
    <a href="#">도움말</a>
    <a href="#">API</a>
    <a href="#">개인정보처리방침</a>
    <a href="#">약관</a>
    <a href="#">위치</a>
    <a href="#">Insdogram Lite</a>
    <a href="#">연락처 업로드 & 비사용자</a>
    <a href="#">Meta Verfied</a>
    <div>
    <h4>© 2023 Insdogram from Meta</h4>
    <a href="https://www.tjoeun.co.kr/">© From The JoeunAcademy</a>
    </div>
   </footer>
  )
}
