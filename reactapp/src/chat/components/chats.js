import React from 'react';
import './main.css';

const Chats = () => {
    return (
        <div className='chats'>
        <div className='userChat'>
        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuUd2Q7_GtYGakSiMRKp0omc13FMflTYARNA&usqp=CAU' className='img1'/>
        <div className='userChatInfo'>
          <span className='span'>Sriram</span>
          <p className='p'>Hello</p>
        </div>
    </div>
    <div className='userChat'>
        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuUd2Q7_GtYGakSiMRKp0omc13FMflTYARNA&usqp=CAU' className='img1'/>
        <div className='userChatInfo'>
          <span className='span'>Sriram</span>
          <p className='p'>Hello</p>
        </div>
    </div>
    <div className='userChat'>
        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuUd2Q7_GtYGakSiMRKp0omc13FMflTYARNA&usqp=CAU' className='img1'/>
        <div className='userChatInfo'>
          <span className='span'>Sriram</span>
          <p className='p'>Hello</p>
        </div>
    </div>
        </div>
    );
}

export default Chats;
