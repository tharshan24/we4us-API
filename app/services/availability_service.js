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
                            if(!result || result == undefined){
                                connection.rollback(function(){
                                connection.release();
                                callback(ex);
                                });
                            }
                            else{
                                //insert query for availabilities table
                                connection.query("INSERT INTO availabilities (user_id, name, availability_type, other_description, description, food_type, total_quantity, " + 
                                "available_quantity, actual_quantity, cooked_time, best_before, storage_description, location, address_1, address_2, city, latitude, longitude," +
                                "cater_description, creator_delivery_option, creator_vehicle_option, status, image_status, created_at, updated_at)" +
                                "VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,now(),now())",
                                [data.headers.authData.user.id,data.body.name,data.body.availability_type, data.body.other_description, data,body.description,
                                data.body.food_type,data.body.total_quantity,data.body.available_quantity,data.body.actual_quantity,data.body.cooked_time,
                                data.body.best_before,data.body.storage_description,data.body.location,data.body.address_1,data.body.address_2,data.body.city,
                                data.body.latitude,data.body.longitude,data.body.cater_description,data.body.creator_delivery_option,data.body.creator_vehicle_option,
                                data.body.status,data.body.image_status] , (ex,rows1) => {
                                    if(ex){
                                        
                                        cloudinary.destroyer(result.ids,  (err, result) => {
                                            console.log(err, result);
                                            connection.rollback(function () {
                                            connection.release();
                                            callback(ex);
                                            });
                                        });
                                    }
                                    else{
                                        //insert query for availability_images table
                                    
                                            let q = "INSERT INTO availability_images (availability_id, name, description, image_path,status,"+
                                            "created_at, updated_at) VALUES ?";
                                            let v = [];
                                            for (const i in result.urls.length){
                                                v.push([rows1.insertId,data.body.name, data.body.description,result.urls[i] + " " + result.ids[i],data.body.status,'now()','now()'])
                                            }
                                            console.log("queries "+ q,[v]);
                                            connection.query(q,[v], (ex,rows2) => {
                                                if (ex) {
                                                    cloudinary.destroyer(result.ids,  (err, result) => {
                                                        console.log(err, result);
                                                        connection.rollback(function () {
                                                        connection.release();
                                                        callback(ex);
                                                        });});
                                                   
                                                } 
                                                else{
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

function requestSession(data,callback){
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
                            if(!result || result == undefined){
                                connection.rollback(function(){
                                connection.release();
                                callback(ex);
                                });
                            }
                            else{
                                db.pool.query('INSERT INTO availability_sessions (availability_id, user_id, quantity, requester_message, location, address_1, address_2, city, latitude, longitude, creator_feedback, requester_feedback, created_at, updated_at)'+
                                ' values(?,?,?,?,?,?,?,?,?,?,?,?,now(),now())',
                                [data.body.availability_id, data.headers.authData.user.id, data.body.quantity,data.body.requester_message, data.body.location, data.body.address_1, data.body.address_2, data.body.city, data.body.latitude, data.body.longitude, data.body.creator_feedback, data.body.requester_feedback], (ex, rows) => {
                                    if(ex){
                                        connection.rollback(function(){
                                        connection.release();
                                        callback(err);
                                        });
                                    } {
                                        
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

module.exports = {
    createAvailability:createAvailability,
    requestSession:requestSession
}