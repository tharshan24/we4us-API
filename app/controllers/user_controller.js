const userService = require('../services/user_service');
const main = require('../config/main');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const mailer = require('./../utilities/nodemailer');

// registration of public
function publicRegister(req,res){
    // console.log(req.body);
    userService.publicRegister(req.body,function(err,results){
        if(err){
            res.json({status_code:1,message:'Error in register user',error:err.message});
        }
        else{
            // console.log(results);
            fs.readFile(__dirname + '/../public/userVerification.html', 'utf8', function (err,data) {
                if (err) {
                    console.log(err);
                    res.json({status_code:1,message:'Error in reading email html',error:err.message});
                }
                let htmlResult = data.replace(/userId/g, `${results.row1}`);

                const options = {
                    to: req.body.email,
                    subject: 'Verify Email from We4Us',
                    html: htmlResult
                }
                mailer.sendEmail(options, (ex, response) => {
                    if(ex) {
                        res.json({status_code:1,message:'Error in Sending Email',error:ex.message});
                    }
                    else {
                        res.json({status_code:0,message:'Registered successfully. Please verify your email by checking email',result:response});
                    }
                });
            });
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
            fs.readFile(__dirname + '/../public/userVerification.html', 'utf8', function (err,data) {
                if (err) {
                    console.log(err);
                    res.json({status_code:1,message:'Error in reading email html',error:err.message});
                }
                let htmlResult = data.replace(/userId/g, `${results.row1}`);

                const options = {
                    to: req.body.email,
                    subject: 'Verify Email from We4Us',
                    html: htmlResult
                }
                mailer.sendEmail(options, (ex, response) => {
                    if(ex) {
                        res.json({status_code:1,message:'Error in Sending Email',error:ex.message});
                    }
                    else {
                        res.json({status_code:0,message:'Registered successfully. Please verify your email by checking email',result:response});
                    }
                });
            });
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

//verify user
function userVerification (req, res){
    console.log(req.params)
    userService.userVerification(req.params, function(err,results){
        if(err){
            res.json({status_code:1,message:'Update Failed',error:err.message});
        }
        else{
            fs.readFile(__dirname + '/../public/VerifyConfirm.html', 'utf8', function (err,data) {
                if (err) {
                    console.log(err);
                    res.json({status_code:1,message:'Error in reading email html',error:err.message});
                }
                res.send(data);
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
    userVerification:userVerification,
    test:test
}