var db = require('../config/database');
var main = require('../config/main');
var crypto = require('crypto');
var moment = require('moment');

function publicRegister(data,callback){
    try {
        const hashingSecret = main.password_secret; //getting password hashing text
        const password_text = data.password; //retrieving password from form data

        //hashing password
        const password = crypto.createHmac('sha256', hashingSecret)
            .update(password_text)
            .digest('hex');

        db.pool.getConnection(function(error, connection) {
            if (error) {
                callback(error);
            } else {
                //use transaction as 2 tables are involved
                connection.beginTransaction(function(err) {
                    if (err) {
                        connection.rollback(function () {
                            connection.release();
                            callback(err);
                        });
                    } else {
                        // insert query for users table
                        connection.query('insert into users (user_name,email,password,mobile_number,user_type,city,status,created_at,updated_at)' +
                            ' values(?,?,?,?,?,?,?,now(),now())', [data.user_name, data.email, password, data.mobile_number, 1, data.city, 1], (ex, rows1) => {
                            if (ex) {
                                connection.rollback(function () {
                                    connection.release();
                                    callback(ex);
                                });
                            } else {
                                // insert query for organizations table
                                connection.query('insert into public (user_id,gender,created_at,updated_at)' +
                                    ' values(?,?,now(),now())', [rows1.insertId, data.gender], (ex, rows2) => {
                                    if (ex) {
                                        connection.rollback(function () {
                                            connection.release();
                                            callback(ex);
                                        });
                                    } else {
                                        //committing the transaction
                                        connection.commit(function (err) {
                                            if (err) {
                                                connection.rollback(function () {
                                                    connection.release();
                                                    callback(err);
                                                });
                                            } else {
                                                // registration successful
                                                connection.release();
                                                callback(null, {
                                                    row1:rows1.insertId
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    } catch(err) {
        callback(err);
    }
}

function orgRegister(data,callback){
    try {
        const hashingSecret = main.password_secret; //getting password hashing text
        const password_text = data.password; //retrieving password from form data

        //hashing password
        const password = crypto.createHmac('sha256', hashingSecret)
            .update(password_text)
            .digest('hex');

        //getting mysql connection
        db.pool.getConnection(function(error, connection) {
            if (error) {
                callback(error);
            } else {
                //use transaction as 2 tables are involved
                connection.beginTransaction(function(err) {
                    if (err) {
                        connection.rollback(function () {
                            connection.release();
                            callback(err);
                        });
                    } else {
                        // insert query for users table
                        connection.query('insert into users (user_name,email,password,mobile_number,user_type,city,status,created_at,updated_at)' +
                            ' values(?,?,?,?,?,?,?,now(),now())', [data.user_name, data.email, password, data.mobile_number, 1, data.city, 1], (ex, rows1) => {
                            if (ex) {
                                connection.rollback(function () {
                                    connection.release();
                                    callback(ex);
                                });
                            } else {
                                // insert query for organizations table
                                connection.query('insert into organizations (user_id,organization_type,name,created_at,updated_at)' +
                                    ' values(?,?,?,now(),now())', [rows1.insertId, data.organization_type, data.name], (ex, rows2) => {
                                    if (ex) {
                                        connection.rollback(function () {
                                            connection.release();
                                            callback(ex);
                                        });
                                    } else {
                                        //committing the transaction
                                        connection.commit(function (err) {
                                            if (err) {
                                                connection.rollback(function () {
                                                    connection.release();
                                                    callback(err);
                                                });
                                            } else {
                                                // registration successful
                                                connection.release();
                                                callback(null, {
                                                    row1:rows1.insertId
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });

    } catch(err) {
        callback(err);
    }
}

function login(data,callback){
    try {
        const hashingSecret = main.password_secret; //getting password hashing text
        const password_text = data.password; //retrieving password from form data

        //hashing password
        const password = crypto.createHmac('sha256', hashingSecret)
            .update(password_text)
            .digest('hex');

                //using the connection to query
        db.pool.query('select id, user_name, email, user_type, profile_picture_path, is_verified from users where user_name=? and password=?', [data.user_name, password], (ex, rows) => {
            if (ex) {
                callback(ex);
            } else {
                if(rows.length>0){
                    callback(null, {
                        id: rows[0].id,
                        userName: rows[0].user_name,
                        email: rows[0].email,
                        userType: rows[0].user_type,
                        profilePicturePath: rows[0].profile_picture_path,
                        isVerified: rows[0].is_verified
                    });
                } else {
                    callback({message: "Login Failed !"});
                }
            }
        });

    } catch(err) {
        callback(err);
    }
}

module.exports = {
    publicRegister:publicRegister,
    orgRegister:orgRegister,
    login:login
}