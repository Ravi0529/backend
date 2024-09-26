const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    if(req.url === '/') {
        res.statusCode = 200;
        res.setHeader('Conetent-Type', 'text/plain');
        res.end("Welcome to Home page!");
    }
    else if(req.url === '/login') {
        res.statusCode = 200;
        res.setHeader('Conetent-Type', 'text/plain');
        res.end("Here's the login page!");
    }
    else {
        res.statusCode = 404;
        res.setHeader('Conetent-Type', 'text/plain');
        res.end("404 Not Found!");
    }
})

server.listen(port, hostname, () => {
    console.log(`server is listening at http://${hostname}:${port}`);
})