const mysql = require('mysql');




module.exports = (function(){   
    const pool = mysql.createPool({
        host:'localhost',
        user:'root',
        password:'@Lin19638109',
        database:'segment',
        port:'3306'
    });

    //被连接之后初始化连接池的自增长数为1
    pool.on('connection',(connection)=>{
        connection.query('set session auto_increment_increment=1');
    });

    return function(){
        return pool;
    };
})();