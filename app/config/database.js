
var mysql = require('mysql');
const DB = {
    URL:'localhost',
    USERNAME:'root',
    PASSWORD:'',
    NAME:'we4us'
}

var pool = mysql.createPool({
    host     : DB.URL,
    user     : DB.USERNAME,
    password : DB.PASSWORD,
    database : DB.NAME
});

var getConnection = function(callback) {
    pool.getConnection(function(err, connection) {
        callback(err, connection);
    });
};

module.exports = {
    pool:pool,
    getConnection:getConnection
};
