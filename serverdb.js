const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

// Initialize Express app
const app = express();
const PORT = 3001;

// Use CORS middleware to allow cross-origin requests
app.use(cors());

// Middleware to parse JSON and form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Create SQLite database (or open it if it exists)
const db = new sqlite3.Database('feedback.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
    // Create table if it doesn't exist
    db.run(
      `CREATE TABLE IF NOT EXISTS feedback (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        message TEXT NOT NULL,
        submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      (err) => {
        if (err) console.error('Error creating table:', err.message);
      }
    );
  }
});

// Route for handling feedback form submission
app.post('/submit-feedback', (req, res) => {
  const { name, email, feedback } = req.body;

  console.log('Received data:', { name, email, feedback });

  if (!name || !email || !feedback) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const sql = `INSERT INTO feedback (name, email, message) VALUES (?, ?, ?)`;
  db.run(sql, [name, email, feedback], function (err) {
    if (err) {
      console.error('Error inserting feedback:', err.message);
      return res.status(500).json({ error: 'An error occurred while saving feedback.' });
    }

    res.status(200).json({ message: 'Feedback submitted successfully!' });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
