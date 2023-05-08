import React, { useEffect } from 'react';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getPosts } from '../actions/posts';

import useStyles from './styles';

const Paginate = ({ page }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  /* `const { numberOfPages } = useSelector((state) => state.posts);` is using the `useSelector` hook
  from the `react-redux` library to extract the `numberOfPages` property from the `posts` slice of
  the Redux store. It is destructuring the `numberOfPages` property from the `state.posts` object
  returned by the `useSelector` hook. This allows the `numberOfPages` value to be used in the
  `Pagination` component to determine the total number of pages to display. */
  const { numberOfPages } = useSelector((state) => state.posts);

  /* `useEffect(() => { if(page) dispatch(getPosts(page)); }, [page]);` is a React hook that is used to
  perform side effects in functional components. In this case, it is used to dispatch the `getPosts`
  action with the current `page` number as a parameter whenever the `page` prop changes. This
  ensures that the correct page of posts is fetched from the server and displayed to the user. The
  second argument `[page]` is an array of dependencies that tells React when to re-run the effect.
  In this case, the effect will only re-run if the `page` prop changes. */
  useEffect(() => {
    if(page) dispatch(getPosts(page));
  }, [page]);
  

  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={numberOfPages}
      page={Number(page) || 1}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
      )}
    />
  );
};

export default Paginate;