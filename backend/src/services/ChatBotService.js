const ChatBotAPI = require("../api/ChatBotAPI");
const chatlogRepository = require("../repositories/chatlogRepository");
const expertiseRepository = require("../repositories/expertiseRepository");
const { systemPromptGenerator } = require("../utils/DataOrganizer");

class ChatBotService {
  /**
   * Updates chat log with the latest user message and AI response.
   * @param {string} userId - User's ID.
   * @param {string} chatbotResponse - AI's response.
   * @param {string} userMessage - User's message.
   */
  async updateChatLog(userId, chatbotResponse, userMessage) {
    const sessionData = { user_message: userMessage, ai_response: chatbotResponse };
    await chatlogRepository.addChatSession(userId, sessionData);
  }

  async getUserChatLog(userId) {
    const chatLogs = await chatlogRepository.getChatSessionByUserId(userId);
    return chatLogs
  }

  /**
   * Sends a message to ChatGPT with user context and expertise information.
   * @param {object} reqUser - The user object (contains ID, name, etc.).
   * @param {object} userMessageData - User's message input.
   * @returns {Promise<object>} - The AI response.
   */
  async sendMessageToChatGPT(reqUser, userMessageData) {
    try {
      const chatLogs = this.getUserChatLog(reqUser.id);
      const expertiseList = await expertiseRepository.getAllExpertiseNames();

      // Generate system prompt using the provided function
      const systemPrompt = systemPromptGenerator(chatLogs, expertiseList);

      // Construct the final message
      const fullMessage = `${reqUser.Fname} ${reqUser.Lname}: ${userMessageData.message}\n\nSystem Prompt:\n${systemPrompt}`;

      // Send to ChatGPT API
      const chatResponse = await ChatBotAPI.sendMessageToChatGPT([
        { role: "system", content: systemPrompt },
        { role: "user", content: fullMessage },
      ]);

      // Extract and update response
      const messageContent = chatResponse?.choices?.[0]?.message?.content || "AI response unavailable.";
      await this.updateChatLog(reqUser.id, messageContent, userMessageData.message);

      return { response: messageContent };
    } catch (error) {
      console.error("❌ Error in sendMessageToChatGPT:", error);
      throw error;
    }
  }
}

module.exports = new ChatBotService();
