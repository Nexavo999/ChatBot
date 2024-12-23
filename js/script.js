document.addEventListener("DOMContentLoaded", () => {
    const userInput = document.getElementById("user-input");
    const sendBtn = document.getElementById("send-btn");
    const chatWindow = document.getElementById("chat-window");

    // Send message on button click
    sendBtn.addEventListener("click", () => {
        sendMessage();
    });

    // Send message on Enter key
    userInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            sendMessage();
        }
    });

    async function sendMessage() {
        const userMessage = userInput.value.trim();
        if (userMessage) {
            // Append user's message to the chat window
            appendMessage("user", userMessage);
            userInput.value = ""; // Clear input field

            // Call the API
            try {
                const url = 'https://api.paxsenix.biz.id/ai/gpt4o?text=' + encodeURIComponent(userMessage);
                
                // Sending the request to the API
                const response = await fetch(url);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                // Parse the JSON data from the API
                const data = await response.json();
                console.log("API Response:", data);  // Debug: Check the API response

                // Handle the response (if the 'reply' or 'response' key exists)
                if (data) {
                    if (data.reply) {
                        appendMessage("bot", data.reply);  // If API returns "reply"
                    } else if (data.response) {
                        appendMessage("bot", data.response);  // If API returns "response"
                    } else {
                        appendMessage("bot", "Sorry, the AI assistant did not provide a response.");
                    }
                } else {
                    appendMessage("bot", "Error: Unable to connect to the server.");
                }
            } catch (error) {
                console.error("Error fetching API:", error);
                appendMessage("bot", "Error: Unable to connect to the server.");
            }
        }
    }

    function appendMessage(sender, message) {
        const messageElement = document.createElement("div");
        messageElement.classList.add("message", sender);
        messageElement.textContent = message;
        chatWindow.appendChild(messageElement);
        chatWindow.scrollTop = chatWindow.scrollHeight;  // Auto-scroll to bottom
    }
});
