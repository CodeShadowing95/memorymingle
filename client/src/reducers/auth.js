import { AUTH, LOGOUT } from '../constants/actionTypes';

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      /* `localStorage.setItem('profile', JSON.stringify({ ...action?.data }));` is setting an item in
      the browser's local storage with the key "profile" and the value of the action data object
      that has been spread using the spread syntax. The data object is first converted to a JSON
      string using `JSON.stringify()` before being stored in the local storage. */
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }));

      return { ...state, authData: action?.data };
    case LOGOUT:
      /* `localStorage.clear()` is a method that clears all the key-value pairs stored in the browser's
      local storage. In this code, it is called when the `LOGOUT` action is dispatched, which means
      the user is logging out of the application. After clearing the local storage, the `authData`
      property in the state is set to `null` using the spread syntax. This ensures that the user is
      logged out and the application state is updated accordingly. */
      localStorage.clear();

      return { ...state, authData: null };
    default:
      return state;
  }
}

export default authReducer;