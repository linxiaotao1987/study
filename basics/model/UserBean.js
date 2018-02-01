const events = require('events');

function UserBean(){
    this.eventEmit = new events.EventEmitter();
    this.register = (req,res)=>{
        console.log('注册');
        this.eventEmit.emit('register','hehe','dada');
    };
    this.login = (req,res)=>{
        console.log('登录');
    };
}

module.exports = UserBean;