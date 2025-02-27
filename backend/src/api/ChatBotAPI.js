const axiosInstance = require("./axiosInstance")

class ChatBotAPI {
    async sendMessageToChatGPT(conversationHistory) {
      try {
        const response = await axiosInstance.post('/chat/completions', {
          model: 'gpt-3.5-turbo',
          messages: conversationHistory,
        });
        return response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  }
  
  module.exports = new ChatBotAPI();