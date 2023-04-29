import * as api from '../api';

//Action Creators
export const getPosts = () => async (dispatch) => {
  try {
    /* `const { data } = await api.fetchPosts();` is destructuring the response object returned by the
    `fetchPosts()` function from the `api` module. It is extracting the `data` property from the
    response object and assigning it to a variable named `data`. This allows us to access the `data`
    property directly without having to reference the response object every time. */
    const { data } = await api.fetchPosts();

    /* `dispatch({ type: 'FETCH_ALL', payload: data });` is dispatching an action to the Redux store.
    The action has a type of `'FETCH_ALL'` and a payload of `data`. This action will be handled by
    the reducer function associated with the `'FETCH_ALL'` type, which will update the state of the
    store with the new data. */
    dispatch({ type: 'FETCH_ALL', payload: data });
  } catch (error) {
    console.log(error.message);
  }
}

export const createPost = (post) => async (dispatch) => {
  try {
    /* `const { data } = await api.createPost(post);` is destructuring the response object returned by
    the `createPost()` function from the `api` module. It is extracting the `data` property from the
    response object and assigning it to a variable named `data`. This allows us to access the `data`
    property directly without having to reference the response object every time. */
    const { data } = await api.createPost(post);

    dispatch({ type: 'CREATE', payload: data });
  } catch (error) {
    console.log(error);
  }
}