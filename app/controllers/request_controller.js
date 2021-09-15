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

module.exports = {
    createRequest:createRequest,
    createReqSession:createReqSession,
    getRequestType:getRequestType

}