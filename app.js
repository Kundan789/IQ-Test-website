const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

// Serve static files from the same folder
app.use(express.static(__dirname));

// API endpoint to serve IQ comparison data
app.get('/api/compare', (req, res) => {
  const iqPeople = [
    { name: "Albert Einstein", iq: 160 },
    { name: "Nikola Tesla", iq: 180 },
    { name: "Marilyn vos Savant", iq: 228 }
  ];
  res.json(iqPeople);
});

// API endpoint to serve questions
app.get('/api/questions', (req, res) => {
  const questionsPath = path.join(__dirname, 'questions.json');
  
  // Read questions.json file
  fs.readFile(questionsPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading questions file:', err);
      res.status(500).json({ error: 'Unable to load questions.' });
    } else {
      try {
        const questions = JSON.parse(data);
        res.json(questions);
      } catch (parseError) {
        console.error('Error parsing questions file:', parseError);
        res.status(500).json({ error: 'Invalid questions file format.' });
      }
    }
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
