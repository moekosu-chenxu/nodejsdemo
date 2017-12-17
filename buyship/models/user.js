var mysql = require('mysql');
var dbName = "test";// 表名

var pool = mysql.createPool({
    host: 'moekosu-1.mysql.rds.aliyuncs.com:3306',
    user: 'root',
    password: 'Moekosu@123123',
    database: dbName
});

// pool.on('connection', function (con) {
//     con.query('');
// });

// 实体类
function User(user) {
    this.id = user.id;
    this.name = user.name;
    this.password = user.password;
    this.age = user.age;
    this.description = user.description;
}


module.exports = User;// 暴露出接口

pool.getConnection(function (err, con) {

    // 保存用户信息
    User.prototype.save = function save(callback) {
        var user = {
            id: this.id,
            name: this.name,
            password: this.password,
            age: this.age,
            description: this.description
        };
        //
        var dbSql = 'insert into user(name, password, age, description) values(?, ?, ?, ?)';
        //
        con.query(dbSql, [user.name, user.password, user.age. user.description], function (err, result) {
            if (err) {
                console.log('[save sql error]: ' + err.message);
                return;
            }

            con.release();

            console.log('[save sql call success]');
            callback(err, result);
        });
    };

    // 根据用户名获取用户数量（判断重复）
    User.getUserNumByUserName = function getUserNumByUserName(username, callback) {

        var sql = '';

        con.query(sql, [username], function (err, result) {
            if (err) {
                console.log('[getUserNumByUserName sql error]: ' + err.message);
                return;
            }

            con.release();

            console.log('[getUserNumByUserName sql call success]');
            callback(err, result);
        })
    };

    // 根据用户名获取用户信息
    User.getUserInfoByUserName = function getUserInfoByUserName(username, callback) {

        var sql = '';

        con.query(sql, [username], function (err, result) {
            if (err) {
                console.log('[getUserInfoByUserName sql error]: ' + err.message);
                return;
            }

            con.release();

            console.log('[getUserInfoByUserName sql call success]');
            callback(err, result);
        })
    };
});

















