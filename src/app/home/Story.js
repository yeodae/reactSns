import React from 'react';
import { Avatar } from './Feed'; // Feed.js에서 Avatar를 가져옵니다.
import './home.css';
function Story({ image, username }) {
  return (
    <a href="#" onClick={()=>{
      alert("서비스 준비중 입니다.");
    }}>
    <div className="story">
      <Avatar src={`/files/posts/${image}`} alt={username} />
      <span className="username">{username}</span>
    </div>
    </a>
  );
}

export default Story;