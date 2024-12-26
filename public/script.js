document.getElementById('feedback-form').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent the page from reloading when the form is submitted
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const feedback = document.getElementById('feedback').value;

    console.log("Feedback value:", feedback);  // Log the feedback value before sending it

    // Send the feedback data to the server
    fetch('http://localhost:3000/submit-feedback', {
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
    })
    .catch(error => console.error('Error:', error));
});
