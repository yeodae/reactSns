import React from 'react';
import { Avatar } from './Feed'; // Feed.js에서 Avatar를 가져옵니다.
import './home.css';
function Story({ image, username }) {
  return (
    <div className="story">
      <Avatar src={image} alt={username} />
      <span className="username">{username}</span>
    </div>
  );
}

export default Story;