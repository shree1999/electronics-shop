const { app, PORT } = require('./server');

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
