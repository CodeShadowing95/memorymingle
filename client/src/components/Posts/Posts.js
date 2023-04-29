import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Post from './Post/Post';

import useStyles from './styles';

const Posts = ({ setCurrentId }) => {
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
            {/* `<Post post={post} setCurrentId={setCurrentId} />` is rendering the `Post` component and
            passing two props to it: `post` and `setCurrentId`. The `post` prop is an object
            containing information about a single post, and the `setCurrentId` prop is a function
            that updates the `currentId` state in the parent component when a post is clicked. */}
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  )
}

export default Posts;