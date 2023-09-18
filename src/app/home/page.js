"use client"
import React, { useState, useEffect } from 'react';
import MenuBar from '../MenuBar';
import Header from '../Header';
import Story from './Story'; // Story 컴포넌트를 가져옵니다.
import { Feed, Post, PostHeader, User, Avatar, Username, PostImage, PostActions, ActionButton, Content, CommentInput } from './Feed';
import { useRouter } from 'next/navigation';
import './home.css';
import { PiChatCenteredDots } from "react-icons/pi";


export default function Home(){
  const [user, setUser] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState([]);
  const [uId, setUId] = useState('');
  const [clicked, setClicked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLinkCopied, setIsLinkCopied] = useState(false);

  const router = useRouter();
  // Replace this function with a real API call
  
  useEffect(() => {
    
    const savedUId = sessionStorage.getItem('uId');
    setUId(savedUId);
    console.log("id ==>",uId);
      //게시글출력
      fetch('/api/post')
      .then((response) => {
        if (!response.ok) {
          throw new Error('서버 응답이 실패했습니다.');
        }
        return response.json();
      })
      .then((data) => {
        console.log("게시글 ==>",data);
        setPosts(data);
      })
      .catch((error) => {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      }); 
      //댓글출력
      fetch('/api/comment')
      .then((response) => {
        if (!response.ok) {
          throw new Error('서버 응답이 실패했습니다.');
        }
        return response.json();
      })
      .then((data) => {
        console.log("댓글 ==>",data);
        setComment(data);
      })
      .catch((error) => {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      }); 
      //유저테이블 출력
      fetch('/api/user')
      .then((response) => {
        if (!response.ok) {
          throw new Error('서버 응답이 실패했습니다.');
        }
        return response.json();
      })
      .then((data) => {
        console.log("home/user ==>",data);
        setUser(data);
      })
      .catch((error) => {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      });
      
      
  }, []);

  const toggleLike = (postId) => {
    // 각 게시물의 좋아요 상태를 업데이트
    setClicked((prevClicked) => !prevClicked);
    setTimeout(() => {
      setClicked(false);
    }, 200); // 1초 (1000ms) 후에 클릭 상태를 false로 변경합니다.

    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.P_NO === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              LIKE: post.LIKE + 1, // 고정된 값으로 좋아요 갯수 업데이트
            }
          : post
      )
    );
    // 서버로 좋아요 상태를 업데이트하는 요청 보내기
    fetch(`/api/post`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ pNo: postId }), // 이 부분은 postId를 서버로 보내는 부분입니다.
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('서버 응답이 실패했습니다.');
      }
      return response.json();
    })
    
    
    .catch((error) => {
      console.error('좋아요 업데이트 중 오류 발생:', error);
    });
};
    const openModal = () => {
      setIsModalOpen(true);
    };

    const closeModal = () => {
      setIsModalOpen(false);
    };

    const copyLink = () => {
      const currentUrl = window.location.href;
      navigator.clipboard.writeText(currentUrl).then(() => {
        setIsLinkCopied(true); // 복사가 성공하면 상태를 업데이트합니다.
      });
    };


  return (
    <div>
      <Header />
      <div className="stories">
        {user.map((u)=> (
          <div key={u.id} className="avatar-container">
            {/* 스토리 목록 */}
          <Story image={u.profile} username={u.email} className="avatar"/>
          </div>        
          
  ))}
      </div>
      <Feed>
        {posts.map((post) => (
          <Post key={post.P_NO}>
            <PostHeader>        
              <User>
                <Avatar src={`/files/posts/${post.profile}`} />
                <Username>{post.U_ID}</Username>
              </User>
            </PostHeader>
            <PostImage src={`/files/posts/${post.PF_NO}`} alt="Post" />
            <PostActions>
            <ActionButton
                className={`heart-button ${clicked ? 'clicked' : ''}`} // clicked 클래스를 조건에 따라 추가합니다.
                onClick={() => toggleLike(post.P_NO)}
              >
                ❤️
              </ActionButton>


              <ActionButton
                onClick={() => {
                  document.querySelector(`#commentBox-${post.P_NO}`).focus();
                }}
              >
                💬
              </ActionButton>
              <ActionButton
                onClick={() => {
                  const currentUrl = window.location.href;
                  navigator.clipboard.writeText(currentUrl).then(() => {                    
                    window.alert(`링크가 복사되었습니다.`);
                  });
                }}
              >
                🔗
              </ActionButton>

            </PostActions>
            <Content>
              <div>
                <strong>좋아요 {post.LIKE}개</strong>
              </div>
              <div>
                <strong>{post.TITLE}</strong>
              </div>              
              <div>
                <span>{post.CONTENT}</span>
              </div>
              <div>
                <span>{post.TAG}</span>
              </div>
            </Content>
            <Content>
                {/* 댓글 목록 표시 */}
            
            {comment.map((ment) => {
              if (ment.P_NO === post.P_NO) {
                return (
                  <div className='comment' key={ment.C_NO}>
                    <div>
                      <strong>{ment.C_ID}</strong>
                      <span>{ment.C_COMMENT}</span>
                    </div>
                  </div>
                );
              } else {
                return null; // 조건에 맞지 않으면 렌더링하지 않음
              }
            })}
           
            
            <form onSubmit={(e)=>{
              e.preventDefault();
              console.log("pNo ==>",post.P_NO);
              var comment = e.target.comment.value;
              var cId = uId;
              var userId = post.U_ID;
              var pNo = post.P_NO;
              

              fetch('/api/comment', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ comment : comment, uId : userId, pNo : pNo, cId : cId}), // JSON 데이터를 전송합니다.
              }) // 여러개 보낼때 body 옆에 계속 추가하면된다.
                .then((response) => {
                  if (!response.ok) {
                    throw new Error('서버 응답이 실패했습니다.');
                  }else{
                    alert('댓글등록이 성공적으로 완료되었습니다.');
                    window.location.reload();
                    //router.push('/home'); // 해당 페이지로 이동
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
            <input id={`commentBox-${post.P_NO}`} className='commentBox' type='text' name="comment" placeholder='댓글 달기...'></input>
            <label><PiChatCenteredDots className='icon'/><input type='submit' value=" "/></label>
            </form>
            </Content>
          </Post>
        ))}
      </Feed>
      <MenuBar />
    </div>
    
  );
}