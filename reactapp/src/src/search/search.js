import React, { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { blue } from '@mui/material/colors';
import PersonIcon from '@mui/icons-material/Person';
import ViewProfile from './ViewProfile';

const Search1 = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '100%',
      '&:focus': {
        width: '40ch',
      },
    },
  },
}));

const Search = () => {
  const [search, setSearch] = useState('');
  const [data, setData] = React.useState([]);
  const [check, setCheck] = React.useState(false);
  const [view, setView] = React.useState('');

  const handleSearch = (s) => {
    setSearch(s);
    axios.get(`http://127.0.0.1:2006/info/getall/${s}`)
      .then(response => {
        console.log(s, response);
        if (response.data != null) {
          setData(Object.values(response.data));
          console.log(data);
        } 
      })
      .catch(error => {
        console.log("error: ", error);
      });
  }

  const handleView = (email) => {
    setCheck(!check);
    setView(email);
  }

  return (
    <div style={{ marginTop: "5rem", display: 'flex', width: "100%", justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ width: '800px' }}>
        <div style={{ display: 'flex', backgroundColor: "white" }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={e => handleSearch(e.target.value)}
            />
          </div>
        </div>
        <Divider />
        <Box sx={{ width: '100%', maxWidth: "800px", bgcolor: 'lightgrey' }}>
          <nav aria-label="main mailbox folders">
            <List>
              {data !== null ? (
                <div>
                  {data.map((d) => (
                    <div key={d.email}>
                      {d && d.email && (
                        <ListItem disablePadding>
                          <ListItemButton onClick={() => handleView(d.email)}>
                            <ListItemAvatar>
                              <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                                <PersonIcon />
                              </Avatar>
                            </ListItemAvatar>
                            <div style={{ textAlign: 'left', marginLeft: '5%' }}>
                              <Typography>{d.email}</Typography>
                            </div>
                          </ListItemButton>
                        </ListItem>
                      )}
                      <Divider />
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  <Typography>Search</Typography>
                </div>
              )}
            </List>
          </nav>
        </Box>
        {check === true && <ViewProfile view={view} />}
      </div>
    </div>
  );
}

export default Search;
