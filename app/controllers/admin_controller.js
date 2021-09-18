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
    adminService.viewOrganizationsbyId(req.params,function(err, results){
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

//viewing all Public
function viewAllPublic (req, res){
    console.log("request body: ",req.params)
    adminService.viewAllPublic(req.params,function(err, results){
        if(err){
            res.json({status_code:1, message: 'Cannot get data of Public', error: err.message});
        }
        else{
            console.log(results)
            res.json({
                status_code: 0,
                message: 'Data of all Public successfully displayed',
                result: results,
                authData: req.headers.authData,
                token: req.token
            });
        }
    });
}

//viewing Public by ID
function viewPublicbyId (req, res){
    console.log("request body: ",req.params)
    adminService.viewPublicbyId(req.params,function(err, results){
        if(err){
            res.json({status_code:1, message: 'Cannot get data of Public With the ID', error: err.message});
        }
        else{
            console.log(results)
            res.json({
                status_code: 0,
                message: 'Data of Public with particular ID successfully displayed',
                result: results,
                authData: req.headers.authData,
                token: req.token
            });
        }
    });
}


//Updating the status of Public (Enable/Disable)
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


//viewing Driver by ID
function viewDriverById (req, res){
    console.log("request body: ",req.params)
    adminService.getDriverById(req.params,function(err, results){
        if(err){
            res.json({status_code:1, message: 'Cannot get data of a Driver!!', error: err.message});
        }
        else{
            console.log(results)
            res.json({
                status_code: 0,
                message: 'Data drivers with particular ID successfully displayed',
                result: results,
                authData: req.headers.authData,
                token: req.token
            });
        }
    });
}

//viewing all Drivers
function viewAllDrivers (req, res){
    console.log("request body: ",req.params)
    adminService.getAllDrivers(req.params,function(err, results){
        if(err){
            res.json({status_code:1, message: 'Cannot get data of all drivers!!', error: err.message});
        }
        else{
            console.log(results)
            res.json({
                status_code: 0,
                message: 'Data of all drivers with request Status successfully displayed',
                result: results,
                authData: req.headers.authData,
                token: req.token
            });
        }
    });
}


//Updating the status of an Driver(accept/rejected/pending)
function updateDriverStatus (req, res){
    console.log("request body: ",req.params)
    adminService.getDriverById(req.params,function(err1, results1){
        if(err1){
            res.json({status_code:1, message: 'Cannot get the current status', error: err.message});
        }
        else{
          if(results1.row[0].status==0 || results1.row[0].status==1){ //Updating status to reject when status is pending or accepted
            adminService.updateDriverStatus(req.params,2, function(err2, results2){
                if(err2){
                    res.json({status_code:1, message: 'Cannot update status to Reject', error: err2.message});
                }
                else{
                    // console.log(results2)
                    res.json({
                        status_code: 0,
                        message: 'Driver is Rejected!!',
                        result: results2,
                        authData: req.headers.authData,
                        token: req.token
                    });
                }
            });
          }
          else if(results1.row[0].status==0 || results1.row[0].status==2){//Updating status to accept when status is pending or rejected
            adminService.updateDriverStatus(req.params,1, function(err3, results3){
                if(err3){
                    res.json({status_code:1, message: 'Cannot update status to Accept', error: err3.message});
                }
                else{
                    // console.log(results2)
                    res.json({
                        status_code: 0,
                        message: 'Driver is accepted!!',
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

//Getting data of delivery payment 
function deliveryPayment (req, res){
    console.log("request body: ",req.params)
    adminService.deliveryPayment(req.params,function(err, results){
        if(err){
            res.json({status_code:1, message: 'Cannot get data of Availability Delivery payments!!', error: err.message});
        }
        else{
            console.log(results)
            res.json({
                status_code: 0,
                message: 'Data of all Availability Delivery payments successfully displayed',
                result: results,
                authData: req.headers.authData,
                token: req.token
            });
        }
    });
}

//Getting Filtered data of delivery payment 
function deliveryPaymentFilter (req, res){
    console.log("request body: ",req.params)
    adminService.deliveryPaymentFilter(req.params,function(err, results){
        if(err){
            res.json({status_code:1, message: 'Cannot Filter data of Availability Delivery payments!!', error: err.message});
        }
        else{
            console.log(results)
            res.json({
                status_code: 0,
                message: 'Data of all Availability Delivery payments successfully Filtered',
                result: results,
                authData: req.headers.authData,
                token: req.token
            });
        }
    });
}


//Getting data of all availabilities 
function viewAvailability (req, res){
    console.log("request body: ",req.params)
    adminService.viewAvailability(req.params,function(err, results){
        if(err){
            res.json({status_code:1, message: 'Cannot get data of Availabilties!!', error: err.message});
        }
        else{
            console.log(results)
            res.json({
                status_code: 0,
                message: 'Data of all Availabilities successfully displayed',
                result: results,
                authData: req.headers.authData,
                token: req.token
            });
        }
    });
}

//Getting data of availability by Id
function viewAvailabilityById (req, res){
    console.log("request body: ",req.params)
    adminService.viewAvailabilityById(req.params,function(err, results){
        if(err){
            res.json({status_code:1, message: 'Cannot get data of Availability!!', error: err.message});
        }
        else{
            console.log(results)
            res.json({
                status_code: 0,
                message: 'Data of Availability successfully displayed',
                result: results,
                authData: req.headers.authData,
                token: req.token
            });
        }
    });
}

//Getting data of availability by Date
function viewAvailabilityByDate (req, res){
    console.log("request body: ",req.params)
    adminService.viewAvailabilityByDate(req.params,function(err, results){
        if(err){
            res.json({status_code:1, message: 'Cannot get data of Availability!!', error: err.message});
        }
        else{
            console.log(results)
            res.json({
                status_code: 0,
                message: 'Data of Availability successfully displayed',
                result: results,
                authData: req.headers.authData,
                token: req.token
            });
        }
    });
}


//Getting data of all requests 
function viewRequest (req, res){
    console.log("request body: ",req.params)
    adminService.viewRequest(req.params,function(err, results){
        if(err){
            res.json({status_code:1, message: 'Cannot get data of Requests!!', error: err.message});
        }
        else{
            console.log(results)
            res.json({
                status_code: 0,
                message: 'Data of all Requests successfully displayed',
                result: results,
                authData: req.headers.authData,
                token: req.token
            });
        }
    });
}

//Getting data of request by Id
function viewRequestById (req, res){
    console.log("request body: ",req.params)
    adminService.viewRequestById(req.params,function(err, results){
        if(err){
            res.json({status_code:1, message: 'Cannot get data of Request!!', error: err.message});
        }
        else{
            console.log(results)
            res.json({
                status_code: 0,
                message: 'Data of Request successfully displayed',
                result: results,
                authData: req.headers.authData,
                token: req.token
            });
        }
    });
}

//Getting data of request by date
function viewRequestByDate (req, res){
    console.log("request body: ",req.params)
    adminService.viewRequestByDate(req.params,function(err, results){
        if(err){
            res.json({status_code:1, message: 'Cannot get data of Request!!', error: err.message});
        }
        else{
            console.log(results)
            res.json({
                status_code: 0,
                message: 'Data of Request successfully displayed',
                result: results,
                authData: req.headers.authData,
                token: req.token
            });
        }
    });
}

//Getting data of all Collection points 
function viewColPoint (req, res){
    console.log("request body: ",req.params)
    adminService.viewColPoint(req.params,function(err, results){
        if(err){
            res.json({status_code:1, message: 'Cannot get data of Collection points!!', error: err.message});
        }
        else{
            console.log(results)
            res.json({
                status_code: 0,
                message: 'Data of all Collection points successfully displayed',
                result: results,
                authData: req.headers.authData,
                token: req.token
            });
        }
    });
}

//Getting data of Collection point by Id 
function viewColPointById (req, res){
    console.log("request body: ",req.params)
    adminService.viewColPointById(req.params,function(err, results){
        if(err){
            res.json({status_code:1, message: 'Cannot get data of Collection points!!', error: err.message});
        }
        else{
            console.log(results)
            res.json({
                status_code: 0,
                message: 'Data of all Collection point successfully displayed',
                result: results,
                authData: req.headers.authData,
                token: req.token
            });
        }
    });
}


//Getting data of Collection point by Date 
function viewColPointByDate (req, res){
    console.log("request body: ",req.params)
    adminService.viewColPointByDate(req.params,function(err, results){
        if(err){
            res.json({status_code:1, message: 'Cannot get data of Collection points!!', error: err.message});
        }
        else{
            console.log(results)
            res.json({
                status_code: 0,
                message: 'Data of all Collection point successfully displayed',
                result: results,
                authData: req.headers.authData,
                token: req.token
            });
        }
    });
}

//Getting count of public 
function countPublic (req, res){
    console.log("request body: ",req.params)
    adminService.countUsers(req.params, 1, function(err, results){
        if(err){
            res.json({status_code:1, message: 'Cannot get count of Public!!', error: err.message});
        }
        else{
            console.log(results)
            res.json({
                status_code: 0,
                message: 'Count of the public is displayed',
                result: results,
                authData: req.headers.authData,
                token: req.token
            });
        }
    });
}

//Getting count of NGO 
function countNgo (req, res){
    console.log("request body: ",req.params)
    adminService.countUsers(req.params, 2, function(err, results){
        if(err){
            res.json({status_code:1, message: 'Cannot get count of NGO!!', error: err.message});
        }
        else{
            console.log(results)
            res.json({
                status_code: 0,
                message: 'Count of the NGO is displayed',
                result: results,
                authData: req.headers.authData,
                token: req.token
            });
        }
    });
}

//Getting count of Carehomes 
function countCarehomes (req, res){
    console.log("request body: ",req.params)
    adminService.countUsers(req.params, 3, function(err, results){
        if(err){
            res.json({status_code:1, message: 'Cannot get count of Carehomes!!', error: err.message});
        }
        else{
            console.log(results)
            res.json({
                status_code: 0,
                message: 'Count of the Carehomes is displayed',
                result: results,
                authData: req.headers.authData,
                token: req.token
            });
        }
    });
}


//Getting count of Shops 
function countShops (req, res){
    console.log("request body: ",req.params)
    adminService.countUsers(req.params, 4, function(err, results){
        if(err){
            res.json({status_code:1, message: 'Cannot get count of Carehomes!!', error: err.message});
        }
        else{
            console.log(results)
            res.json({
                status_code: 0,
                message: 'Count of the Carehomes is displayed',
                result: results,
                authData: req.headers.authData,
                token: req.token
            });
        }
    });
}


//Getting count of Restaurants 
function countRestaurants (req, res){
    console.log("request body: ",req.params)
    adminService.countUsers(req.params, 5, function(err, results){
        if(err){
            res.json({status_code:1, message: 'Cannot get count of Carehomes!!', error: err.message});
        }
        else{
            console.log(results)
            res.json({
                status_code: 0,
                message: 'Count of the Carehomes is displayed',
                result: results,
                authData: req.headers.authData,
                token: req.token
            });
        }
    });
}


//Getting count of Drivers 
function countDrivers (req, res){
    console.log("request body: ",req.params)
    adminService.countDrivers(req.params, function(err, results){
        if(err){
            res.json({status_code:1, message: 'Cannot get count of Drivers!!', error: err.message});
        }
        else{
            console.log(results)
            res.json({
                status_code: 0,
                message: 'Count of the Drivers is displayed',
                result: results,
                authData: req.headers.authData,
                token: req.token
            });
        }
    });
}

//explore availability 
function exploreAvailability (req, res){
    console.log("request body: ",req.params)
    adminService.exploreAvailability(req.headers.authData, req.params, function(err, results){
        if(err){
            res.json({status_code:1, message: 'Error', error: err.message});
        }
        else{
            console.log(results)
            res.json({
                status_code: 0,
                message: 'Success',
                result: results,
                authData: req.headers.authData,
                token: req.token
            });
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
    viewAllPublic:viewAllPublic,
    viewPublicbyId:viewPublicbyId,
    updatePublicStatus:updatePublicStatus,
    viewDriverById:viewDriverById,
    viewAllDrivers:viewAllDrivers,
    updateDriverStatus:updateDriverStatus,
    deliveryPayment:deliveryPayment,
    deliveryPaymentFilter:deliveryPaymentFilter,
    exploreAvailability:exploreAvailability,
    viewAvailability:viewAvailability,
    viewAvailabilityById:viewAvailabilityById,
    viewAvailabilityByDate:viewAvailabilityByDate,
    viewRequest:viewRequest,
    viewRequestById:viewRequestById,
    viewRequestByDate:viewRequestByDate,
    viewColPoint:viewColPoint,
    viewColPointById:viewColPointById,
    viewColPointByDate:viewColPointByDate,
    countPublic:countPublic,
    countNgo:countNgo,
    countCarehomes:countCarehomes,
    countShops:countShops,
    countRestaurants:countRestaurants,
    countDrivers:countDrivers
}
