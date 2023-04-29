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
      return [...posts, action.payload];
    default:
      return posts;
  }
}

export default reducer;