const userService = require('../services/user_service');
var main = require('../config/main');
const jwt = require('jsonwebtoken');

// registration of public
function publicRegister(req,res){
    // console.log(req.body);
    userService.publicRegister(req.body,function(err,results){
        if(err){
            res.json({status_code:1,message:'Error in register user',error:err.message});
        }
        else{
            // console.log(results);
            res.json({status_code:0,message:'Registered successfully. Please verify your email by checking email',result:results});
        }
    });
}

// registration of organization
function orgRegister(req,res){
    // console.log(req.body);
    userService.orgRegister(req.body,function(err,results){
        if(err){
            res.json({status_code:1,message:'Error in register user',error:err.message});
        }
        else{
            // console.log(results);
            res.json({status_code:0,message:'Registered successfully. Please verify your email by checking email',result:results});
        }
    });
}

// user login
function login(req,res){
    console.log(req.body);
    userService.login(req.body,function(err,results){
        if(err){
            res.json({status_code:1,message:'Error in user login',error:err.message});
        }
        else{
            // console.log(results);

            const user = {
                id: results.id,
                userName: results.userName,
                email: results.email
            }

            // using jwt token to sign user
            jwt.sign({user}, main.key, {}, (err, token) => {
                res.json({
                    token:token,
                    status_code:0,
                    message:'Login successful',
                    result:results
                });
            });
        }
    });
}


//registerDriver
function updateRealUser (req, res){
    console.log(req.body)
    userService.updateRealUser(req.headers.authData, req.body, function(err,results){
        if(err){
            res.json({status_code:1,message:'Cannot Update User',error:err.message});
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
function getRealUser (req, res){
    console.log(req.body)
    userService.getRealUser(req.headers.authData, req.params, function(err,results){
        if(err){
            res.json({status_code:1,message:'Cannot Get User',error:err.message});
        }
        else{
            // console.log(results);
            res.json({
                status_code:0,
                message:'Success',
                result:results,
                authData: req.headers.authData,
                token: req.token
            });
        }
    });
}

//registerDriver
function updateAccount (req, res){
    console.log(req.body)
    userService.updateAccount(req.headers.authData, req.body, function(err,results){
        if(err){
            res.json({status_code:1,message:'Update Failed',error:err.message});
        }
        else{
            // console.log(results);
            res.json({
                status_code:0,
                message:'Success',
                result:results,
                authData: req.headers.authData,
                token: req.token
            });
        }
    });
}


// authentication testing
function test(req, res){
    res.json({
        message: 'authentication successful',
        authData: req.headers.authData,
        token: req.token
    });
}


module.exports = {
    login:login,
    publicRegister:publicRegister,
    orgRegister:orgRegister,
    getRealUser:getRealUser,
    updateRealUser:updateRealUser,
    updateAccount:updateAccount,
    test:test
}