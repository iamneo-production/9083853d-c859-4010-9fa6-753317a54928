import React, { useEffect } from 'react';
import CardHeader from '@mui/material/CardHeader';
import { red } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Cookies from 'js-cookie';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import axios from 'axios';
import ViewFollowers from './ViewFollowers';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

// import './Feed.css';
const currentDateTime= Date().toLocaleString()

const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)'}}
    >
      •
    </Box>
  );


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));
  
  function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;
  
    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
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
  
const ViewProfile = ({view}) => {
    const [open, setOpen] = React.useState(false);
    const [userName, setUserName] = React.useState('');
    const [bio, setBio] = React.useState('');
    const [city, setCity] = React.useState('');
    const [relation, setRelation] = React.useState('');
    const [data, setData] = React.useState([]);
    const [following, setFollowing] = React.useState('');
    const [v, setV] = React.useState(view);
    const [userPosts1, setUserPosts1] = React.useState([]);
      
      
  const handleClickOpen = () => {
    // setOpen(true);
    axios.delete(`http://127.0.0.1:2006/Following/delete/${Cookies.get('Id')}/${view}`).then(response => {
        console.log(response.data);
        setFollowing(0)
    })
  };
  const handleClickOpen1 = () => {
    const data = {
        followl : Cookies.get("Id"),
        followr : view,
    }
    // setOpen(true);
    axios.post(`http://127.0.0.1:2006/Followers/add`, data).then(response => {
        console.log("Post Response", response);
        setFollowing(1);
        setV({view});
    }).catch(error => {
        console.log(error);
    })
  };
  const handleClose = () => {
    setOpen(false);
  }
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(getAuth(), user => {
      const response = '';
      console.log('Component rendered or called');
      axios.get(`http://127.0.0.1:2006/info/get/${view}`)
        .then(response => {
          setData(response.data);
          console.log("PROFILE: " ,response);
        })
        .catch(error => {
          console.log(error);
        });

        axios
        .get(`http://127.0.0.1:2006/Feed/getByUser/${view}`)
        .then((response) => {
          setUserPosts1(response.data);
          console.log("User Posts1", response.data);
        })
        .catch((error) => {
          console.log(error);
        });

     axios.get(`http://127.0.0.1:2006/Following1/get/${Cookies.get('Id')}/${view}`).then(response1 => {
    
         console.log("FOLLOWING: " , following);
         console.log("FOLLOWR: ",(response1));
         const dataArray = Array.isArray(response1.data) ? response1.data : [];
      console.log("Data Array:", dataArray);
        console.log("Data Array length: ", dataArray.length);
    if(dataArray.length !== 0){
         setFollowing(dataArray.length);
     }
     else{
        console.log("Not Following");
     }
     }).catch(error => {
        console.log(error);
     })
    });

    return unSubscribe;
  }, []);
  const handleSubmit = async(event) => {
    const data = {
        email : Cookies.get('Id'),
        userName : userName,
        bio : bio,
        city : city,
        relation : relation,
    }
    event.preventDefault();
    try{
        const response = await axios.post("http://127.0.0.1:2006/info/add", data);
        console.log(response.data);
        setOpen(false);
    }
    catch(error){
        console.log("error : " + error);
    }
  };
  // Get the logged-in user's ID from the cookie
  const loggedInUserId = Cookies.get('Id');

  // Check if the logged-in user's ID is the same as the account being viewed
  const isSelfProfile = loggedInUserId === view;
    return (
        <div style={{marginTop: "3rem"}}>
            <Typography style={{fontSize: '20px', fontWeight: 'bold'}}>PROFILE</Typography>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: "10%", marginTop: '2%', }}>
            <div>
      <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500]}} style={{zIndex: 0, height: "150px", width: "150px"}} aria-label="recipe">
                {view.charAt(0)}
              </Avatar>
            }
            style={{textAlign: "left", marginLeft:"1%"}}
            
            // title={Cookies.get('email')}
            // subheader={currentDateTime}
            />
      <div style={{display: 'block', marginRight: '10%'}}>

      {isSelfProfile ? null : following > 0 ? (
        <Button variant="outlined" onClick={handleClickOpen}>Following</Button>
      ) : (
        <Button variant="contained" onClick={handleClickOpen1}>Follow</Button>
      )}
        <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Edit your Profile
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <div style={{alignContent: 'center'}}>
          <label class="text-inverse" style={{marginTop: '1%'}}>UserName</label>
          <TextField
                required
                id="outlined-required"
                label="Username"
                // defaultValue="Hello World"
                type="text"
                style={{width: '80%'}}
                value={userName}
                onChange={e => setUserName(e.target.value)} 
            />
            <label class="text-inverse" style={{marginTop: '1%'}}>Bio</label>
          <textarea
                required
                id="outlined-required"
                label="Bio"
                // defaultValue="Hello World"
                type="text"
                style={{width: '80%'}}
                rows='10'
                value={bio}
                onChange={e => setBio(e.target.value)} 
            />
            <label class="text-inverse" style={{marginTop: '1%'}}>Living in</label>
          <TextField
                required
                id="outlined-required"
                label="City"
                // defaultValue="Hello World"
                type="text"
                style={{width: '80%'}}
                value={city}
                onChange={e => setCity(e.target.value)} 
            />
            <label class="text-inverse" style={{marginTop: '1%'}}>RelationShip Status</label>
            <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        value={relation}
        onChange={e => setRelation(e.target.value)}
        name="radio-buttons-group"
        class="form-control2"
      >
        <FormControlLabel value="single" onChange={e => setRelation(e.target.value)} control={<Radio />} label="Single" />
        <FormControlLabel value="Commited"  onChange={e => setRelation(e.target.value)} control={<Radio />} label="Commited" />
        <FormControlLabel value="Married"  onChange={e => setRelation(e.target.value)} control={<Radio />} label="Married" />
        </RadioGroup>
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
      <div>
      <div>
      <Typography style={{textAlign: 'left', fontStyle: 'italic', fontWeight: 'bold', fontSize: '20px', marginBottom: "5%", marginTop: 0}}>{view}</Typography>
        <div style={{display: 'flex', justifyContent: 'center', marginBottom: "2%"}}>
            <ViewFollowers view={view}/>
        </div>
      </div>
      <div style={{display: 'block', marginTop: "10%", textAlign: 'left'}}>
        <Typography >{data.userName}</Typography>
        <Typography style={{fontStyle:"italic", fontSize: "18px"}}>{data.bio}</Typography>
        <Typography>{data.relation}</Typography>
        <Typography>{data.city}</Typography>
      </div>
      </div>
        </div>
        
        <Divider style={{marginTop: '5%'}}/>
        
        <div style={{alignItems: 'center', justifyContent: 'center', display: 'flex'}}>
        <ImageList sx={{ width: 600, height: 800 }} cols={3} rowHeight={164}>
        {userPosts1.map((post) => (
          <div className="gallery-item" key={post.pid}>
          <img src={`data:image/jpeg;base64,${post.image}`} alt="Gallery Item" className="gallery-image" />
          </div>
        ))}
    </ImageList>
      </div>
        </div>
    );
}
const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
  },
];

export default ViewProfile;
