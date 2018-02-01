var mysql = require('mysql');

//新建连接对象：
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '@Lin19638109',
    database: 'test',
    port: '3306'
});
//创建/关闭连接，如果失败，回调的err为真:
connection.connect((err)=> {

});

//插入数据库
var userAddSql = 'update user set pwd=555 where uname=aaa';
var param = [1,'111','111'];
connection.query(userAddSql,param,(err,rs)=>{
    if(err){
        console.log('insert err:',err.message);
        return;
    }
    console.log('insert success');
});
//执行查询
connection.query('SELECT * from user',(err,rs)=>{
    if(err){
        console.log('[query] - :' + err);
        return;
    }
    rs.forEach((item,index)=>{
        console.log('the solution is:',item.uname);
    });
});


connection.end((err)=> {

});



