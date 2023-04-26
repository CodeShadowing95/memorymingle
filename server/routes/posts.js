import express from 'express';

import { getPosts } from '../controllers/posts.js';

/* This creates a new instance of an Express router. This router can
be used to define routes for handling HTTP requests. */
const router = express.Router();

router.get('/', getPosts);

export default router;