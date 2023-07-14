import React from 'react';
import Sidebar from './Sidebar';
import Chat from './chat';
// import Sidebar from './Sidebar';
import './main.css';

const Main = () => {
    return (
        <div className='com'>
        <div className='full'>
            <div className='sidebar'>
                <Sidebar/>
            </div>   
            <div className='chats'>
                <Chat/>
            </div>         
        </div>
        </div>
    );
}

export default Main;
