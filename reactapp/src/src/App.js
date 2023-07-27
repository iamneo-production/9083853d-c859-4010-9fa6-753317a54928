import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './Profile/Login';
import Home from './home/home';
import Signup from './Profile/Signup';
import FirstPage from './Profile/First';
import Search from './search/search';
import Chat from './chat/components/chat';
import Profile from './info/Info';
import Add from './add/add';
import FeedbackForm from './Feedback/Feedback';
import { Provider } from 'react-redux';
import store from "./Redux/reduxStore"
function App() {
  return (
    <BrowserRouter>
    <Provider store={store}>
    <div className="App">
    <Routes>
    <Route path="/" element={<FirstPage/>}></Route>
    <Route path="/Login" element={<Login/>}></Route>
    <Route path="/home" element={<Home/>}></Route>
    <Route path="/Signup" element={<Signup/>}></Route>
    <Route path="/search" element={<Home/>}></Route>
    <Route path="/chat" element={<Home/>}></Route>
    <Route path="/Info" element={<Home/>}></Route>
    <Route path="/add" element={<Home/>}></Route>
    <Route path="/feedback" element={<FeedbackForm/>}></Route>



    </Routes>
    </div>
    </Provider>
    </BrowserRouter>
  );
}

export default App;
