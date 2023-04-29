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
/**
 * The function updates a post with a given ID using a PATCH request.
 * @param id - The id parameter is the unique identifier of the post that needs to be updated. It is
 * used to specify which post to update in the API endpoint.
 * @param updatedPost - The `updatedPost` parameter is an object that contains the updated data for a
 * specific post. This object will be sent to the server to update the post with the corresponding
 * `id`.
 */
export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);
/**
 * This function uses Axios to send a DELETE request to a specified URL with a given ID to delete a
 * post.
 * @param id - The `id` parameter is a unique identifier for a post that needs to be deleted. It is
 * used in the URL to specify which post should be deleted.
 */
export const deletePost = (id) => axios.delete(`${url}/${id}`);