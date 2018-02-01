const connPool = require('./ConnPool');
const async = require('async');
module.exports={ 
    ask:(req,res)=>{
        const loginbean = req.session.loginbean;
        const pool = connPool();
        pool.getConnection((err,conn)=>{
            const {
                title,
                typeid,
                content,
                subflag
            } = req.body;

            let sentence,params,countSQL; 

            if(err){
                res.send('连接数据库错误,错误原因：' + err.message);
                return;
            }

            sentence = 'insert into question(title,typeid,content,uid,createtime) values(?,?,?,?,current_timestamp)';
            params = [title,typeid,content,loginbean.id];
            conn.query(sentence,params,(err,rs)=>{
                if(err){
                    res.send('写入数据库错误，错误原因：'+err.message);
                    return;
                }      
                res.redirect('../');
            });
            conn.release();
        });
    },
    questionList:(req,res,loginbean)=>{
        let pool = connPool();
        pool.getConnection((err,conn)=>{
            let currentPage = parseInt(req.query['page']) || 1;
            let pointSize = 2;
            let pointStart = 0;
            let listCount = 0;
            let pageCount = 0;
            let userSql = 'select qid,title,looknum,renum,finished,updtime,createtime from question order by qid desc limit ?,?',
                countSQL = 'select count(*) as count from question;',
                param;

            if(err){
                console.log('操作数据库错误' + err.message);
                return;
            };
            //由于要查询两边数据库，使用异步流程控制回调。执行串联的两步操作，完成后调用回调函数
            async.series({
                count:(callback)=>{
                    conn.query(countSQL,[],(err,rs)=>{

                        listCount = rs[0]['count'];
                        pageCount = Math.ceil(listCount / pointSize);

                        callback(null,listCount);
                    });
                },
                questionList:(callback)=>{
                    if(currentPage <= 0){
                        currentPage = 1;
                    }
                    if(currentPage > pageCount){
                        currentPage = pageCount;
                    }

                    pointStart = (currentPage - 1) * pointSize;
                    param = [pointStart,pointSize];

                    conn.query(userSql,param,(err,rs)=>{                        
                        callback(null,rs);                        
                    });
                }
            },(err,results)=>{
                const {
                    count,
                    questionList
                } = results;

                //将查询到的问题列表带出去
                res.render('index', {
                    loginbean: loginbean,
                    questionList:questionList,
                    pageCount:pageCount,
                    count:count,
                    currentPage:currentPage
                });

                conn.release();
            });


            
        });
    },
    detail:(req,res)=>{
        const qid = req.query['qid'];
        const SQLUpdate = 'update question set looknum = looknum + 1 where qid = ?';
        const SelectDetail = 'select qid,title,content,uid,looknum,renum,finished,updtime,createtime from question where qid = ?';
        let param;
        
        if(qid){
            param = [qid];

        } else {
            res.send('没传入qid');
        }
    }
}