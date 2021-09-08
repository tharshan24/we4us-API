const db = require('../config/database');
const main = require('../config/main');


// Queries for viewing all Organizations data
function viewAllOrganizations(data,callback){
    try{
        db.pool.query('select u.id, u.user_name, u.email, u.user_type, u.profile_picture_path, u.mobile_number, u.land_number, address_1, address_2, u.zipcode, u.bank, u.account_number, u.status, u.is_verified, o.name, o.description, o.contact_person_name, o.contact_person_number, o.contact_person_email, o.license_no, o.license_proof_path, o.social_media, o.website, o.latitude, o.longitude, ut.name, c.name_en from users u ' +
        'join organizations o on u.id = o.user_id ' +
        'join cities c on c.id = u.city ' +
        'join user_types ut on ot.id = u.user_type ',
        (ex, rows) => {
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

// Queries for viewing Organizations by ID
function viewOrganizationsbyId(data,callback){
    try{
        db.pool.query('SELECT u.id, u.user_name, u.email, u.user_type, u.profile_picture_path, u.mobile_number, u.land_number, address_1, address_2, u.zipcode, u.bank, u.account_number, u.status, u.is_verified, o.name, o.description, o.contact_person_name, o.contact_person_number, o.contact_person_email, o.license_no, o.license_proof_path, o.social_media, o.website, o.latitude, o.longitude, ut.name, c.name_en FROM users u ' +
        'join organizations o on u.id = o.user_id ' +
        'join cities c on c.id = u.city ' +
        'join user_types ut on ot.id = u.user_type ' +
        'WHERE u.id=?', [authData.user.id],
        (ex, rows) => {
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

// Queries for viewing Organizations by types
function viewOrganizationsbyType(data,type,callback){
    try{
        db.pool.query('SELECT u.id, u.user_name, u.email, u.profile_picture_path, u.mobile_number, u.land_number, address_1, address_2, u.zipcode, u.bank, u.account_number, u.status, u.is_verified, o.name, o.description, o.contact_person_name, o.contact_person_number, o.contact_person_email, o.license_no, o.license_proof_path, o.social_media, o.website, o.latitude, o.longitude, ut.name, c.name_en FROM users u ' +
        'join organizations o on u.id = o.user_id ' +
        'join cities c on c.id = u.city ' +
        'join user_types ut on ot.id = u.user_type ' +
        'WHERE o.organization_type=?',[type],
        (ex, rows) => {
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

// Queries for selecting status
function getUserStatus(data,callback){
    try{
        db.pool.query('SELECT status, user_type FROM users  WHERE id=?',
        [authData.user.id], (ex, rows) => {
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


// Queries for updating status (Active or Not)
function updateUserStatus(data,status,callback){
    try{
        db.pool.query('UPDATE users SET status=? WHERE id=?',
        [status,authData.user.id], (ex, rows) => {
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

// Queries for selecting status for driver
function getDriverRequests(data,callback){
    try{
        db.pool.query('SELECT license_no,license_proof_path,extension,payment_type,driver_mode,rating,rating_count,'+
        'status FROM users  WHERE user_id=?',
        [authData.user.id], (ex, rows) => {
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


// Queries for updating status of Drivers (accept/rejected/pending)
function updateDriverStatus(data,status,callback){
    try{
        db.pool.query('UPDATE drivers SET status=? WHERE id=?',
        [status,authData.user.id], (ex, rows) => {
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



module.exports = {
    viewAllOrganizations:viewAllOrganizations,
    viewOrganizationsbyId:viewOrganizationsbyId,
    viewOrganizationsbyType:viewOrganizationsbyType,
    updateUserStatus:updateUserStatus,
    getUserStatus:getUserStatus,
    getDriverRequests:getDriverRequests,
    updateDriverStatus:updateDriverStatus
}