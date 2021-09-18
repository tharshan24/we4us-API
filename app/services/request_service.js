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
                                "status, created_at, updated_at)" +
                                "VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,now(),now())",
                                [data.headers.authData.user.id,data.body.name,data.body.request_type, data.body.other_description, data.body.description,
                                data.body.items_priority,data.body.need_before,data.body.location,data.body.address_1,data.body.address_2,data.body.city,
                                data.body.latitude,data.body.longitude,1],
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
                                            let q = "INSERT INTO request_items (request_id, name, description, total_quantity, actual_quantity, needed_quantity, status) VALUES ?";
                                            let v = [];
                                            for (let i = 0; i < data.body.items.length; i++){
                                                // console.log("i:",i)
                                                let vv = {request_id:rows1.insertId, name:data.body.name, description:data.body.description, total_quantity:data.body.total_quantity[i], actual_quantity:data.body.actual_quantity[i], total_quantity:data.body.needed_quantity[i]};
                                                // console.log("qq:",vv)
                                                v.push(vv)
                                            }
                                            // console.log("queries "+ q,[v.map(item => [item.availabilty_id,item.name,item.description,item.image_path,1])]);
                                            connection.query(q,[v.map(item => [item.request_id, item.name,item.description, item.total_quantity, item.actual_quantity, item.needed_quantity, 1])], (ex,rows2) => {
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



//Queries for create requests
function createReqSession(data,callback){
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
                                db.pool.query('INSERT INTO request_sessions (request_id, user_id, attender_message, status, location, address_1, address_2, city, latitude, longitude, creator_feedback, attender_feedback, created_at, updated_at)'+
                                ' values(?,?,?,?,?,?,?,?,?,?,?,?,now(),now())',
                                [data.request_id, data.headers.authData.user.id, data.attender_message, 0, data.location, data.address_1, data.address_2, data.city, data.latitude, data.longitude, data.creator_feedback, data.requester_feedback],
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
                                            let q = "INSERT INTO request_session_items (request_id, name, description, quantity, status) VALUES ?";
                                            let v = [];
                                            for (let i = 0; i < data.body.items.length; i++){
                                                // console.log("i:",i)
                                                let vv = {request_id:rows1.insertId,name:data.body.name,description:data.body.description, quantity:data.body.quantity[i]};
                                                // console.log("qq:",vv)
                                                v.push(vv)
                                            }
                                            // console.log("queries "+ q,[v.map(item => [item.availabilty_id,item.name,item.description,item.image_path,1])]);
                                            connection.query(q,[v.map(item => [item.request_id,item.name,item.description, item.quantity,1])], (ex,rows2) => {
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

//Quereis for creating request sessions.
function createReqSession(data,callback){
    try {
        db.pool.query('INSERT INTO request_sessions (request_id, user_id, attender_message, status, location, address_1, address_2, city, latitude, longitude, creator_feedback, attender_feedback, created_at, updated_at)'+
        ' values(?,?,?,?,?,?,?,?,?,?,?,?,now(),now())',
        [data.request_id, data.headers.authData.user.id, data.attender_message, 0, data.location, data.address_1, data.address_2, data.city, data.latitude, data.longitude, data.creator_feedback, data.requester_feedback], (ex, rows) => {
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


//Queries for getting the data from request session.

function getReqSessionStatus(data,callback){
    try{
        db.pool.query('SELECT status FROM request_sessions WHERE id=?'
            [data.req_ses_id], (ex, rows) => {
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

// Queries for Updating the request session status.
function updateReqSessionStatus(data,status,callback){
    try{
        db.pool.query('UPDATE request_sessions SET status=?, updated_at=now() WHERE id=?',
        [status,data.req_ses_id], (ex, rows) => {
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
function addReqSessionItems(data,callback){
    try {
        // db.pool.query('INSERT INTO request_session_items (request_session_id, item_id, quantity, status, created_at, updated_at)'+
        // ' values(?,?,?,?,now(),now())',
        // [data.body.request_session_id, data.body.item_id, data.body.quantity,1],
        let c = "SELECT COUNT(ri.items) FROM request_items ri JOIN requests r ON r.id = ri.request_id WHERE ri.status=1"
        let q = "INSERT INTO request_session_items (request_session_id, item_id, quantity, status, created_at, updated_at) VALUES ?";
        let v = [];
        for (let i = 0; i < c; i++){
            // console.log("i:",i)
            let vv = {request_session_id:data.body.request_session_id,item_id:data.body.item_id[i],quantity:data.body.quantity[i]};
            // console.log("qq:",vv)
            v.push(vv)
        }
        connection.query(q,[v.map(item => [item.request_session_id,item.item_id,item.quantity,1,now,now])], 
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

//Queries for getting the data from request types.
function getRequestType(data,callback){
    try{
        db.pool.query('SELECT id,name FROM request_types WHERE status = 1',
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


//Queries for getting the request session items.
function getReqSessionItems(data,callback){
    try{
        db.pool.query('SELECT id FROM request_sessions WHERE status = 1',
            (ex, rows1) => {
            if(ex){
                callback(ex);
            }
            else{
                    db.pool.query('SELECT id,name FROM request_types WHERE status = 1',
                    (ex, rows2) => {
                    if(ex){
                    callback(ex);
                    }
                     else{
                    callback(null,{row: rows1,rows2});
                 }
             });
            }
        });
    }
    catch(err) {
    callback(err);
    }
}

function getQuantityWithStatus(authData,data,callback){
    try{
        db.pool.query('SELECT rs.status, rsi.id, rsi.item_id, rsi.quantity FROM request_sessions rs ' +
            'JOIN request_session_items rsi ON rs.id = rsi.request_session_id ' +
            'JOIN request_items ri ON ri.id = rsi.item_id ' +
            'WHERE rs.id=? rs.status = 1 AND rsi.status = 1 AND ri.status = 1',
            [data.req_ses_id], (ex, rows) => {
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

function updateQuantityWithStatus(data,callback){
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
                        // update query for request sessions
                        connection.query("update request_sessions set status=?, updated_at=now()"+
                            " where id=?",
                            [data.status,data.req_ses_id], (ex, rows1) => {
                                if (ex) {
                                    connection.rollback(function () {
                                        connection.release();
                                        callback(ex);
                                    });
                                } else {
                                    // update query for request_items table
                                    connection.query("update request_items set total_quantity=?, needed_quantity=?, actual_quantity=?, updated_at=now()" +
                                        " where id=?",
                                        [data.total_quantity, data.needed_quantity, data.actual_quantity, data.avail_id], (ex, rows2) => {
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

module.exports = {
    createRequest:createRequest,
    createReqSession:createReqSession,
    getReqSessionStatus:getReqSessionStatus,
    updateReqSessionStatus:updateReqSessionStatus,
    addReqSessionItems:addReqSessionItems,
    getRequestType:getRequestType,
    getReqSessionItems:getReqSessionItems,
    getQuantityWithStatus:getQuantityWithStatus,
    updateQuantityWithStatus:updateQuantityWithStatus
}