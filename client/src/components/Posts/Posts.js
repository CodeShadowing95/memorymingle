import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Post from './Post/Post';

import useStyles from './styles';

const Posts = () => {
  /* `const posts = useSelector((state) => state.posts);` is using the `useSelector` hook from the
  `react-redux` library to select the `posts` state from the Redux store. It is assigning the value
  of the `posts` state to the `posts` constant, which can then be used in the component. */
  const posts = useSelector((state) => state.posts);
  const classes = useStyles();

  console.log(posts);

  return (
    !posts.length ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {posts.map((post) => (
          <Grid item key={post._id} xs={12} sm={6}>
            <Post post={post} />
          </Grid>
        ))}
      </Grid>
    )
  )
}

export default Posts;