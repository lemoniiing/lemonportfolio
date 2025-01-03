// // Import Express and other helpers
// const express = require('express');  // Framework to handle server requests
// const cors = require('cors');  // Allows server to communicate with other websites

// const app = express();  // Set up app
// const PORT = 3000;  // Choose port to run server on

// // Set up middlewares
// app.use(cors());  // Let server talk to other sites
// app.use(express.json());  // Make sure server can read data sent as JSON
// app.use(express.static('public')); // Serve files like images and styles from 'public' folder

// // Store feedback temporarily in memory
// let feedbacks = [];

// // When someone submits feedback form
// app.post('/submit-feedback', (req, res) => {
//   const { name, email, feedback } = req.body;  // Get feedback details from form

//   // Add feedback to temporary storage
//   feedbacks.push({ name, email, feedback });

//   console.log('Feedback received:', { name, email, feedback }); // Log feedback to console

//   // Send thank-you message back to user
//   res.json({ message: 'Thank you for your feedback!' });
// });

// // When asking for all feedbacks
// app.get('/feedback', (req, res) => {
//   res.status(200).json(feedbacks); // Send stored feedback to user
// });

// // Start server
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);  // Message when server is running
// });

// Import Express and other helpers
const express = require('express');  // Framework to handle server requests
const cors = require('cors');  // Allows server to communicate with other websites
const { MongoClient } = require('mongodb'); // MongoDB client for database operations

const app = express();  // Set up app
const PORT = 3000;  // Choose port to run server on

// Set up middlewares
app.use(cors());  // Let server talk to other sites
app.use(express.json());  // Make sure server can read data sent as JSON
app.use(express.static('public')); // Serve files like images and styles from 'public' folder

// MongoDB setup
const uri = 'mongodb+srv://lemoniiing:ashleymongodb@cluster1.3m2bo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1';
const client = new MongoClient(uri);
const dbName = 'feedback';
const feedbackCollection = 'form';

// Function to connect to MongoDB
async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB!');
    return client.db(dbName).collection(feedbackCollection);
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
}

// Handle feedback form submission
app.post('/submit-feedback', async (req, res) => {
  const { name, email, feedback } = req.body;  // Get feedback details from form

  try {
    const collection = await connectToDatabase();
    await collection.insertOne({ name, email, feedback, timestamp: new Date() }); // Save to MongoDB
    console.log('Feedback saved:', { name, email, feedback });

    // Send thank-you message back to user
    res.json({ message: 'Thank you for your feedback!' });
  } catch (error) {
    console.error('Error saving feedback:', error);
    res.status(500).json({ message: 'Failed to save feedback. Please try again later.' });
  }
});

// Retrieve all feedbacks
app.get('/feedback', async (req, res) => {
  try {
    const collection = await connectToDatabase();
    const feedbacks = await collection.find().toArray(); // Get all feedback from MongoDB
    res.status(200).json(feedbacks); // Send feedbacks to user
  } catch (error) {
    console.error('Error retrieving feedbacks:', error);
    res.status(500).json({ message: 'Failed to retrieve feedbacks. Please try again later.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);  // Message when server is running
});
