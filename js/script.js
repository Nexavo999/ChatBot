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
                const url = `https://chat-gpt-3-5.bjcoderx.workers.dev/?text=${encodeURIComponent(userMessage)}`;
                
                // Sending the request
                const response = await fetch(url);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                // Get the JSON data
                const data = await response.json();

                // If response is valid, show the bot's reply
                if (data && data.reply) {
                    appendMessage("bot", data.reply); // Bot's response
                } else {
                    appendMessage("bot", "Sorry, no valid response from the server.");
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
        chatWindow.scrollTop = chatWindow.scrollHeight; // Auto-scroll to bottom
    }
});
