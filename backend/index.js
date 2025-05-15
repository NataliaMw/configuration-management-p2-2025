// Basic Express.js API setup
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

app.get('/users', (req, res) => {
res.send('Retrieve users endpoint');
});

// Start server
app.listen(PORT, () => {
console.log(`Server running on http://localhost:${PORT}`);
});