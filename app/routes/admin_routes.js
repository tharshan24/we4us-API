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

router.get('/updateOrganizationStatus/:user_id',authMiddleware.verifyToken,adminController.updateOrganizationStatus);

router.get('/viewAllPublic',authMiddleware.verifyToken,adminController.viewAllPublic);
router.get('/viewPublicbyId/:user_id',authMiddleware.verifyToken,adminController.viewPublicbyId);

router.get('/updatePublicStatus/:user_id',authMiddleware.verifyToken,adminController.updatePublicStatus);

router.get('/viewDriverRequests/:user_id',authMiddleware.verifyToken,adminController.viewDriverRequests);
router.get('/updateDriverStatus/:user_id',authMiddleware.verifyToken,adminController.updateDriverStatus);

router.get('/deliveryPayment',authMiddleware.verifyToken,adminController.deliveryPayment);
router.get('/deliveryPaymentFilter/:startDate/:endDate',authMiddleware.verifyToken,adminController.deliveryPaymentFilter);






// router.get('/viewAllOrganiations/:user_id',authMiddleware.verifyToken,adminController.viewAllOrganiations);

module.exports  = router;