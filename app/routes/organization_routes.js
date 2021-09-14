const express = require('express');
const orgController = require('../controllers/organization_controller');
const authMiddleware = require('../middlewares/auth');
const router = express.Router();

router.get("/viewProfile/:userId", authMiddleware.verifyToken, orgController.viewProfile);
//new change...
router.post("/updateProfile", authMiddleware.verifyToken, orgController.updateProfile);
//.....
router.get("/getMembers/:names", authMiddleware.verifyToken, orgController.getMembers);
router.post("/addMembers", authMiddleware.verifyToken, orgController.addMembers);


module.exports  = router;