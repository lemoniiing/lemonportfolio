window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY;
  
  // Fade-out scroll effect for "Welcome"
  const homeSection = document.getElementById('home');
  const welcomeText = document.querySelector('.welcome-text');
  const homeHeight = homeSection.offsetHeight;
  let opacity = 1 - scrollPosition / (homeHeight / 2);
  if (opacity < 0) opacity = 0; // Ensure opacity doesn't go negative
  welcomeText.style.opacity = opacity.toFixed(2);

  // Scroll animation for lemon images
  const leftLemon = document.querySelector('.lemon-half.left');
  const rightLemon = document.querySelector('.lemon-half.right');
  leftLemon.style.transform = `translateX(-${scrollPosition * 0.5}px)`;
  rightLemon.style.transform = `translateX(${scrollPosition * 0.5}px)`;
});

// Smooth scroll to sections
document.querySelectorAll('header nav ul li a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);

    targetSection.scrollIntoView({
      behavior: 'smooth',
    });
  });
});

// Smooth scroll to top when logo is clicked
document.getElementById('logo').addEventListener('click', function () {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});

// Feedback form
document.getElementById('feedback-form').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent page from reloading

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const feedback = document.getElementById('feedback').value;

    // Send the feedback data to the server
    fetch('http://localhost:3001/submit-feedback', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            email: email,
            feedback: feedback
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Feedback submitted:', data);
        alert(`Thank you for your feedback, ${name}!`);

        // Clear form after submission
        document.getElementById('feedback-form').reset();  // Clear form fields
    })
    .catch(error => console.error('Error:', error));
});