import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';

import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';

const Form = ({ currentId, setCurrentId }) => {
  const classes = useStyles();
  const [postData, setPostData] = useState({ title: '', message: '', tags: '', image: '' });
  /* This is using the `useSelector` hook from the `react-redux` library to select a specific post
  from the Redux store's state. */
  const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);
  /* This function is used to dispatch actions to the Redux store. It
  allows the `Form` component to interact with the Redux store and update the state of the
  application. */
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));

  /* `useEffect(() => { if(post) setPostData(post); }, [post]);` is a hook that is used to update the
  `postData` state whenever the `post` state changes. It checks if there is a `post` object (which
  is obtained from the Redux store using the `useSelector` hook) and if there is, it sets the
  `postData` state to the `post` object. This is useful when editing an existing post, as it allows
  the form to be pre-populated with the existing data. The `[post]` dependency array ensures that
  the effect only runs when the `post` state changes. */
  useEffect(() => {
    if(post) setPostData(post);
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if(currentId) {
      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
    } else {
      /* `dispatch(createPost(postData));` is dispatching an action to the Redux store. The `createPost`
      action creator is called with the `postData` object as an argument, which contains the data
      entered by the user in the form. This action is then handled by the Redux store, which updates
      the state of the application accordingly. */
      dispatch(createPost({ ...postData, name: user?.result?.name }));
    }
    clear();
  }

  const clear = () => {
    setCurrentId(null);
    setPostData({ title: '', message: '', tags: '', image: '' });
  }

  if(!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please log in to create your own memories and like other's memories.
        </Typography>
      </Paper>
    )
  }
  
  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{ currentId ? 'Ediing your post' : 'What do you want to share with us ?'}</Typography>
        <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
        <TextField name="message" variant="outlined" multiline minRows={5} label="Message" fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
        <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
        <div className={classes.fileInput}>
          <FileBase type="file" multiple={false} onDone={({base64}) => setPostData({ ...postData, image: base64 })} />
        </div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" fullWidth onClick={clear}>Clear</Button>
      </form>
    </Paper>
  )
}

export default Form;