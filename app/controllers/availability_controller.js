const availabilityService = require('../services/availability_service');

//createAvailability of public
function createAvailability (req, res){
    console.log("request body: ",req.body)
    availabilityService.createAvailability(req, function(err, results){
        if(err){
            res.json({status_code:1, message: 'Cannot create Availability', error: err.message});
        }
        else{
            console.log(results)
            res.json({
                status_code: 0,
                message: 'Availability creation Success',
                result: results,
                authData: req.headers.authData,
                token: req.token
            });
        }
    });
}

function createAvailSession (req, res){
    console.log(req.body)
    availabilityService.createAvailSession(req, function(err, results){
        if(err){
            res.json({status_code:1, message: 'Cannot create Availability Sessions', error: err.message});
        }
        else{
            console.log(results)
            res.json({
                status_code: 0,
                message: 'Availability Sessions creation Success',
                result: results,
                authData: req.headers.authData,
                token: req.token
            });
        }
    });
}

// function statusAvailSession (req, res){
//     //console.log(req.body)
//     availabilityService.acceptAvailSession(req, function(err, results1){
//         if(err){
//             res.json({status_code:1, message: 'Cannot create Availability Sessions', error: err.message});
//         }
//         else{
//             let final = {
//                 quantity: results1.quantity,
//                 final_delivery_option: 0, 
//                 payment_status: 0, 
//                 payment_by: 0
//             }
//             console.log(results)

//             if(w2){
//                 if(e22){

//                 }
//                 else{

//                 }
//             }
//             else if(ghb){
//                 if(xsx){

//                 }
//                 else{

//                 }
//             }
//             else{
                
//             }
//             availabilityService.reAvailSession(req.params.id, final, function(err, results2){
//                 if(err){
//                     res.json({status_code:1, message: 'Cannot create Availability Sessions', error: err.message});
//                 }
//                 else{
//                     res.json({
//                         status_code: 0,
//                         message: 'Availability Sessions creation Success',
//                         result: results,
//                         authData: req.headers.authData,
//                         token: req.token
//                     });
//                 }     
//             }
            
//         }
//     });
// }

function rejectAvailSession (req, res){
    console.log("request body: ",req.params)
    availabilityService.updateAvailSession(req.params, 5, function(err, results){
        if(err){
            res.json({status_code:1, message: 'Cannot reject Session', error: err.message});
        }
        else{
            console.log(results)
            res.json({
                status_code: 0,
                message: 'Availability Session rejection Success',
                result: results,
                authData: req.headers.authData,
                token: req.token
            });
        }
    });
}

function cancelAvailSession (req, res){
    console.log("request body: ",req.params)
    availabilityService.getAvailSession(req.params, function(err1, results1){
        if(err1){
            res.json({status_code:1, message: 'Cannot get Session', error: err1.message});
        }
        else{
            if(results1.row[0].status==0) {
                availabilityService.updateAvailSession(req.params, 6, function(err2, results2){
                    if(err2){
                        res.json({status_code:1, message: 'Cannot reject Session', error: err2.message});
                    }
                    else{
                        // console.log(results2)
                        res.json({
                            status_code: 0,
                            message: 'Availability Session cancel Success',
                            result: results2,
                            authData: req.headers.authData,
                            token: req.token
                        });
                    }
                });
            }
            else if(results1.row[0].status==1) {
                console.log("qqqqqqq")
                const data={
                    status:6,
                    avail_ses_id:req.params.avail_ses_id,
                    avail_id:results1.row[0].id,
                    final_delivery_option:results1.row[0].final_delivery_option,
                    payment_status:results1.row[0].payment_status,
                    payment_by:results1.row[0].payment_by,
                    available_quantity:results1.row[0].available_quantity + results1.row[0].quantity
                }

                console.log("sdfgsgf",data)

                availabilityService.updateAvailSessionTrans(data, function(err3, results3){
                    if(err3){
                        res.json({status_code:1, message: 'Cannot reject Session', error: err3.message});
                    }
                    else{
                        console.log(results3)
                        res.json({
                            status_code: 0,
                            message: 'Availability Session cancel Success',
                            result: results3,
                            authData: req.headers.authData,
                            token: req.token
                        });
                    }
                });
            }
            else {
                res.json({
                    status_code: 0,
                    message: 'Cannot cancel at this moment',
                    authData: req.headers.authData,
                    token: req.token
                });
            }
            console.log("äsdsasdsasdsas",results1.row[0].id)
        }
    });
}


module.exports = {
    createAvailability:createAvailability,
    createAvailSession:createAvailSession,
    rejectAvailSession:rejectAvailSession,
    cancelAvailSession:cancelAvailSession
    //statusAvailSession: statusAvailSession
}