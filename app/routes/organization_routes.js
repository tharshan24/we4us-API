const express = require('express');
const orgController = require('../controllers/organization_controller');
const authMiddleware = require('../middlewares/auth');
const router = express.Router();

router.get("/viewProfile/:userId", authMiddleware.verifyToken, orgController.viewProfile);

module.exports  = router;