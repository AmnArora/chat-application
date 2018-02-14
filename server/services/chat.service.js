const Chat = require('../models/chat.model');

module.exports.getChatsByRoom = async function getChatsByRoom(roomId) {
    try {
        let chats = await Chat.find({ room: roomId });
        return chats;
    } catch (error) {
        throw error;
    }
}

module.exports.saveChat = async function saveChat(chat) {
    try {
        let newChat = await Chat.create(chat);
        return newChat;
    } catch (error) {
        throw error;
    }
}