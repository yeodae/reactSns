"use client"
import { useState, useEffect } from 'react';
import './globals.css';
import MenuBar from './MenuBar';
import Header from './Header';

export default function RootLayout({ children }) {
  const [posts, setPosts] = useState([]); // useState를 컴포넌트 내부로 이동

  useEffect(() => {
    fetch('/api/user')
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
  }, []);

  return (
    <html>
      <body>
        <Header/>
        
        {children}
        <MenuBar />
      </body>
    </html>
  );
}
