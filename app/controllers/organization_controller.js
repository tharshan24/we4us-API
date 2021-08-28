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

module.exports = {
    viewProfile:viewProfile,
    updateProfile:updateProfile
}