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

router.get('/viewDriverById/:user_id',authMiddleware.verifyToken,adminController.viewDriverById);
router.get('/viewAllDrivers/',authMiddleware.verifyToken,adminController.viewAllDrivers);
router.get('/updateDriverStatus/:user_id',authMiddleware.verifyToken,adminController.updateDriverStatus);

router.get('/deliveryPayment',authMiddleware.verifyToken,adminController.deliveryPayment);
router.get('/deliveryPaymentFilter/:startDate/:endDate',authMiddleware.verifyToken,adminController.deliveryPaymentFilter);

router.get('/viewAvailability',authMiddleware.verifyToken,adminController.viewAvailability);
router.get('/viewAvailabilityById/:avail_id',authMiddleware.verifyToken,adminController.viewAvailability);
router.get('/viewAvailabilityByDate/:startDate/:endDate',authMiddleware.verifyToken,adminController.viewAvailabilityByDate);

router.get('/viewRequest',authMiddleware.verifyToken,adminController.viewRequest);
router.get('/viewRequestById/:req_id',authMiddleware.verifyToken,adminController.viewRequestById);
router.get('/viewRequestByDate/:startDate/:endDate',authMiddleware.verifyToken,adminController.viewRequestByDate);

// router.get('/viewColPoint',authMiddleware.verifyToken,adminController.viewColPoint);




router.get('/exploreAvailability',authMiddleware.verifyToken,adminController.exploreAvailability);







// router.get('/viewAllOrganiations/:user_id',authMiddleware.verifyToken,adminController.viewAllOrganiations);

module.exports  = router;