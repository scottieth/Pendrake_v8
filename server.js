const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 1337;

function serveStaticFile(response, filePath) {
  let contentType = '';
  const extension = path.extname(filePath);

  switch (extension) {
    case '.html':
      contentType = 'text/html';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.jpg':
      contentType = 'image/jpeg';
      break;
    default:
      contentType = 'application/octet-stream';
      break;
  }

  fs.readFile(filePath, function(err, data) {
    if (err) {
      if (err.code === 'ENOENT') { // File not found error
        serveStaticFile(response, path.join(__dirname, 'public', '404.html'));
      } else { // Internal server error
        response.writeHead(500, {'Content-Type': 'text/plain'});
        response.end('Internal Server Error');
      }
    } else { // File found
      response.writeHead(200, {'Content-Type': contentType});
      response.end(data);
    }
  });
}

const server = http.createServer(function(request, response) {
  let url = request.url.toLowerCase().split('?')[0];

  if (url === '/') {
    url = '/home.html';
  }

  const filePath = path.join(__dirname, 'public', url);

  serveStaticFile(response, filePath);
});

server.listen(port);

console.log(`Server running at http://localhost:${port}/`);
