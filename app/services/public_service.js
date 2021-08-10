var db = require('../config/database');
var main = require('../config/main');

function viewProfile(data,callback){
    try {
        //using the connection to query
        db.pool.query('select u.id, u.user_name, u.email, u.user_type, u.profile_picture_path, u.mobile_number, u.land_number, address_1, address_2, u.zipcode, u.bank, u.account_number, u.status, u.is_verified, p.first_name, p.last_name, p.nic, p.dob, p.gender, p.driver_status, p.volunteer_status, c.name_en from users u ' +
            'join public p on u.id = p.user_id ' +
            'join cities c on c.id = u.city ' +
            'where u.status=1 and u.id=?', [data.userId], (ex, rows) => {
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


function updateProfile(data,callback){
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
                        connection.query('update users set address_1=?, address_2=?, bank=?, account_number=?, city=?, updated_at=now()'+
                        'where users.id=?',
                        [data.address_1, data.address_2, data.bank, data.account_number, data.city, data.userId], (ex, rows1) => {
                            if (ex) {
                                connection.rollback(function () {
                                    connection.release();
                                    callback(ex);
                                });
                            } else {
                                // update query for organizations table
                                connection.query('update public set first_name=?, last_name=?,' +
                                    ' where public.user_id=?', 
                                    [data.first_name, data.last_name, data.user_id], (ex, rows2) => {
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

module.exports = {
    viewProfile:viewProfile,
    updateProfile:updateProfile
}