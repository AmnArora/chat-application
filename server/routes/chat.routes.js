const express = require('express');
const router = express.Router();
const chatService = require('../services/chat.service');

// Get All chats for a room
router.get('/:roomId', async function (req, res, next) {
    try {
        let chats = await chatService.getChatsByRoom(req.params.roomId);
        res.send(chats);
    } catch (error) {
        next(error);
    }
});

// Save a Chat
router.post('/', async function (req, res, next) {
    try {
        let chats = await chatService.saveChat(req.body);
        res.send();
    } catch (error) {
        next(error);
    }
});

module.exports = router;