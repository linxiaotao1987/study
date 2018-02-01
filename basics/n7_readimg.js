const http = require('http');
const optfile = require('./model/optfile');

http.createServer((req,res)=>{
    const callback = (file)=>{
        res.writeHead(200,{'Content-Type':'image/jpeg'});
        res.write(file,'binary');
        res.end();
    }
    if(req.url!=='/favicon.ico'){
        optfile.readImg('./images/pig.png',callback);
    }
}).listen(8000);