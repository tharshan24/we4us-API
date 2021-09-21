const express = require('express');
const publicController = require('../controllers/public_controller');
const authMiddleware = require('../middlewares/auth');
const router = express.Router();
const upload = require('../utilities/multer');

router.get("/viewProfile/:userId", authMiddleware.verifyToken, publicController.viewProfile);
router.get("/viewProfile/", authMiddleware.verifyToken, publicController.viewProfile);
router.post("/updateProfile", authMiddleware.verifyToken, publicController.updateProfile);

router.post('/driverRegister', upload.upload.array('files', 12), authMiddleware.verifyToken, publicController.registerDriver);
router.post('/vehicleRegister', upload.upload.array('files', 12), authMiddleware.verifyToken, publicController.vehicleRegister);

router.post("/updatePaymentMode/:stat", authMiddleware.verifyToken, publicController.updatePaymentMode);

module.exports  = router;