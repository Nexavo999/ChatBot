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
                const url = `https://api.paxsenix.biz.id/ai/gpt4omini?text=${encodeURIComponent(userMessage)}`;
                
                // Sending the request to the API with headers
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'accept': 'application/json'
                    }
                });
                
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                // Parse the JSON data from the API
                const data = await response.json();
                console.log("API Response:", data); // Debug: Check the API response

                // Handle the response (extracting 'message' key)
                if (data && data.ok && data.message) {
                    appendMessage("bot", data.message);  // Display the bot's response
                } else {
                    appendMessage("bot", "Sorry, no valid response received from the API.");
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
});document.addEventListener("DOMContentLoaded", () => {
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
                const url = `https://api.paxsenix.biz.id/ai/gpt4omini?text=${encodeURIComponent(userMessage)}`;
                
                // Sending the request to the API with headers
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'accept': 'application/json'
                    }
                });
                
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                // Parse the JSON data from the API
                const data = await response.json();
                console.log("API Response:", data); // Debug: Check the API response

                // Handle the response (extracting 'message' key)
                if (data && data.ok && data.message) {
                    appendMessage("bot", data.message);  // Display the bot's response
                } else {
                    appendMessage("bot", "Sorry, no valid response received from the API.");
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
