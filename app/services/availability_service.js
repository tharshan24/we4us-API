const db = require('../config/database');
const main = require('../config/main');
const upload = require('../utilities/multer');
const cloudinary = require('../utilities/cloudinary');

//Queries for create availability
function createAvailability(data,callback){
    try {
        db.pool.getConnection(function(error, connection){
            if(error){
                callback(error);
            }
            else{
                //use transaction since 2 tables are involved
                connection.beginTransaction(function(err){
                    if(err){
                        connection.rollback(function(){
                        connection.release();
                        callback(err);
                        });
                    }
                    else{
                        //call cloudinary upload
                        upload.multerCloud(data.files, (ex, result) => {
                            // console.log("aaaaa"+ result)
                            if(!result || result == undefined || result.urls[0] == null){
                                connection.rollback(function(){
                                connection.release();
                                callback(ex);
                                });
                            }
                            else{
                                // console.log("service")
                                //insert query for availabilities table
                                connection.query("INSERT INTO availabilities (user_id, name, availability_type, other_description, description, food_type, total_quantity, " + 
                                "available_quantity, actual_quantity, cooked_time, best_before, storage_description, location, address_1, address_2, city, latitude, longitude," +
                                "cater_description, creator_delivery_option, status, image_status, created_at, updated_at)" +
                                "VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,now(),now())",
                                [data.headers.authData.user.id,data.body.name,data.body.availability_type, data.body.other_description, data.body.description,
                                data.body.food_type,data.body.total_quantity,data.body.total_quantity,data.body.total_quantity,data.body.cooked_time,
                                data.body.best_before,data.body.storage_description,data.body.location,data.body.address_1,data.body.address_2,data.body.city,
                                data.body.latitude,data.body.longitude,data.body.cater_description,data.body.creator_delivery_option,
                                1,data.body.image_status] , (ex,rows1) => {
                                    if(ex){
                                           // console.log("222222")
                                        cloudinary.destroyer(result.ids,  (err, result) => {
                                            // console.log(err, result);
                                            connection.rollback(function () {
                                            connection.release();
                                            callback(ex);
                                            });
                                        });
                                    }
                                    else{
                                        // console.log("rr",result)
                                        //insert query for availability_images table
                                    
                                            let q = "INSERT INTO availability_images (availability_id, name, description, image_path,status) VALUES ?";
                                            let v = [];
                                            for (let i = 0; i < result.urls.length; i++){
                                                // console.log("i:",i)
                                                let vv = {availabilty_id:rows1.insertId,name:data.body.name,description:data.body.description,image_path:result.urls[i] + " " + result.ids[i]};
                                                // console.log("qq:",vv)
                                                v.push(vv)
                                            }
                                            // console.log("queries "+ q,[v.map(item => [item.availabilty_id,item.name,item.description,item.image_path,1])]);
                                            connection.query(q,[v.map(item => [item.availabilty_id,item.name,item.description,item.image_path,1])], (ex,rows2) => {
                                                if (ex) {
                                                    // console.log("4444")
                                                    cloudinary.destroyer(result.ids,  (err, result) => {
                                                        console.log(err, result);
                                                        connection.rollback(function () {
                                                        connection.release();
                                                        callback(ex);
                                                        });});
                                                   
                                                } 
                                                else{
                                                    console.log("55555")
                                                    //commit the transaction
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
                                                            // Availbility creation successful
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
    }
    catch(err) {
        callback(err);
    }
}

function cancelAvailability(data,callback){
    try {
        db.pool.query('UPDATE availabilities SET status=0, updated_at=now() WHERE id=?',
        [data.availId], (ex, rows) => {
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

//Quereis for creating availability sessions.
function createAvailSession(data,callback){
    try {
        db.pool.query('INSERT INTO availability_sessions (availability_id, user_id, quantity, status, requester_message, location, address_1, address_2, city, latitude, longitude, requester_delivery_option, created_at, updated_at)'+
        ' values(?,?,?,?,?,?,?,?,?,?,?,?,now(),now())',
        [data.body.availability_id, data.headers.authData.user.id, data.body.quantity,0,data.body.requester_message, data.body.location, data.body.address_1, data.body.address_2, data.body.city, data.body.latitude, data.body.longitude, data.body.requester_delivery_option], (ex, rows) => {
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



// function postRequestSession(data, callback){
//     try{
//         db.pool.getConnection(function(error, connection){
//             if(error){
//                 connection.rollback();
//             }
//             else{
//                 connection.beginTransaction(function(err){
//                     if(err){
//                         connection.rollback(function(){
//                         connection.release();
//                         callback(err);
//                         });
//                     }
//                     else{
//                         //Gettins status from session table
//                         connection.query('SELECT as.status, as.quantity, as.requester_delivery_option, as.final_delivery_option, as.payment_status,'+
//                         ' as.payment_by, a.available_quantity, a.actual_quantity, a.creator_delivery_option FROM availability_sessions as'+
//                         'JOIN availabilities a on as.availability_id = a.id'+
//                         ' WHERE as.availability_id=?',
//                         [data.avail_id], (ex, rows1) =>{
//                             if(ex){
//                                 connection.rollback(function(){
//                                     connection.release();
//                                     callback(ex);
//                                 });
//                             }
                            
//                         });
//                     }
//                 });
//             }
//         });
//     }
//     catch(err){
//         callback(err);
//     }
// }

//Queries for getting the data for availability session.
function getAvailSession(data,callback){
    try{
        //Since the data has to be fetched from 2 tables, the availabilities table and availability_sessions table joined.
        db.pool.query('SELECT a.id, aa.status, aa.quantity, aa.requester_delivery_option, aa.final_delivery_option, aa.payment_status,'+
                        ' aa.payment_by, a.available_quantity, a.actual_quantity, a.creator_delivery_option FROM availability_sessions aa'+
                        ' JOIN availabilities a on aa.availability_id = a.id'+
                        ' WHERE aa.id=?',
                        [data.avail_ses_id], (ex, rows1) => {
            if(ex){
                callback(ex);
            }
            else{
                callback(null,{row: rows1});
            }
        });
    }
    catch(err) {
    callback(err);
    }
}

// Queries for Updating the availability session status.
function updateAvailSession(data,status,callback){
    try{
        db.pool.query('UPDATE availability_sessions SET status=?, updated_at=now() WHERE id=?',
        [status,data.avail_ses_id], (ex, rows) => {
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

//Queries for updating the status of the sessions and other details related to payment, delivery and quantity of the particular availabiity 
function updateAvailSessionTrans(data,callback){
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
                        connection.query("update availability_sessions set status=?, final_delivery_option=?, delivery_vehicle_option=?, payment_status=?, payment_by=?, updated_at=now()"+
                            " where id=?",
                            [data.status, data.final_delivery_option, data.delivery_vehicle_option, data.payment_status, data.payment_by, data.avail_ses_id], (ex, rows1) => {
                                if (ex) {
                                    connection.rollback(function () {
                                        connection.release();
                                        callback(ex);
                                    });
                                } else {
                                    // update query for public table
                                    connection.query("update availabilities set available_quantity=?, actual_quantity=?, updated_at=now()" +
                                        " where id=?",
                                        [data.available_quantity,data.actual_quantity, data.avail_id], (ex, rows2) => {
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

function cancelAvailSession(data,callback){
    try{
        db.pool.query('UPDATE availability_sessions SET status=?, updated_at=now() WHERE availability_id=?',
        [5,data.avail_id], (ex, rows) => {
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
        db.pool.query('SELECT a.id, a.user_id, a.name, a.availability_type, a.food_type, a.available_quantity, a.city, a.status, u.user_name, u.profile_picture_path, a.best_before FROM availabilities a ' +
            'JOIN users u ON u.id = a.user_id ' +
            'JOIN users uu ON uu.id = ? ' +
            'JOIN cities c ON c.id = a.city ' +
            'JOIN cities cc ON cc.id = uu.city ' +
            'Join districts d ON d.id = c.district_id ' +
            'Join districts dd ON dd.id = cc.district_id ' +
            'WHERE a.status = 1 AND u.status = 1 AND d.id = dd.id AND a.user_id <> ? AND a.best_before > now() ' +
            'ORDER BY a.id DESC',
        [authData.user.id,authData.user.id], (ex, rows) => {
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

function exploreMyAvailability(authData,data,callback){
    try{
        db.pool.query('SELECT a.id, a.user_id, a.name, a.availability_type, a.food_type, a.available_quantity, a.city, a.status, u.user_name, u.profile_picture_path, a.best_before FROM availabilities a ' +
            'JOIN users u ON u.id = a.user_id ' +
            'WHERE a.status = 1 AND u.status = 1 AND a.user_id = ? ' +
            'ORDER BY a.id DESC',
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

function exploreAvailabilityById(data,callback){
    try{
        db.pool.query('SELECT a.*, u.user_name, u.profile_picture_path, at.name as availability_type_name FROM availabilities a ' +
            'JOIN users u ON u.id = a.user_id ' +
            'JOIN availability_types at ON at.id = a.availability_type ' +
            'WHERE a.id = ?',
        [data.availId], (ex, rows1) => {
            if(ex){
                callback(ex);
            }
            else{
                db.pool.query('SELECT name, image_path FROM availability_images ' +
                    'WHERE availability_id = ?',
                    [data.availId], (ex, rows2) => {
                        if(ex){
                            callback(ex);
                        }
                        else {
                            callback(null,{
                                data: rows1,
                                images: rows2
                            });
                        }
                });
            }
        });
    }
    catch(err) {
    callback(err);
    }
}

function getSessions(authData,data,callback){
    try{
        db.pool.query('SELECT s.*, u.user_name, u.profile_picture_path FROM availability_sessions s ' +
            'JOIN availabilities a ON a.id = s.availability_id ' +
            'JOIN users u ON u.id=s.user_id ' +
            'WHERE a.id = ? AND s.status NOT IN (4,5,6)',
        [data.avail_id], (ex, rows) => {
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

function getSession(authData,data,callback){
    try{
        db.pool.query('SELECT s.*, u.user_name, u.profile_picture_path, uu.user_name as cre_user_name, uu.profile_picture_path as cre_profile_picture_path, a.user_id as cre_user_id FROM availability_sessions s ' +
            'JOIN availabilities a ON a.id = s.availability_id ' +
            'JOIN users u ON u.id=s.user_id ' +
            'JOIN users uu ON uu.id=a.user_id ' +
            'WHERE s.id = ?',
        [data.ses_id], (ex, rows) => {
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

// Queries for success availability deliveries.
function availSuccessDelivery(data,callback){
    try{
        db.pool.query('SELECT COUNT(id) FROM availability_sessions'+
                     ' WHERE status = 4',
            (ex, rows1) => {
            if(ex){
                callback(ex);
            }
            else{
                callback(null,{row: rows1});
            }
        });
    }
    catch(err) {
    callback(err);
    }
}

// Queries for ongoing availability deliveries.
function availOngoingDelivery(data,callback){
    try{
        db.pool.query('SELECT COUNT(id) FROM availability_sessions'+
                     ' WHERE status = 1 OR status = 2 OR status = 3 ',
            (ex, rows1) => {
            if(ex){
                callback(ex);
            }
            else{
                callback(null,{row: rows1});
            }
        });
    }
    catch(err) {
    callback(err);
    }
}

function exploreAvailabilityByMySessions(data,callback){
    try{
        db.pool.query('SELECT a.name, a.best_before, u.user_name, u.profile_picture_path, at.name as availability_type_name, s.quantity, s.id as session_id FROM availabilities a ' +
            'JOIN users u ON u.id = a.user_id ' +
            'JOIN availability_sessions s ON s.availability_id = a.id ' +
            'JOIN availability_types at ON at.id = a.availability_type ' +
            'WHERE s.user_id = ? AND a.status=1 AND s.status NOT IN (4,5,6)',
            [data.headers.authData.user.id], (ex, rows1) => {
                if(ex){
                    callback(ex);
                }
                else{

                    callback(null,{
                        data: rows1
                    });
                }
            });
    }
    catch(err) {
        callback(err);
    }
}

function exploreAvailabilityByMySession(data,callback){
    try{
        db.pool.query('SELECT a.*, u.user_name, u.profile_picture_path, at.name as availability_type_name, s.quantity, s.requester_delivery_option, s.final_delivery_option, s.id as session_id, s.status as session_status, s.payment_by, s.payment_status FROM availabilities a ' +
            'JOIN users u ON u.id = a.user_id ' +
            'JOIN availability_sessions s ON s.availability_id = a.id ' +
            'JOIN availability_types at ON at.id = a.availability_type ' +
            'WHERE s.id = ?',
            [data.ses_id], (ex, rows1) => {
                if(ex){
                    callback(ex);
                }
                else{
                    console.log(rows1)
                    db.pool.query('SELECT name, image_path FROM availability_images ' +
                        'WHERE availability_id = ?',
                        [rows1[0].id], (ex, rows2) => {
                            if(ex){
                                callback(ex);
                            }
                            else {
                                callback(null,{
                                    data: rows1,
                                    images: rows2
                                });
                            }
                        });
                }
            });
    }
    catch(err) {
        callback(err);
    }
}

function getAVailabilityDeliveries(data,callback){
    try{
        db.pool.query('SELECT ad.id, ad.driver_id, u.user_name as driver_user_name, u.profile_picture_path as driver_profile_path, p.first_name as driver_first_name, p.last_name as driver_last_name, ' +
            'uu.id as requester_id, uu.user_name as requester_user_name, uu.profile_picture_path as requester_profile_path, pp.first_name as requester_first_name, pp.last_name as requester_last_name, ' +
            'uuu.id as creator_id, uuu.user_name as creator_user_name, uuu.profile_picture_path as creator_profile_path, ppp.first_name as creator_first_name, ppp.last_name as creator_last_name, ' +
            's.id as availability_session_id, s.requester_message, s.quantity as request_quantity, s.status as availability_session_status, ' +
            's.requester_delivery_option, s.final_delivery_option, vt.name as delivery_vehicle_option, s.payment_status, s.payment_by, ' +
            'c.name_en as requested_city, s.longitude as requested_longitude, s.latitude as requested_latitude, s.created_at as request_created_at, ' +
            'a.id as availability_id, a.name as availability_name, a.description as availability_description, a.food_type, a.total_quantity, a.available_quantity, a.actual_quantity, ' +
            'a.cooked_time, a.best_before, a.storage_description, cc.name_en as created_city, a.creator_delivery_option, ' +
            'a.longitude as created_longitude, a.latitude as created_latitude, a.created_at as availability_created_at FROM availability_deliveries ad ' +
            'LEFT JOIN users u ON u.id = ad.driver_id ' +
            'LEFT JOIN public p ON u.id = p.user_id ' +
            'JOIN availability_sessions s ON s.id = ad.availability_session_id ' +
            'JOIN availabilities a ON s.availability_id = a.id ' +
            'JOIN availability_types at ON at.id = a.availability_type ' +
            'JOIN users uu ON uu.id = s.user_id ' +
            'JOIN public pp ON uu.id = pp.user_id ' +
            'JOIN users uuu ON uuu.id = a.user_id ' +
            'JOIN public ppp ON uu.id = ppp.user_id ' +
            'JOIN vehicle_types vt ON vt.id = s.delivery_vehicle_option ' +
            'JOIN cities c ON uu.city = c.id ' +
            'JOIN cities cc ON uuu.city = cc.id ' +
            'WHERE ad.availability_session_id=? AND ad.status = 0',
            [data.avail_ses_id], (ex, rows1) => {
                if(ex){
                    callback(ex);
                }
                else{
                    if(rows1.length>0) {
                        console.log(rows1)
                        db.pool.query('SELECT name, image_path FROM availability_images ' +
                            'WHERE availability_id = ?',
                            [rows1[0].id], (ex, rows2) => {
                                if(ex){
                                    callback(ex);
                                }
                                else {
                                    callback(null,{
                                        data: rows1,
                                        images: rows2
                                    });
                                }
                            });
                    }
                    else {
                        callback({
                            message: "No Data",
                            status:1
                        });
                    }
                }
            });
    }
    catch(err) {
        callback(err);
    }
}

function driverCheckForRide(authData,data,callback){
    try{
        db.pool.query('SELECT ad.id, uu.id as requester_id, uu.user_name as requester_user_name, pp.first_name as requester_first_name, pp.last_name as requester_last_name, ' +
            'uuu.id as creator_id, uuu.user_name as creator_user_name, ppp.first_name as creator_first_name, ppp.last_name as creator_last_name, ' +
            's.id as availability_session_id, s.requester_message, s.quantity as request_quantity, s.status as availability_session_status, ' +
            's.requester_delivery_option, s.final_delivery_option, vt.name as delivery_vehicle_option, s.payment_status, s.payment_by, ' +
            'c.name_en as requested_city, s.longitude as requested_longitude, s.latitude as requested_latitude, s.created_at as request_created_at, ' +
            'a.id as availability_id, a.description as availability_description, a.food_type, a.total_quantity, a.available_quantity, a.actual_quantity, ' +
            'a.cooked_time, a.best_before, a.storage_description, cc.name_en as created_city, a.creator_delivery_option, ' +
            'a.longitude as created_longitude, a.latitude as created_latitude, a.created_at as availability_created_at FROM availability_deliveries ad ' +
            'JOIN users u ON u.id = ? ' +
            // 'LEFT JOIN public p ON u.id = p.user_id ' +
            'JOIN availability_sessions s ON s.id = ad.availability_session_id ' +
            'JOIN availabilities a ON s.availability_id = a.id ' +
            'JOIN availability_types at ON at.id = a.availability_type ' +
            'JOIN users uu ON uu.id = s.user_id ' +
            'JOIN public pp ON uu.id = pp.user_id ' +
            'JOIN users uuu ON uuu.id = a.user_id ' +
            'JOIN public ppp ON uu.id = ppp.user_id ' +
            'JOIN vehicles v ON u.id = v.user_id ' +
            'JOIN vehicle_types vt ON vt.id = s.delivery_vehicle_option ' +
            'JOIN cities c ON uu.city = c.id ' +
            'JOIN cities cc ON uuu.city = cc.id ' +
            'WHERE v.vehicle_type = s.delivery_vehicle_option AND ad.status = 5 AND (u.id NOT IN (select driver_id from driver_requests where driver_requests.avail_session_id=s.id) OR u.id NOT IN (uuu.id, uu.id)) ' +
            'ORDER BY ad.id ' +
            'LIMIT 1',
            [authData.user.id], (ex, rows1) => {
                if(ex){
                    callback(ex);
                }
                else{
                    if(rows1.length>0) {
                        console.log(rows1)
                        db.pool.query('SELECT name, image_path FROM availability_images ' +
                            'WHERE availability_id = ?',
                            [rows1[0].id], (ex, rows2) => {
                                if(ex){
                                    callback(ex);
                                }
                                else {
                                    if(rows1.length>0) {
                                        console.log(rows1)
                                        db.pool.query('insert into driver_requests (driver_id, avail_session_id, status, created_at, upadated_at) ' +
                                            'VALUES (?,?,?,now(),now())',
                                            [authData.user.id,rows1[0].availability_session_id,0], (ex, rows3) => {
                                                if(ex){
                                                    callback(ex);
                                                }
                                                else {
                                                    callback(null,{
                                                        data: rows1,
                                                        images: rows2,
                                                        driver_req_id:rows3.insertId
                                                    });
                                                }
                                            });
                                    }
                                    else {
                                        callback({
                                            message: "No Data",
                                            status:1
                                        });
                                    }
                                }
                            });
                    }
                    else {
                        callback({
                            message: "No Data",
                            status:1
                        });
                    }
                }
            });
    }
    catch(err) {
        callback(err);
    }
}

function driverCheckForRide2(authData,data,callback){
    try{
        console.log(authData);
        db.pool.query('SELECT ad.id, uu.id as requester_id, uu.user_name as requester_user_name, pp.first_name as requester_first_name, pp.last_name as requester_last_name, ' +
            'uuu.id as creator_id, uuu.user_name as creator_user_name, ppp.first_name as creator_first_name, ppp.last_name as creator_last_name, ' +
            's.id as availability_session_id, s.requester_message, s.quantity as request_quantity, s.status as availability_session_status, ' +
            's.requester_delivery_option, s.final_delivery_option, vt.name as delivery_vehicle_option, s.payment_status, s.payment_by, ' +
            'c.name_en as requested_city, s.longitude as requested_longitude, s.latitude as requested_latitude, s.created_at as request_created_at, ' +
            'a.id as availability_id, a.description as availability_description, a.food_type, a.total_quantity, a.available_quantity, a.actual_quantity, ' +
            'a.cooked_time, a.best_before, a.storage_description, cc.name_en as created_city, a.creator_delivery_option, ' +
            'a.longitude as created_longitude, a.latitude as created_latitude, a.created_at as availability_created_at FROM availability_deliveries ad ' +
            'JOIN users u ON u.id = ? ' +
            // 'LEFT JOIN public p ON u.id = p.user_id ' +
            'JOIN availability_sessions s ON s.id = ad.availability_session_id ' +
            'JOIN availabilities a ON s.availability_id = a.id ' +
            'JOIN availability_types at ON at.id = a.availability_type ' +
            'JOIN users uu ON uu.id = s.user_id ' +
            'JOIN public pp ON uu.id = pp.user_id ' +
            'JOIN users uuu ON uuu.id = a.user_id ' +
            'JOIN public ppp ON uu.id = ppp.user_id ' +
            'JOIN vehicle_types vt ON vt.id = s.delivery_vehicle_option ' +
            'JOIN cities c ON uu.city = c.id ' +
            'JOIN cities cc ON uuu.city = cc.id ' +
            'WHERE ad.driver_id=? AND ad.status = 0 ' +
            'ORDER BY ad.id ' +
            'LIMIT 1',
            [authData.user.id,authData.user.id], (ex, rows1) => {
                if(ex){
                    callback(ex);
                }
                else{
                    console.log(rows1.length)
                    if(rows1.length>0) {
                        console.log(rows1)
                        db.pool.query('SELECT name, image_path FROM availability_images ' +
                            'WHERE availability_id = ?',
                            [rows1[0].id], (ex, rows2) => {
                                if(ex){
                                    callback(ex);
                                }
                                else {
                                    callback(null, {
                                        data: rows1,
                                        images: rows2,
                                        driver_req_id: rows1[0].id
                                    });
                                }
                                });
                    }
                    else {
                        callback({
                            message: "No Data",
                            status:1
                        });
                    }
                }
            });
    }
    catch(err) {
        callback(err);
    }
}

function driverCheckForRide3(authData,data,callback){
    try{
        db.pool.query('SELECT ad.id, '+
            's.id as availability_session_id FROM availability_deliveries ad ' +
            'JOIN availability_sessions s ON s.id = ad.availability_session_id ' +
            'WHERE ad.status = 5 AND ad.driver_id NOT IN (select driver_id from driver_requests) ' +
            'LIMIT 1', (ex, rows1) => {
                if(ex){
                    callback(ex);
                }
                else{
                    if(rows1.length>0) {
                        console.log(rows1)
                        db.pool.query('insert into driver_requests (driver_id, avail_session_id, status, created_at, upadated_at) ' +
                            'VALUES (?,?,?,now(),now())',
                            [authData.user.id,rows1[0].availability_session_id,0], (ex, rows3) => {
                                if(ex){
                                    callback(ex);
                                }
                                else {
                                    callback(null,{
                                        data: rows1,
                                        driver_req_id:rows3.insertId
                                    });
                                }
                            });
                    }
                    else {
                        callback({
                            message: "No Data",
                            status:1
                        });
                    }
                }
            });
    }
    catch(err) {
        callback(err);
    }
}

function driverCheckForRide4(authData,data,callback){
    try{
        console.log(authData);
        db.pool.query('SELECT ad.id, uu.id as requester_id, uu.user_name as requester_user_name, pp.first_name as requester_first_name, pp.last_name as requester_last_name, ' +
            'uuu.id as creator_id, uuu.user_name as creator_user_name, ppp.first_name as creator_first_name, ppp.last_name as creator_last_name, ' +
            's.id as availability_session_id, s.requester_message, s.quantity as request_quantity, s.status as availability_session_status, ' +
            's.requester_delivery_option, s.final_delivery_option, vt.name as delivery_vehicle_option, s.payment_status, s.payment_by, ' +
            'c.name_en as requested_city, s.longitude as requested_longitude, s.latitude as requested_latitude, s.created_at as request_created_at, ' +
            'a.id as availability_id, a.description as availability_description, a.food_type, a.total_quantity, a.available_quantity, a.actual_quantity, ' +
            'a.cooked_time, a.best_before, a.storage_description, cc.name_en as created_city, a.creator_delivery_option, ' +
            'a.longitude as created_longitude, a.latitude as created_latitude, a.created_at as availability_created_at FROM availability_deliveries ad ' +
            'JOIN users u ON u.id = ? ' +
            // 'LEFT JOIN public p ON u.id = p.user_id ' +
            'JOIN availability_sessions s ON s.id = ad.availability_session_id ' +
            'JOIN availabilities a ON s.availability_id = a.id ' +
            'JOIN availability_types at ON at.id = a.availability_type ' +
            'JOIN users uu ON uu.id = s.user_id ' +
            'JOIN public pp ON uu.id = pp.user_id ' +
            'JOIN users uuu ON uuu.id = a.user_id ' +
            'JOIN public ppp ON uu.id = ppp.user_id ' +
            'JOIN vehicle_types vt ON vt.id = s.delivery_vehicle_option ' +
            'JOIN cities c ON uu.city = c.id ' +
            'JOIN cities cc ON uuu.city = cc.id ' +
            'WHERE ad.driver_id=? AND ad.status = 0 ' +
            'ORDER BY ad.id ' +
            'LIMIT 1',
            [authData.user.id,authData.user.id], (ex, rows1) => {
                if(ex){
                    callback(ex);
                }
                else{
                    console.log(rows1.length)
                    if(rows1.length>0) {
                        console.log(rows1)
                        db.pool.query('SELECT name, image_path FROM availability_images ' +
                            'WHERE availability_id = ?',
                            [rows1[0].id], (ex, rows2) => {
                                if(ex){
                                    callback(ex);
                                }
                                else {
                                    callback(null, {
                                        data: rows1,
                                        images: rows2,
                                        driver_req_id: rows1[0].id
                                    });
                                }
                                });
                    }
                    else {
                        callback({
                            message: "No Data",
                            status:1
                        });
                    }
                }
            });
    }
    catch(err) {
        callback(err);
    }
}

function updateDriverRequest(data,callback){
    try{
        db.pool.query('UPDATE driver_requests set status = ?, updated_at=now() where id = ?',
            [data.stat, data.driver_req_id], (ex, rows1) => {
                if(ex){
                    callback(ex);
                }
                else{
                    if(rows1.length>0){
                        db.pool.query('select avail_session_id from driver_requests where status=? and id = ?',
                            [data.stat, data.driver_req_id], (ex, rows2) => {
                                if(ex){
                                    callback(ex);
                                }
                                else{
                                    callback(null,{
                                        data: rows1,
                                        paramm:rows2[0].avail_session_id
                                    });
                                }
                            });
                    }
                    else {
                        callback({
                            status: 1,
                            message: "null data"
                        });
                    }

                }
            });
    }
    catch(err) {
        callback(err);
    }
}

module.exports = {
    createAvailability:createAvailability,
    cancelAvailability:cancelAvailability,
    createAvailSession:createAvailSession,
    updateAvailSession: updateAvailSession,
    updateAvailSessionTrans: updateAvailSessionTrans,
    getAvailSession:getAvailSession,
    exploreAvailability:exploreAvailability,
    exploreMyAvailability:exploreMyAvailability,
    getSessions:getSessions,
    getSession:getSession,
    availSuccessDelivery:availSuccessDelivery,
    availOngoingDelivery:availOngoingDelivery,
    exploreAvailabilityById:exploreAvailabilityById,
    exploreAvailabilityByMySessions:exploreAvailabilityByMySessions,
    exploreAvailabilityByMySession:exploreAvailabilityByMySession,
    getAVailabilityDeliveries:getAVailabilityDeliveries,
    driverCheckForRide:driverCheckForRide,
    driverCheckForRide2:driverCheckForRide2,
    updateDriverRequest:updateDriverRequest,
    driverCheckForRide3:driverCheckForRide3
}


