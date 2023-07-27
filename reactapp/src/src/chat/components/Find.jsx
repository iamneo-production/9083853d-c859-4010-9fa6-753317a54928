import React from 'react';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

const Find = () => {
  return (
    <div className='search'>
      <div className='searchForm'>
        <TextField
          variant='outlined'
          placeholder='Search...'
          InputProps={{
            startAdornment: <SearchIcon />,
          }}
        />
      </div>
      <div className='userChat'>
          <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuUd2Q7_GtYGakSiMRKp0omc13FMflTYARNA&usqp=CAU' className='img1'/>
          <div className='userChatInfo'>
            <span>Sriram</span>
          </div>
      </div>
    </div>
  );
};

export default Find;
