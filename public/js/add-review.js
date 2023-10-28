const addReview = document.getElementById('add-review');

const handleReviewMovie = async (e) => {
  e.preventDefault();

  const movie_id = document.querySelector('.movie-id').value;
  console.log(movie_id);

  const review = document.querySelector('.review').value.trim();
  try {
    const add_review = await fetch('/api/review', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ review, movie_id }),
    });

    review.value = ' ';

    const response = await add_review.json();
    if (response !== 200) {
      alert(response.message);
      location.reload();
    }
  } catch (error) {
    alert(error.message);
  }
};

addReview.addEventListener('submit', handleReviewMovie);
