const express = require('express');
const systemController = require('../controllers/system_controller');
const authMiddleware = require('../middlewares/auth');
const router = express.Router();

// get districts
router.get("/districts", systemController.getDistricts);

//get cities by district id
router.get("/citiesByDistrict/:district", systemController.getCitiesByDistricts);

router.get("/getVehicleTypes", systemController.getVehicleTypes);

router.get("/getAvailabilityType",authMiddleware.verifyToken,systemController.getAvailabilityType);
router.get("/getRequestType",authMiddleware.verifyToken,systemController.getRequestType);

module.exports = router;