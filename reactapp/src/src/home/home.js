
import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChatIcon from '@mui/icons-material/Chat';
import { Link } from 'react-router-dom';
import Chat from '../chat/components/chat';
// import Chat from '../chat/chat';
import Search from '../search/search';
import Profile from '../info/Info';
import Add from '../add/add';
import Feed from '../Feed/Feed';
import Main from '../chat/components/main';
import ProfilePage from '../info/Info';

const Home = () => {


    const [value, setValue] = React.useState(0);
    
    return (
        <div >

        
        <div style={{marginBottom: '10%'}}>
                {
                (() => {
                    if(window.location.pathname==='/home'){
                        return <Feed/>
                    }
                    if(window.location.pathname==='/chat'){
                        return <Main/>
                    }
                    if(window.location.pathname==='/search'){
                        return <Search/>
                    }
                    if(window.location.pathname==='/add'){
                        return <Add/>
                    }
                    if(window.location.pathname==='/info'){
                        return <ProfilePage/>
                    }
                })()}
            </div>

        <Box sx={{ width: 500, position: 'fixed', bottom: 0 ,left: 0, right: 0, margin: 'auto' }}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
            }}
            >

            <BottomNavigationAction label="Home" icon={<HomeIcon />} component={Link} to="/home" />
            <BottomNavigationAction label="Search" icon={< PersonSearchIcon/>} component={Link} to="/search" />  
            <BottomNavigationAction label="Chat" icon={<ChatIcon />} component={Link} to="/chat"/>  
            <BottomNavigationAction label="Add Post" icon={<AddCircleOutlineIcon />} component={Link} to="/add"/>
            <BottomNavigationAction label="Profile" icon={<AccountCircleIcon />}  component={Link} to="/info"/>
            </BottomNavigation>
      </Box>

        </div>
    );
}

export default Home;