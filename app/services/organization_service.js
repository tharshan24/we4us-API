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

module.exports = {
    viewProfile:viewProfile
}