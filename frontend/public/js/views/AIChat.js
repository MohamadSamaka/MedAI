import { loadStyles } from "/js/helpers/stylesManager.js";
import { sendMessage, getUserChatLog } from "/js/api/chatbotAPI.js";

export function render() {
  return `
    <div class="container">
      <!-- Sidebar with Chat History -->
      <!-- Main Chat Area -->
      <div class="chat-container" id="chatContainer">
      
        <div class="chat-header"><a href="/"
        ><button class="home-btn" id="home-icon">
          <i class="fa-solid fa-house"></i></button
      ></a><span id="chatbot-title">MedicalGPT</span></div>
        <div class="chat-messages" id="chatMessages">
          <!-- Chat messages will be appended here -->
        </div>
        <div class="chat-input">
          <input
            type="text"
            id="chatInput"
            placeholder="Type your message here..."
          />
          <button id="sendButton">
            <i class="fa-solid fa-arrow-up"></i>
          </button>
        </div>
      </div>
    </div>
    `;
}

export async function init(styles, params) {
  loadStyles(styles);
  // Global object to store conversations by ID.
  // Global object to store conversations by ID.

  // Chat elements.
  const chatInput = document.getElementById("chatInput");
  const sendButton = document.getElementById("sendButton");
  const chatMessages = document.getElementById("chatMessages");

  // Append a chat message.
  function appendMessage(content, sender = "bot") {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("chat-message", sender);
    const contentDiv = document.createElement("div");
    contentDiv.classList.add("message-content");
    contentDiv.textContent = content;
    messageDiv.appendChild(contentDiv);
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  async function loadUserChatLog() {
    const chatlogs = await getUserChatLog();
    chatlogs.forEach(({ user_message, ai_response }) => {
      appendMessage(user_message, "user");
      appendMessage(ai_response, "bot");
    });
  }

  // New function that sends the user's message to the server.
  async function sendToServer(message) {
    try {
      const data = await sendMessage(message);
      console.log(data);
      if (data.error) {
        appendMessage("Error: " + data.error, "bot");
      } else {
        appendMessage(data.response, "bot");
      }
    } catch (error) {
      appendMessage("Error: " + error.message, "bot");
    }
  }

  // Event listener for sending messages.
  sendButton.addEventListener("click", () => {
    const message = chatInput.value.trim();
    if (message !== "") {
      // Append the user's message.
      appendMessage(message, "user");
      chatInput.value = "";
      // Send the user's message to the OpenAI-powered server.
      sendToServer(message);
    }
  });

  chatInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      sendButton.click();
    }
  });

  // On initial load, if no conversation exists, display the starting message.
  function greet() {
    // if (chatMessages.innerHTML.trim() === "") {
    // Array of possible greeting messages
    const greetings = [
      "Hi there, how can I help you?",
      "Hello! What can I assist you with today?",
      "Hey! How may I help you today?",
      "Hi! What can I do for you?",
      "Hello there! How can I be of assistance?",
      "Hey there! How can I assist you today?",
      "Hi! How can I make your day easier?",
      "Hello! Need help with anything?",
      "Hey! What can I help you with right now?",
      "Hi there! How can I support you today?",
      "Greetings! How may I assist you?",
    ];

    // Select a random greeting
    const randomGreeting =
      greetings[Math.floor(Math.random() * greetings.length)];

    // Append the randomly selected greeting message
    appendMessage(randomGreeting, "bot");
  }
  await loadUserChatLog();
  greet();
}
