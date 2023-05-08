const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  let filePath = '';

  switch (req.url) {
    case '/':
    case '/hero_musiqBoard.html':
      filePath = path.join(__dirname, 'hero_musiqBoard.html');
      res.setHeader('Content-Type', 'text/html');
      break;
    case '/style1.css':
      filePath = path.join(__dirname, 'style1.css');
      res.setHeader('Content-Type', 'text/css');
      break;
    case '/hero_musiqBoard.js':
      filePath = path.join(__dirname, 'hero_musiqBoard.js');
      res.setHeader('Content-Type', 'text/javascript');
      break;
    case '/qfLogo.png':
      filePath = path.join(__dirname, 'qfLogo.png');
      res.setHeader('Content-Type', 'image/png');
      break;
    case '/newBoardData.json':
      filePath = path.join(__dirname, 'newBoardData.json');
      res.setHeader('Content-Type', 'application/json');
      break;
    default:
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal server error');
    } else {
      res.writeHead(200);
      res.end(data);
    }
  });
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
