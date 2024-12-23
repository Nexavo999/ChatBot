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
            // Append user's message
            appendMessage("user", userMessage);
            userInput.value = "";

            // Call the API
            try {
                const response = await fetch(
                    `https://api.paxsenix.biz.id/ai/gpt4o?text=${encodeURIComponent(userMessage)}`,
                    {
                        method: "GET",
                    }
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();

                if (data && data.response) {
                    appendMessage("bot", data.response);
                } else {
                    appendMessage("bot", "Sorry, no response from the server.");
                }
            } catch (error) {
                console.error("Error fetching API:", error);
                appendMessage("bot", "Error: Unable to connect to the API.");
            }
        }
    }

    function appendMessage(sender, message) {
        const messageElement = document.createElement("div");
        messageElement.classList.add("message", sender);
        messageElement.textContent = message;
        chatWindow.appendChild(messageElement);
        chatWindow.scrollTop = chatWindow.scrollHeight; // Auto-scroll
    }
});
