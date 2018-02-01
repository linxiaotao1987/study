const http = require('http');
const url = require('url');
const router = require('./router');
const optfile = require('./model/optfile');


http.createServer((req,res)=>{
    const callback = (data)=>{
        res.write(data);
        res.end();
    };
    let pathname;

    res.writeHead(200,{'Content-Type':'text-html;charset=utf-8'});

    if(req.url !== '/favicon.ico'){
        pathname = url.parse(req.url).pathname;
        pathname = pathname.replace(/\//,'');
        router[pathname](req,res,callback);
    }
}).listen(8000);