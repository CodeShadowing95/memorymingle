import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core';
import { ThumbUpAltOutlined, ThumbUpAlt } from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import DetailsIcon from '@material-ui/icons/MoreHoriz';
import Moment from 'moment';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import useStyles from './styles';
import { deletePost, likePost } from '../../../actions/posts';

const Post = ({ post, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));
  const navigate = useNavigate();

  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
        ? (
          <><ThumbUpAlt fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
        ) : (
          <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }

    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
  };

  const openPost = () => navigate(`/posts/${post._id}`);

  return (
    <Card className={classes.card} raised elevation={6}>
      {/* <ButtonBase className={classes.cardAction} onClick={openPost}> */}
      <CardMedia className={classes.media} image={post.image} title={post.title} />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">{Moment(post.createdAt).fromNow()}</Typography>
      </div>
      {/* This is a conditional rendering statement that checks if the current user is the creator of
      the post. If the condition is true, it renders an edit button for the post. */}
      <div className={classes.overlay2} style={{display: 'flex'}}>
        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
          <>
          <Button style={{color: 'white'}} size="small" onClick={() => {setCurrentId(post._id)}}>
            <EditIcon fontSize="medium" />
          </Button>
          </>
        )}
        <Button style={{color: 'white'}} size="small" onClick={openPost}>
          <DetailsIcon fontSize="medium" />
        </Button>
      </div>
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary">{post.tags.map((tag) => `#${tag} `)}</Typography>
      </div>
      <Typography className={classes.title} variant="h5" gutterBottom>{post.title}</Typography>
      <CardContent>
        <Typography variant="body1" color="textSecondary" component="p" gutterBottom>{post.message}</Typography>
      </CardContent>
      {/* </ButtonBase> */}

      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" disabled={!user?.result} onClick={() => {dispatch(likePost(post._id))}}>
          <Likes />
        </Button>
        {/* This is a conditional rendering statement that checks if the current user is the creator of
        the post. If the condition is true, it renders a delete button for the post. */}
        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
          <Button size="small" color="primary" onClick={() => {dispatch(deletePost(post._id))}}>
            <DeleteIcon fontSize="small" /> Delete
          </Button>
        )}
      </CardActions>
    </Card>
  )
}

export default Post;