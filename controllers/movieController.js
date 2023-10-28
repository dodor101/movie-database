// POST movie
import db from '../config/connection.js';
import review from '../routes/reviewRoutes.js';

const createMovie = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json('You must enter a movie name');
    }

    const { movie_name } = await req.body;
    const query = `INSERT INTO movies (movie_name) VALUES (?)`;

    const createMovie = db.query(query, [movie_name], (error) => {
      if (error) {
        console.log(error);
      }
      res.status(200).json({ successMsg: 'Movie created successfully!!' });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET all movies
const getAllMovies = async (req, res) => {
  try {
    const query = `SELECT * FROM movies`;

    db.query(query, (error, movies) => {
      if (error) {
        console.log(error);
      }
      res.render('homepage', { movies });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getSingleMovie = async (req, res) => {
  try {
    const movie_id = req.params.movie_id;
    const moviesArr = {
      movies: null,
      reviews: null,
    };

    const query = `SELECT * FROM movies WHERE movie_id = ?;`;
    const query2 = `SELECT * FROM reviews WHERE movie_id = ?;`;

    // Fetch reviews
    const reviews = await new Promise((resolve, reject) => {
      db.query(query2, [movie_id], (error, reviews) => {
        if (error) {
          reject(error);
        }
        resolve(reviews);
      });
    });

    moviesArr.reviews = reviews;
    // Adding reviews to moviesArr

    // Fetch movie details
    const movies = await new Promise((resolve, reject) => {
      db.query(query, [movie_id], (error, movies) => {
        if (error) {
          reject(error);
        }
        resolve(movies);
      });
    });

    moviesArr.movies = movies; // Adding movie details to moviesArr

    // Check if moviesArr contains the merged data
    console.log(moviesArr);
    // Render the view with the data
    res.render('singleMovie', { moviesArr });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// // Get movies by ID
// const getSingleMovie = async (req, res) => {
//   try {
//     const movie_id = req.params.movie_id;

//     const moviesArr = [];

//     const query = `SELECT * FROM movies WHERE movie_id = ?;`;
//     const query2 = `SELECT * FROM reviews WHERE movie_id = ?;`;

//     db.query(query2, [movie_id],  (error, reviews) => {
//       if (error) {
//         console.log(error);
//       }

//        moviesArr?.push(reviews);

//       console.log(moviesArr);
//     });

//     db.query(query, [movie_id],  (error, movies) => {
//       if (error) {
//         console.log(error);
//       }

//         moviesArr?.push(movies);

//       console.log(moviesArr);
//     });

//     console.log(moviesArr);

//     res.render('singleMovie', {});
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// UPDATE movie
const updateMovie = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json('You must enter a movie name');
    }
    const movie_name = req.body.movie_name;
    const movie_id = req.params.movie_id;
    const query = `UPDATE movies SET movie_name = ? WHERE movie_id = ?`;

    db.query(query, [movie_name, movie_id], (error, data) => {
      if (error) {
        console.log(error);
      }
      res.status(200).json(data);
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE movies
const deleteMovie = async (req, res) => {
  try {
    const movie_id = req.params.movie_id;

    if (!movie_id) {
      return res.status(400).json('No movie id provided');
    }

    const query = `DELETE FROM movies WHERE movie_id = ?`;

    db.query(query, [movie_id], (error, data) => {
      if (error) {
        res.statusMessage(400).json({ error: error.message });
      }
      res.status(200).json(data);
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export { createMovie, getAllMovies, getSingleMovie, updateMovie, deleteMovie };
