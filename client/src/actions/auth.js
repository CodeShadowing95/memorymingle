import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';

// Action Creators
export const signin = (formData, navigate) => async (dispatch) => {
  try {
    // Login the user
    const { data } = await api.signin(formData);

    dispatch({ type: AUTH, data });

    navigate("/");
  } catch (error) {
    console.log(error);
  }
}

export const signup = (formData, navigate) => async (dispatch) => {
  try {
    // Signup the user
    const { data } = await api.signup(formData);

    dispatch({ type: AUTH, data });

    navigate("/");
  } catch (error) {
    console.log(error);
  }
}