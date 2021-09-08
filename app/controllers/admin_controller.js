const adminService = require('../services/admin_service');


//viewing all Organizations
function viewAllOrganizations (req, res){
    console.log("request body: ",req.params)
    adminService.viewAllOrganizations(req.params,function(err, results){
        if(err){
            res.json({status_code:1, message: 'Cannot get data of Organizations', error: err.message});
        }
        else{
            console.log(results)
            res.json({
                status_code: 0,
                message: 'Data of all Organizations successfully displayed',
                result: results,
                authData: req.headers.authData,
                token: req.token
            });
        }
    });
}

//viewing Organizations by ID
function viewOrganizationsbyId (req, res){
    console.log("request body: ",req.params)
    adminService.viewAllOrganizations(req.params,function(err, results){
        if(err){
            res.json({status_code:1, message: 'Cannot get data of Organizations With the ID', error: err.message});
        }
        else{
            console.log(results)
            res.json({
                status_code: 0,
                message: 'Data of Organization with particular ID successfully displayed',
                result: results,
                authData: req.headers.authData,
                token: req.token
            });
        }
    });
}

//viewing NGOs
function viewNgo (req, res){
    console.log("request body: ",req.params)
    adminService.viewOrganizationsbyType(req.params,0,function(err, results){
        if(err){
            res.json({status_code:1, message: 'Cannot get data of  NGOs!!', error: err.message});
        }
        else{
            console.log(results)
            res.json({
                status_code: 0,
                message: 'Data of all NGOs successfully displayed',
                result: results,
                authData: req.headers.authData,
                token: req.token
            });
        }
    });
}

//viewing Carehomes
function viewCarehomes (req, res){
    console.log("request body: ",req.params)
    adminService.viewOrganizationsbyType(req.params,1,function(err, results){
        if(err){
            res.json({status_code:1, message: 'Cannot get data of Carehomes!!', error: err.message});
        }
        else{
            console.log(results)
            res.json({
                status_code: 0,
                message: 'Data of all Carehomes successfully displayed',
                result: results,
                authData: req.headers.authData,
                token: req.token
            });
        }
    });
}

//viewing Shops
function viewShops (req, res){
    console.log("request body: ",req.params)
    adminService.viewOrganizationsbyType(req.params,2,function(err, results){
        if(err){
            res.json({status_code:1, message: 'Cannot get data of Shops!!', error: err.message});
        }
        else{
            console.log(results)
            res.json({
                status_code: 0,
                message: 'Data of all Shops successfully displayed',
                result: results,
                authData: req.headers.authData,
                token: req.token
            });
        }
    });
}

//viewing Restaurants
function viewRestaurants (req, res){
    console.log("request body: ",req.params)
    adminService.viewOrganizationsbyType(req.params,3,function(err, results){
        if(err){
            res.json({status_code:1, message: 'Cannot get data of Restaurants!!', error: err.message});
        }
        else{
            console.log(results)
            res.json({
                status_code: 0,
                message: 'Data of all Restaurants successfully displayed',
                result: results,
                authData: req.headers.authData,
                token: req.token
            });
        }
    });
}

//Updating the status of an Organization (Enable/Disable)
function updateOrganizationStatus (req, res){
    console.log("request body: ",req.params)
    adminService.getUserStatus(req.params,function(err1, results1){
        if(err1){
            res.json({status_code:1, message: 'Cannot get the current status', error: err.message});
        }
        else{
          if(results1.row[0].status==1 && results1.row[0].user_type==2){ //Updating status to Disable stage is enabled
            adminService.updateUserStatus(req.params, 0, function(err2, results2){
                if(err2){
                    res.json({status_code:1, message: 'Cannot update status to Disable', error: err2.message});
                }
                else{
                    // console.log(results2)
                    res.json({
                        status_code: 0,
                        message: 'Organization is disabled!!',
                        result: results2,
                        authData: req.headers.authData,
                        token: req.token
                    });
                }
            });
          }
          else if(results1.row[0].status==0 && results1.row[0].user_type==2){
            adminService.updateUserStatus(req.params, 1, function(err3, results3){
                if(err3){
                    res.json({status_code:1, message: 'Cannot update status to Enable', error: err3.message});
                }
                else{
                    // console.log(results2)
                    res.json({
                        status_code: 0,
                        message: 'Organization is enabled!!',
                        result: results3,
                        authData: req.headers.authData,
                        token: req.token
                    });
                }
            });
          }
          else{
            res.json({
                status_code: 0,
                message: 'There is no such status',
                authData: req.headers.authData,
                token: req.token
            })
          }
        }
    });
}

//Updating the status of an Public (Enable/Disable)
function updatePublicStatus (req, res){
    console.log("request body: ",req.params)
    adminService.getUserStatus(req.params,function(err1, results1){
        if(err1){
            res.json({status_code:1, message: 'Cannot get the current status', error: err.message});
        }
        else{
          if(results1.row[0].status==1 && results1.row[0].user_type==1){ //Updating status to Disable stage is enabled
            adminService.updateUserStatus(req.params, 0, function(err2, results2){
                if(err2){
                    res.json({status_code:1, message: 'Cannot update status to Disable', error: err2.message});
                }
                else{
                    // console.log(results2)
                    res.json({
                        status_code: 0,
                        message: 'Organization is disabled!!',
                        result: results2,
                        authData: req.headers.authData,
                        token: req.token
                    });
                }
            });
          }
          else if(results1.row[0].status==0 && results1.row[0].user_type==1){
            adminService.updateUserStatus(req.params, 1, function(err3, results3){
                if(err3){
                    res.json({status_code:1, message: 'Cannot update status to Enable', error: err3.message});
                }
                else{
                    // console.log(results2)
                    res.json({
                        status_code: 0,
                        message: 'Organization is enabled!!',
                        result: results3,
                        authData: req.headers.authData,
                        token: req.token
                    });
                }
            });
          }
          else{
            res.json({
                status_code: 0,
                message: 'There is no such status',
                authData: req.headers.authData,
                token: req.token
            })
          }
        }
    });
}



module.exports = {
    viewAllOrganizations:viewAllOrganizations,
    viewOrganizationsbyId:viewOrganizationsbyId,
    viewNgo:viewNgo,
    viewCarehomes:viewCarehomes,
    viewShops:viewShops,
    viewRestaurants:viewRestaurants,
    updateOrganizationStatus:updateOrganizationStatus,
    updatePublicStatus:updatePublicStatus
}
