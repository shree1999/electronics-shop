const express = require('express');

const { authCheck, adminCheck } = require('../middlewares/auth.middleware');
const {
  uploadImages,
  removeImages,
} = require('../controllers/cloudinary.controller');

const router = express.Router();

router.route('/upload-images').post(authCheck, adminCheck, uploadImages);

router.route('/remove-images').post(authCheck, adminCheck, removeImages);

module.exports = router;
