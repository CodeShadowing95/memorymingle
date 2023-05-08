import { FETCH_ALL, FETCH_BY_SEARCH, START_LOADING, END_LOADING, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';

/**
 * This is a reducer function that handles two actions, 'FETCH_ALL' and 'CREATE', but currently returns
 * the same 'posts' array for both actions.
 * @param [posts] - The `posts` parameter is the initial state of the reducer, which is an array of
 * post objects. If no initial state is provided, it defaults to an empty array.
 * @param action - The `action` parameter is an object that describes the action being performed. It
 * typically has a `type` property that indicates the type of action being performed, and may also have
 * additional properties that provide data or context for the action. In this case, the `switch`
 * statement is checking the `
 * @returns In both the 'FETCH_ALL' and 'CREATE' cases, the reducer is returning the current state of
 * the 'posts' array. In the default case, it is also returning the current state of the 'posts' array.
 */
const reducer = (state = { isLoading: true, posts: [] }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case FETCH_ALL:
      /* This code is handling the 'FETCH_ALL' action in the reducer. It is returning a new state
      object that includes all the properties of the previous state object (using the spread
      operator `...state`) and overwriting the `posts`, `currentPage`, and `numberOfPages`
      properties with the corresponding values from the `action.payload` object. This ensures that
      the previous state is not modified directly, which is important for maintaining the principle
      of immutability in Redux. The updated state object is then returned as the new state of the
      reducer. */
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case FETCH_BY_SEARCH:
      /* This line of code is handling the 'FETCH_BY_SEARCH' action in the reducer. It is returning a
      new state object that includes all the properties of the previous state object (using the
      spread operator `...state`) and overwriting the `posts` property with the `data` property of
      the `action.payload` object. This ensures that the previous state is not modified directly,
      which is important for maintaining the principle of immutability in Redux. The updated state
      object is then returned as the new state of the reducer. */
      return { ...state, posts: action.payload };
    case CREATE:
      /* `return [...state, action.payload];` is adding a new post to the existing array of posts in
      the state. It creates a new array using the spread operator `...state` to include all the
      existing posts in the state, and then adds the new post object `action.payload` to the end of
      the array. This ensures that the previous state is not modified directly, which is important
      for maintaining the principle of immutability in Redux. The updated state object is then
      returned as the new state of the reducer. */
      return { ...state, posts: [...state.posts, action.payload] };
    case UPDATE:
      /* This line of code is handling the 'UPDATE' and 'LIKE' actions in the reducer. It is returning
      a new state object that includes all the properties of the previous state object (using the
      spread operator `...state`) and updating the post object that matches the `_id` property in
      the `action.payload` object. */
      return { ...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post) };
    case DELETE:
      /* This line of code is handling the 'DELETE' action in the reducer. It is returning a new state
      object that includes all the properties of the previous state object (using the spread
      operator `...state`) but with the post object that matches the `_id` property in the
      `action.payload` object removed from the `posts` array. The `filter()` method is used to
      create a new array that includes all the elements from the original array that meet a certain
      condition. In this case, the condition is that the `_id` property of each post object in the
      array is not equal to the `_id` property in the `action.payload` object, which represents the
      post that needs to be deleted. This ensures that the previous state is not modified directly,
      which is important for maintaining the principle of immutability in Redux. The updated state
      object is then returned as the new state of the reducer. */
      return { ...state, posts: state.posts.filter((post) => post._id !== action.payload) };
    case LIKE:
      // Similar to UPDATE
      return { ...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post) };
    default:
      return state;
  }
}

export default reducer;