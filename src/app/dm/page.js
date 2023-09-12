"use client"
import React, { useState } from 'react';
import './dm.css';


export default function Dm() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      setMessages([...messages, { text: newMessage }]);
      setNewMessage('');
    }
  };

  return (
    <div className="message-app">
        <h3>메시지</h3>
        

      <div className="message-list">
        {messages.map((message, index) => (
          <div key={index} className="message">{message.text}</div>
        ))}
      </div>
      <div className="message-input">
        <input
          type="text"
          placeholder="메시지 입력"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>전송</button>
      </div>
    </div>
  );
}
