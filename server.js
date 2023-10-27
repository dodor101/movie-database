import express, { urlencoded } from 'express';
import dotEnv from 'dotenv';
import db from './config/connection.js';
const PORT = process.env.PORT || 3001;
dotEnv.config();
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// POST movie
app.post('/movie', async (req, res) => {
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
    });

    res.status(200).json({ successMsg: 'Move created successfully!!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET all movies
app.get('/movie', async (req, res) => {
  try {
    const query = `SELECT * FROM movies`;

    db.query(query, (error, data) => {
      if (error) {
        console.log(error);
      }
      res.status(200).json(data);
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get movies by ID
app.get('/movie/:movie_id', async (req, res) => {
  try {
    const movie_id = req.params.movie_id;
    const query = `SELECT * FROM movies WHERE movie_id = ?`;

    db.query(query, [movie_id], (error, data) => {
      if (error) {
        console.log(error);
      }
      res.status(200).json(data);
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE movie
app.put('/movie/:movie_id', async (req, res) => {
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
});

// DELETE movies
app.delete('/movie/:movie_id', async (req, res) => {
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
});

app.post('/reviews', async (req, res) => {
  try {
    const movie_id = req.body.movie_id;
    const review = req.body.review;
    if (!movie_id || !review) {
      res.status(400).json({ error: 'Invalid request' });
    }
    const query = `INSERT INTO reviews (review, movie_id) VALUES (?,?)`;

    db.query(query, [review, movie_id], (error, data) => {
      if (error) {
        return res.status(400).json({ error: error.message });
      } else if (!data.affectedRows) {
        return res.status(404).json({ message: 'No such movie' });
      }

      res.status(200).json({ message: 'Review added successfully!!' });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`App running at http://localhost:/${PORT}`);
});
