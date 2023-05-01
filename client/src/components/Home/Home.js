import React, { useEffect, useState } from 'react';
import { Container, Grid, Grow } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { getPosts } from '../../actions/posts';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';

import useStyles from './styles';

const Home = () => {
  const [currentId, setCurrentId] = useState(0);
  const classes = useStyles();
  /* `const dispatch = useDispatch();` is using the `useDispatch` hook from the `react-redux` library
  to get access to the `dispatch` function. The `dispatch` function is used to dispatch actions to
  the Redux store, which can then update the state of the application. */
  const dispatch = useDispatch();

  /* `useEffect(() => { dispatch(getPosts()); }, [currentId, dispatch]);` is a React hook that is used
  to perform side effects in a functional component. In this case, it is dispatching the
  `getPosts()` action to the Redux store when the component mounts or when the `currentId` or
  `dispatch` values change. This will trigger the Redux store to fetch the posts data and update the
  state of the application. */
  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);


  return (
    <Grow in>
      <Container>
        <Grid container className={classes.mainContainer} justifyContent="space-between" alignItems="stretch" spacing={3}>
          <Grid item xs={12} sm={7}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  )
}

export default Home;