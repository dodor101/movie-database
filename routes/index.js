import movieRouter from './movieRoutes.js';
import reviewRouter from './reviewRoutes.js';

import express from 'express';
const router = express.Router();

router.use('/movie', movieRouter);

router.use('/review', reviewRouter);

// Default response for any other request (Not Found)
router.use((req, res) => {
  res.status(404).end();
});

export default router;
