var mysql = require('mysql');

function OptPool(){
    this.flag=true;
    //新建连接对象：
    this.pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: '@Lin19638109',
        database: 'test',
        port: '3306'
    });

    this.getPool = function(){
        if(this.flag){
            this.pool.on('connection',(connection)=>{
                connection.query('set session auto_increment_increment=1');
                this.flag=false;
            });
        }
        return this.pool;
    };
}

module.exports = OptPool;




