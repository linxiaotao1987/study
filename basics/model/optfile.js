const fs = require('fs');



function readfildSync(path){
    var data = fs.readFileSync(path,'utf-8');
    console.log(data);
    console.log('sync ready');
}

function readfild(path,callback){
    fs.readFile(path,(err,data)=>{
        if(err){
            console.log('readfile error:' + err);
            callback('文件不存在')
        } else {
            callback(data);
        }
    });
}

function writefile(path,data,callback){
    fs.writeFile(path,data,(err)=>{
        if(err){
            throw err;
        }
        console.log('It\'s saved');
        callback('写入成功');
    })
}

function writeFileSync(path,data){
    fs.writeFileSync(path,data);
    console.log('同步写文件完成');
}

function readImg(path,callback){
    fs.readFile(path,'binary',(err,file)=>{
        if(err){
            console.log(err);
            return;
        } else {
            console.log('读取成功，输出图片');
            callback(file);
        }
    })
}

module.exports = {
    readfildSync,
    readfild,
    writefile,
    writeFileSync,
    readImg
};