const express = require('express');

const { chatSearchQuery } = require('../controllers/chatbot.controller');

const router = express.Router();

router.post('/chatmessage', chatSearchQuery);

module.exports = router;
