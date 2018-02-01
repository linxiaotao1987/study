module.exports={
    check:function(req,res){
        const loginbean = req.session.loginbean;
        if(!loginbean){
            res.send('<script>alert("未登录或已过期");location.href="/";</script>');
            return false;
        } 
        return true;
    }
}