const User = require('./User');

function Teacher(id, name, age) {
    User.apply(this, [id, name, age]);
    this.teach = (res)=> {
        res.write(this.name + '讲课');
    }
}

module.exports = Teacher;