import React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CommentIcon from '@mui/icons-material/Comment';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Cookies from 'js-cookie';
import './Feed.css';

export default function RecipeReviewCard() {
  const [expanded, setExpanded] = React.useState(false);
  const [favorite, setFavorite] = React.useState(false);

  const handleFavoriteClick = () => {
    setFavorite(!favorite);
  };

  return (
    <div className='whole'>
    <div>
    <div className='appbar'>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <div className='a'>
          Connect
          </div>
            
            <div className='name'>
            
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                P
              </Avatar>
            
            {Cookies.get('Id')}
            </div>
           
          </Typography>
        </Toolbar>

      </AppBar>
      </div>

      <div className="center">
        <Card className="cardContainer">
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                S
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title="Love the Nature"
            subheader="30th June 2023"
          />
          <CardMedia
            component="img"
            className="cardMedia"
            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmUc7J_f9RNwX8wx5iW6uLge5-LMsbfpA3Dw&usqp=CAU"
            alt="Paella dish"
          />
          <CardContent className="cardContent">
            <Typography variant="body2" color="text.secondary">
              Where we love is home - home that our feet may leave, but not our hearts. ...
            </Typography>
          </CardContent>
          
          <CardActions disableSpacing className="cardActions">
          
            <IconButton
              aria-label="add to favorites"
              onClick={handleFavoriteClick}
              className={favorite ? 'favoriteIcon' : ''}
            >
            
              <FavoriteIcon />
            </IconButton>
            
            <IconButton aria-label="comment">
              <CommentIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
          </CardActions>
          <div class='qwe'>
            <div className='likes'>
              0 likes
            </div>
            <div class='comm'>
              0 comments
            </div>
          
          </div>
        </Card>
      </div>
    </div>
    </div>
  );
}
