const systemService = require('../services/system_service');
var main = require('../config/main');
const jwt = require('jsonwebtoken');

// registration of public
function getDistricts(req,res){
    console.log(req.body);
    systemService.getDistricts(req.body,function(err,results){
        if(err){
            res.json({status_code:1,message:'Error in getting districts',error:err.message});
        }
        else{
            console.log(results);
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
            console.log(results);
            res.json({status_code:0,message:'success',result:results});
        }
    });
}

module.exports = {
    getDistricts:getDistricts,
    getCitiesByDistricts:getCitiesByDistricts
}