import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import Cookies from "js-cookie";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import axios from "axios";
import { Dialog } from "@mui/material";
import { styled } from "@mui/material/styles";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import Avatar from "@mui/material/Avatar";
import { blue } from "@mui/material/colors";
import PersonIcon from "@mui/icons-material/Person";
import ListItemText from "@mui/material/ListItemText";
import { Tabs, Tab } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link, Navigate } from "react-router-dom";
// import { useHistory } from "react-router-dom";
// import { useHistory } from "react-router";
import "./Info.css";
import FeedbackForm from "../Feedback/Feedback";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;
  const [data1, setData1] = useState({});
  const [data2, setData2] = useState({});
  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [bio, setBio] = useState("");
  const [data, setData] = useState({});
  const [userData, setUserData] = useState({}); 
  const [userPosts, setUserPosts] = useState([]); 

  useEffect(() => {
    // Fetch user data and other information
    const unSubscribe = onAuthStateChanged(getAuth(), (user) => {
      // Fetch user data
      axios
        .get(`http://127.0.0.1:2006/info/get/${Cookies.get("Id")}`)
        .then((response) => {
          setUserData(response.data);
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });

      // Fetch user's following
      axios
        .get(`http://127.0.0.1:2006/Following/get/${Cookies.get("Id")}`)
        .then((response) => {
          setData2(response.data);
          console.log("following", response.data);
        })
        .catch((error) => {
          console.log(error);
        });

      // Fetch user's followers
      axios
        .get(`http://127.0.0.1:2006/Follower/get/${Cookies.get("Id")}`)
        .then((response1) => {
          setData1(response1.data);
          console.log("Follower", response1.data);
        });

      // Fetch user posts
      // axios
      //   .get(`http://127.0.0.1:2006/posts/${Cookies.get("Id")}`)
      //   .then((response) => {
      //     setUserPosts(response.data);
      //     console.log("User Posts", response.data);
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });


    });

    return unSubscribe;
  }, []);

  const handleSubmit = async (event) => {
    const data = {
      email: Cookies.get("Id"),
      username: Cookies.get("Id"),
      bio: bio,
      city: "",
      relation: "",
    };
    event.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:2006/info/add", data);
      console.log(response.data);
      setOpen(false);
    } catch (error) {
      console.log("error : " + error);
    }
  };

  const handleDelete = (fid) => {
    axios
      .delete(`http://127.0.0.1:2006/Following/delete/${fid}`)
      .then((response) => {
        console.log("delete:", response.data);
        const d1 = data.filter((item) => item.fid !== fid);
        const d2 = data1.filter((item) => item.fid != fid);
        setData(d1);
        setData1(d2);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const ProfilePage = () => {
  // State variables
  const [userData, setUserData] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [uname, setUname] = useState(Cookies.get("Id"));
  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [bio, setBio] = useState("");
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [open1, setOpen1] = useState(false);
  const [data, setData] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [userPosts1, setUserPosts1] = useState([]); 

  const navigate=useNavigate();
  // Fetch user's info and following/followers on component mount
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(getAuth(), (user) => {
      const response = "";
      axios
        .get(`http://127.0.0.1:2006/info/get/${Cookies.get("Id")}`)
        .then((response) => {
          setUserData(response.data);
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });

        axios
        .get(`http://127.0.0.1:2006/Feed/getByUser/${Cookies.get("Id")}`)
        .then((response) => {
          setUserPosts1(response.data);
          console.log("User Posts1", response.data);
        })
        .catch((error) => {
          console.log(error);
        });

      axios
        .get(`http://127.0.0.1:2006/Following/get/${Cookies.get("Id")}`)
        .then((response) => {
          setData2(response.data);
          console.log("following", response.data);
        })
        .catch((error) => {
          console.log(error);
        });
      axios
        .get(`http://127.0.0.1:2006/Follower/get/${Cookies.get("Id")}`)
        .then((response1) => {
          setData1(response1.data);
          console.log("Follower", response1.data);
        });
    });

    return unSubscribe;
  }, []);

  const handleSubmit = async (event) => {
    const data = {
      email: Cookies.get("Id"),
      username: Cookies.get("Id"),
      bio: bio,
      city: "",
      relation: "",
    };
    event.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:2006/info/add", data);
      console.log(response.data);
      setOpen(false);
    } catch (error) {
      console.log("error : " + error);
    }
  };

  const handleDelete = (fid) => {
    axios
      .delete(`http://127.0.0.1:2006/Following/delete/${fid}`)
      .then((response) => {
        console.log("delete:", response.data);
        const d1 = data.filter((item) => item.fid !== fid);
        const d2 = data1.filter((item) => item.fid != fid);
        setData(d1);
        setData1(d2);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen1 = () => {
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleClick = (event) => {
    // Toggle the dropdown status
    setIsDropdownOpen((prevState) => !prevState);

    // Set the anchorEl state accordingly
    if (isDropdownOpen) {
      setAnchorEl(null); // Close the dropdown by setting anchorEl to null
    } else {
      setAnchorEl(event.currentTarget); // Open the dropdown by setting anchorEl to the clicked element
    }
  };  

  const handleFeedback = () => {
    navigate('/feedback');
  };


  const handleLogout = () => {
    
      Cookies.remove("Id");
      navigate("/");
    
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-image-container">
        <div className="profile-menu-container" style={{paddingLeft:'930%'}}>
        <IconButton
        aria-label="more"
        aria-controls="profile-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
          <MenuItem className="menu-item" onClick={handleFeedback}>Feedback</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpyo8CEra06Nono0MeOGooZZKHAD3S7_f6iw&usqp=CAU"
            alt="Profile"
            className="profile-image"
          />

        
          <div>
            <button onClick={handleClickOpen}>Edit Profile</button>
            {console.log("TEST", data1)}
            <BootstrapDialog
              onClose={handleClose}
              aria-labelledby="customized-dialog-title"
              open={open}
            >
              <BootstrapDialogTitle
                id="customized-dialog-title"
                onClose={handleClose}
              >
                Edit your Profile
              </BootstrapDialogTitle>
              <DialogContent dividers>
                <div style={{ alignContent: "center" }}>
                  <label class="text-inverse" style={{ marginTop: "1%" }}>
                    bio
                  </label>
                  <TextField
                    required
                    id="outlined-required"
                    label="Username"
                    // defaultValue="Hello World"
                    type="text"
                    style={{ width: "80%" }}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  />
                </div>
              </DialogContent>
              <DialogActions>
                <Button autoFocus onClick={handleSubmit}>
                  Save changes
                </Button>
              </DialogActions>
            </BootstrapDialog>
          </div>
        </div>
        <div className="profile-info">
          <h1 className="profile-username">{userData.email}</h1>
          <div className="profile-stats">
            <Button className="profile-stat">Posts: {userPosts1.length}</Button>
            <BootstrapDialog
              onClose={handleClose}
              aria-labelledby="customized-dialog-title"
              open={open1}
            >
              <BootstrapDialogTitle
                id="customized-dialog-title"
                onClose={handleClose1}
              >
                Following
              </BootstrapDialogTitle>
              <DialogContent dividers style={{ marginLeft: "-15%" }}>
                <div
                  style={{
                    alignContent: "left",
                    display: "flex",
                    justifyContent: "left",
                  }}
                >
                  <List sx={{ pt: 0 }} style={{ marginTop: "-20%" }}>
                    {data1.map((d) => (
                      <ListItem disableGutters key={d.fid}>
                        <ListItemButton>
                          <ListItemAvatar>
                            <Avatar
                              sx={{ bgcolor: blue[100], color: blue[600] }}
                            >
                              <PersonIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText primary={d.followl} />
                        </ListItemButton>
                        <Button
                          style={{ marginRight: "-20%" }}
                          onClick={() => handleDelete(d.fid)}
                        >
                          Remove
                        </Button>
                      </ListItem>
                    ))}
                  </List>
                </div>
              </DialogContent>
              <DialogActions>
                <Button autoFocus onClick={handleClose1}>
                  Close
                </Button>
              </DialogActions>
            </BootstrapDialog>
            <Button>
              <Typography
                style={{ fontSize: "13px" }}
                onClick={handleClickOpen1}
              >
                {data1.length} Followers
              </Typography>
            </Button>
            <BootstrapDialog
              onClose={handleClose1}
              aria-labelledby="customized-dialog-title"
              open={open1}
              sx={{ p: "2" }}
            >
              <BootstrapDialogTitle
                id="customized-dialog-title"
                onClose={handleClose1}
              >
                {data1.length} Followers
              </BootstrapDialogTitle>
              <DialogContent dividers style={{ marginLeft: "-15%" }}>
                <div
                  style={{
                    alignContent: "left",
                    display: "flex",
                    justifyContent: "left",
                  }}
                >
                  <List sx={{ pt: 0 }} style={{ marginTop: "-20%" }}>
                    {data1.map((d) => (
                      <ListItem disableGutters key={d.fid}>
                        <ListItemButton>
                          <ListItemAvatar>
                            <Avatar
                              sx={{ bgcolor: blue[100], color: blue[600] }}
                            >
                              <PersonIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText primary={d.followl} />
                        </ListItemButton>
                        <Button
                          style={{ marginRight: "-20%" }}
                          onClick={() => handleDelete(d.fid)}
                        >
                          Remove
                        </Button>
                      </ListItem>
                    ))}
                  </List>
                </div>
              </DialogContent>
              <DialogActions>
                <Button autoFocus onClick={handleClose1}>
                  Close
                </Button>
              </DialogActions>
            </BootstrapDialog>
            <Button>
              <Typography
                style={{ fontSize: "13px" }}
                onClick={handleClickOpen1}
              >
                {data2.length} Following
              </Typography>
            </Button>
            <BootstrapDialog
              onClose={handleClose1}
              aria-labelledby="customized-dialog-title"
              open={open1}
              sx={{ p: "2" }}
            >
              <BootstrapDialogTitle
                id="customized-dialog-title"
                onClose={handleClose1}
              >
                {data2.length} Following
              </BootstrapDialogTitle>
              <DialogContent dividers style={{ marginLeft: "-15%" }}>
                <div
                  style={{
                    alignContent: "left",
                    display: "flex",
                    justifyContent: "left",
                  }}
                >
                  <List sx={{ pt: 0 }} style={{ marginTop: "-20%" }}>
                    {data2.map((d) => (
                      <ListItem disableGutters key={d.fid}>
                        <ListItemButton>
                          <ListItemAvatar>
                            <Avatar
                              sx={{ bgcolor: blue[100], color: blue[600] }}
                            >
                              <PersonIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText primary={d.followr} />
                        </ListItemButton>
                        <Button
                          style={{ marginRight: "-20%" }}
                          onClick={() => handleDelete(d.fid)}
                        >
                          Remove
                        </Button>
                      </ListItem>
                    ))}
                  </List>
                </div>
              </DialogContent>
              <DialogActions>
                <Button autoFocus onClick={handleClose1}>
                  Close
                </Button>
              </DialogActions>
            </BootstrapDialog>
          </div>
          <div className="bio">
            <p className="profile-bio">
              <h5>Profile Bio:</h5>
              {userData.bio}
            </p>
          </div>
        </div>
      </div>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs>
          <center>
            <Tab label="Posts" />
          </center>
        </Tabs>
      </Box>
      <div className="profile-gallery">
        {userPosts1.map((post) => (
          <div className="gallery-item" key={post.pid}>
          <img src={`data:image/jpeg;base64,${post.image}`} alt="Gallery Item" className="gallery-image" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
