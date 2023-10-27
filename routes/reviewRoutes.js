import { createReview } from '../controllers/reviewController.js';

import express from 'express';
const review = express.Router();

review.route('/').post(createReview);

export default review;
