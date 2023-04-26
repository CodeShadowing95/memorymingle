import express from 'express';

/* This creates a new instance of an Express router. This router can
be used to define routes for handling HTTP requests. */
const router = express.Router();

router.get('/', (req, res) => {
  res.send('It works!!!');
});

export default router;