DROP DATABASE IF EXISTS movie_database;

CREATE DATABASE movie_database;


USE movie_database;

CREATE TABLE movies (
  movie_id INT PRIMARY KEY AUTO_INCREMENT,
  move_name VARCHAR(100) NOT NULL
);

CREATE TABLE reviews (
  reviews_id INT PRIMARY KEY AUTO_INCREMENT,
  movie_id INT,
  review TEXT,
  FOREIGN KEY(movie_id)
  REFERENCES movies(movie_id)
  ON DELETE CASCADE
);
