const async = require('async');

const fun1 = (done)=> {
    let count = 0;
    const fun1interval = setInterval(()=> {
        console.log('function one write' + new Date());
        count++;
        if (count === 3) {
            clearInterval(fun1interval);
            done(null, 'one 完毕');
        }
    }, 1000);
};
const fun2 = (done,preValue)=> {
    let count = 0;
    const fun2interval = setInterval(()=> {
        console.log(preValue + ':' + new Date());
        count++;
        if (count === 4) {
            clearInterval(fun2interval);
            done(null, 'two 完毕');
        }
    }, 1000);
};

async.waterfall(
    [
        (done)=> {
            fun1(done);
        },
        (preValue, done)=> {
            fun2(done,preValue);
        },
    ],
    (err, rs)=> {
        console.log(err);
        console.log(rs);
    }
);


console.log('main done');