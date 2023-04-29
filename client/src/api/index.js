import axios from 'axios';

const url = 'http://localhost:5000/posts';

/**
 * The function `fetchPosts` uses Axios to make a GET request to a specified URL.
 */
export const fetchPosts = () => axios.get(url);