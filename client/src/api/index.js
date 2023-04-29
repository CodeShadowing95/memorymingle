import axios from 'axios';

const url = 'http://localhost:5000/posts';

/**
 * The function `fetchPosts` uses Axios to make a GET request to a specified URL.
 */
export const fetchPosts = () => axios.get(url);
/**
 * This function sends a POST request to a specified URL with a new post as the payload.
 * @param newPost - The `newPost` parameter is an object that represents the data for a new post that
 * will be created. It likely contains properties such as `title`, `content`, `author`, and `date`.
 * This object will be sent as the request body in the POST request to the specified `url`.
 */
export const createPost = (newPost) => axios.post(url, newPost);