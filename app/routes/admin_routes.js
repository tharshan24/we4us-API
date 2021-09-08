const express = require('express');
const adminController = require('../controllers/admin_controller');
const authMiddleware = require('../middlewares/auth');
const router = express.Router();


router.get('/viewAllOrganizations',authMiddleware.verifyToken,adminController.viewAllOrganizations);
router.get('/viewOrganizationsbyId/:user_id',authMiddleware.verifyToken,adminController.viewOrganizationsbyId);
router.get('/viewNgo/:user_id',authMiddleware.verifyToken,adminController.viewNgo);
router.get('/viewCarehomes/:user_id',authMiddleware.verifyToken,adminController.viewCarehomes);
router.get('/viewShops/:user_id',authMiddleware.verifyToken,adminController.viewShops);
router.get('/viewRestaurants/:user_id',authMiddleware.verifyToken,adminController.viewRestaurants);

// router.get('/viewAllOrganiations/:user_id',authMiddleware.verifyToken,adminController.viewAllOrganiations);

module.exports  = router;