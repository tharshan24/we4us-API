const availabilityService = require('../services/availability_service');

//createAvailability of public
function createAvailability (req, res){
    //console.log(req.body)
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
    //console.log(req.body)
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

function acceptAvailSession (req, res){
    //console.log(req.body)
    availabilityService.getAvailSession(req, function(err, results1){
        if(err){
            res.json({status_code:1, message: 'Cannot create Availability Sessions', error: err.message});
        }
        else{
            let final = {
                quantity: results1.quantity,
                final_delivery_option: 0, 
                payment_status: 0, 
                payment_by: 0
            }
            console.log(results)

            if(w2){
                if(e22){

                }
                else{

                }
            }
            else if(ghb){
                if(xsx){

                }
                else{

                }
            }
            else{
                
            }
            availabilityService.acceptAvailSession(req.params.id, final, function(err, results2){
                if(err){
                    res.json({status_code:1, message: 'Cannot create Availability Sessions', error: err.message});
                }
                else{
                    res.json({
                        status_code: 0,
                        message: 'Availability Sessions creation Success',
                        result: results,
                        authData: req.headers.authData,
                        token: req.token
                    });
                }     
            }
            
        }
    });
}

module.exports = {
    createAvailability:createAvailability,
    createAvailSession:createAvailSession,
    acceptAvailSession:acceptAvailSession
}