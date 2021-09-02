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

//creating availability sessions
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

//accepting status of an availability session
function acceptAvailSession (req, res){
    console.log("request body: ",req.params)
    availabilityService.getAvailSession(req.params, function(err1, results1){
        if(err1){
            res.json({status_code:1, message: 'Cannot get Sessions', error: err.message});
        }
        else{
            if(results1.row[0].status==0) { //If the initial status is pending.
                console.log("check1");
                let data={ //initializing an object to update the data.
                    status:1,
                    avail_ses_id:req.params.avail_ses_id,
                    avail_id:results1.row[0].id,
                    available_quantity:results1.row[0].available_quantity - results1.row[0].quantity,
                    actual_quantity:results1.row[0].actual_quantity,
                    quantity:results1.row[0].quantity
                }
    
                console.log("check2",data)
                //logic for changing assigning final data related to delivery and payment.
                if(results1.row[0].requester_delivery_option==0 || results1.row[0].creator_delivery_option==0){
                    if(results1.row[0].requester_delivery_option==0){
                        console.log("check1_1");
                            data.final_delivery_option=0,
                            data.payment_status=0,
                            data.payment_by=2
                        
                        console.log("data1_1",data)
                    }
                    else{
                            data.final_delivery_option=0,
                            data.payment_status=0,
                            data.payment_by=1
                    }
                }
                else if(results1.row[0].requester_delivery_option==2 || results1.row[0].creator_delivery_option==2){
                    if(results1.row[0].requester_delivery_option==2){
                        console.log("check3_1");
                            data.final_delivery_option=2,
                            data.payment_status=1,
                            data.payment_by=2
    
                        console.log("data3_1",data)
                    }
                    else{
                            data.final_delivery_option=2,
                            data.payment_status=1,
                            data.payment_by=1
                    }
                }
                else{
                            data.final_delivery_option=1,
                            data.payment_status=0,
                            data.payment_by=0
                }
              
                console.log("final data"+ data)
                //Updating the final results from the logic and data.
                availabilityService.updateAvailSessionTrans(data, function(err3, results3){
                    if(err3){
                        res.json({status_code:1, message: 'Cannot update accepted availability Session', error: err3.message});
                    }
                    else{
                        console.log(results3)
                        res.json({
                            status_code: 0,
                            message: 'Availability Session accepted and updated payments and others Successfully',
                            result: results3,
                            authData: req.headers.authData,
                            token: req.token
                        });
                    }
                });
            }
            else{
                res.json({
                    status_code: 0,
                    message: 'There are accepted requests ongoing or rejected or cancelled',
                    authData: req.headers.authData,
                    token: req.token
                });
            }
        }
    });
}

//Rejecting status of an availabiity session
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

//Cancelling status of an availability session.
function cancelAvailSession (req, res){
    console.log("request body: ",req.params)
    availabilityService.getAvailSession(req.params, function(err1, results1){
        if(err1){
            res.json({status_code:1, message: 'Cannot get Session', error: err1.message});
        }
        else{
            if(results1.row[0].status==0) { //cancelled only when the current status is pending.
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
                const data={ //setting the values for the columns when the status is cancelled.
                    status:6,
                    avail_ses_id:req.params.avail_ses_id,
                    avail_id:results1.row[0].id,
                    final_delivery_option:results1.row[0].final_delivery_option,
                    payment_status:results1.row[0].payment_status,
                    payment_by:results1.row[0].payment_by,
                    actual_quantity:results1.row[0].actual_quantity,
                    available_quantity:results1.row[0].available_quantity + results1.row[0].quantity
                }

                console.log("sdfgsgf",data)

                availabilityService.updateAvailSessionTrans(data, function(err3, results3){//Updating after final results.
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

//Updating the status to waiting after accepting an availability session.
function waitingAvailSession (req, res){
    console.log("request body: ",req.params)
    availabilityService.getAvailSession(req.params,function(err1, results1){
        if(err1){
            res.json({status_code:1, message: 'Cannot get the current session', error: err.message});
        }
        else{
          if(results1.row[0].status==1){ //Updating status to waiting when the current stage is accept
            availabilityService.updateAvailSession(req.params, 2, function(err2, results2){
                if(err2){
                    res.json({status_code:1, message: 'Cannot update Session to waiting', error: err2.message});
                }
                else{
                    // console.log(results2)
                    res.json({
                        status_code: 0,
                        message: 'Availability Session updating to waiting is Success',
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

//Updating the status to dispatched after waiting and getting a driver for an availability session.
function dispatchedAvailSession (req, res){
    console.log("request body: ",req.params)
    availabilityService.getAvailSession(req.params, function(err1, results1){
        if(err1){
            res.json({status_code:1, message: 'Cannot get the current session', error: err.message});
        }
        else{
           if(results1.row[0].status==2){ //setting final data when status is changed from waiting to dispatched.
            console.log("check1");
            let data={
                status:3,
                avail_ses_id:req.params.avail_ses_id,
                avail_id:results1.row[0].id,
                final_delivery_option:results1.row[0].final_delivery_option,
                payment_status:results1.row[0].payment_status,
                payment_by:results1.row[0].payment_by,
                available_quantity:results1.row[0].available_quantity - results1.row[0].quantity,
                actual_quantity:results1.row[0].actual_quantity - results1.row[0].quantity,
                quantity:results1.row[0].quantity
            }
            console.log("checkdata",data)

            availabilityService.updateAvailSessionTrans(data, function(err2, results2){ //Updating the final data.
                if(err2){
                    res.json({status_code:1, message: 'Cannot update the waiting session', error: err2.message});
                }
                else{
                    console.log(results2)
                    res.json({
                        status_code: 0,
                        message: 'Availability Session updated to dispatched status Successfully',
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

module.exports = {
    createAvailability:createAvailability,
    createAvailSession:createAvailSession,
    rejectAvailSession:rejectAvailSession,
    cancelAvailSession:cancelAvailSession,
    acceptAvailSession:acceptAvailSession,
    waitingAvailSession:waitingAvailSession,
    dispatchedAvailSession:dispatchedAvailSession
}