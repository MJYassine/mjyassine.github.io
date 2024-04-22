function menuFunction() {
    var menu = document.getElementById("nav");
    if (menu.style.display === "block") {
      menu.style.display = "none";
    } else {
      menu.style.display = "block";
    }
}

  document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('contactForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(this);
        
        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showModal('Your message has been sent successfully!');
                this.reset(); // Reset the form fields
            } else {
                showModal('There was an issue sending your message. Please try again.');
            }
        })
        .catch(error => {
            showModal('An error occurred. Please try again.');
        });
    });

    function showModal(message) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        const messageBox = document.createElement('div');
        messageBox.className = 'messageBox';
        messageBox.textContent = message;
        modal.appendChild(messageBox);
        document.body.appendChild(modal);
        setTimeout(function() {
            document.body.removeChild(modal);
        }, 3000);
    }
});
