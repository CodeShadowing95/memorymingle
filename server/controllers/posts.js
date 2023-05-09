// There we'll create all the handlers for our routes

import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';

export const getPosts = async (req, res) => {
  const { page } = req.query;

  try {
    const LIMIT = 9;
    // Get the starting index of every page
    const startIndex = (Number(page) - 1) * LIMIT;
    /* The above code is using JavaScript to count the number of documents in a MongoDB collection
    called "PostMessage" and storing the result in a constant variable called "total". The "await"
    keyword is used to wait for the count operation to complete before assigning the result to the
    "total" variable. */
    const total = await PostMessage.countDocuments({});

    /* The above code is using the `await` keyword to asynchronously retrieve all documents from a
    MongoDB collection called `PostMessage` and store them in the `postMessages` variable. */
    // const postMessages = await PostMessage.find();

    /* The above code is using the Mongoose library to query a MongoDB database for PostMessage
    documents. It is sorting the results in descending order(from the newest to the oldest) by the _id field, limiting the number
    of results to a specified LIMIT, and skipping a specified number of documents from the beginning
    of the results. The results are then stored in the posts variable. The await keyword is used to
    wait for the query to complete before continuing execution. */
    const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

    /* The above code is sending a JSON response with data containing an array of posts, the current
    page number, and the total number of pages. The current page number is converted to a number
    using the Number() function, and the total number of pages is calculated by dividing the total
    number of posts by the limit per page and then rounding up using the Math.ceil() function. The
    response status code is set to 200, indicating a successful request. */
    res.status(200).json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });
  } catch (error) {
    /* set the HTTP response status code to
    404 (Not Found) and sending a JSON response with an error message in the `message` field. This
    is typically used when the requested resource is not found on the server. */
    res.status(404).json({ message: error.message });
  }
}

export const getPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await PostMessage.findById(id);

    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const getPostsBySearch = async (req, res) => {
  /* `This is commonly used in Express.js to extract specific properties from an object and
  assign them to variables for easier use in the code. In this case, it is likely that the `query`
  object contains search parameters for a search query, and these parameters are being extracted to
  be used in the route handler function. */
  const { searchQuery, tags } = req.query;

  try {
    /* `const title = new RegExp(searchQuery, 'i');` is creating a regular expression object `title`
    with the `searchQuery` string as the pattern to match. The `'i'` flag is used to make the
    regular expression case-insensitive. This regular expression object is likely used to search for
    posts with a title that matches the `searchQuery` string. */
    const title = new RegExp(searchQuery, 'i');

    /* This line of code is querying the database to find all posts that match either of the following
    conditions:
    1. The `title` field of the post matches the `searchQuery` string provided in the request.
    2. The `tags` field of the post contains any of the tags provided in the `tags` query parameter
    of the request. */
    const posts = await PostMessage.find({ $or: [ { title }, { tags: { $in: tags.split(',') } } ] });

    /* `res.json({ data: posts });` is sending a JSON response to the client with an object containing
    a `data` property, which contains an array of posts retrieved from the database. */
    res.json({ data: posts });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const createPost = async (req, res) => {
  /* In this case, it is likely that `req.body` contains the data for a new post
  that the user is trying to create. This data will be used to create a new instance of the
  `PostMessage` model and save it to the database. */
  const post = req.body;
  console.log(post);

  /* create a new instance of the `PostMessage` model
  with the data from the `post` object, which is likely the data for a new post that the user is
  trying to create. This new instance will be saved to the database in the `createPost` function. */
  const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString()} );

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
  /* `const { id } = req.params;` is destructuring the `id` property from the `req.params` object and
  assigning it to a new variable `id`. This is commonly used in Express.js to extract specific
  properties from an object and assign them to variables for easier use in the code. In this case,
  it is likely that the `id` property is the ID of a post in the database, and it is being extracted
  from the `req.params` object to be used in the route handler function. */
  const { id } = req.params;

  /* This code is checking if the `userId` property is present in the `req` object. If it is not
  present, it means that the user is not authenticated and the function returns a JSON response with
  a message indicating that the user is unauthenticated. This is likely used to restrict access to
  certain routes or actions to only authenticated users. */
  if(!req.userId) return res.json({ message: 'Unauthenticated' });

  /* This code is checking if the `id` parameter passed in the request is a valid MongoDB ObjectId. If
  it is not a valid ObjectId, it returns a 404 response with the message "No posts with that id
  found". This is to ensure that the request is only processed if a valid ObjectId is provided, and
  to handle cases where an invalid or non-existent ObjectId is provided in the request. */
  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send('No posts with that id found');
  }

  /* `const post = await PostMessage.findById(id);` is querying the database to find a post with the
  specified `id` using the `findById()` method provided by Mongoose. The `await` keyword is used to
  wait for the database operation to complete before moving on to the next line of code. The
  retrieved post is then stored in the `post` constant variable. */
  const post = await PostMessage.findById(id);

  /* `const index = post.likes.findIndex((id) => id === String(req.userId));` is finding the index of
  the `req.userId` in the `likes` array of a post. It uses the `findIndex()` method to iterate over
  the `likes` array and return the index of the first element that satisfies the provided testing
  function, which in this case is checking if the `id` is equal to the `req.userId`. The index of
  the element is then stored in the `index` constant variable. */
  const index = post.likes.findIndex((id) => id === String(req.userId));

  if(index === -1) {
    /* `post.likes.push(req.userId);` is adding the `req.userId` to the `likes` array of a post. This
    is likely used to keep track of which users have liked a particular post. If the `req.userId` is
    not already in the `likes` array, it is added to the end of the array using the `push()` method. */
    post.likes.push(req.userId);
  } else {
    /* `post.likes = post.likes.filter((id) => id !== String(req.userId));` is removing the
    `req.userId` from the `likes` array of a post. It uses the `filter()` method to iterate over the
    `likes` array and return a new array that excludes the `req.userId`. The new array is then
    assigned back to the `likes` property of the `post` object. This is likely used to keep track of
    which users have liked a particular post and to allow users to unlike a post if they change
    their mind. */
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }

  /* `const likedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, {
  new: true });` is updating a post in the database with the given `id` by incrementing the
  `likeCount` property by 1. It uses the `findByIdAndUpdate()` method provided by Mongoose to find a
  post with the given `id` and update it with the new `likeCount` value. The `{ new: true }` option
  is used to return the updated post after it has been updated in the database. The updated post is
  then stored in the `likedPost` constant variable. */
  const likedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

  res.json(likedPost);
}