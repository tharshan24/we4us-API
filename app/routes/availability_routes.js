const express = require('express');
const availabilityController = require('../controllers/availability_controller');
const authMiddleware = require('../middlewares/auth');
const router = express.Router();
const upload = require('../utilities/multer');

router.post('/createAvailability', upload.upload.array('files', 12), authMiddleware.verifyToken, availabilityController.createAvailability);
router.post('/createAvailSession', authMiddleware.verifyToken, availabilityController.createAvailSession);
router.get('/rejectAvailSession/:avail_ses_id',authMiddleware.verifyToken,availabilityController.rejectAvailSession);
router.get('/cancelAvailSession/:avail_ses_id',authMiddleware.verifyToken,availabilityController.cancelAvailSession);
router.get('/acceptAvailSession/:avail_ses_id',authMiddleware.verifyToken,availabilityController.acceptAvailSession);
router.get('/waitingAvailSession/:avail_ses_id',authMiddleware.verifyToken,availabilityController.waitingAvailSession);
router.get('/dispatchedAvailSession/:avail_ses_id',authMiddleware.verifyToken,availabilityController.dispatchedAvailSession);

router.get('/exploreAvailability/',authMiddleware.verifyToken,availabilityController.exploreAvailability);
router.get('/exploreMyAvailability/',authMiddleware.verifyToken,availabilityController.exploreMyAvailability);
router.get('/exploreAvailabilityById/:availId',authMiddleware.verifyToken,availabilityController.exploreAvailabilityById);
router.get('/getSessions/:avail_id',authMiddleware.verifyToken,availabilityController.getSessions);
router.get('/getSession/:ses_id',authMiddleware.verifyToken,availabilityController.getSession);

router.get('/availSuccessDelivery',authMiddleware.verifyToken,availabilityController.availSuccessDelivery);
router.get('/availOngoingDelivery',authMiddleware.verifyToken,availabilityController.availOngoingDelivery);

module.exports  = router;