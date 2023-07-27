import React from 'react';
import Navbar from './Navbar';
import Find from './Find';
import Chats from './chats';

const Sidebar = () => {
    return (
        <div className='sidebar'>
            <Navbar/>
            <Find/>
            <Chats/>
        </div>
    );
}

export default Sidebar;
