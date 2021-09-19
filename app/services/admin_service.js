const db = require('../config/database');
const main = require('../config/main');


// Queries for viewing all Organizations data
function viewAllOrganizations(data,callback){
    try{
        db.pool.query('select u.id, u.user_name, u.email, u.user_type, u.profile_picture_path, u.mobile_number, u.land_number, address_1, address_2, u.zipcode, u.bank, u.account_number, u.status, u.is_verified, o.name, o.description, o.contact_person_name, o.contact_person_number, o.contact_person_email, o.license_no, o.license_proof_path, o.social_media, o.website, o.latitude, o.longitude, ut.name, c.name_en from users u ' +
        'join organizations o on u.id = o.user_id ' +
        'join cities c on c.id = u.city ' +
        'join user_types ut on ut.id = u.user_type ',
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
        'join user_types ut on ut.id = u.user_type ' +
        'WHERE u.id=?', [data.user_id],
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
        'join user_types ut on ut.id = u.user_type ' +
        'WHERE u.user_type=?',[type],
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
        db.pool.query('SELECT u.status, u.user_type, ut.id FROM users u JOIN user_types ut ON ut.id = u.user_type  WHERE id=?',
        [data.user_id], (ex, rows) => {
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
        [status,data.user_id], (ex, rows) => {
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
        db.pool.query('select u.id, u.user_name, u.email, u.user_type, u.profile_picture_path, u.mobile_number, u.land_number, address_1, address_2, u.zipcode, u.bank, u.account_number, u.status, u.is_verified, p.first_name, p.last_name, p.nic, p.dob, p.gender, p.driver_status, p.volunteer_status, c.name_en, d.driver_mode, d.payment_type, ut.name as user_type_name from users u ' +
        'join public p on u.id = p.user_id ' +
            'JOIN user_types ut on ut.id = u.user_type ' +
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
        db.pool.query('select u.id, ut.name as user_type_name, u.user_name, u.email, u.user_type, u.profile_picture_path, u.mobile_number, u.land_number, address_1, address_2, u.zipcode, u.bank, u.account_number, u.status, u.is_verified, p.first_name, p.last_name, p.nic, p.dob, p.gender, p.driver_status, p.volunteer_status, c.name_en, d.driver_mode, d.payment_type from users u ' +
        'join public p on u.id = p.user_id ' +
            'JOIN user_types ut on ut.id = u.user_type ' +
        'join cities c on c.id = u.city ' +
        'left join drivers d on d.user_id = u.id '+
        'WHERE u.id = ?',
        [data.user_id],
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
        db.pool.query('SELECT u.id, u.user_name, u.email, u.mobile_number, c.name_en, p.first_name, p.last_name, d.license_no, d.license_proof_path, d.extension, d.payment_type, d.status '+
        'FROM users u ' +
        'JOIN public p ON p.user_id = u.id '+
        'JOIN drivers d ON p.user_id = d.user_id '+
        'JOIN cities c ON c.id = u.city '+
        'WHERE u.id=?',
        [data.user_id], (ex, rows) => {
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
        db.pool.query('SELECT u.id, u.user_name, u.email, u.mobile_number, c.name_en, p.first_name, p.last_name, d.license_no, d.license_proof_path, d.extension, d.payment_type, d.status '+
        'FROM users u ' +
        'JOIN public p ON p.user_id = u.id '+
        'JOIN drivers d ON p.user_id = d.user_id '+
        'JOIN cities c ON c.id = u.city ',
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
        db.pool.query('UPDATE drivers SET status=? WHERE user_id=?',
        [status,data.user_id], (ex, rows) => {
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
        db.pool.query('SELECT u.id AS user_id, a.id AS avail_id, a.name, ass.id, ass.quantity, ad.id AS availdelivery_id, d.user_id , adp.id AS availdeliverpay_id, adp.amount, adp.created_at, adp.updated_at '+
        'FROM users u '+
        'JOIN availabilities a ON u.id = a.user_id '+
        'JOIN availability_sessions ass ON a.id = ass.availability_id '+
        'JOIN availability_deliveries ad ON ass.id = ad.availability_session_id '+
        'JOIN drivers d ON d.user_id = ad.driver_id '+
        'JOIN availability_delivery_payments adp ON adp.delivery_id = ad.id '+
        'WHERE adp.status=0 ',
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
function deliveryPaymentFilter(authData,data,callback){
    try{
        db.pool.query('SELECT u.id AS user_id, u.user_name, a.id AS avail_id, a.user_id, ases.user_id as availReq_id, adp.created_at, adp.status '+
        'FROM users u '+
        'JOIN availabilities a ON u.id = a.user_id '+
        'JOIN users uu ON uu.id = ? '+
        'JOIN users uuu ON uuu.id = ? '+
        'JOIN users uuuu ON uuuu.id = ? '+
        'JOIN availability_sessions ases ON a.id = ases.availability_id '+
        'JOIN availability_deliveries ad ON ases.id = ad.availability_session_id '+
        'JOIN drivers d ON d.user_id = ad.driver_id '+
        'JOIN drivers dd ON dd.user_id = uu.id '+
        'JOIN availabilities aa ON aa.user_id = uuu.id '+
        'JOIN availability_sessions asess ON asess.user_id = uuuu.id '+
        'JOIN availability_delivery_payments adp ON adp.delivery_id = ad.id '+
        'WHERE adp.status=0 ',
        [authData.user.id,authData.user.id,authData.user.id], 
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
        db.pool.query('SELECT a.id AS avail_id, a.user_id, a.name, a.availability_type, a.food_type, a.available_quantity, a.city, a.status, u.user_name, u.profile_picture_path, a.best_before, c.name_en, d.name_en FROM availabilities a ' +
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
        db.pool.query('SELECT a.id, a.cooked_time, a.best_before, a.availability_type, a.description, a.food_type, a.total_quantity, a.status AS avail_status, u.id AS user_id, u.user_name, u.status AS user_status, c.name_en, ut.name as user_type_name, a.created_at FROM users u '+
        'JOIN cities c on c.id = u.city ' +
        'JOIN user_types ut on ut.id = u.user_type ' +
        'JOIN availabilities a on a.user_id = u.id ' +
        'WHERE u.status=1 AND a.status=1',
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
        db.pool.query('SELECT a.id, a.cooked_time, a.best_before, a.name, a.availability_type, a.description, a.food_type, a.total_quantity, a.status AS avail_status, u.id AS user_id, u.user_name, u.status AS user_status, c.name_en, ut.name as user_type_name, a.created_at FROM users u '+
        'JOIN cities c on c.id = u.city ' +
        'JOIN user_types ut on ut.id = u.user_type ' +
        'JOIN availabilities a on a.user_id = u.id ' +
        'WHERE a.id=? AND u.status=1 AND a.status=1',
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
        db.pool.query('SELECT a.id, a.cooked_time, a.best_before, a.availability_type, a.description, a.food_type, a.total_quantity, a.status AS avail_status, u.id AS user_id, u.user_name, u.status AS user_status, c.name_en, ut.name as user_type_name, a.created_at FROM users u '+
        'JOIN cities c on c.id = u.city ' +
        'JOIN user_types ut on ut.id = u.user_type ' +
        'JOIN availabilities a on a.user_id = u.id ' +
        `WHERE (a.created_at BETWEEN "${data.startDate}" AND "${data.endDate}") AND u.status=1 AND a.status=1`,
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
        db.pool.query('SELECT r.id, r.request_type , r.description, r.status AS req_statuss, u.id AS user_id, u.user_name, u.status AS user_status, c.name_en, ut.name as user_type_name, r.created_at FROM users u '+
        'JOIN cities c on c.id = u.city ' +
        'JOIN user_types ut on ut.id = u.user_type ' +
        'JOIN requests r on r.user_id = u.id ' +
        // 'JOIN request_items ri on r.id = ri.request_id ' +
        'WHERE u.status=1 AND r.status=1',
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
        db.pool.query('SELECT r.id AS request_id, r.request_type , r.description, r.status AS req_status, u.id AS user_id, u.user_name, u.status AS user_status, c.name_en, ut.name as user_type_name, r.created_at FROM users u '+
        'JOIN cities c on c.id = u.city ' +
            'JOIN user_types ut on ut.id = u.user_type ' +
        'JOIN requests r on r.user_id = u.id ' +
        // 'JOIN request_items ri on r.id = ri.request_id ' +
        'WHERE r.id=? AND u.status=1 AND r.status=1',
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
        db.pool.query('SELECT r.id AS request_id, r.request_type , r.description, r.status AS req_status, u.id AS user_id, u.user_name, u.status AS user_status, c.name_en, ut.name as user_type_name, r.created_at FROM users u '+
        'JOIN cities c on c.id = u.city ' +
            'JOIN user_types ut on ut.id = u.user_type ' +
        'JOIN requests r on r.user_id = u.id ' +
        // 'JOIN request_items ri on r.id = ri.request_id ' +
        `WHERE (r.created_at BETWEEN "${data.startDate}" AND "${data.endDate}") AND  u.status=1 AND r.status=1`,
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
        db.pool.query('SELECT cp.id AS colpoint_id, cp.ngo_id, cp.status, cp.start_time, cp.end_time, o.user_id, o.name, u.id AS user_id, u.user_name, c.name_en FROM users u '+
        'JOIN organizations o on u.id = o.user_id '+
        'JOIN collection_points cp on cp.ngo_id = u.id '+
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
        db.pool.query('SELECT cp.id AS colpoint_id, cp.ngo_id, cp.status, cp.start_time, cp.end_time, o.user_id, o.name, u.id AS user_id, u.user_name, c.name_en FROM users u '+
        'JOIN organizations o on u.id = o.user_id '+
        'JOIN collection_points cp on cp.ngo_id = u.id '+
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
        db.pool.query('SELECT cp.id AS colpoint_id, cp.ngo_id, cp.status, cp.start_time, cp.end_time, o.user_id, o.name, u.id AS user_id, u.user_name, c.name_en FROM users u '+
        'JOIN organizations o on u.id = o.user_id '+
        'JOIN collection_points cp on cp.ngo_id = u.id '+
        'JOIN cities c on c.id = u.city ' +
        'JOIN user_types ut on ut.id = u.user_type ' +
        `WHERE u.status=1 AND (cp.created_at "${data.startDate}" AND "${data.endDate}")`,
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

//Queries to view Selling points
function viewSellPoint(data,callback){
    try{
        db.pool.query('SELECT sp.id AS sellpoint_id, sp.shop_id, sp.status, sp.start_time, sp.end_time, o.user_id, o.name, u.id AS user_id, u.user_name, c.name_en FROM users u '+
        'JOIN organizations o on u.id = o.user_id '+
        'JOIN selling_points sp on sp.shop_id = u.id '+
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

//Queries to view Selling points by ID
function viewSellPointById(data,callback){
    try{
        db.pool.query('SELECT sp.id AS sellpoint_id, sp.shop_id, sp.status, sp.start_time, sp.end_time, o.user_id, o.name, u.id AS user_id, u.user_name, c.name_en FROM users u '+
        'JOIN organizations o on u.id = o.user_id '+
        'JOIN selling_points sp on sp.shop_id = u.id '+
        'JOIN cities c on c.id = u.city ' +
        'JOIN user_types ut on ut.id = u.user_type ' +
        'WHERE u.status=1 and sp.id=?',
        [data.sp_id],
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

//Queries to view Selling points by Date
function viewSellPointByDate(data,callback){
    try{
        db.pool.query('SELECT sp.id AS sellpoint_id, sp.shop_id, sp.status, sp.start_time, sp.end_time, o.user_id, o.name, u.id AS user_id, u.user_name, c.name_en FROM users u '+
        'JOIN organizations o on u.id = o.user_id '+
        'JOIN selling_points sp on sp.shop_id = u.id '+
        'JOIN cities c on c.id = u.city ' +
        'JOIN user_types ut on ut.id = u.user_type ' +
        `WHERE u.status=1 and AND (sp.created_at "${data.startDate}" AND "${data.endDate}")`,
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



// Queries for selecting the counts of the Users.
function countUsers(data,u_type,callback){
    try{
        db.pool.query('SELECT COUNT(id) FROM users WHERE user_type=?',
        [u_type], 
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


// Queries for selecting the counts of the Users.
function countDrivers(data, callback){
    try{
        db.pool.query('SELECT COUNT(user_id) FROM public WHERE driver_status=1',
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
    viewColPointByDate:viewColPointByDate,
    countUsers:countUsers,
    countDrivers:countDrivers,
    viewSellPoint:viewSellPoint,
    viewSellPointById:viewSellPointById,
    viewSellPointByDate:viewSellPointByDate
    
}