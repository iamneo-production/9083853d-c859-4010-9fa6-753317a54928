import React from 'react';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';

const Input = () => {
    return (
        <div className='input'>
        
            <input className='t' type='text' placeholder='Type Something...'/ >
        
            <div className='send'>
                <AttachFileIcon/>
                
                <input type='file' style={{display:"none"}} id='file'/>
                <label htmlFor='file'>
                    <PhotoSizeSelectActualIcon/>
                </label>

                <button>Send</button>
            </div>
        </div>
    );
}

export default Input;
