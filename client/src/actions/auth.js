import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';

// Action Creators
export const signin = (formData, navigate) => async (dispatch) => {
  try {
    // Login the user

    navigate("/");
  } catch (error) {
    console.log(error);
  }
}

export const signup = (formData, navigate) => async (dispatch) => {
  try {
    // Signup the user

    navigate("/");
  } catch (error) {
    console.log(error);
  }
}