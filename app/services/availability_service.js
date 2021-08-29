const db = require('../config/database');
const main = require('../config/main');
const upload = require('../utilities/multer');
const cloudinary = require('../utilities/cloudinary');


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
                            if(!result || result == undefined){
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
                                "cater_description, creator_delivery_option, delivery_vehicle_option, status, image_status, created_at, updated_at)" +
                                "VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,now(),now())",
                                [data.headers.authData.user.id,data.body.name,data.body.availability_type, data.body.other_description, data.body.description,
                                data.body.food_type,data.body.total_quantity,data.body.total_quantity,data.body.total_quantity,data.body.cooked_time,
                                data.body.best_before,data.body.storage_description,data.body.location,data.body.address_1,data.body.address_2,data.body.city,
                                data.body.latitude,data.body.longitude,data.body.cater_description,data.body.creator_delivery_option,data.body.delivery_vehicle_option,
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


function createAvailSession(data,callback){
    try {
        db.pool.query('INSERT INTO availability_sessions (availability_id, user_id, quantity, status, requester_message, location, address_1, address_2, city, latitude, longitude, creator_feedback, requester_feedback, created_at, updated_at)'+
        ' values(?,?,?,?,?,?,?,?,?,?,?,?,?,now(),now())',
        [data.body.availability_id, data.headers.authData.user.id, data.body.quantity,0,data.body.requester_message, data.body.location, data.body.address_1, data.body.address_2, data.body.city, data.body.latitude, data.body.longitude, data.body.creator_feedback, data.body.requester_feedback], (ex, rows) => {
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

function getAvailSession(data,callback){
    try{
        db.pool.query('SELECT a.id, as.status, as.quantity, as.requester_delivery_option, as.final_delivery_option, as.payment_status,'+
                        ' as.payment_by, a.available_quantity, a.actual_quantity, a.creator_delivery_option FROM availability_sessions as'+
                        'JOIN availabilities a on as.availability_id = a.id'+
                        ' WHERE as.availability_id=?',
                        [data.avail_id], (ex, rows1) => {
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

function updateAvailSession(data,status,callback){
    try{
        db.pool.query('UPDATE availability_sessions SET status=?, updated_at=now() WHERE availability_id=?',
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
                        connection.query("update availability_sessions set status=?, final_delivery_option=?, payment_status=?, payment_by=?, updated_at=now()"+
                            " where id=?",
                            [data.status, data.final_delivery_option, data.payment_status, data.payment_by, data.avail_ses_id], (ex, rows1) => {
                                if (ex) {
                                    connection.rollback(function () {
                                        connection.release();
                                        callback(ex);
                                    });
                                } else {
                                    // update query for public table
                                    connection.query("update availabilities set available_quantity=?, updated_at=now()" +
                                        " where id=?",
                                        [data.available_quantity, data.avail_id], (ex, rows2) => {
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



module.exports = {
    createAvailability:createAvailability,
    createAvailSession:createAvailSession,
    updateAvailSession: updateAvailSession,
    updateAvailSessionTrans: updateAvailSessionTrans,
    getAvailSession:getAvailSession
}


