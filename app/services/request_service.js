const db = require('../config/database');
const main = require('../config/main');


//Queries for create requests
function createRequest(data,callback){
    try {
        db.pool.query("INSERT INTO requests (user_id, name, request_type, other_description, description, items_priority, need_before, " + 
        "location, address_1, address_2, city, latitude, longitude," +
        "creator_delivery_option, status, created_at, updated_at)" +
        "VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,now(),now())",
        [data.headers.authData.user.id,data.body.name,data.body.request_type, data.body.other_description, data.body.description,
        data.body.items_priority,data.body.need_before,data.body.location,data.body.address_1,data.body.address_2,data.body.city,
        data.body.latitude,data.body.longitude,data.body.creator_delivery_option,1],
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
    createRequest:createRequest
}