const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('User service is running');
});

app.listen(3001, () => {
    console.log('User service is listening on port 3001');
});
