const deleteBtn = document.querySelector('.delete_btn');
const handleDeleteMovie = async (e) => {
  const movie_id = e.target.dataset.movie_id;

  try {
    const deleteMovie = await fetch(`/api/movie/${movie_id}`, {
      method: 'DELETE',
    });

    const response = await deleteMovie.json();

    if (response.serverStatus === 200) {
      alert('Deleted successfully!');
    }
    location.replace('/api/movie');
  } catch (error) {
    alert(error.message);
  }
};

deleteBtn.addEventListener('click', handleDeleteMovie);
