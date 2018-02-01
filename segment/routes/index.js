var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');
var util = require('util');
var fs = require('fs');
var questionModel = require('../models/questionModel');

/* GET home page. */
router.get('/', function (req, res, next) {
  // res.send('hello index');
  const loginbean = req.session.loginbean;

  //如果首页被访问，去查数据库里的问题列表
  questionModel.questionList(req, res,loginbean);

  // res.render('index', {loginbean: loginbean});
});

router.get('/destroy', function (req, res, next) {
  req
    .session
    .destroy((err) => {
      res.redirect('/');
    });
});

router.post('/uploadImg', function (req, res) {
  var form = new multiparty.Form();
  //设置编码
  form.encoding = 'utf-8';
  //设置文件临时存储路径
  form.uploadDir = './uploadtemp/';
  //限制文件大小2m
  form.maxFilesSize = 2 * 1024 * 1024;
  //调用form的parse方法，将req当做参数传入：
  form.parse(req, (err, fields, files) => {
    const {filedata} = files;
    const imgData = filedata[0];
    const {
      originalFilename,
      path
    } = imgData;

    const timeStamp = new Date().getTime();    
    let newImgName = timeStamp + originalFilename;
    let newPath = './public/upload/' + newImgName;

    //新建fs的文件管道流
    let fileReadStream = fs.createReadStream(path);
    let fileWriteStream = fs.createWriteStream(newPath);
    fileReadStream.pipe(fileWriteStream);
    fileReadStream.on('close',()=>{
        fs.unlinkSync(path);//同步删除临时文件夹里的文件
        res.send('{"err":"","msg":"' + '/upload/' + newImgName + '"}' );
    });
  });
});

router.get('/ab*cd', (req, res) => {
  res.send('正则匹配')
});

module.exports = router;

router.post('/uploadImg333', function (req, res) {
  var form = new multiparty.Form();
  //设置编码
  form.encoding = 'utf-8';
  //设置文件存储路径
  form.uploadDir = "./uploadtemp/";
  //设置单文件大小限制
  form.maxFilesSize = 2 * 1024 * 1024;
  //form.maxFields = 1000;  设置所以文件的大小总和

  form.parse(req, function (err, fields, files) {
    uploadurl = '/images/upload/'
    file1 = files['filedata'];
    paraname = file1[0].fieldName; //参数名filedata
    originalFilename = file1[0].originalFilename; //原始文件名
    tmpPath = file1[0].path; //uploads\mrecQCv2cGlZbj-UMjNyw_Bz.txt
    fileSize = file1[0].size; //文件大小

    var timestamp = new Date().getTime(); //获取当前时间戳
    uploadurl += timestamp + originalFilename
    newPath = './public' + uploadurl;

    var fileReadStream = fs.createReadStream(tmpPath);
    var fileWriteStream = fs.createWriteStream(newPath);
    fileReadStream.pipe(fileWriteStream); //管道流
    fileWriteStream.on('close', function () {
      fs.unlinkSync(tmpPath); //删除临时文件夹中的图片
      console.log('copy over');
      res.send('{"err":"","msg":"' + uploadurl + '"}')
    });
  });
  //----------------------------------------- res.send('上传');
});