app.post('/register', (req, res) => {
  const { username, password } = req.body;
  // Simulate user registration
  res.send(`User ${username} registered successfully.`);
});
