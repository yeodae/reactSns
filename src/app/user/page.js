"use client"
import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import MenuBar from '../MenuBar';
import Header from '../Header';
import './user.css';
import FollowersModal from './FollowersModal'; // FollowersModal을 import
import PostModal from './PostModal'; // PostModal을 import

const Container = styled.div`
  padding: 20px;
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 20px;
`;

const UserInfo = styled.div``;

const Username = styled.h2`
  margin: 0;
`;

const Bio = styled.p`
  font-size : 14px;
  margin: 0;
`;

const Stats = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const StatItem = styled.li`
  margin-right: 20px;
  text-align : center;
  margin-top : 10px;
  &:last-child {
    margin-right: 0;
  }
`;

const StatValue = styled.strong`
  display: block;
`;

const StatLabel = styled.span`
  padding : 10px;
  font-size : 14px;
`;

const EditProfileButton = styled.button`
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 10px 0;
  cursor: pointer;
  border-radius: 4px;
`;
const EditProfileButton2 = styled.button`
  background-color: #bbb;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 10px 0;
  cursor: pointer;
  border-radius: 4px;
  margin-left : 10px;
`;

const PostTabs = styled.div`
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid #ccc;
  margin-bottom: 20px;
`;

const Tab = styled.button`
  padding: 10px;
  font-size: 18px;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  color: ${(props) => (props.active ? '#000' : '#ccc')};
  font-weight: ${(props) => (props.active ? 'bold' : 'normal')};

  &:hover {
    color: #000;
  }
`;

const Posts = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 10px;
  width : 100%
`;

const Post = styled.img`
  width: 100%;
  object-fit: cover;
`;
export default function User(){
  const [user, setUser] = useState([]);
  const [comment, setComment] = useState([]);
  const [activeTab, setActiveTab] = useState('posts');
  const [isFollowersModalOpen, setIsFollowersModalOpen] = useState(false);
  const [uId, setUId] = useState(''); // 세션값 추가 코드 시작부분
  const [userPosts, setUserPosts] = useState([]); // 변수 이름 변경
  const [selectedPost, setSelectedPost] = useState(null); // 선택한 게시물 추가

  useEffect(() => {
    const savedUId = sessionStorage.getItem('uId');
    setUId(savedUId);

    // 게시글 출력
    fetch(`/api/postDetail?uId=${savedUId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('서버 응답이 실패했습니다.');
        }
        return response.json();
      })
      .then((data) => {
        console.log("게시글 ==>", data);
        setUserPosts(data); // 변수 이름 변경
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
  const handleEditProfile = () => {
    window.location.href = '/profile';
  };
  const handleEditProfile2 = () => {
    if(window.confirm("로그아웃 하시겠습니까?")){
      sessionStorage.removeItem('uId');
      window.location.href = '/login';
    }
  };
  const handleFollowersClick = () => {
    // 팔로워 버튼을 클릭하면 모달을 엽니다.
    setIsFollowersModalOpen(true);
  };
  const handlePostClick = (post) => {
    setSelectedPost(post);
  };
  return (
    <div>
      <Header/>
      <Container className='uContainer'>
        <ProfileHeader>
        <Avatar
  src={
    userPosts.length > 0 && userPosts[0].profile
      ? `/files/posts/${userPosts[0].profile}`
      : "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA4MTlfMTE4%2FMDAxNjkyMzk1MjU1MDg4.BymuAbE_wepgAb9T7GXelEtxs5livMt4ONbPjWJyLnYg.KvIS2ZwjfOydOaVJg3K9y2aQZ4hDW4fhWAPCOFqfthUg.PNG.jjungaang%2Fpfp%25A3%25DFlightgrey%25A3%25DFuzubaong.png&type=sc960_832"
  }
/>      
          <UserInfo>
            <Username>{uId != null ? uId : "로그인이 필요합니다."}</Username>
            <Bio>산책하는 사람</Bio>
            <Stats>
              <a href="#">
                <StatItem>
                  <StatValue>14</StatValue>
                  <StatLabel>게시물</StatLabel>
                </StatItem>
              </a>
              <a href="#" onClick={handleFollowersClick}>
                <StatItem>
                  <StatValue>93</StatValue>
                  <StatLabel>팔로워</StatLabel>
                </StatItem>
              </a>
              <a href="#" onClick={handleFollowersClick}>
                <StatItem>
                  <StatValue>104</StatValue>
                  <StatLabel>팔로잉</StatLabel>
                </StatItem>
              </a>
            </Stats>
            <EditProfileButton onClick={handleEditProfile}>
              Edit Profile
            </EditProfileButton>
            <EditProfileButton2 onClick={handleEditProfile2}>
              Logout
            </EditProfileButton2>
          </UserInfo>
        </ProfileHeader>
        <PostTabs>
          <Tab
            active={activeTab === 'posts'}
            onClick={() => setActiveTab('posts')}
          >
            Posts
          </Tab>
          <Tab
            active={activeTab === 'saved'}
            onClick={() => setActiveTab('saved')}
          >
            Saved
          </Tab>
        </PostTabs>

        <div className="post-grid">
          {userPosts.map((post,comment) => (
            <div key={post.P_NO} className="post-item" onClick={() => handlePostClick(post,comment)}>
              {activeTab === 'posts' && (  // Check if post is an array
              <Posts>
                <Post
                  key={post.PF_NO}
                  src={`/files/posts/${post.PF_NO}`}
                />
              </Posts>
            
             
              )}
              {activeTab === 'saved' && (
                <Posts>
                  {/* Replace the src attribute with the user's actual saved post image URLs */}
                  <Post src="https://via.placeholder.com/300" />
                  <Post src="https://via.placeholder.com/300" />
                  <Post src="https://via.placeholder.com/300" />
                  {/* Add more saved posts as needed */}
                </Posts>
              )}
            </div>
          ))}
        </div>
      </Container>

      {/* 팔로워 모달 */}
      {isFollowersModalOpen && (
        <FollowersModal onClose={() => setIsFollowersModalOpen(false)} />
      )}
       {/* 게시물 모달 */}
       {selectedPost && (
        <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}
      <MenuBar />
    </div>
  );0
}