const http = require('http');
const url = require('url');
const router = require('./router');
const optfile = require('./model/optfile');


http.createServer((req,res)=>{
    const callback = (data)=>{
        res.writeHead(200,{'Content-Type':'text/plain;charset=utf-8'});
        res.write(data);
        res.end();
    };
    let pathname;

    if(req.url !== '/favicon.ico'){
        pathname = url.parse(req.url).pathname;
        pathname = pathname.replace(/\//,'');
        router[pathname](req,res,callback);
    }
}).listen(8000);