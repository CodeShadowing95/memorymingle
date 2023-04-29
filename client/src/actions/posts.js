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

    /* `dispatch({ type: 'CREATE', payload: data });` is dispatching an action to the Redux store with
    a type of `'CREATE'` and a payload of `data`. This action will be handled by the reducer
    function associated with the `'CREATE'` type, which will update the state of the store with the
    new data. */
    dispatch({ type: 'CREATE', payload: data });
  } catch (error) {
    console.log(error);
  }
}

export const updatePost = (id, post) => async (dispatch) => {
  try {
    /* `const { data } = await api.updatePost(id, post);` is destructuring the response object returned
    by the `updatePost()` function from the `api` module. It is extracting the `data` property from
    the response object and assigning it to a variable named `data`. This allows us to access the
    `data` property directly without having to reference the response object every time. */
    const { data } = await api.updatePost(id, post);

    /* `dispatch({ type: 'UPDATE', payload: data });` is dispatching an action to the Redux store with
    a type of `'UPDATE'` and a payload of `data`. This action will be handled by the reducer
    function associated with the `'UPDATE'` type, which will update the state of the store with the
    updated data. */
    dispatch({ type: 'UPDATE', payload: data });
  } catch (error) {
    console.log(error);
  }
}

export const deletePost = (id) => async (dispatch) => {
  try {
    /* `await api.deletePost(id);` is calling the `deletePost()` function from the `api` module and
    passing in the `id` parameter. The `await` keyword is used to wait for the function to complete
    before moving on to the next line of code. This function is responsible for deleting a post with
    the specified `id` from the database. */
    await api.deletePost(id);

    /* `dispatch({ type: 'DELETE', payload: id });` is dispatching an action to the Redux store with a
    type of `'DELETE'` and a payload of `id`. This action will be handled by the reducer function
    associated with the `'DELETE'` type, which will update the state of the store by removing the
    post with the specified `id`. */
    dispatch({ type: 'DELETE', payload: id });
  } catch (error) {
    console.log(error);
  }
}