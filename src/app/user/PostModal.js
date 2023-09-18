import React from 'react';
import styled from '@emotion/styled';
import { Feed, Post, PostHeader, User, Avatar, Username, PostImage, PostActions, ActionButton, Content, CommentInput } from '../home/Feed';
const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  cursor: pointer; /* 모달 내부를 클릭해도 모달이 닫히지 않도록 함 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 500px;
  /* 내부 이미지 크기 조정 */
  img {
    max-width: 100%;
    max-height: 100%;
  }
`;


const PostModal = ({ post, comment, onClose }) => {
    console.log("pstmd ==>",post);
    console.log("cmtmd ==>",comment);
  // 모달 바깥을 클릭했을 때 모달을 닫습니다.
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  return (
    <ModalBackdrop onClick={handleBackdropClick}>
      <ModalContent>
        {/* 여기에 게시물 내용, 댓글창 등을 추가하세요 */}
        <User className='modalImg'>
                <Avatar src={`/files/posts/${post.profile}`} />
                <Username>{post.U_ID}</Username>
        </User>
        <img src={`/files/posts/${post.PF_NO}`} alt={`Post ${post.P_NO}`} />
        <div className='postModalbox'>
            <strong>{post.U_ID}</strong>
            <span>{post.TITLE}</span>
            <p>{post.CONTENT}</p>
            <div>
            {post.TAG}
            </div>
        </div>
        {/* 댓글창을 추가하세요 */}
      </ModalContent>
    </ModalBackdrop>
  );
};

export default PostModal;
