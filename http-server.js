const express = require('express');
const path = require('path');
const app = express();
const port = 8080;

app.use(express.static('dist'));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(port, () => console.log(`http server is running on port ${port}!`));