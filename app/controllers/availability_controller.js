const availabilityService = require('../services/availability_service');

//createAvailability of public
function createAvailability (req, res){
    //console.log(req.body)
    availabilityService.createAvailability(req, function(err, results){
        if(err){
            res,json({status_code:1, message: 'Cannot create Availability', error: err.message});
        }
        else{
            console.log(results)
            res.json({
                status_code: 0,
                message: 'Availability creation Success',
                result: results,
                authData: req.body.authData,
                token: req.token
            });
        }
    });
}

module.exports = {
    createAvailability:createAvailability
}