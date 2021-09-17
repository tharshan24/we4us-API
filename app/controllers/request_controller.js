const requestService = require('../services/request_service');


//createRequest  
function createRequest (req, res){
    console.log("request body: ",req.body)
    requestService.createRequest(req, function(err, results){
        if(err){
            res.json({status_code:1, message: 'Cannot create requests', error: err.message});
        }
        else{
            console.log(results)
            res.json({
                status_code: 0,
                message: 'Request creation Success!',
                result: results,
                authData: req.headers.authData,
                token: req.token
            });
        }
    });
}

//creating request sessions
function createReqSession (req, res){
    console.log(req.body)
    requestService.createReqSession(req.body, function(err, results){
        if(err){
            res.json({status_code:1, message: 'Cannot create request Sessions', error: err.message});
        }
        else{
            console.log(results)
            res.json({
                status_code: 0,
                message: 'Request Sessions creation Success',
                result: results,
                authData: req.headers.authData,
                token: req.token
            });
        }
    });
}


//get request types
function getRequestType (req, res){
    console.log(req.params)
    requestService.getRequestType(req.params, function(err, results){
        if(err){
            res.json({status_code:1, message: 'Cannot get request types', error: err.message});
        }
        else{
            console.log(results)
            res.json({
                status_code: 0,
                message: 'Request types getting success',
                result: results,
                authData: req.headers.authData,
                token: req.token
            });
        }
    });
}

//Updating the status to accepted.
function acceptReqSession (req, res){
    console.log("request body: ",req.params)
    requestService.getQuantityWithStatus(req.params,function(err1, results1){
        if(err1){
            res.json({status_code:1, message: 'Cannot get the current status', error: err1.message});
        }
        else{
            let q = results1.row[0].quantity; 
          if(results1.row[0].status==0){ //Updating status to accepted when the current stage is pending
            const data = {
                status:1,
                req_ses_id:req.params.req_ses_id,
                total_quantity:results1.row[0].total_quantity,
                needed_quantity:results1.row[0].needed_quantity,
                actual_quantity:results1.row[0].actual_quantity,
            }
            requestService.updateReqSessionStatus(req.params, 1, function(err2, results2){
                if(err2){
                    res.json({status_code:1, message: 'Cannot update Session to Accepted', error: err2.message});
                }
                else{
                    // console.log(results2)
                    res.json({
                        status_code: 0,
                        message: 'Request Session updating to accepted is Success',
                        result: results2,
                        authData: req.headers.authData,
                        token: req.token
                    });
                }
            });
          }
          else{
            res.json({
                status_code: 0,
                message: 'The current status is not in waiting stage',
                authData: req.headers.authData,
                token: req.token
            })
          }
        }
    });
}


//Updating the status to cancelled.
function cancelReqSession (req, res){
    console.log("request body: ",req.params)
    requestService.getReqSessionStatus(req.params,function(err1, results1){
        if(err1){
            res.json({status_code:1, message: 'Cannot get the current status', error: err1.message});
        }
        else{
          if(results1.row[0].status==0){ //Updating status to cancelled when the current stage is pending
            requestService.updateReqSessionStatus(req.params,6, function(err2, results2){
                if(err2){
                    res.json({status_code:1, message: 'Cannot update Session to cancelled', error: err2.message});
                }
                else{
                    // console.log(results2)
                    res.json({
                        status_code: 0,
                        message: 'Request Session updating to cancelled is Success',
                        result: results2,
                        authData: req.headers.authData,
                        token: req.token
                    });
                }
            });
          }

        //   else if(results1.row[0].status==1){ //Updating status to cancelled when the current stage is accepted
        //     requestService.updateReqSessionStatus(req.params,6, function(err3, results3){
        //         if(err3){
        //             res.json({status_code:1, message: 'Cannot update Session to cancelled', error: err3.message});
        //         }
        //         else{
        //             // console.log(results2)
        //             res.json({
        //                 status_code: 0,
        //                 message: 'Request Session updating to cancelled is Success',
        //                 result: results3,
        //                 authData: req.headers.authData,
        //                 token: req.token
        //             });
        //         }
        //     });
        //   }
          else{
            res.json({
                status_code: 0,
                message: 'The current status is not in waiting stage',
                authData: req.headers.authData,
                token: req.token
            })
          }
        }
    });
}


//Updating the status to rejected.
function rejectReqSession (req, res){
    console.log("request body: ",req.params)
    requestService.getReqSessionStatus(req.params,function(err1, results1){
        if(err1){
            res.json({status_code:1, message: 'Cannot get the current status', error: err1.message});
        }
        else{
          if(results1.row[0].status==1){ //Updating status to cancelled when the current stage is pending
            requestService.updateReqSessionStatus(req.params,6, function(err2, results2){
                if(err2){
                    res.json({status_code:1, message: 'Cannot update Session to rejected', error: err2.message});
                }
                else{
                    // console.log(results2)
                    res.json({
                        status_code: 0,
                        message: 'Request Session updating to rejected is Success',
                        result: results2,
                        authData: req.headers.authData,
                        token: req.token
                    });
                }
            });
          }
          else{
            res.json({
                status_code: 0,
                message: 'The current status is not in accepted stage',
                authData: req.headers.authData,
                token: req.token
            })
          }
        }
    });
}

//Updating the status to delivered.
function deliverReqSession (req, res){
    console.log("request body: ",req.params)
    requestService.getReqSessionStatus(req.params,function(err1, results1){
        if(err1){
            res.json({status_code:1, message: 'Cannot get the current status', error: err1.message});
        }
        else{
          if(results1.row[0].status==1){ //Updating status to delivered when the current stage is pending
            requestService.updateReqSessionStatus(req.params,4, function(err2, results2){
                if(err2){
                    res.json({status_code:1, message: 'Cannot update Session to delivered', error: err2.message});
                }
                else{
                    // console.log(results2)
                    res.json({
                        status_code: 0,
                        message: 'Request Session updating to Delivered is Success',
                        result: results2,
                        authData: req.headers.authData,
                        token: req.token
                    });
                }
            });
          }
          else{
            res.json({
                status_code: 0,
                message: 'The current status is not in accepted stage',
                authData: req.headers.authData,
                token: req.token
            })
          }
        }
    });
}



module.exports = {
    createRequest:createRequest,
    createReqSession:createReqSession,
    getRequestType:getRequestType,
    acceptReqSession:acceptReqSession,
    cancelReqSession:cancelReqSession,
    rejectReqSession:rejectReqSession,
    deliverReqSession:deliverReqSession

}