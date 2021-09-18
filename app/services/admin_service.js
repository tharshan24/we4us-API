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
function getDriverById(data,callback){
    try{
        db.pool.query('SELECT license_no,license_proof_path,extension,payment_type,driver_mode,rating,rating_count,'+
        'status FROM drivers  WHERE user_id=?',
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

// Queries for selecting status for driver
function getAllDrivers(data,callback){
    try{
        db.pool.query('SELECT license_no,license_proof_path,extension,payment_type,driver_mode,rating,rating_count,'+
        'status FROM drivers ',
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

function exploreAvailability(authData,data,callback){
    try{
        db.pool.query('SELECT a.id, a.user_id, a.name, a.availability_type, a.food_type, a.available_quantity, a.city, a.status, u.user_name, u.profile_picture_path, a.best_before, c.name_en, d.name_en FROM availabilities a ' +
            'JOIN users u ON u.id = a.user_id ' +
            'JOIN cities c ON c.id = a.city ' +
            'JOIN districts d ON d.id = c.district_id ' +
            'WHERE a.status = 1 ' +
            'ORDER BY a.id DESC',
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

//Queries to view Availability
function viewAvailability(data,callback){
    try{
        db.pool.query('SELECT a.id, a.availability_type, a.description, a.food_type, a.total_quantity, a.status AS as, u.id, u.user_name, u.status AS us, p.first_name, p.last_name, c.name_en FROM users u '+
        'JOIN public p on u.id = p.user_id '+
        'JOIN cities c on c.id = u.city ' +
        'JOIN availabilities a on a.user_id = u.id ' +
        'WHERE us=1 AND as=1',
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

//Queries to view Availability by ID
function viewAvailabilityById(data,callback){
    try{
        db.pool.query('SELECT a.id, a.name, a.availability_type, a.description, a.food_type, a.total_quantity, a.status AS as, u.id, u.user_name, u.status AS us, p.first_name, p.last_name, c.name_en FROM users u '+
        'JOIN public p on u.id = p.user_id '+
        'JOIN cities c on c.id = u.city ' +
        'JOIN availabilities a on a.user_id = u.id ' +
        'WHERE a.id=? AND us=1 AND as=1',
        [data.avail_id],
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

//Queries to view Availability by Date
function viewAvailabilityByDate(data,callback){
    try{
        db.pool.query('SELECT a.id, a.availability_type, a.description, a.food_type, a.total_quantity, a.status AS as, u.id, u.user_name, u.status AS us, p.first_name, p.last_name, c.name_en FROM users u '+
        'JOIN public p on u.id = p.user_id '+
        'JOIN cities c on c.id = u.city ' +
        'JOIN availabilities a on a.user_id = u.id ' +
        'WHERE (a.created_at BETWEEN "?" AND "?") AND us=1 AND as=1',
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

//Queries to view Request
function viewRequest(data,callback){
    try{
        db.pool.query('SELECT r.id, r.request_type , r.description, r.status AS rs, ri.total_quantity, ri.status AS ris, u.id, u.user_name, u.status AS us, p.first_name, p.last_name, c.name_en FROM users u '+
        'JOIN public p on u.id = p.user_id '+
        'JOIN cities c on c.id = u.city ' +
        'JOIN requests r on r.user_id = u.id ' +
        'JOIN request_items ri on r.id = ri.request_id ' +
        'WHERE us=1 AND rs=1 AND ris=1',
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

//Queries to view Availability by ID
function viewRequestById(data,callback){
    try{
        db.pool.query('SELECT r.id, r.request_type , r.description, r.status AS rs, ri.total_quantity, ri.status AS ris, u.id, u.user_name, u.status AS us, p.first_name, p.last_name, c.name_en FROM users u '+
        'JOIN public p on u.id = p.user_id '+
        'JOIN cities c on c.id = u.city ' +
        'JOIN requests r on r.user_id = u.id ' +
        'JOIN request_items ri on r.id = ri.request_id ' +
        'WHERE r.id=? AND us=1 AND rs=1 AND ris=1',
        [data.req_id],
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

//Queries to view Availability by Date
function viewRequestByDate(data,callback){
    try{
        db.pool.query('SELECT r.id, r.request_type , r.description, r.status AS rs, ri.total_quantity, ri.status AS ris, u.id, u.user_name, u.status AS us, p.first_name, p.last_name, c.name_en FROM users u '+
        'JOIN public p on u.id = p.user_id '+
        'JOIN cities c on c.id = u.city ' +
        'JOIN requests r on r.user_id = u.id ' +
        'JOIN request_items ri on r.id = ri.request_id ' +
        'WHERE (r.created_at BETWEEN "?" AND "?") AND  us=1 AND rs=1 AND ris=1',
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

//Queries to view Collection points
function viewColPoint(data,callback){
    try{
        db.pool.query('SELECT cp.id, cp.ngo_id, cp.status, o.user_id, o.name, u.id, u.user_name, c.name_en FROM users u '+
        'JOIN organizations o on u.id = o.user_id '+
        'JOIN collection_points cp on cp.ngo_id = u.user_type '+
        'JOIN cities c on c.id = u.city ' +
        'JOIN user_types ut on ut.id = u.user_type ' +
        'WHERE u.status=1',
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

//Queries to view Collection point by ID
function viewColPointById(data,callback){
    try{
        db.pool.query('SELECT cp.id, cp.ngo_id, cp.status, o.user_id, o.name, u.id, u.user_name, c.name_en FROM users u '+
        'JOIN organizations o on u.id = o.user_id '+
        'JOIN collection_points cp on cp.ngo_id = u.user_type '+
        'JOIN cities c on c.id = u.city ' +
        'JOIN user_types ut on ut.id = u.user_type ' +
        'WHERE u.status=1 AND cp.id=?',
        [data.cp_id],
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

//Queries to view Collection point by Date
function viewColPointByDate(data,callback){
    try{
        db.pool.query('SELECT cp.id, cp.ngo_id, cp.status, o.user_id, o.name, u.id, u.user_name, c.name_en FROM users u '+
        'JOIN organizations o on u.id = o.user_id '+
        'JOIN collection_points cp on cp.ngo_id = u.user_type '+
        'JOIN cities c on c.id = u.city ' +
        'JOIN user_types ut on ut.id = u.user_type ' +
        'WHERE u.status=1 AND (cp.created_at BETWEEN "?" AND "?")',
        [data.startDate,data.endDate],
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
    getDriverById:getDriverById,
    getAllDrivers:getAllDrivers,
    updateDriverStatus:updateDriverStatus,
    deliveryPayment:deliveryPayment,
    deliveryPaymentFilter:deliveryPaymentFilter,
    exploreAvailability:exploreAvailability,
    viewAvailability:viewAvailability,
    viewAvailabilityById:viewAvailabilityById,
    viewAvailabilityByDate:viewAvailabilityByDate,
    viewRequest:viewRequest,
    viewRequestById:viewRequestById,
    viewRequestByDate:viewRequestByDate,
    viewColPoint:viewColPoint,
    viewColPointById:viewColPointById,
    viewColPointByDate:viewColPointByDate
}