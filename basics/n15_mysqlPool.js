var OptPool = require('./model/OptPool');

var optPool = new OptPool();

var pool = optPool.getPool();

pool.getConnection((err,conn)=>{
    //插入数据库
    var userAddSql = 'update user set pwd=555 where uid=5';
    var param = [1,'111','111'];
    conn.query(userAddSql,param,(err,rs)=>{
        if(err){
            console.log('insert err:',err.message);
            return;
        }
        console.log('insert success');
    });
    //执行查询
    conn.query('SELECT * from user',(err,rs)=>{
        if(err){
            console.log('[query] - :' + err);
            return;
        }
        rs.forEach((item,index)=>{
            console.log('the solution is:',item.uname);
        });
        conn.release(); //放回连接池
    });
});