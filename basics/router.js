const optfile = require('./model/optfile');
const url = require('url');
const querystring = require('querystring');
const OptPool = require('./model/OptPool');
const optPool = new OptPool();
const pool = optPool.getPool();

function login(req, res) {
    const rdata = url.parse(req.url,true).query;
    let postdata = '';
    let arr = ['email','pwd'];
    const setMySQL=(data)=>{
        let userAddSql = '';
        let param = [];
        pool.getConnection((err,conn)=>{
            userAddSql = 'insert into user (uname,pwd) values(?,?)';
            param = [postdata.email,postdata.pwd];
            conn.query(userAddSql,param,(err,rs)=>{
                if(err){
                    console.log('insert err:',err.message);
                    return;
                }
                console.log('insert success');
                conn.release(); //放回连接池
            });
        });
    };
    const callback = (data)=>{
        let dataStr = data.toString();
        setMySQL(postdata);
        arr.forEach((item,index)=>{
            let reg = new RegExp('{'+ arr[index] + '}','g');
            dataStr = dataStr.replace(reg,postdata[item]);
        });

        res.write(dataStr);
        res.end();
    };


    if(rdata.email !== undefined){
        optfile.readfild('./views/login.html', callback);
    } else {
        req.on('data',(chunk)=>{
            postdata += chunk;
        });
        req.on('end',()=>{
            postdata = querystring.parse(postdata);

            optfile.readfild('./views/login.html', callback);
        });
    }
}

function register(req, res, callback) {
    optfile.readfild('./views/register.html', callback);
}

function writefile(req, res, callback) {

    optfile.writefile('./views/register.txt', 'write in', callback);
}

function showimg(req, res) {
    function callback(data){
        res.writeHead(200,{'Content-Type':'image/jpeg'});
        res.write(data,'binary');
        res.end();
    };
    optfile.readImg('./images/pig.png', callback);
}

module.exports = {
    login,
    register,
    writefile,
    showimg};