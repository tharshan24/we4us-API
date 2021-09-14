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


// Queries for viewing all Public data
function viewAllPublic(data,callback){
    try{
        db.pool.query('select u.id, u.user_name, u.email, u.user_type, u.profile_picture_path, u.mobile_number, u.land_number, address_1, address_2, u.zipcode, u.bank, u.account_number, u.status, u.is_verified, p.first_name, p.last_name, p.nic, p.dob, p.gender, p.driver_status, p.volunteer_status, c.name_en, d.driver_mode, d.payment_type from users u ' +
        'join public p on u.id = p.user_id ' +
        'join cities c on c.id = u.city ' +
        'left join drivers d on d.user_id = u.id ',
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


// Queries for viewing Public data by ID
function viewPublicbyId(data,callback){
    try{
        db.pool.query('select u.id, u.user_name, u.email, u.user_type, u.profile_picture_path, u.mobile_number, u.land_number, address_1, address_2, u.zipcode, u.bank, u.account_number, u.status, u.is_verified, p.first_name, p.last_name, p.nic, p.dob, p.gender, p.driver_status, p.volunteer_status, c.name_en, d.driver_mode, d.payment_type from users u ' +
        'join public p on u.id = p.user_id ' +
        'join cities c on c.id = u.city ' +
        'left join drivers d on d.user_id = u.id '+
        'WHERE u.id = ?',
        [authData.user.id],
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

//Queries to get the data of delivery payments
function deliveryPayment(data,callback){
    try{
        db.pool.query('SELECT u.id, a.id, a.name, as.id, as.quantity, ad.id, d.user_id , adp.id, adp.amount, adp.created_at, adp.updated_at '+
        'FROM users u'+
        'JOIN availabilities a ON u.id = a.user_id'+
        'JOIN availability_sessions as ON a.id = as.availability_id'+
        'JOIN availability_deliveries ad ON as.id = ad.availability_session_id'+
        'JOIN drivers d ON d.user_id = ad.driver_id'+
        'JOIN availability_delivery_payments adp ON adp.delivery_id = ad.id'+
        'WHERE adp.status=0',
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

//Queries to filter the data of delivery payments with dates
function deliveryPaymentFilter(data,callback){
    try{
        // db.pool.query('SELECT u.id, a.id, a.name, as.id, as.quantity, ad.id, d.user_id , adp.id, adp.amount, adp.created_at, adp.updated_at '+
        // 'FROM users u'+
        // 'JOIN availabilities a ON u.id = a.user_id'+
        // 'JOIN availability_sessions as ON a.id = as.availability_id'+
        // 'JOIN availability_deliveries ad ON as.id = ad.availability_session_id'+
        // 'JOIN drivers d ON d.user_id = ad.driver_id'+
        // 'JOIN availability_delivery_payments adp ON adp.delivery_id = ad.id'+
        // 'WHERE adp.status=0',
        db.pool.query('SELECT SUM(amount) FROM availability_delivery_payments'+
        'WHERE created_at BETWEEN "?" AND "?" ',
        [data.startDate, data.endDate],
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



module.exports = {
    viewAllOrganizations:viewAllOrganizations,
    viewOrganizationsbyId:viewOrganizationsbyId,
    viewOrganizationsbyType:viewOrganizationsbyType,
    updateUserStatus:updateUserStatus,
    viewAllPublic:viewAllPublic,
    viewPublicbyId:viewPublicbyId,
    getUserStatus:getUserStatus,
    getDriverRequests:getDriverRequests,
    updateDriverStatus:updateDriverStatus,
    deliveryPayment:deliveryPayment,
    deliveryPaymentFilter:deliveryPaymentFilter
}