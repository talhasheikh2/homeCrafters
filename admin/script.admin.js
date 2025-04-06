// Select the form and feedback message element
const productForm = document.getElementById('productForm');
const feedbackMessage = document.getElementById('feedbackMessage');

// Handle form submission
productForm.addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent form reload

  // Get form data
  const formData = new FormData(productForm);

  // Clear feedback message
  feedbackMessage.textContent = '';
  feedbackMessage.classList.remove('text-success', 'text-error');

  try {
    // Send data to the server
    const response = await fetch('http://localhost:8000/api/products', {
      method: 'POST',
      body: formData, // Send formData directly
    });

    if (response.ok) {
      // Success feedback
      feedbackMessage.textContent = 'Product added successfully!';
      feedbackMessage.classList.add('text-success');
      productForm.reset(); // Reset the form
    } else {
      // Error feedback
      const errorData = await response.json();
      feedbackMessage.textContent = errorData.message || 'Failed to add product.';
      feedbackMessage.classList.add('text-error');
    }
  } catch (error) {
    // Handle network errors
    console.error('Error:', error);
    feedbackMessage.textContent = 'An error occurred. Please try again.';
    feedbackMessage.classList.add('text-error');
  }
});
