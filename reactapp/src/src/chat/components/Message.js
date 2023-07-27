import React from 'react';

const Message = ({ isSentByCurrentUser, text }) => {
  return (
    <div className={`message ${isSentByCurrentUser ? 'sentByCurrentUser' : 'sentByOther'}`}>
      <div className='messageContent' style={{ marginLeft: isSentByCurrentUser ? '3%' : '0', marginRight: isSentByCurrentUser ? '0' : '3%' }}>
        <p className='p'>{text}</p>
      </div>
    </div>
  );
}

export default Message;
