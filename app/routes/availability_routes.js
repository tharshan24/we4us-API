const express = require('express');
const availabilityController = require('../controllers/availability_controller');
const authMiddleware = require('../middlewares/auth');
const router = express.Router();
const upload = require('../utilities/multer');

router.post('/createAvailability', upload.upload.array('files', 12), authMiddleware.verifyToken, availabilityController.createAvailability);
router.post('/createAvailSession', authMiddleware.verifyToken, availabilityController.createAvailSession);
router.get('/rejectAvailSession/:avail_id',authMiddleware.verifyToken,availabilityController.rejectAvailSession);

module.exports  = router;