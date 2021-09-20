const db = require('../config/database');
const main = require('../config/main');
const crypto = require('crypto');
const moment = require('moment');
const User = require('../models/Users')
const mongoose = require('mongoose');

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
                            ' values(?,?,?,?,?,?,?,now(),now())', [data.user_name, data.email, password, data.mobile_number, 1, data.city, 0], (ex, rows1) => {
                            if (ex) {
                                connection.rollback(function () {
                                    connection.release();
                                    callback(ex);
                                });
                            } else {
                                // insert query for public table
                                connection.query('insert into public (user_id,first_name,last_name,gender,created_at,updated_at)' +
                                    ' values(?,?,?,?,now(),now())', [rows1.insertId,data.first_name, data.last_name, data.gender], (ex, rows2) => {
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
                                                callback(null, {row1:rows1.insertId});
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
                            ' values(?,?,?,?,?,?,?,now(),now())', [data.user_name, data.email, password, data.mobile_number, data.organization_type, data.city, 0], (ex, rows1) => {
                            if (ex) {
                                connection.rollback(function () {
                                    connection.release();
                                    callback(ex);
                                });
                            } else {
                                // insert query for organizations table
                                connection.query('insert into organizations (user_id,name,created_at,updated_at)' +
                                    ' values(?,?,now(),now())', [rows1.insertId, data.name], (ex, rows2) => {
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
                    callback({status:1, message: "Login Failed !"});
                }
            }
        });

    } catch(err) {
        callback(err);
    }
}

function passwordChange(data,callback){
    try {
        const hashingSecret = main.password_secret; //getting password hashing text
        const password_text = data.password; //retrieving password from form data

        //hashing password
        const password = crypto.createHmac('sha256', hashingSecret)
            .update(password_text)
            .digest('hex');

        //using the connection to query
        db.pool.query('UPDATE users SET password=? WHERE id=?', [password,data.userId], (ex, rows) => {
            if (ex) {
                callback(ex);
            } else {
                callback(null, {
                    status:0,
                    row:rows
                });
            }
        });

    } catch(err) {
        callback(err);
    }
}

function checkEmail(data,callback){
    try {

                //using the connection to query
        db.pool.query('select id from users where email=?', [data.email], (ex, rows) => {
            if (ex) {
                callback(ex);
            } else {
                if(rows.length>0){
                    callback(null, {
                        status:0,
                        id: rows[0].id
                    });
                } else {
                    callback({status:1, message: "User Failed !"});
                }
            }
        });

    } catch(err) {
        callback(err);
    }
}

function updateRealUser(authData, data, callback) {

    try {
        User.updateOne(
            {userId: authData.user.id},
            {
                $set: {
                    userId: authData.user.id,
                    userName: authData.user.userName,
                    location: {
                        type: "Point",
                        coordinates: [parseFloat(data.longitude), parseFloat(data.latitude)]
                    },
                    isDriver: data.isDriver,
                    driverMode: data.driverMode,
                    paymentType: data.paymentType,
                    socketId: data.socketId
                }
            },
            {upsert: true},
            (ex, result) => {
                if(ex){
                    console.log(ex);
                    callback(ex);
                }
                else{
                    callback(null,result);
                }
            })
    }
    catch (err) {
        console.log(err)
    }
}

function getRealUser(authData, data, callback) {
    try {
        User.findOne(
            {userId: data.userId}, 'location.coordinates socketId',
            {},
            (ex, result) => {
                if(ex){
                    console.log(ex);
                    callback(ex);
                }
                else{
                    callback(null,result);
                }
            })
    }
    catch (err) {
        console.log(err)
    }
}

function updateAccount(authData,data,callback){
    try{
        db.pool.query('UPDATE users SET bank=?, account_number=?, updated_at=now() WHERE id=?',
            [data.bank, data.account_number, authData.user.id], (ex, rows) => {
                if(ex){
                    callback(ex);
                }
                else{
                    callback(null,{row: rows});
                }
            });
    }
    catch(err) {
        callback(err);
    }
}

function userVerification(data,callback){
    try{
        db.pool.query('UPDATE users SET status=1, updated_at=now() WHERE id=?',
            [data.userId], (ex, rows) => {
                if(ex){
                    callback(ex);
                }
                else{
                    callback(null,{row: rows});
                }
            });
    }
    catch(err) {
        callback(err);
    }
}

//Queries to obtain user details
function getUserDetails(authData, data, callback){
    console.log(data,"2222222222222222222222222222222222222222222222222222222")
    try{
        db.pool.query('SELECT user_name, email, profile_picture_path, mobile_number, land_number FROM users WHERE id=?',
            [data.userId], (ex, rows) => {
                if(ex){
                    callback(ex);
                }
                else{
                    callback(null,{row: rows});
                }
            });
    }
    catch(err) {
        callback(err);
    }
}

function updateProfPic(authData,data,callback){
    try{
        //call cloudinary 
        upload.multerCloud(data.files, (ex, result) =>{
            //console.log(results);
            if(!result || result == undefined || result.urls[0] == null){
                callback(ex);
            }
            else{
                db.pool.query('UPDATE users SET profile_picture_path=?, updated_at=now() WHERE id=?',
                [data.files, authData.user.id],
                (ex, rows) => {
                    if(ex){
                        cloudinary.destroyer(result.ids,  (err, result) => {
                            console.log(err, result);
                            callback(ex);
                        });
                    }
                    else{
                        callback(null,{row: rows});
                    }
                }
                );
            }
        });
    }
    catch(err) {
        callback(err);
    }
}

module.exports = {
    publicRegister:publicRegister,
    orgRegister:orgRegister,
    login:login,
    getRealUser:getRealUser,
    updateRealUser:updateRealUser,
    updateAccount:updateAccount,
    userVerification:userVerification,
    getUserDetails:getUserDetails,
    checkEmail:checkEmail,
    passwordChange:passwordChange,
    updateProfPic:updateProfPic
}