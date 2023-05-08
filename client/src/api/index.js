import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

/* This code is creating an Axios interceptor that adds an Authorization header to every outgoing
request if there is a valid user token stored in the browser's localStorage. The header value is set
to "Bearer" followed by the user token. This is a common way to authenticate requests to a server
that requires authentication. */
API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

/**
 * The function `fetchPosts` uses Axios to make a GET request to a specified URL.
 */
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
/**
 * This function sends a POST request to a specified URL with a new post as the payload.
 * @param newPost - The `newPost` parameter is an object that represents the data for a new post that
 * will be created. It likely contains properties such as `title`, `content`, `author`, and `date`.
 * This object will be sent as the request body in the POST request to the specified `url`.
 */
export const createPost = (newPost) => API.post('/posts', newPost);
/**
 * The function updates a post with a given ID using a PATCH request.
 * @param id - The id parameter is the unique identifier of the post that needs to be updated. It is
 * used to specify which post to update in the API endpoint.
 * @param updatedPost - The `updatedPost` parameter is an object that contains the updated data for a
 * specific post. This object will be sent to the server to update the post with the corresponding
 * `id`.
 */
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
/**
 * This function uses Axios to send a DELETE request to a specified URL with a given ID to delete a
 * post.
 * @param id - The `id` parameter is a unique identifier for a post that needs to be deleted. It is
 * used in the URL to specify which post should be deleted.
 */
export const deletePost = (id) => API.delete(`/posts/${id}`);
/**
 * This function sends a PATCH request to like a post with a specific ID using Axios in JavaScript.
 * @param id - The `id` parameter is a unique identifier for a post that is being liked. It is used in
 * the URL to make a PATCH request to the server to update the like count for that specific post.
 */
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

export const signin = (formData) => API.post('/user/signin', formData);
export const signup = (formData) => API.post('/user/signup', formData);