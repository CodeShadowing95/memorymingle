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
const reducer = (posts = [], action) => {
  switch (action.type) {
    case 'FETCH_ALL':
      /* `return action.payload;` is returning the `payload` property of the `action` object when the
      `type` property of the `action` object is `'FETCH_ALL'`. This means that the `posts` array is
      being replaced with the new array of posts that is contained in the `payload` property. */
      return action.payload;
    case 'CREATE':
      /* `[...posts, action.payload]` is creating a new array that includes all the elements of the
      `posts` array (using the spread operator `...`) and adding the `action.payload` object to the
      end of the new array. This is used in the 'CREATE' case of the reducer to add a new post to
      the existing array of posts. By creating a new array instead of modifying the existing one,
      the reducer ensures that it is following the principle of immutability, which is important for
      predictable state management in Redux. */
      return [...posts, action.payload];
    case 'UPDATE':
      /* This line of code is handling the 'UPDATE' action in the reducer. It is using the `map()`
      method to create a new array of posts where each post is either the updated post (if its `_id`
      property matches the `_id` property of the `action.payload` object) or the original post (if
      its `_id` property does not match). This ensures that the original `posts` array is not
      modified directly, which is important for maintaining the principle of immutability in Redux.
      The updated array of posts is then returned as the new state of the reducer. */
      return posts.map((post) => post._id === action.payload._id ? action.payload : post);
    default:
      return posts;
  }
}

export default reducer;