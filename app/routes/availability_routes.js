const express = require('express');
const availabilityController = require('../controllers/availability_controller');
const authMiddleware = require('../middlewares/auth');
const router = express.Router();
const upload = require('../utilities/multer');

router.post('/createAvailability', upload.upload.array('files', 12), authMiddleware.verifyToken, availabilityController.createAvailability);
router.post('/createAvailabilitySessions', authMiddleware.verifyToken, availabilityController.createAvailabilitySessions);

module.exports  = router;