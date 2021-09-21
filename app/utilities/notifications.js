const db = require('../config/database');
const main = require('../config/main');

function createNotification(data, callback) {
    try {
        db.pool.query('INSERT INTO notifications (from_id, to_id, message, status, type, text, param, created_at, updated_at) ' +
            'VALUES (?,?,?,?,?,?,?,now(),now())', [data.from_id, data.to_id, data.message, 1, data.type, data.textss, data.paramm],
            (ex, rows) => {
                if(ex) {
                    console.log(ex);
                    callback(ex);
                }
                else {
                    callback(
                        null, { rows:rows }
                    )
                }
            });
    }
    catch (err) {
        console.log(err);
        callback(err);
    }

}

function getAllNotifications(authData, data, callback) {
    try {
        db.pool.query('SELECT n.*, u.user_name as from_name FROM notifications n ' +
            'JOIN users u ON u.id = n.from_id ' +
            'WHERE n.to_id = ? ' +
            'ORDER BY n.id DESC ' +
            'LIMIT 15', [authData.user.id],
            (ex, rows) => {
                if(ex) {
                    console.log(ex);
                    callback(ex);
                }
                else {
                    let ids = "";
                    ids+=rows[0].id;
                    for(let i = 1; i < rows.length; i++) {
                        ids=ids+","+rows[i].id;
                    }
                    db.pool.query(`UPDATE notifications SET status = 0 WHERE id IN (${ids})`, (exx, rows2) => {
                        if(exx){
                            console.log(exx);
                            callback(exx);
                        }
                        else {
                            if(rows.length>0){}
                            callback(null, {
                                rows:rows,
                                update:rows2
                            });
                        }
                    })
                }
            })
    }
    catch (err) {
        console.log(err);
        callback(err);
    }
}

function getActiveNotifications(authData, data, callback) {
    try {
        db.pool.query('SELECT n.*, u.user_name as from_name FROM notifications n ' +
            'JOIN users u ON u.id = n.from_id ' +
            'WHERE n.to_id = ? AND n.status = 1 ' +
            'ORDER BY n.id DESC ' +
            'LIMIT 15', [authData.user.id],
            (ex, rows) => {
                if(ex) {
                    console.log(ex);
                    callback(ex);
                }
                else {
                    let ids = "";
                    ids+=rows[0].id;
                    for(let i = 1; i < rows.length; i++) {
                        ids=ids+","+rows[i].id;
                    }
                    db.pool.query(`UPDATE notifications SET status = 0 WHERE id IN (${ids})`, (exx, rows2) => {
                        if(exx){
                            console.log(exx);
                            callback(exx);
                        }
                        else {
                            callback(null, {
                                rows:rows,
                                update:rows2
                            });
                        }
                    })
                }
            })
    }
    catch (err) {
        console.log(err);
        callback(err);
    }
}

function getCount(authData, data, callback) {
    try {
        db.pool.query(`SELECT COUNT(id) FROM notifications WHERE status=1 AND to_id=${authData.user.id}`,
            (ex, rows) => {
                if(ex) {
                    console.log(ex);
                    callback(null, {
                        rows:rows
                    });
                }
                else {

                }
            })
    }
    catch (err) {
        console.log(err);
        callback(err);
    }
}

module.exports ={
    getAllNotifications:getAllNotifications,
    getActiveNotifications:getActiveNotifications,
    getCount:getCount,
    createNotification:createNotification
}