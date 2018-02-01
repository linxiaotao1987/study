const http = require('http');
const User = require('./model/User');
const Teacher = require('./model/Teacher');

http.createServer((req, res)=> {

    const teacher = new Teacher('dada','dadada','dadadada');
    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
    if (req.url !== '/favicon.ico') {
        teacher.enter();
        teacher.teach(res);
        res.end();
    }
}).listen(8000);

