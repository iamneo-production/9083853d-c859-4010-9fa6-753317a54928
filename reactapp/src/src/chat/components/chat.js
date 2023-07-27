import React from 'react';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Messages from './Messages';
import Input from './Input';

const Chat = () => {
  return (
    <div className='chat'>
      <div className='chatInfo'>
        <span className='sp'>Sriram</span>
        <div className='chatIcons'>
          <PersonAddIcon className='per' />
          <MoreVertIcon className='f' />
        </div>
      </div>
      <div className='mes'>
        <div className='xyz'>
          <Messages isSentByCurrentUser={false} text="Hello, how are you?" />
          <Messages isSentByCurrentUser={true} text="I'm doing great, thanks!" />
          <Messages isSentByCurrentUser={false} text="That's good to hear!" />
        </div>
      </div>
      <Input />
    </div>
  );
}

export default Chat;
