const http = require('http');
const UserBean = require('./model/UserBean');

http.createServer((req,res)=>{
    let user;
    res.writeHead(200,{
        'Content-Type':'text/html;charset=utf-8'
    });
    if(req.url !== './favicon.ico'){
        user = new UserBean();
        user.eventEmit.once('register',(uname,pwd)=>{
            res.write('register success');
            res.write('用户名：' + uname);
            res.write('密码：' + pwd);
            console.log('传来了用户名：' + uname);
            console.log('传来了密码：' + pwd);
            res.end();
        });
        user.register(res,req);
    }
}).listen(8000);