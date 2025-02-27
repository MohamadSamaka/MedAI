const chatbotService = require("../services/ChatBotService");

class ChatBotcontroller {
  async sendMessageToChatGPT(req, res, next) {
    try {
      const chatbostReponse = await chatbotService.sendMessageToChatGPT(req.user, req.body);
      res.status(201).json(chatbostReponse);
    } catch (error) {
      next(error);
    }
  }

  async getUserChatLog(req, res, next) {
    try {
      const chatbostReponse = await chatbotService.getUserChatLog(req.user.id);
      res.status(200).json(chatbostReponse);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ChatBotcontroller();
