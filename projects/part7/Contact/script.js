function menuFunction() {
    var menu = document.getElementById("nav");
    if (menu.style.display === "block") {
      menu.style.display = "none";
    } else {
      menu.style.display = "block";
    }
}
document.getElementById('contactForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const formData = new FormData(this);
  const formFeedback = document.getElementById('formFeedback');

  fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    body: formData,
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      formFeedback.textContent = 'Your message has been sent successfully!';
      formFeedback.style.color = 'green';
      this.reset(); // Reset the form fields
    } else {
      formFeedback.textContent = 'There was an issue sending your message. Please try again.';
      formFeedback.style.color = 'red';
    }
  })
  .catch(error => {
    formFeedback.textContent = 'An error occurred. Please try again.';
    formFeedback.style.color = 'red';
  });
});
