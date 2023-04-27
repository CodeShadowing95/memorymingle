import axios from 'axios';

const url = 'http://localhost:5000/posts';

/**
 * The function fetches posts using the axios library.
 */
export const fetchPosts = () => axios.get(url);