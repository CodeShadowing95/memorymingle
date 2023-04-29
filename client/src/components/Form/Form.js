import React, { useState } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';

import useStyles from './styles';

const Form = () => {
  const classes = useStyles();
  const [postData, setPostData] = useState({ creator: '', title: '', message: '', tags: '', selectedFile: '' });

  const handleSubmit = () => {

  }

  const clear = () => {

  }
  
  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">What do you want to share with us ?</Typography>
        <TextField
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          value={postData.creator}
          /* `onChange={(e) => setPostData({ ...postData, creator: e.target.value })}` is a function
          that is called when the value of the `TextField` component changes. It updates the
          `postData` state by creating a new object with the spread operator (`...postData`) to copy
          the existing state, and then updating the `creator` property with the new value from the
          `TextField` component (`e.target.value`). This allows the form to capture and store the
          user's input for the `creator` field. */
          onChange={(e) => setPostData({ ...postData, creator: e.target.value })}
        />
        <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
        <TextField name="message" variant="outlined" label="Message" fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
        <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value })} />
        <div className={classes.fileInput}>
          <FileBase type="file" multiple={false} onDone={({base64}) => setPostData({ ...postData, selectedFile: base64 })} />
        </div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" fullWidth onClick={clear}>Clear</Button>
      </form>
    </Paper>
  )
}

export default Form;