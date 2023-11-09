const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    let filePath;

    if (req.url === '/') {
        filePath = path.join(__dirname, 'loading.html');
    } else if (req.url === '/first.html' || req.url === '/internship.html') {
        filePath = path.join(__dirname, req.url.substring(1));
    } else if (req.url === '/images/imp.png') {
        filePath = path.join(__dirname, 'images', 'imp.png');
    }

    if (filePath) {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end('File not found');
            } else {
                let contentType = 'text/html';
                if (filePath.endsWith('.png')) {
                    contentType = 'image/png';
                }

                res.writeHead(200, { 'Content-Type': contentType });
                res.end(data);
            }
        });
    } else {
        res.writeHead(404);
        res.end('Route not found');
    }
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000/');
});
