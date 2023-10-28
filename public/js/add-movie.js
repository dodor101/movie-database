const addMovie = document.getElementById('add-movie');

const handleAddMovie = async (e) => {
  e.preventDefault();
  const movie_name = document.querySelector('.movie-name').value.trim();
  try {
    const add_Movie = await fetch('/api/movie', {
      method: 'POST',
      body: JSON.stringify({ movie_name }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    movie_name.value = ' ';

    const response = await add_Movie.json();
    if (response) {
      location.reload();
    }
  } catch (error) {
    alert(error.message);
  }
};

addMovie.addEventListener('submit', handleAddMovie);
