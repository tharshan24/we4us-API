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


module.exports = {
    createRequest:createRequest
}