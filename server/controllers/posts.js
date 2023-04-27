// There we'll create all the handlers for our routes

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