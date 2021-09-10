const db = require('../config/database');
const main = require('../config/main');

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


module.exports = {
    getDistricts:getDistricts,
    getCitiesByDistricts:getCitiesByDistricts,
    getVehicleTypes:getVehicleTypes
}