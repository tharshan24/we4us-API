var db = require('../config/database');
var main = require('../config/main');

function viewProfile(data,callback){
    try {
        //using the connection to query
        db.pool.query('select u.id, u.user_name, u.email, u.user_type, u.profile_picture_path, u.mobile_number, u.land_number, address_1, address_2, u.zipcode, u.bank, u.account_number, u.status, u.is_verified, o.name, o.description, o.contact_person_name, o.contact_person_number, o.contact_person_email, o.license_no, o.license_proof_path, o.social_media, o.website, o.latitude, o.longitude, ot.name, c.name_en from users u ' +
            'join organizations o on u.id = o.user_id ' +
            'join cities c on c.id = u.city ' +
            'join organization_types ot on ot.id = o.organization_type ' +
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

/*module.exports = {
    viewProfile:viewProfile
}*/

//new change...

function updateProfile(data,callback){
    try {

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
                        // update query for users table
                        connection.query('update users set mobile_number=?, land_number=?, address1=?, address2=?,city=?,bank=?,account_number=?,updated_at=now()' +
                        ' where id=?',
                             [data.mobile_number,data.land_number, data.address1, data.address2, data.city,data.bank,data.account_number,data.userId], (ex, rows1) => {
                            if (ex) {
                                connection.rollback(function () {
                                    connection.release();
                                    callback(ex);
                                });
                            } else {
                                // update query for organizations table
                                connection.query('update organizations set name=?,description=?,contact_person_name=?,contact_person_number=?,contact_person_email=?,license_no=?,license_proof_path=?,extension=?,social_media=?,website=?,latitude=?,longitude=?,updated_at=now()' +
                                ' where user_id=?',
                                     [rows1.insertId, data.name, data.description, data.contact_person_name, data.contact_person_number, data.contact_person_email, data.license_no, data.license_proof_path, data.extension, data.social_media,data.website,data.latitude,data.longitude,data.userId], (ex, rows2) => {
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

module.exports = {
    viewProfile:viewProfile,
    updateProfile:updateProfile
}