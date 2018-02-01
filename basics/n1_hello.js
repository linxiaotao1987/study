
const http = require('http');
// import http from 'http';
http.createServer((req,res)=>{
    res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
    if(req.url !== '/favicon.ico'){
        console.log('fangwen');
        res.write('hello');
        res.end('end');
    }
}).listen(8000);

console.log('success');