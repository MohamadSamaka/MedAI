const chatLogModel = require("../models/chatLogModel");

class ChatLogRepository {
  async create(data) {
    return await chatLogModel.create(data);
  }

  async findById(id) {
    return await chatLogModel.findById(id);
  }

  async getChatSessionByUserId(userId) {
    const chatLog = await chatLogModel
      .findOne({ user_id: userId }, "chat_session")
      .sort({ "chat_session.timestamp": 1 });
    return chatLog
      ? chatLog.chat_session.map(session => session).flat()
      : [];
  }

  async addChatSession(userId, sessionData){
    return await chatLogModel.findOneAndUpdate(
      { user_id: userId }, 
      { $push: { chat_session: sessionData } },
      { new: true } 
    );
  }

  async update(id, data) {
    return await chatLogModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return await chatLogModel.findByIdAndDelete(id);
  }
}

module.exports = new ChatLogRepository();
