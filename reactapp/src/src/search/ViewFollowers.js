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
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import { blue } from '@mui/material/colors';
import PersonIcon from '@mui/icons-material/Person';
import ListItemText from '@mui/material/ListItemText';
import axios from 'axios';
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
      padding: theme.spacing(10),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));

  function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;
  
    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other} >
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

const ViewFollowers = ({view}) => {
    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);
    const [userName, setUserName] = React.useState('');
    const [data, setData] = React.useState([]);
    const [data1, setData1] = React.useState([]);
    const handleClickOpen = () => {
        setOpen(true);
      };
      const handleClose = () => {
        setOpen(false);
      }
      const handleClickOpen1 = () => {
        setOpen1(true);
      };
      const handleClose1 = () => {
        setOpen1(false);
      }
      const handleDelete = (fid)=> {
        axios.delete(`http://127.0.0.1:2006/Following/delete/${fid}`).then(response => {console.log("delete:", response.data);
        const d1 = data.filter(item => item.fid !== fid);
        const d2 = data1.filter(item => item.fid != fid);
        setData(d1);
        setData1(d2);
      })
        .catch(error => {
          console.log(error);
        });
      }
      useEffect(() => {
        const unSubscribe = onAuthStateChanged(getAuth(), user => {
          axios.get(`http://127.0.0.1:2006/Following/get/${view}`)
            .then(response => {
              setData(response.data);
              console.log(response);
            })
            .catch(error => {
              console.log(error);
            });
            axios.get(`http://127.0.0.1:2006/Follower/get/${view}`)
            .then((response1) => {
              setData1(response1.data);
              console.log(response1.data);
            })
        });
    
        return unSubscribe;
      }, []);

    return (
        <div>
            <Button><Typography style={{fontSize: '13px'}}>{data.length} Posts</Typography></Button>
            {/* <Button variant="text">Text</Button> */}
            <Button><Typography style={{fontSize: '13px'}} onClick={handleClickOpen}>{data.length} Following</Typography></Button>
            <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        sx={{p: "2"}}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose} >
         {data.length} Following
        </BootstrapDialogTitle>
        <DialogContent dividers style={{marginLeft: "-15%"}} >
          <div style={{alignContent: 'left', display: 'flex', justifyContent: 'left'}}>
          {/* <label class="text-inverse" style={{marginTop: '1%'}}>UserName</label> */}
          <List sx={{ pt: 0}} style={{marginTop: "-20%"}}>
        {data.map((d) => (
          <ListItem disableGutters >
            <ListItemButton  key={d.fid}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={d.followr} />
            </ListItemButton>
            {/* <Button style={{marginRight: "-20%"}} onClick={() => handleDelete(d.fid)}>Unfollow</Button> */}
          </ListItem>
          ))}
          </List>

          </div>
        </DialogContent>
        <DialogActions >
          <Button autoFocus>
            Close
          </Button>
        </DialogActions>
      </BootstrapDialog>
            <Button><Typography style={{fontSize: '13px'}} onClick={handleClickOpen1}>{data1.length} Followers</Typography></Button>
            <BootstrapDialog
        onClose={handleClose1}
        aria-labelledby="customized-dialog-title"
        open={open1}
        sx={{p: "2"}}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose1} >
         {data1.length} Followers
        </BootstrapDialogTitle>
        <DialogContent dividers style={{marginLeft: "-15%"}} >
          <div style={{alignContent: 'left', display: 'flex', justifyContent: 'left'}}>
          {/* <label class="text-inverse" style={{marginTop: '1%'}}>UserName</label> */}
          <List sx={{ pt: 0}} style={{marginTop: "-20%"}}>
        {data1.map((d) => (
          <ListItem disableGutters >
            <ListItemButton  key={d.fid}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={d.followl} />
            </ListItemButton>
            {/* <Button style={{marginRight: "-20%"}} onClick={() => handleDelete(d.fid)}>Remove</Button> */}
          </ListItem>
          ))}
          </List>

          </div>
        </DialogContent>
        <DialogActions >
          <Button autoFocus>
            Close
          </Button>
        </DialogActions>
      </BootstrapDialog>
        </div>
    );
}

export default ViewFollowers;