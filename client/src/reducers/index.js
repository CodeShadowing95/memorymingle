import { combineReducers } from 'redux';

import posts from './posts';
import auth from './auth';

/* This code is exporting a combined reducer function that takes in an object with a `posts` property
and returns a new state object with the `posts` property updated by the `posts` reducer function.
The `combineReducers` function is a utility function provided by the `redux` library that allows
multiple reducers to be combined into a single reducer function. The resulting reducer function can
then be used with the `createStore` function to create a Redux store. */
export default combineReducers({ posts, auth });