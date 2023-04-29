import React, { useEffect } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { getPosts } from './actions/posts';
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import memories from './images/memories1.png';
import useStyles from './styles';

const App = () => {
  const classes = useStyles();
  /* `const dispatch = useDispatch();` is using the `useDispatch` hook from the `react-redux` library
  to get access to the `dispatch` function. The `dispatch` function is used to dispatch actions to
  the Redux store, which can then update the state of the application. */
  const dispatch = useDispatch();

  /* `useEffect(() => { dispatch(getPosts()); }, [dispatch]);` is a React hook that is used to perform
  side effects in a functional component. In this case, it is dispatching the `getPosts()` action to
  the Redux store when the component mounts or when the `dispatch` function changes. This will
  trigger the Redux store to fetch the posts data and update the state of the application. */
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);
  

  return (
    <Container maxWidth="lg">
      <AppBar sx={{ display: 'flex', flexDirection: 'row' }} className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h2" align="center">MemoryMingle</Typography>
        <img className={classes.image} src={memories} alt="memories"  height="60" />
      </AppBar>
      <Grow in>
        <Container>
          <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  )
}

export default App;