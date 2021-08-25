const mysql = require('mysql');
const DB = require('./main');

const pool = mysql.createPool({
    host: DB.host,
    user: DB.user,
    password: DB.password,
    database: DB.database
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
