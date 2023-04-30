// There we'll create all the handlers for our routes

import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';

export const getPosts = async (req, res) => {
  try {
    /* It queries the database to retrieve all the
    documents from the `PostMessage` collection and storing them in the `postMessages` variable. The
    `await` keyword is used to wait for the database operation to complete before moving on to the
    next line of code. */
    const postMessages = await PostMessage.find();

    /* `res.status(200).json(postMessages);` is setting the HTTP response status code to 200 (OK) and
    sending a JSON response with the `postMessages` array, which contains all the documents from the
    `PostMessage` collection in the database. This is typically used when the requested resource has
    been successfully retrieved from the server. */
    res.status(200).json(postMessages);
  } catch (error) {
    /* set the HTTP response status code to
    404 (Not Found) and sending a JSON response with an error message in the `message` field. This
    is typically used when the requested resource is not found on the server. */
    res.status(404).json({ message: error.message });
  }
}

export const createPost = async (req, res) => {
  /* In this case, it is likely that `req.body` contains the data for a new post
  that the user is trying to create. This data will be used to create a new instance of the
  `PostMessage` model and save it to the database. */
  const post = req.body;

  /* create a new instance of the `PostMessage` model
  with the data from the `post` object, which is likely the data for a new post that the user is
  trying to create. This new instance will be saved to the database in the `createPost` function. */
  const newPost = new PostMessage(post);

  try {
    /* save a new instance of the `PostMessage` model to the database. The
    `save()` method is a built-in method in Mongoose that saves the document to the database. The
    `await` keyword is used to wait for the database operation to complete before moving on to the
    next line of code. */
    await newPost.save();

    /* `res.status(201).json(newPost);` is setting the HTTP response status code to 201 (Created) and
    sending a JSON response with the newly created post in the `newPost` variable. This is typically
    used when a new resource has been successfully created on the server. */
    res.status(201).json(newPost);
  } catch (error) {
    /* `res.status(409).json({ message: error.message });` is setting the HTTP response status code to
    409 (Conflict) and sending a JSON response with an error message in the `message` field. This is
    typically used when there is a conflict with the current state of the resource on the server,
    such as when trying to create a resource that already exists. */
    res.status(409).json({ message: error.message });
  }
}

export const updatePost = async (req, res) => {
  /* `const { id: _id} = req.params;` is destructuring the `id` property from the `req.params` object
  and assigning it to a new variable `_id`. This is commonly used in Express.js to rename properties
  of an object to a different variable name for easier use in the code. In this case, it is likely
  that the `id` property is the ID of a post in the database, and it is being renamed to `_id` to
  match the naming convention used by MongoDB for its ObjectIds. */
  const { id: _id} = req.params;
  /* `const post = req.body;` is assigning the value of the `req.body` object to a new constant
  variable called `post`. The `req.body` object contains the data submitted in the request body,
  which is likely the data for a new post that the user is trying to create. This `post` variable
  will be used to create a new instance of the `PostMessage` model and save it to the database in
  the `createPost` function. */
  const post = req.body;

  /* This code is checking if the `_id` parameter passed in the request is a valid MongoDB ObjectId. If
  it is not a valid ObjectId, it returns a 404 response with the message "No posts with that id
  available". This is to ensure that the request is only processed if a valid ObjectId is provided,
  and to handle cases where an invalid or non-existent ObjectId is provided in the request. */
  if(!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send('No posts with that id found');
  }

  /* `const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, { new: true });` is updating a
  post in the database with the given `_id` and `post` data. It uses the `findByIdAndUpdate()`
  method provided by Mongoose to find a post with the given `_id` and update it with the data in the
  `post` object. The `{ new: true }` option is used to return the updated post after it has been
  updated in the database. The updated post is then stored in the `updatedPost` constant variable. */
  const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post, _id }, { new: true });

  /* `res.json(updatedPost);` is sending a JSON response with the updated post data in the
  `updatedPost` variable. The `json()` method is a built-in method in Express.js that sends a JSON
  response to the client. */
  res.json(updatedPost);
}

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send('No posts with that id found');
  }

  /* `await PostMessage.findByIdAndRemove(id);` is a Mongoose method that finds a document in the
  `PostMessage` collection with the given `id` and removes it from the database. The `await` keyword
  is used to wait for the database operation to complete before moving on to the next line of code. */
  await PostMessage.findByIdAndRemove(id);

  /* `res.json({ message: 'Post deleted successfully' });` is sending a JSON response to the client
  with a message indicating that the post was deleted successfully. The `json()` method is a
  built-in method in Express.js that sends a JSON response to the client. */
  res.json({ message: 'Post deleted successfully' });
}

export const likePost = async (req, res) => {
  const { id } = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send('No posts with that id found');
  }

  const post = await PostMessage.findById(id);
  const likedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });

  res.json(likedPost);
}