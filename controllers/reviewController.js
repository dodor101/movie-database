import db from '../config/connection.js';

const createReview = async (req, res) => {
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
};
export { createReview };
