import React, { useEffect, useState } from 'react';
import { Container, Grid, Grow, Paper, AppBar, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

import Pagination from '../Pagination';
import { getPosts } from '../../actions/posts';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import useStyles from './styles';

const Home = () => {
  const [currentId, setCurrentId] = useState(0);
  /* `const dispatch = useDispatch();` is using the `useDispatch` hook from the `react-redux` library
  to get access to the `dispatch` function. The `dispatch` function is used to dispatch actions to
  the Redux store, which can then update the state of the application. */
  const dispatch = useDispatch();
  const query = useQuery();
  const navigate = useNavigate();

  /**
   * This function returns a URLSearchParams object that represents the query parameters in the current
   * URL.
   * @returns The `useQuery` function is returning a new instance of the `URLSearchParams` class that is
   * initialized with the query string parameters from the current URL location.
   */
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  /* `const page = query.get('page') || 1;` is getting the value of the `page` query parameter from the
  current URL using the `get` method of the `URLSearchParams` object returned by the `useQuery`
  function. If the `page` parameter is not present in the URL, it defaults to 1. This value is then
  stored in the `page` constant. */
  const page = query.get('page') || 1;

  /* `const searchQuery = query.get('searchQuery');` is getting the value of the `searchQuery` query
  parameter from the current URL using the `get` method of the `URLSearchParams` object returned by
  the `useQuery` function. The value of the `searchQuery` parameter is then stored in the
  `searchQuery` constant. */
  const searchQuery = query.get('searchQuery');

  
  const classes = useStyles();

  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);

  /* `useEffect(() => { dispatch(getPosts()); }, [currentId, dispatch]);` is a React hook that is used
  to perform side effects in a functional component. In this case, it is dispatching the
  `getPosts()` action to the Redux store when the component mounts or when the `currentId` or
  `dispatch` values change. This will trigger the Redux store to fetch the posts data and update the
  state of the application. */
  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  const searchPost = () => {
    if(search.trim()) {
      // dispatch => fetch search post
    } else {
      navigate("/");
    }
  };

  const handleKeyDown = (e) => {
    /* The `if` statement is checking if the `keyCode` property
    of the `e` event object is equal to 13, which corresponds to the Enter key. */
    if(e.keyCode === 13) {
      searchPost();
    }
  }

  /**
   * This function adds a new tag to an array of tags.
   * @param tag - The `tag` parameter is a variable that represents the new tag that needs to be added
   * to the `tags` array. The `handleAdd` function takes this parameter and uses the spread operator
   * (`...`) to create a new array that includes all the existing tags as well as the new tag.
   */
  const handleAdd = (tag) => setTags([ ...tags, tag ]);

  /**
   * This function handles the deletion of a specific tag from an array of tags.
   * @param tagToDelete - The parameter `tagToDelete` is a variable that represents the tag that needs
   * to be deleted from an array of tags. The function `handleDelete` takes this parameter and uses it
   * to filter out the tag from the array of tags using the `filter` method.
   */
  const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete));


  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid container className={classes.gridContainer} justifyContent="space-between" alignItems="stretch" spacing={3}>
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar className={classes.appBarSearch} position="static" color="inherit">
              <TextField
                name="search"
                variant="outlined"
                label="Search Memories"
                onKeyDown={handleKeyDown}
                fullWidth
                value={search}
                onChange={(e) => {setSearch(e.target.value)}}
              />
              <ChipInput
                style={{ margin: '10px 0' }}
                value={tags}
                onAdd={handleAdd}
                onDelete={handleDelete}
                label="Search for tags"
                variant="outlined"
              />
              <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">Search</Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            <Paper elevation={6}>
              <Pagination />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  )
}

export default Home;