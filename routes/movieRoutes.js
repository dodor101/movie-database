import { createMovie, getAllMovies, getSingleMovie, updateMovie, deleteMovie } from '../controllers/movieController.js';

import express from 'express';
const movie = express.Router();
movie.route('/').post(createMovie).get(getAllMovies);
movie.route('/:movie_id').get(getSingleMovie).put(updateMovie).delete(deleteMovie);

export default movie;
