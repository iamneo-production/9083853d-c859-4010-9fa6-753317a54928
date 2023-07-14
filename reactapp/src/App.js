import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './Profile/Login';
import Home from './home/home';
import Signup from './Profile/Signup';
import FirstPage from './Profile/First';
import Search from './search/search';
import Chat from './chat/components/chat';
import Profile from './info/profile';
import Add from './add/add';

function App() {
  return (
    <BrowserRouter>
    
    <div className="App">
    <Routes>
    <Route path="/" element={<FirstPage/>}></Route>
    <Route path="/Login" element={<Login/>}></Route>
    <Route path="/home" element={<Home/>}></Route>
    <Route path="/Signup" element={<Signup/>}></Route>
    <Route path="/search" element={<Home/>}></Route>
    <Route path="/chat" element={<Home/>}></Route>
    <Route path="/profile" element={<Home/>}></Route>
    <Route path="/add" element={<Home/>}></Route>



    </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
