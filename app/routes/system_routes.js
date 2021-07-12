const express = require('express');
const systemController = require('../controllers/system_controller');
const authMiddleware = require('../middlewares/auth');
const router = express.Router();

// get districts
router.get("/districts", systemController.getDistricts);

//get cities by district id
router.get("/citiesByDistrict", systemController.getDistricts);

module.exports = router;