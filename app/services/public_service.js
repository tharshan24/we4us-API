const db = require('../config/database');
const main = require('../config/main');
const upload = require('../utilities/multer');
const cloudinary = require('../utilities/cloudinary');
const Driver = require('../models/Drivers')
const mongoose = require('mongoose');


function viewProfile(authData,data,callback){
    try {
        //using the connection to query
        db.pool.query('select u.id, u.user_name, u.email, u.user_type, u.profile_picture_path, u.mobile_number, u.land_number, address_1, address_2, u.zipcode, u.bank, u.account_number, u.status, u.is_verified, p.first_name, p.last_name, p.nic, p.dob, p.gender, p.driver_status, p.volunteer_status, c.name_en from users u ' +
            'join public p on u.id = p.user_id ' +
            'join cities c on c.id = u.city ' +
            'where u.status=1 and u.id=?', [authData.user.id], (ex, rows) => {
            if (ex) {
                callback(ex);
            } else {
                if(rows.length>0){
                    callback(null, rows);
                } else {
                    callback({status:1, message: "No user !"});
                }
            }
        });
    } catch(err) {
        callback(err);
    }
}


function updateProfile(authData,data,callback){
    try {

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
                        // update query for users table
                        connection.query("update users set address_1=?, address_2=?, bank=?, account_number=?, city=?, updated_at=now()"+
                        " where id=?",
                        [data.address_1, data.address_2, data.bank, data.account_number, data.city, authData.user.id], (ex, rows1) => {
                            if (ex) {
                                connection.rollback(function () {
                                    connection.release();
                                    callback(ex);
                                });
                            } else {
                                // update query for public table
                                connection.query("update public set first_name=?, last_name=?" +
                                     " where user_id=?", 
                                    [data.first_name, data.last_name, authData.user.id], (ex, rows2) => {
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
                                                // Updating successful
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

function registerDriver(data,callback){
    try {

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
                        // call cloudinary upload
                        upload.multerCloud(data.files,  (ex, result) => {
                            // console.log("aaaaaaaa " + ex, result)
                            if (!result || result==undefined) {
                                connection.rollback(function () {
                                connection.release();
                                callback(ex);
                                });
                            } else {
                                // update query for drivers table
                                connection.query("INSERT INTO drivers (user_id, license_no, license_proof_path,created_at, updated_at) " +
                                    "VALUES (?,?,?,now(),now())",
                                    [data.headers.authData.user.id, data.body.license_no, result.urls[0] + " " + result.ids[0] ], (ex, rows1) => {
                                        if (ex) {
                                            cloudinary.destroyer(result.ids,  (err, result) => {
                                                // console.log(err, result);
                                                connection.rollback(function () {
                                                connection.release();
                                                callback(ex);
                                                });
                                            });
                                          
                                        } else {
                                            // update query for public table
                                            connection.query("update public set driver_status=2, updated_at=now()" +
                                                " where user_id=?",
                                                [data.headers.authData.user.id], (ex, rows2) => {
                                                    if (ex) {
                                                        cloudinary.destroyer(result.ids,  (err, result) => {
                                                            console.log(err, result);
                                                            connection.rollback(function () {
                                                            connection.release();
                                                            callback(ex);
                                                            });
                                                        });
                                                        
                                                    } else {
                                                        //committing the transaction
                                                        connection.commit(function (err) {
                                                            if (err) {
                                                                cloudinary.destroyer(result.ids,  (err, result) => {
                                                                    console.log(err, result);
                                                                    connection.rollback(function () {
                                                                    connection.release();
                                                                    callback(err);
                                                                    });
                                                                });
                                                               
                                                            } else {
                                                                // Updating successful
                                                                connection.release();
                                                                callback(null, {row1: rows1.insertId});
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
            }
        });
    } catch(err) {
        callback(err);
    }
}


function vehicleRegister(data,callback){
    try {
        upload.multerCloud(data.files,  (ex, result) => {
            // console.log("aaaaaaaa " + ex, result)
            if (!result || result==undefined || result.urls[0] == null) {
                connection.rollback(function () {
                    connection.release();
                    callback(ex);
                });
            } else {

                //using the connection to query
                db.pool.query('INSERT INTO vehicles (user_id, vehicle_type, vehicle_no, brand, model, colour,vehicle_book_proof, status, created_at, updated_at) ' +
                    'VALUES ( ?,?,?,?,?,?,?,1,now(),now() )', [data.headers.authData.user.id, data.body.vehicle_type, data.body.vehicle_no, data.body.brand, data.body.model, data.body.color, result.urls[0] + " " + result.ids[0]], (ex, rows) => {
                    if (ex) {
                        callback(ex);
                    } else {
                        callback(null, rows);
                    }
                });
            }
        });
    } catch(err) {
        callback(err);
    }
}

function updateDriverLocation(authData, data, callback) {

    try {
        Driver.updateOne(
            {driverId: authData.user.id},
            {
                $set: {
                    driverId: authData.user.id,
                    driverName: authData.user.userName,
                    location: {
                        type: "Point",
                        coordinates: [parseFloat(data.longitude), parseFloat(data.latitude)]
                    },
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

function getDriverLocation(authData, data, callback) {
    try {
        Driver.findOne(
            {driverId: data.driverId}, 'location.coordinates socketId',
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

module.exports = {
    viewProfile:viewProfile,
    updateProfile:updateProfile,
    registerDriver:registerDriver,
    vehicleRegister:vehicleRegister,
    updateDriverLocation:updateDriverLocation,
    getDriverLocation:getDriverLocation
}