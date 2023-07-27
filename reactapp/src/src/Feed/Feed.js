import React, { Component } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CommentIcon from "@mui/icons-material/Comment";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Cookies from "js-cookie";
import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { Button } from "@mui/material";
import { Divider } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import "./Feed.css";
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import Box from "@mui/material/Box";

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

// const LightTheme = createTheme({
//   palette: {
//     mode: "light",
//   },
// });

// const DarkTheme = createTheme({
//   palette: {
//     mode: "dark",
//   },
// });

const Root = styled("div")(({ theme }) => ({
  // backgroundColor: theme.palette.background.default,
  minHeight: "100vh",
  overflowX: "hidden", // Hide horizontal scrollbar
  maxWidth: "100%", // Fit content within the width of the device
}));

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      data: [],
      commentData: [],
      darkMode: false,
      open: false,
      comments: '',
      like: [],
    };
  }

  componentDidMount() {
    // Simulating async data fetching
    setTimeout(() => {
      const unSubscribe = onAuthStateChanged(getAuth(), (user) => {
        axios
          .get("http://127.0.0.1:2006/Feed/get")
          .then((response) => {
            console.log(response.data);
            const dataWithImageUrls = response.data.map((item) => ({
              ...item,
              imageUrl: `data:image/jpeg;base64,${btoa(
                new Uint8Array(item.image).reduce(
                  (data, byte) => data + String.fromCharCode(byte),
                  ""
                )
              )}`,
            }));
            this.setState({ data: dataWithImageUrls });
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });

          

          axios.get(`http://127.0.0.1:2006/Like/get/${Cookies.get('Id')}`).then(response => {this.setState({like: response.data});
                console.log("Like: " ,response);
                }).catch(error => {console.log(error);
                });
      });
      return unSubscribe;
    }, []);
  }

  // likepost(pid, likeCount, d) {
  //   if (d.liked) {
  //     axios
  //       .post(`/api/like/${pid}`)
  //       .then((response) => {
  //         const updatedData = this.state.data.map((item) => {
  //           if (item.pid === pid) {
  //             return { ...item, likeCount: response.data.likeCount, liked: false };
  //           }
  //           return item;
  //         });
  //         this.setState({ data: updatedData });
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   } else {
  //     axios
  //       .post(`/api/like/${pid}`)
  //       .then((response) => {
  //         const updatedData = this.state.data.map((item) => {
  //           if (item.pid === pid) {
  //             return { ...item, likeCount: response.data.likeCount, liked: true };
  //           }
  //           return item;
  //         });
  //         this.setState({ data: updatedData });
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  // }
  // likepost(pid, likeCount, d) {
  //   const likedByUser = this.state.like.includes(pid);
  
  //   if (likedByUser) {
  //     // Unlike the post
  //     axios
  //       .delete(`http://127.0.0.1:2006/Like/delete/${pid}/${Cookies.get('Id')}`)
  //       .then(() => {
  //         const updatedData = this.state.data.map((item) => {
  //           if (item.pid === pid) {
  //             return { ...item, likeCount: likeCount - 1 };
  //           }
  //           return item;
  //         });
  
  //         this.setState((prevState) => ({
  //           data: updatedData,
  //           like: prevState.like.filter((value) => value !== pid),
  //         }));
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   } else {
  //     // Like the post
  //     const data = {
  //       likedBy: Cookies.get('Id'),
  //       postId: pid,
  //     };
  
  //     axios
  //       .post('http://127.0.0.1:2006/Like/add', data)
  //       .then(() => {
  //         const updatedData = this.state.data.map((item) => {
  //           if (item.pid === pid) {
  //             return { ...item, likeCount: likeCount + 1 };
  //           }
  //           return item;
  //         });
  
  //         this.setState((prevState) => ({
  //           data: updatedData,
  //           like: [...prevState.like, pid],
  //         }));
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  // }
  
  likepost(pid, likeCount, d) {
    if (this.state.like.includes(pid)) {
      const likes = likeCount - 1;
      d.likeCount = likes;
  
      axios.post('http://127.0.0.1:2006/Feed/add', d, {headers: {
        "Content-Type": "multipart/form-data",
      },} )
        .then(response => {
          const updatedData = this.state.data.map(item => {
            if (item.pid === pid) {
              return { ...item, likeCount: likes };
            }
            return item;
          });
  
          this.setState(prevState => ({
            data: updatedData,
            like: prevState.like.filter(value => value !== pid)
          }));
        })
        .catch(error => {
          console.log(error);
        });
  
      axios.delete(`http://127.0.0.1:2006/Like/delete/${pid}/${Cookies.get('Id')}`)
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      const likes = likeCount + 1;
      d.likeCount = likes;
  
      axios.post('http://127.0.0.1:2006/Feed/add', d)
        .then(response => {
          const updatedData = this.state.data.map(item => {
            if (item.pid === pid) {
              return { ...item, likeCount: likes };
            }
            return item;
          });
  
          this.setState(prevState => ({
            data: updatedData,
            like: [...prevState.like, pid]
          }));
        })
        .catch(error => {
          console.log(error);
        });
  
      const data = {
        likedBy: Cookies.get('Id'),
        pid: d.pid,
      };
  
      axios.post('http://127.0.0.1:2006/Like/add', data)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  
  // toggleTheme = () => {
  //   this.setState((prevState) => ({
  //     darkMode: !prevState.darkMode,
  //   }));
  // };

  handleComment=(event)=>{
    var today = new Date(),
  date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const data = {
      postId: this.state.comments,
      commentedBy : Cookies.get('Id'),
      content : this.state.postContent,
      date: date,
    }
    // const response='';
        
        axios.post(`http://127.0.0.1:2006/comment/add`,data ).then(response =>{
        console.log("CommentData: ", response);
        console.log("Post ID: " , this.state.comments);
        
      })
      .catch(error => {console.log(error);
      });
      axios.post(`http://127.0.0.1:2006/Feed/update/${this.state.comments}`).then(response => {
        console.log(response);
        const updatedData = this.state.data.map(item => {
          if (item.postId === this.state.comments) {
            return { ...item, comment: item.comment+1 };
          }
          return item;
        });
        this.setState({data:updatedData});
      }).catch(error => {console.log(error);
      });
      this.setState({postContent: ''});
     
      this.setState({open:false});
  }

  handleClickOpen(postId,d)  {
    this.setState({open:true});
    this.setState({comments:postId});
    this.setState({commentTemp: d});
    const response='';
    // axios.get('http://127.0.0.1:8080/Feed/get').then(response =>{this.setState({data: response.data});
    axios.get(`http://127.0.0.1:2006/comment/get/${postId}`).then(response =>{this.setState({commentData: response.data});
    console.log("CommentData: ", response.data[0]);
    // console.log("Post ID: " , postId);
      })
      .catch(error => {console.log(error);
      });
  };
  handleClose=(event)=> {
    this.setState({open:false});
  }

  render() {
    const { darkMode } = this.state;

    return (
      <div>
        <Root className="aqwed">
          <AppBar position="static" >
            <Toolbar>
              <center>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Connect
                </Typography>
              </center>
              <div
                className="name"
                style={{
                  marginRight: "100px",
                  alignContent: "left  ",
                  position: "relative",
                }}
              >
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  {Cookies.get("Id").charAt(0)}
                </Avatar>
                {Cookies.get("Id")}
              </div>
              <IconButton onClick={this.toggleTheme}>
                {darkMode ? <Brightness4Icon /> : <Brightness7Icon />}
              </IconButton>
            </Toolbar>
          </AppBar>
          <div >
            {this.state.data.map((d) => (
              <div class="responsive-div" key={d.pid}>
                <div className="whole" style={{ marginBottom: 0 }}>
                  <div className="center" >
                    <Card
                      className="cardContainer"
                      style={{ width: "300%", marginBottom: 50 }}
                    >
                      <div className="mko">
                        <CardHeader
                          avatar={
                            <Avatar
                              sx={{ bgcolor: red[500] }}
                              aria-label="recipe"
                            ></Avatar>
                          }
                          action={
                            <IconButton aria-label="settings">
                              <MoreVertIcon />
                            </IconButton>
                          }
                          title={d.user}
                          subheader={d.date}
                        />
                        <CardMedia
                          component="img"
                          className="cardMedia"
                          // image={d.imageUrl} // This is where the encoded image is used
                          image={`data:image/jpeg;base64,${d.image}`}
                          alt="Image"
                        />
                        <CardContent className="cardContent">
                          <Typography variant="body2" color="text.secondary">
                            {d.content}
                          </Typography>
                        </CardContent>

                        <CardActions disableSpacing className="cardActions">
                        <IconButton
                        aria-label="add to favorites"
                        className={this.state.like.includes(d.pid) ? "likedIcon" : ""}
                        onClick={() => this.likepost(d.pid, d.likeCount, d)}
                      >
                        <FavoriteIcon />
                        <Typography>{d.likeCount}</Typography>
                      </IconButton>

                          <IconButton aria-label="comment">
                            <CommentIcon onClick={() => this.handleClickOpen(d.pid,d)}/> <Typography>{d.comment}</Typography>
                          </IconButton>
                       
                          <IconButton aria-label="share">
                            <ShareIcon />
                          </IconButton>
                        </CardActions>
                        <div class="qwe"></div>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <BootstrapDialog
        onClose={this.handleClose}
        aria-labelledby="customized-dialog-title"
        open={this.state.open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={this.handleClose}>
          Comments
        </BootstrapDialogTitle>
            <DialogContent dividers>
          {this.state.commentData.map(d => ( 
           d.postId==this.state.comments ? ( 
            <div style={{alignContent: 'center'}}>
            {/* <Typography>{this.state.commentData}</Typography> */}
            <div className="center" style={{marginBottom: "3%"}}>
            <Card className="cardContainer" style={{marginTop: "0px", width: "100%"}}>
            <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} style={{zIndex: 0}} aria-label="recipe">
              {d.commented_by && <p>{d.commented_by.charAt(0)}</p>}
                
              </Avatar>
            }
            style={{textAlign: "left"}}
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={d.commentedBy}
            subheader={d.date}
            />
            <Divider/>
            <CardContent className="cardContent" >
            <Typography variant="body2" color="black" style={{textAlign: "left"}}>
            {d.content}
            </Typography>
            </CardContent>
            <Divider/>
            </Card>
            </div>
            
            </div>
          ) : null
            ))}
            </DialogContent>
        <DialogActions>
          <div>

          <div><label class="text-inverse" style={{marginTop: '1%'}}>Post Your Comment:</label>
          {/* <div style={{marginLeft: "2%", marginTop: "2%"}}> */}
            <textarea 
                // value={commentText}
                placeholder='What do you think about this post?'
                value={this.state.postContent}
                onChange={e => this.setState({postContent : e.target.value})}
                // onChange={e=> this.setState({postContent: e.target.value})}
                rows="5" cols="75"  maxLength={80} style={{boxShadow: "5px 15px 5px 1px"}} />
                </div>
            <div style={{marginTop: '2%'}}>
          <Button autoFocus onClick={this.handleComment}>
            Post Comment
          </Button>
            </div>
                </div>
        </DialogActions>
      </BootstrapDialog>
        </Root>
      </div>
    );
  }
}

export default Feed;

