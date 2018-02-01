const http = require('http');
const otherfun = require('./model/otherfuns');

http.createServer((req, res)=> {
    res.writeHead(200, {'Content-Type': 'text/html;chat-set=utf-8'});
    if (req.url !== '/favicon.ico') {
        fun1(res);
        otherfun['fun2'](res);
        res.end();
    }
}).listen(8000);

const fun1 = (res)=> {
    console.log('fun1');
    res.write('i am fun1')
};