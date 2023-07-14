import React from 'react';
import { Link } from 'react-router-dom';
import './First.css';
import './bg.jpg'

const First = () => {
  return (
    <div className="container">
    <div className='out'>
    
    <div className='head'>
        <h2>Welcome to Connect!</h2>
        <p>Become a member of the family to access "Connect!" </p>
      
    </div>
      <div className='log'>
            <Link to="/login" className="buttonLink">
                <button className="button">Login</button>
            </Link>
        </div>

        <div className='sig'>
            <Link to="/signup" className="buttonLink">
                <button className="button">Signup</button>
            </Link>
        
        </div>
        </div>
    </div>
  );
};

export default First;
