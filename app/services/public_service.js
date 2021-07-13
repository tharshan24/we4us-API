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

module.exports = {
    viewProfile:viewProfile
}