const db = require('../config/database');
const main = require('../config/main');


// Queries for viewing all Organizations data
function viewAllOrganizations(data,callback){
    try{
        db.pool.query('SELECT * FROM organizations',
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
        db.pool.query('SELECT * FROM organizations WHERE id=?',[authData.user.id],
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
        db.pool.query('SELECT * FROM organizations WHERE organization_type=?',[type],
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
    viewOrganizationsbyType:viewOrganizationsbyType
}