const editBtn = document.querySelector('#edit_btn');
const handleUpdateMovie = async (e) => {
  e.preventDefault();
  const movie_id = document.querySelector('.movie-id').value;

  const movie_name = document.querySelector('.movie-name').value.trim();

  try {
    const editMovie = await fetch(`/api/movie/${movie_id}`, {
      method: 'PUT',
      body: JSON.stringify({ movie_name }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = await editMovie.json();

    if (response.serverStatus === 200) {
      alert('Edited successfully!');
    }
    location.replace('/api/movie');
  } catch (error) {
    alert(error.message);
  }
};

editBtn.addEventListener('submit', handleUpdateMovie);
