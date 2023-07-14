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
                    <PersonAddIcon className='per'/>
                    <MoreVertIcon className='f'/>
                </div>
            </div>
            <div className='mes'>
            <div className='xyz'>
                <Messages/>
                <Messages/>
                <Messages/>
                <Messages/>
                <Messages/>
                <Messages/>
                <Messages/>
                <Messages/>
                <Messages/>
                <Messages/>
                <Messages/>
                <Messages/>
                <Messages/>
                <Messages/>
                <Messages/>
                <Messages/>
                <Messages/>
            </div>
                
                
            </div>
                <Input/>
           
               
                
        </div>
    );
}

export default Chat;
