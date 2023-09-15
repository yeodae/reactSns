import React from 'react';
import styled from '@emotion/styled';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: #fff;
  max-width: 90%;
  max-height: 90%;
  overflow: auto;
  padding: 20px;
  border-radius: 4px;
  position: relative;
`;

const ModalCloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
`;

const ModalImage = styled.img`
  width: 100%;
  height: auto;
`;

const Modal = ({ isOpen, onClose, imageUrl }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalCloseButton onClick={onClose}>Close</ModalCloseButton>
        <ModalImage src={imageUrl} alt="Selected Image" />
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
