const express = require('express');
const requestController = require('../controllers/request_controller');
const authMiddleware = require('../middlewares/auth');
const router = express.Router();


router.post('/createRequest', authMiddleware.verifyToken, requestController.createRequest);
