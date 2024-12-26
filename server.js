// Import necessary modules
const express = require('express');  // Express web framework
const bodyParser = require('body-parser');  // To parse incoming request bodies
const cors = require('cors');  // For cross-origin resource sharing

const app = express();  // Create an Express app
const PORT = 3000;  // Set port for the server

// Middleware
app.use(cors());  // Allow cross-origin requests
app.use(bodyParser.json());  // Parse JSON bodies for POST requests
app.use(express.static('public')); // Serve static files from the 'public' folder

// Temporary in-memory storage for feedbacks
let feedbacks = [];

// Route: Handle feedback form submission
app.post('/submit-feedback', (req, res) => {
const { name, email, feedback } = req.body;  // Get data from the feedback form
  
// Log the received data to ensure feedback is being passed
console.log('Feedback received:', { name, email, feedback });

// Store feedback in the temporary array
feedbacks.push({ name, email, feedback });

// Send a response back to the user
res.send({ message: 'Thank you for your feedback!' });
});
// Route: Get all feedbacks
app.get('/feedback', (req, res) => {
  res.status(200).json(feedbacks); // Return the stored feedback as a JSON response
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
