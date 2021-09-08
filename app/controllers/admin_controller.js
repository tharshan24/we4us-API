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


module.exports = {
    viewAllOrganizations:viewAllOrganizations,
    viewOrganizationsbyId:viewOrganizationsbyId,
    viewNgo:viewNgo,
    viewCarehomes:viewCarehomes,
    viewShops:viewShops,
    viewRestaurants:viewRestaurants
}
