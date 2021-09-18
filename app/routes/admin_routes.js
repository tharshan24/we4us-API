const express = require('express');
const adminController = require('../controllers/admin_controller');
const authMiddleware = require('../middlewares/auth');
const router = express.Router();


router.get('/viewAllOrganizations',authMiddleware.verifyToken,adminController.viewAllOrganizations);
router.get('/viewOrganizationsbyId/:user_id',authMiddleware.verifyToken,adminController.viewOrganizationsbyId);

router.get('/viewNgo',authMiddleware.verifyToken,adminController.viewNgo);
router.get('/viewCarehomes',authMiddleware.verifyToken,adminController.viewCarehomes);
router.get('/viewShops',authMiddleware.verifyToken,adminController.viewShops);
router.get('/viewRestaurants',authMiddleware.verifyToken,adminController.viewRestaurants);

router.get('/updateUserStatus/:user_id/:status',authMiddleware.verifyToken,adminController.updateUserStatus);

router.get('/viewAllPublic',authMiddleware.verifyToken,adminController.viewAllPublic);
router.get('/viewPublicbyId/:user_id',authMiddleware.verifyToken,adminController.viewPublicbyId);

//router.get('/updatePublicStatus/:user_id',authMiddleware.verifyToken,adminController.updatePublicStatus);

router.get('/viewDriverById/:user_id',authMiddleware.verifyToken,adminController.viewDriverById);
router.get('/viewAllDrivers/',authMiddleware.verifyToken,adminController.viewAllDrivers);
router.get('/updateDriverStatus/:user_id/:status',authMiddleware.verifyToken,adminController.updateDriverStatus);

router.get('/deliveryPayment',authMiddleware.verifyToken,adminController.deliveryPayment);
router.get('/deliveryPaymentFilter/:startDate/:endDate',authMiddleware.verifyToken,adminController.deliveryPaymentFilter);

router.get('/viewAvailability',authMiddleware.verifyToken,adminController.viewAvailability);
router.get('/viewAvailabilityById/:avail_id',authMiddleware.verifyToken,adminController.viewAvailabilityById);
router.get('/viewAvailabilityByDate/:startDate/:endDate',authMiddleware.verifyToken,adminController.viewAvailabilityByDate);

router.get('/viewRequest',authMiddleware.verifyToken,adminController.viewRequest);
router.get('/viewRequestById/:req_id',authMiddleware.verifyToken,adminController.viewRequestById);
router.get('/viewRequestByDate/:startDate/:endDate',authMiddleware.verifyToken,adminController.viewRequestByDate);

router.get('/viewColPoint',authMiddleware.verifyToken,adminController.viewColPoint);
router.get('/viewColPointById/:cp_id',authMiddleware.verifyToken,adminController.viewColPointById);
router.get('/viewColPointByDate/:startDate/:endDate',authMiddleware.verifyToken,adminController.viewColPointByDate);

router.get('/viewSellPoint',authMiddleware.verifyToken,adminController.viewSellPoint);
router.get('/viewSellPointById/:sp_id',authMiddleware.verifyToken,adminController.viewSellPointById);
router.get('/viewSellPointByDate/:startDate/:endDate',authMiddleware.verifyToken,adminController.viewSellPointByDate);


router.get('/countPublic',authMiddleware.verifyToken,adminController.countPublic);
router.get('/countNgo',authMiddleware.verifyToken,adminController.countNgo);
router.get('/countCarehomes',authMiddleware.verifyToken,adminController.countCarehomes);
router.get('/countShops',authMiddleware.verifyToken,adminController.countShops);
router.get('/countRestaurants',authMiddleware.verifyToken,adminController.countRestaurants);
router.get('/countDrivers',authMiddleware.verifyToken,adminController.countDrivers);




router.get('/exploreAvailability',authMiddleware.verifyToken,adminController.exploreAvailability);



module.exports  = router;