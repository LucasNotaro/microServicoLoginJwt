const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { tokenValidated } = require('../../auth');


router.get("/", authController.public);
router.get("/login", authController.login);

router.use("", tokenValidated);
router.get("/private", authController.private);

module.exports = router;
