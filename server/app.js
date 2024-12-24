const express = require('express');
const path = require('path');
const app = express();

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));

// Route to fetch IQ comparison data
app.get('/api/compare', (req, res) => {
  const highIQPeople = require('./data/iq_people.json');
  res.json(highIQPeople);
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
