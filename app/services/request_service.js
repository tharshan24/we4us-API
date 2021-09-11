const db = require('../config/database');
const main = require('../config/main');


//Queries for create requests
function createRequest(data,callback){
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
                                // console.log("service")
                                //insert query for requests table
                                connection.query("INSERT INTO requests (user_id, name, request_type, other_description, description, items_priority, need_before, " + 
                                "location, address_1, address_2, city, latitude, longitude," +
                                "creator_delivery_option, status, created_at, updated_at)" +
                                "VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,now(),now())",
                                [data.headers.authData.user.id,data.body.name,data.body.request_type, data.body.other_description, data.body.description,
                                data.body.items_priority,data.body.need_before,data.body.location,data.body.address_1,data.body.address_2,data.body.city,
                                data.body.latitude,data.body.longitude,data.body.creator_delivery_option,1],
                                (ex, rows1) => {
                                    if(ex){
                                        connection.rollback(function () {
                                            connection.release();
                                            callback(ex);
                                        });
                                    }
                                    else{
                                        // console.log("results table1",result)
                                        //insert query for request_items table
                                    
                                            let q = "INSERT INTO request_items (request_id, name, description, items, needed_quantity, status) VALUES ?";
                                            let v = [];
                                            for (let i = 0; i < data.body.items.length; i++){
                                                // console.log("i:",i)
                                                let vv = {request_id:rows1.insertId,name:data.body.name,description:data.body.description,items:data.body.items[i],needed_quantity:data.body.needed_quantity[i]};
                                                // console.log("qq:",vv)
                                                v.push(vv)
                                            }
                                            // console.log("queries "+ q,[v.map(item => [item.availabilty_id,item.name,item.description,item.image_path,1])]);
                                            connection.query(q,[v.map(item => [item.request_id,item.name,item.description,item.items,item.needed_quantity,1])], (ex,rows2) => {
                                                if (ex) {
                                                    // console.log("error table2")
                                                    connection.rollback(function () {
                                                        connection.release();
                                                        callback(ex);
                                                    });
                                                } 
                                                else{
                                                    //console.log("result table2")
                                                    //commit the transaction
                                                    connection.commit(function (err) {
                                                        if (err) {
                                                            connection.rollback(function () {
                                                                connection.release();
                                                                callback(err);
                                                            });
                                                        } else {
                                                            // Request creation successful
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
    catch(err) {
        callback(err);
    }
}



module.exports = {
    createRequest:createRequest
}