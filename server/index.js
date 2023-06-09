import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

/* This is creating an instance of the Express application. This instance will be
used to define the routes and middleware for the application. */
const app = express();

dotenv.config();

/* `app.use(bodyParser.json({ limit: "30mb", extended: true }));` is setting up middleware for the
Express application to parse incoming JSON data. The `bodyParser.json()` middleware parses the JSON
data in the request body and makes it available in `req.body` of the route handler. The `limit`
option specifies the maximum size of the JSON payload that can be accepted, and the `extended`
option allows for parsing of nested objects. */
app.use(bodyParser.json({ limit: "30mb", extended: true }));
/* `app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));` is setting up middleware for
the Express application to parse incoming URL-encoded data. The `bodyParser.urlencoded()` middleware
parses the URL-encoded data in the request body and makes it available in `req.body` of the route
handler. The `limit` option specifies the maximum size of the payload that can be accepted, and the
`extended` option allows for parsing of nested objects. */
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
/* `app.use(cors());` is setting up middleware for the Express application to enable Cross-Origin
Resource Sharing (CORS). CORS is a security feature implemented by web browsers that restricts web
pages from making requests to a different domain than the one that served the web page. By using
`cors()` middleware, the Express application is allowing requests from any domain to access its
resources. This is useful when building APIs that need to be accessed by clients from different
domains. */
app.use(cors());

/* It sets up a route for the Express application. It is telling
the application to use the `postRoutes` middleware for any requests that start with the `/posts`
path. This means that any requests to the `/posts` path will be handled by the `postRoutes`
middleware, which is defined in the `./routes/posts` file. */
app.use('/posts', postRoutes);
app.use('/user', userRoutes);

// Connect the server application with the real database
const PORT = process.env.PORT || 5000;

/* This code is connecting the Express server application to a MongoDB database using Mongoose. It is
using the `mongoose.connect()` method to establish a connection to the database using the
`CONNECTION_URL` variable. Once the connection is established, it is starting the server application
by calling the `app.listen()` method and passing in the `PORT` variable. If there is an error in
establishing the connection, it is being caught and logged to the console. */
mongoose.connect(process.env.CONNECTION_URL)
.then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
.catch((error) => console.log(error.message));