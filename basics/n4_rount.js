const http = require('http');
const url = require('url');
const router = require('./router');


http.createServer((req,res)=>{
    let pathname;
    const callback = (data)=>{
        res.write(data);
        res.end();
    };

    res.writeHead(200,{'Content-Type':'text-html;charset=utf-8'});
    if(req.url !== '/favicon.ico'){
        pathname = url.parse(req.url).pathname;
        pathname = pathname.replace(/\//,'');
        router[pathname](req,res,callback);
    }
}).listen(8000);
