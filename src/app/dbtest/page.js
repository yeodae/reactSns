// db테스트 파일(호출, src/app/dbtest/page.js)
"use client"
import React, { useState, useEffect } from 'react';

export default function Search(){
  const [posts, setPosts] = useState([]);
  var param1 = "test";
  useEffect(() => {
    fetch(`/api/user?param1=${param1}`) // API 라우트를 호출
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
  }, [param1]);

  return (
    <div>
     <div>리스트 출력</div>
     <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.name}</li>
        ))}
      </ul>
      <button onClick={() => {
        fetch('/api/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ value1: '박철수', value2 : '서울'}), // JSON 데이터를 전송합니다.
        }) // 여러개 보낼때 body 옆에 계속 추가하면된다.
          .then((response) => {
            if (!response.ok) {
              throw new Error('서버 응답이 실패했습니다.');
            }
            return response.json();
          })
          .then((data) => {
            console.log('서버 응답:', data);
          })
          .catch((error) => {
            console.error('POST 요청 중 오류 발생:', error);
          });
      }}>테스트 버튼(Insert)</button>

      <button onClick={()=>{
        const updatedData = {
          id: 2, // id
          name: '박철수',
        };
        
        fetch(`/api/user`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json', // JSON 데이터를 전송하기 위한 헤더
          },
          body: JSON.stringify(updatedData), // JSON 형식의 업데이트 데이터
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('서버 응답이 실패했습니다.');
            }
            return response.json();
          })
          .then((data) => {
            console.log('서버 응답:', data);
          })
          .catch((error) => {
            console.error('PUT 요청 중 오류 발생:', error);
          });
      }}>테스트 버튼(Update)</button>
      <button onClick={()=>{
        const deleteData = {
          value1: 3,
        };
        fetch(`/api/user`, {
          method: 'DELETE',
          body: JSON.stringify(deleteData), // JSON 형식의 업데이트 데이터
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('서버 응답이 실패했습니다.');
            }
            return response.json();
          })
          .then((data) => {
            console.log('서버 응답:', data);
          })
          .catch((error) => {
            console.error('DELETE 요청 중 오류 발생:', error);
          });
      }}>테스트버튼(Delete)</button>
    </div>
  )
}