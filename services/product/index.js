const express = require('express');
const app = express();
const PORT = 3000;

app.get('/products', (req, res) => {
  res.json([{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }]);
});

app.listen(PORT, () => {
  console.log(`Product service running on port ${PORT}`);
});
