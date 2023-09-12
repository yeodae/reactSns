import React, { useState } from 'react';
import styled from '@emotion/styled';

const ModalWrapper = styled.div`
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
display: flex;
justify-content: center;
align-items: center;
background-color: rgba(0, 0, 0, 0.5); /* 반투명한 배경색 */
z-index: 999; /* 모달을 다른 컨텐츠 위에 표시 */
`;

const ModalContent = styled.div`
background-color: white;
padding: 20px;
border-radius: 4px;
`;
const Container = styled.div`
  padding: 20px;
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
  text-Align : center;
`;

const Post = styled.img`
width: 80px;
height: 80px;
border-radius: 50%;
`;
const Strong = styled.div`
text-align : center;
font-weight : bold;
`;


function FollowersModal({ onClose }) {
  const [activeTab, setActiveTab] = useState('Followers'); // 초기값을 'posts'로 설정
  const SearchBar = styled.input`
  display: block;
  width: 100%;
  padding: 12px 20px;
  margin: 0 0 20px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color : #eee;
`;

  return (
    <ModalWrapper>
      <ModalContent>
        {/* 모달 내용 */}
        <Strong><div>My Follow</div></Strong>
      <Container>
      <SearchBar
          type="text"
          placeholder="검색"
          // onChange={handleSearch}
        />
        <PostTabs>
      <Tab
        active={activeTab === 'Followers'}
        onClick={() => setActiveTab('Followers')}
      >
        Followers
      </Tab>
      <Tab
        active={activeTab === 'Following'}
        onClick={() => setActiveTab('Following')}
      >
        Following
      </Tab>
    </PostTabs>
    {activeTab === 'Followers' && (
    <Posts>
      {/* Replace the src attribute with the user's actual post image URLs */}
      <a href="#">
        <div>
          <Post className='profile' src="https://via.placeholder.com/300" />
        </div>
        <div>여대현</div>
      </a>
      <a href="#">
        <div>
          <Post className='profile' src="https://via.placeholder.com/300" />
        </div>
        <div>여대훈</div>
      </a>
    </Posts>
    )}    

    {activeTab === 'Following' && (
      <Posts> 
        <a href="#">
          <div>
            <Post className='profile' src="https://via.placeholder.com/300" />
          </div>
          <div>여대형</div>
        </a>
        {/* Add more saved posts as needed */}
      </Posts>
    )}
  </Container>

        
        <div><button onClick={onClose}>닫기</button></div>
      </ModalContent>
    </ModalWrapper>
  );
}

export default FollowersModal;
