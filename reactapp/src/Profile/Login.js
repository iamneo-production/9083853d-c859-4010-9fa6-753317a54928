// Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { TextField } from '@mui/material';
import Cookies from 'js-cookie';
import './Login.css';
import Button from '@mui/material/Button';
import logo from './logo.jpeg';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import GoogleIcon from '@mui/icons-material/Google';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const Login = () => {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const login = async () => {
    try {
      await signInWithEmailAndPassword(getAuth(), email, password, user);
      Cookies.set('Id', user);
      navigate('/home');
    } catch (e) {
      setError(e.message);
    }
  };

  const signInWithGoogle = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      Cookies.set('Id', user.username);
      navigate('/home');
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div>
      <div className='Top'>
        <div className='Left'>
          <div className='img'>
            <img src={logo} alt='Logo' />
          </div>
        </div>
        <div className='outer-box'>
          <div className='inner-box'>
            <div className='header'>Login to Explore!</div>
            <div className='fields-box'>
              <div className='user'>
                <div className='icons'>
                  <AccountCircleOutlinedIcon />
                </div>
                <input
                  type='text'
                  placeholder='User Name'
                  value={user}
                  onChange={e => setUser(e.target.value)}
                  required
                />
              </div>
              <div className='mail'>
                <div className='icons'>
                  <EmailOutlinedIcon />
                </div>
                <input
                  type='email'
                  placeholder='Email Id'
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className='pass'>
                <div className='icon'>
                  <LockOutlinedIcon />
                </div>
                <TextField
                  id='outlined-password-input'
                  label='Password'
                  type='password'
                  autoComplete='current-password'
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className='log-in'>
                <Button id='login-button' variant='contained' onClick={login}>
                  LogIn
                </Button>
              </div>
              <div className='new'>
                New User?! Then <a href='/Signup'>Click Me</a>
              </div>
              <div className='google-signin'>
                <Button variant='contained' onClick={signInWithGoogle}>
                  <GoogleIcon style={{ marginRight: '8px' }} />
                  Sign in with Google
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
