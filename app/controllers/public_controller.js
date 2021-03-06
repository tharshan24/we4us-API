const publicService = require('../services/public_service');

// viewProfile of public
function viewProfile(req,res){
    console.log(req.params);

    publicService.viewProfile(req.headers.authData,req.params,function(err,results){
        if(err){
            res.json({status_code:1,message:'Cannot get profile',error:err.message});
        }
        else{
            // console.log(results);
            res.json({
                status_code:0,
                message:'success',
                result:results,
                authData: req.headers.authData,
                token: req.token
            });
        }
    });
}

// updateProfile of public
function updateProfile (req,res){
   console.log(req.body);
    publicService.updateProfile(req.headers.authData,req.body,function(err,results){
        if(err){
            res.json({status_code:1,message:'Cannot Update profile',error:err.message});
        }
        else{
            // console.log(results);
            res.json({
                status_code:0,
                message:'Update success',
                result:results,
                authData: req.headers.authData,
                token: req.token
            });
        }
    });
}

//registerDriver 
function registerDriver (req, res){
    // console.log(req.body)
    publicService.registerDriver(req, function(err,results){
        if(err){
            res.json({status_code:1,message:'Cannot Register Driver',error:err.message});
        }
        else{
            // console.log(results);
            res.json({
                status_code:0,
                message:'Register success',
                result:results,
                authData: req.headers.authData,
                token: req.token
            });
        }
    });
}

//registerDriver
function vehicleRegister (req, res){
    // console.log(req.body)
    publicService.vehicleRegister(req, function(err,results){
        if(err){
            res.json({status_code:1,message:'Cannot Register Vehicle',error:err.message});
        }
        else{
            // console.log(results);
            res.json({
                status_code:0,
                message:'Register success',
                result:results,
                authData: req.headers.authData,
                token: req.token
            });
        }
    });
}

//registerDriver
function updatePaymentMode (req, res){
    // console.log(req.body)
    publicService.updatePaymentMode(req.headers.auth,req.params, function(err,results){
        if(err){
            res.json({status_code:1,message:'Cannot Register Vehicle',error:err.message});
        }
        else{
            // console.log(results);
            res.json({
                status_code:0,
                message:'Register success',
                result:results,
                authData: req.headers.authData,
                token: req.token
            });
        }
    });
}

module.exports = {
    viewProfile:viewProfile,
    updateProfile:updateProfile,
    registerDriver:registerDriver,
    vehicleRegister:vehicleRegister,
    updatePaymentMode:updatePaymentMode
}