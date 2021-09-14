const db = require('../config/database');
const main = require('../config/main');

//Queries to get all Districts
function getDistricts(data,callback){
    try {
        //using the connection to query
        db.pool.query('select id, name_en from districts where status=1', (ex, rows) => {
            if (ex) {
                callback(ex);
            } else {
                if(rows.length>0){
                    callback(null, {
                        rows
                        });
                } else {
                    callback({status:1, message: "DB error"});
                }
            }
        });
    } catch(err) {
        callback(err);
    }
}

//Queries to get all cities in a District
function getCitiesByDistricts(data,callback){
    try {
        //using the connection to query
        db.pool.query('select id, name_en from cities where status=1 and district_id=?', [data.district], (ex, rows) => {
            if (ex) {
                callback(ex);
            } else {
                if(rows.length>0){
                    callback(null, {rows});
                } else {
                    callback({status:1, message: "DB error"});
                }
            }
        });
    } catch(err) {
        callback(err);
    }
}

//Queries to get vehicle types
function getVehicleTypes(data,callback){
    try {
        //using the connection to query
        db.pool.query('select id, name, capacity from vehicle_types where status=1', (ex, rows) => {
            if (ex) {
                callback(ex);
            } else {
                if(rows.length>0){
                    callback(null, {
                        rows
                    });
                } else {
                    callback({status:1, message: "DB error"});
                }
            }
        });
    } catch(err) {
        callback(err);
    }
}

//Queries to get availability types
function getAvailabilityType(data,callback){
    try {
        //using the connection to query
        db.pool.query('SELECT id, name FROM availability_types WHERE status=1', (ex, rows) => {
            if (ex) {
                callback(ex);
            } else {
                if(rows.length>0){
                    callback(null, {
                        rows
                    });
                } else {
                    callback({status:1, message: "DB error"});
                }
            }
        });
    } catch(err) {
        callback(err);
    }
}

//Queries to get request types
function getRequestType(data,callback){
    try {
        //using the connection to query
        db.pool.query('SELECT id, name FROM request_types WHERE status=1', (ex, rows) => {
            if (ex) {
                callback(ex);
            } else {
                if(rows.length>0){
                    callback(null, {
                        rows
                    });
                } else {
                    callback({status:1, message: "DB error"});
                }
            }
        });
    } catch(err) {
        callback(err);
    }
}




module.exports = {
    getDistricts:getDistricts,
    getCitiesByDistricts:getCitiesByDistricts,
    getVehicleTypes:getVehicleTypes,
    getAvailabilityType:getAvailabilityType,
    getRequestType:getRequestType
}