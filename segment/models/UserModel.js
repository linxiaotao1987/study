const connPool = require('./ConnPool');
module.exports = {
    register: function (req, res) {
        const pool = connPool();
        pool.getConnection((err, conn) => {
            let sentence,
                param,
                errMessage,
                sendStr;
            const {email, pwd, name} = req.body;
            const setErrorStr = (msg)=>{
                let str = '<script>';
                if(msg.indexOf('emailuniq')>-1){
                    str += "alert('email 重复');";
                } else if(msg.indexOf('nameuniq')>-1){
                    str += "alert('name 重复');";
                } else {
                    str += "alert('数据库异常');";
                }
                str += "history.back();</script>";

                return str;
            };

            if (err) {
                res.send('数据库错误，错误原因：' + err.message);
                return;
            }
            sentence = 'insert into user(email,pwd,name,createtime) values(?,?,?,current_timestamp)';
            param = [email, pwd, name];
            conn.query(sentence, param, (err, rs) => {
                if (err) {
                    errMessage = err.message;
                    sendStr = setErrorStr(errMessage);
                    res.send(sendStr);
                } else {
                    // res.send("<script>alert('注册成功');history.back();</script>");
                    
                }
            })
            conn.release();
            res.redirect(307,'./login');
        });
    },
    login:function(req,res){
        let pool = connPool();
        pool.getConnection((err,conn)=>{
            let userSql = 'select uid,name from user where email=? and pwd=?',
            param=[req.body['email'],req.body['pwd']];
            if(err){
                console.log('连接数据库失败');
                res.send('连接数据库失败:' + err.message);
                return;
            }
            conn.query(userSql,param,(err,rs)=>{
                let loginbean = {};
                if(err){
                    console.log('操作数据库失败:' + err.message);
                    return;
                }
                console.log(rs);
                if(rs.length > 0){

                    loginbean.id = rs[0].uid;
                    loginbean.name = rs[0].name;
                    req.session.loginbean = loginbean; 

                    res.redirect('/');//跳回首页
                } else {
                    res.send('用户名/密码错误');
                }
                conn.release();
            });
        });
    }
};
