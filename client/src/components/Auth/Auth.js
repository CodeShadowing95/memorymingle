import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import PersonOutlinedIcon from '@material-ui/icons/PersonOutlined';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// React OAuth2 | Google
import { useGoogleLogin } from '@react-oauth/google';

import useStyles from './styles';
import Input from './Input';
import Icon from './Icon';
import { signin, signup } from '../../actions/auth';

const initialState = { firstname: '', lastname: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // console.log(formData);
    if(isSignUp) {
      /* `dispatch(signup(formData, navigate));` is dispatching an action to the Redux store to sign up
      a user with the form data provided in the `formData` state variable and to navigate to a new
      page using the `navigate` function provided by the `react-router-dom` library. The `signup`
      action is defined in the `auth` action creator file and contains the logic for making an API
      call to the server to register a new user with the provided form data. */
      dispatch(signup(formData, navigate));
    } else {
      dispatch(signin(formData, navigate));
    }
  }

  const handleChange = (e) => {
    /* `setFormData({ ...formData, [e.target.name]: e.target.value });` is updating the state variable
    `formData` by spreading the previous state and updating the value of the property with the name
    equal to the `name` attribute of the input element that triggered the `handleChange` function
    with the new value of that input element. This is a common pattern used in React to update state
    variables that have multiple properties. */
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  /**
   * This function toggles the value of a state variable called "isSignUp".
   */
  const switchMode = () => {
    setIsSignUp((signedUp) => !signedUp);
    setShowPassword(false);
  }

  /**
   * This function toggles the visibility of a password input field.
   */
  const handleShowPassword = () => setShowPassword((seePassword) => !seePassword);

  const googleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => {
      axios.get(`https://www.googleapis.com/oauth2/v1/userinfo? 
      access_token=${codeResponse.access_token}`,
      {
        headers: {
          Authorization: `Bearer ${codeResponse.access_token}`,
          Accept: "application/json",
        },
      }).then(async (res) => {
        // console.log(res);
        const result = res?.data;
        const token = codeResponse.access_token;
        try {
          dispatch({ type: "AUTH", data: { result, token } })

          navigate("/");
        } catch (error) {
          console.log("Connection Failure. Try again later.");
        }
      }).catch((err) => console.log("Login Failure " + err))
    },
    onError: res => console.error('Failed to login', res),
  });



  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          {isSignUp ? <PersonOutlinedIcon /> : <LockOutlinedIcon /> }
        </Avatar>
        <Typography variant="h5">{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input name="firstname" label="First Name" handleChange={handleChange} autoFocus half />
                <Input name="lastname" label="Last Name" handleChange={handleChange} half />
              </>
            )}
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
            { isSignUp && <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type="password" /> }
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </Button>

          {/* Google Login */}
          <Button
            className={classes.googleButton}
            color="secondary"
            fullWidth
            // onClick={() => googleLogin()}
            onClick={googleLogin}
            startIcon={<Icon />}
            variant="contained"
          >
            Connect with Google
          </Button>

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                { isSignUp ? 'I already have an account.' : 'No account yet? Register.'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default Auth;