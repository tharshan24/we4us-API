const orgService = require('../services/organization_service');

// registration of public
function viewProfile(req,res){
    console.log(req.params);

    orgService.viewProfile(req.headers.authData,req.params,function(err,results){
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

/*module.exports = {
    viewProfile:viewProfile
}*/

//new changes 

//organization update profile
function updateProfile(req,res){
    console.log(req.body);
    orgService.updateProfile(req.headers.authData,req.body,function(err,results){
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

// getting Members 
function getMembers(req,res){
    console.log(req.params);
    orgService.getMembers(req.headers.authData,req.params,function(err,results){
        if(err){
            res.json({status_code:1,message:'Cannot get Users',error:err.message});
        }
        else{
            // console.log(results);
            res.json({
                status_code:0,
                message:'Getting members successful',
                result:results,
                authData: req.headers.authData,
                token: req.token
            });
        }
    });
}

//Add members to Organizations
function addMembers(req,res){
    console.log(req.body);
    orgService.addMembers(req.headers.authData,req.body,function(err,results){
        if(err){
            res.json({status_code:1,message:'Cannot add Member',error:err.message});
        }
        else{
            // console.log(results);
            res.json({
                status_code:0,
                message:'Member added Successfully',
                result:results,
                authData: req.headers.authData,
                token: req.token
            });
        }
    });
}

//Collection point creation
function createCollectionPoint(req,res){
    console.log(req.body);
    orgService.createCollectionPoint(req.headers.authData,req.body,function(err,results){
        if(err){
            res.json({status_code:1,message:'Cannot Create Collection Point',error:err.message});
        }
        else{
            // console.log(results);
            res.json({
                status_code:0,
                message:'Create Collection Point Successful',
                result:results,
                authData: req.headers.authData,
                token: req.token
            });
        }
    });
}

//Collection points get all
function getCollectionPoints(req,res){
    // console.log(req.body);
    orgService.getCollectionPoints(req.headers.authData,req.params,function(err,results){
        if(err){
            res.json({status_code:1,message:'Cannot Get Collection Point',error:err.message});
        }
        else{
            // console.log(results);
            res.json({
                status_code:0,
                message:'Get Collection Point Successful',
                result:results,
                authData: req.headers.authData,
                token: req.token
            });
        }
    });
}

//Collection points get my
function getMyCollectionPoints(req,res){
    // console.log(req.body);
    orgService.getMyCollectionPoints(req.headers.authData,req.params,function(err,results){
        if(err){
            res.json({status_code:1,message:'Cannot Get Collection Point',error:err.message});
        }
        else{
            // console.log(results);
            res.json({
                status_code:0,
                message:'Get Collection Point Successful',
                result:results,
                authData: req.headers.authData,
                token: req.token
            });
        }
    });
}

//Collection points get my
function getCollectionPointsById(req,res){
    // console.log(req.body);
    orgService.getCollectionPointsById(req.headers.authData,req.params,function(err,results){
        if(err){
            res.json({status_code:1,message:'Cannot Get Collection Point',error:err.message});
        }
        else{
            // console.log(results);
            res.json({
                status_code:0,
                message:'Get Collection Point Successful',
                result:results,
                authData: req.headers.authData,
                token: req.token
            });
        }
    });
}

//Collection points get my
function getAllMembers(req,res){
    // console.log(req.body);
    orgService.getAllMembers(req.headers.authData, req.params,function(err,results){
        if(err){
            res.json({status_code:1,message:'Cannot Get Mmebers',error:err.message});
        }
        else{
            // console.log(results);
            res.json({
                status_code:0,
                message:'Get Members Successful',
                result:results,
                authData: req.headers.authData,
                token: req.token
            });
        }
    });
}


//Selling point creation
function createSellingPoint(req,res){
    console.log(req.body);
    orgService.createSellingPoint(req.headers.authData,req.body,function(err,results){
        if(err){
            res.json({status_code:1,message:'Cannot Create Selling Point',error:err.message});
        }
        else{
            // console.log(results);
            res.json({
                status_code:0,
                message:'Create Selling Point Successful',
                result:results,
                authData: req.headers.authData,
                token: req.token
            });
        }
    });
}

//Selling points getting
function getSellingPoints(req,res){
    // console.log(req.body);
    orgService.getSellingPoints(req.headers.authData,req.params,function(err,results){
        if(err){
            res.json({status_code:1,message:'Cannot Get Selling Point',error:err.message});
        }
        else{
            // console.log(results);
            res.json({
                status_code:0,
                message:'Get Selling Point Successful',
                result:results,
                authData: req.headers.authData,
                token: req.token
            });
        }
    });
}


//My Collection points getting
function getMySellingPoints(req,res){
    // console.log(req.body);
    orgService.getMySellingPoints(req.headers.authData,req.params,function(err,results){
        if(err){
            res.json({status_code:1,message:'Cannot Get my Collection Point',error:err.message});
        }
        else{
            // console.log(results);
            res.json({
                status_code:0,
                message:'Get my Collection Point Successful',
                result:results,
                authData: req.headers.authData,
                token: req.token
            });
        }
    });
}


//getting Selling points by ID
function getSellingPointsById(req,res){
    // console.log(req.body);
    orgService.getSellingPointsById(req.headers.authData,req.params,function(err,results){
        if(err){
            res.json({status_code:1,message:'Cannot Get Collection Point by ID',error:err.message});
        }
        else{
            // console.log(results);
            res.json({
                status_code:0,
                message:'Get Collection Point by ID Successful',
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
    getMembers:getMembers,
    addMembers:addMembers,
    createCollectionPoint:createCollectionPoint,
    getCollectionPoints:getCollectionPoints,
    getMyCollectionPoints:getMyCollectionPoints,
    getCollectionPointsById:getCollectionPointsById,
    getAllMembers:getAllMembers,
    createSellingPoint:createSellingPoint,
    getSellingPoints:getSellingPoints,
    getMySellingPoints:getMySellingPoints,
    getSellingPointsById:getSellingPointsById
}