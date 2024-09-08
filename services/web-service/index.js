const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Web service is running!');
});

app.listen(port, () => {
  console.log(`Web service is running on http://localhost:${port}`);
});
