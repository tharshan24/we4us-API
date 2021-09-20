const systemService = require('../services/system_service');
var main = require('../config/main');
const jwt = require('jsonwebtoken');
const notificationService = require('../utilities/notifications');

// registration of public
function getDistricts(req,res){
    console.log(req.body);
    systemService.getDistricts(req.body,function(err,results){
        if(err){
            res.json({status_code:1,message:'Error in getting districts',error:err.message});
        }
        else{
            // console.log(results);
            res.json({status_code:0,message:'success',result:results});
        }
    });
}

// registration of public
function getCitiesByDistricts(req,res){
    console.log(req.params);
    systemService.getCitiesByDistricts(req.params,function(err,results){
        if(err){
            res.json({status_code:1,message:'Error in getting cities',error:err.message});
        }
        else{
            // console.log(results);
            res.json({status_code:0,message:'success',result:results});
        }
    });
}

// registration of public
function getVehicleTypes(req,res){
    console.log(req.params);
    systemService.getVehicleTypes(req.params,function(err,results){
        if(err){
            res.json({status_code:1,message:'Error in getting cities',error:err.message});
        }
        else{
            // console.log(results);
            res.json({status_code:0,message:'success',result:results});
        }
    });
}

//getting availability type
function getAvailabilityType(req,res){
    console.log(req.params);
    systemService.getAvailabilityType(req.params,function(err,results){
        if(err){
            res.json({status_code:1,message:'Error in getting Availability types',error:err.message});
        }
        else{
            // console.log(results);
            res.json({
                status_code:0,
                message:'Getting availability types successful',
                result:results,
                authData: req.headers.authData,
                token: req.token
            });
        }
    });
}

//getting request type
function getRequestType(req,res){
    console.log(req.params);
    systemService.getRequestType(req.params,function(err,results){
        if(err){
            res.json({status_code:1,message:'Error in getting request types',error:err.message});
        }
        else{
            // console.log(results);
            res.json({
                status_code:0,
                message:'Getting request types successful',
                result:results,
                authData: req.headers.authData,
                token: req.token
            });
        }
    });
}


//getting all notifications
function getAllNotifications(req,res){
    console.log(req.params);
    notificationService.getAllNotifications(req.headers.authData,req.params,function(err,results){
        if(err){
            res.json({status_code:1,message:'Error in getting notifications',error:err.message});
        }
        else{
            // console.log(results);
            res.json({
                status_code:0,
                message:'Notifications getting successful',
                result:results,
                authData: req.headers.authData,
                token: req.token
            });
        }
    });
}


//getting active notifications
function getActiveNotifications(req,res){
    console.log(req.params);
    notificationService.getActiveNotifications(req.headers.authData,req.params,function(err,results){
        if(err){
            res.json({status_code:1,message:'Error in getting active notifications',error:err.message});
        }
        else{
            // console.log(results);
            res.json({
                status_code:0,
                message:'Active Notifications getting successful',
                result:results,
                authData: req.headers.authData,
                token: req.token
            });
        }
    });
}

//getting count
function getCount(req,res){
    console.log(req.params);
    notificationService.getCount(req.headers.authData,req.params,function(err,results){
        if(err){
            res.json({status_code:1,message:'Error in getting counts',error:err.message});
        }
        else{
            // console.log(results);
            res.json({
                status_code:0,
                message:'Counts getting successful',
                result:results,
                authData: req.headers.authData,
                token: req.token
            });
        }
    });
}


module.exports = {
    getDistricts:getDistricts,
    getCitiesByDistricts:getCitiesByDistricts,
    getVehicleTypes:getVehicleTypes,
    getAvailabilityType:getAvailabilityType,
    getRequestType:getRequestType,
    getAllNotifications:getAllNotifications,
    getActiveNotifications:getActiveNotifications,
    getCount:getCount
}