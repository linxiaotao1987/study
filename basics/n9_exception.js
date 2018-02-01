const http = require('http');
const url = require('url');
const router = require('./router');
const exception = require('./model/Exception');


http.createServer((req,res)=>{
    let pathname;
    const callback = (data)=>{
        res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
        res.write(data);
        res.end();
    };


    if(req.url !== '/favicon.ico'){
        pathname = url.parse(req.url).pathname;
        pathname = pathname.replace(/\//,'');
        try{
            router[pathname](req,res,callback);
        } catch (err) {
            console.log('my error:' + err);
            res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
            res.write(err.toString());
            res.end();
        }
    }
}).listen(8000);