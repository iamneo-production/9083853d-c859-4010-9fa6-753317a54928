import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import Cookies from 'js-cookie';
import GoogleIcon from '@mui/icons-material/Google';
import { TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import Avatar from '@mui/material/Avatar';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
// import { doc, setDoc } from "firebase/firestore"; 
import { getFirestore, doc, setDoc } from "firebase/firestore"; 
import axios from 'axios';


import './Signup.css'
import logo from "./logo.jpeg"

const Signup = () => {

    const[user,setUser]=useState('');
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const[confirmPassword,setConfirmPassword]=useState('');
    const [value, setValue] = React.useState(null);
    const [error, setError] = useState('');
    const [avatar, setAvatar] = useState('avatar1');

    const navigate=useNavigate();

    // const createAccount = async () => {
    //     try {
    //       if (password !== confirmPassword) {
    //         setError('Password and Confirm Password do not match');
    //         return;
    //       }
    //       await createUserWithEmailAndPassword(getAuth(), email, password);
    //       Cookies.set('Id', email);
    //       const data = { 
    //         email: email,
    //         newBio: '',
    //         city: '',
    //         relation: '',
    //         userName: email, // Set the user value as the email in the data object
    //       }
    //       const response = await axios.post("http://127.0.0.1:2006/info/add", data);
    //       // setData({ ...data, bio: newBio });
    //       console.log(response.data);
    //       Cookies.set('Id', email);
    //       navigate('/home');
    //     } 
    //     catch (e) {
    //       setError(e.message);
    //     }
    //   };

    const createAccount = async() => {
      try{
          if(password!==confirmPassword){
              setError('Password and Confirm password do not match');
              return;
          }
          await createUserWithEmailAndPassword(getAuth(), email, password);
          const data = { 
                    email: email,
                    newBio: '',
                    city: '',
                    relation: '',
                    userName: email,
                    password : password // Set the user value as the email in the data object
                  }
          const data1 = {
                      email: email,
                      newBio: '',
                      city: '',
                      relation: '',
                      userName: email, // Set the user value as the email in the data object
                    }
                    axios.post("http://127.0.0.1:2006/info/add", data1);
          const response = await axios.post("http://127.0.0.1:8181/api/v1/auth/register", data);
          console.log(response.data);
                    console.log(response.data);
          Cookies.set('Id', email);
          // if (response.status === 200) {
              navigate('/home');
          // } 
      }
      catch(e){
          setError(e.message);
      }
  }

    const signInWithGoogle = async () => {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
    
        try {
          const result = await signInWithPopup(auth, provider);
          const user = result.user;
          Cookies.set('Id', user.email);
          navigate('/home');
        } catch (e) {
          setError(e.message);
        }
      };

   

    return (
        <div>
        <div className='Top'>
        
            <div className='Left'>
                <div>
                <img src={logo}/>
                </div>
            </div>
        <div class="right">
            <div className='outer-box'>
            {error && <p className="error">Something went wrong!       {error}</p>}
                <div className='inner-box'>
                    <div className='header'>Sign Me Up</div>

                    <div className='userName'>
                        <div className='icon'>
                            <AccountCircleOutlinedIcon />
                        </div>
                        <input
                            placeholder='User Name'
                            type='text'
                            value={user}
                            onChange={e => setUser(e.target.value)}
                            required
                        />
                    </div>
                    
                    <div className='email'>
                    <div className='icon'>
                            <EmailOutlinedIcon/>
                        </div>
                    <input type='email' placeholder='Email Address' value={email}
                    onChange={e=>setEmail(e.target.value)} required>
                    </input>
                    </div>

                    <div className='password'>
                    <div className='icon'>
                            <LockOutlinedIcon/>
                    </div>
                        <TextField
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={e => setPassword(e.target.value)} 
                        required
                        />
                    </div>

                    <div className='con-password'>
                    <div className='icon'>
                            <LockOutlinedIcon/>
                    </div>
                        <TextField
                        id="outlined-password-input"
                        label="Confirm Password"
                        type="password"
                        autoComplete="current-password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)} 
                        required
                        />
                    </div>

                    

                    <div className='sign-in'>
                        <Button id='login-button' variant="contained" onClick={createAccount}>Sign Up</Button>
                    </div>

                    <div className='google-signin'>
                        <Button variant='contained' onClick={signInWithGoogle}>
                            <GoogleIcon style={{ marginRight: '8px' }}/>Sign in with Google
                        </Button>
                     </div>

                     <div className='back'>
                        Already a User?! Then <a href='/Login'>Click Me</a>
                     </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
}

export default Signup;