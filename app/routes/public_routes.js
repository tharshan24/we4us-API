const express = require('express');
const publicController = require('../controllers/public_controller');
const authMiddleware = require('../middlewares/auth');
const router = express.Router();

router.get("/viewProfile/:userId", authMiddleware.verifyToken, publicController.viewProfile);
router.post("/updateProfile/", authMiddleware.verifyToken, publicController.updateProfile);
module.exports  = router;