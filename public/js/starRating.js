document.addEventListener('DOMContentLoaded', function () {
  const stars = document.querySelectorAll('.star');
  const ratingInput = document.getElementById('rating-input');
  let selectedRating = 4;

  // Set the initial value of the hidden input
  ratingInput.value = selectedRating;

  // Highlight stars based on the default rating when the page loads
  highlightStars(selectedRating);

  stars.forEach((star) => {
    star.addEventListener('click', () => {
      const value = star.getAttribute('data-value');
      selectedRating = value;
      ratingInput.value = selectedRating; // Set the value of the hidden input
      highlightStars(value);
    });

    star.addEventListener('mouseover', () => {
      const value = star.getAttribute('data-value');
      highlightStars(value);
    });

    star.addEventListener('mouseout', () => {
      resetStars();
      highlightStars(selectedRating);
    });
  });

  function resetStars() {
    stars.forEach((star) => {
      star.classList.remove('active');
    });
  }

  function highlightStars(value) {
    stars.forEach((star, index) => {
      star.classList.toggle('active', index < value);
    });
  }
})();
