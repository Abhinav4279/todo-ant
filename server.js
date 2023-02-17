const express = require('express');
const http = require('http');
const path = require('path');

const app = express();
const server = http.createServer(app);

app.use(express.static('build'));
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
})

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));