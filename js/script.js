document.addEventListener("DOMContentLoaded", () => {
    const userInput = document.getElementById("user-input");
    const sendBtn = document.getElementById("send-btn");
    const chatWindow = document.getElementById("chat-window");

    sendBtn.addEventListener("click", () => {
        const userMessage = userInput.value.trim();
        if (userMessage) {
            appendMessage("user", userMessage);
            userInput.value = "";

            // Fetch response from API
            fetch(`https://api.paxsenix.biz.id/ai/gpt4o?text=${encodeURIComponent(userMessage)}`)
                .then(response => response.json())
                .then(data => {
                    if (data.response) {
                        appendMessage("bot", data.response);
                    } else {
                        appendMessage("bot", "Sorry, no response.");
                    }
                })
                .catch(error => {
                    appendMessage("bot", "Error: Unable to connect to the API.");
                });
        }
    });

    function appendMessage(sender, message) {
        const messageElement = document.createElement("div");
        messageElement.classList.add("message", sender);
        messageElement.textContent = message;
        chatWindow.appendChild(messageElement);
        chatWindow.scrollTop = chatWindow.scrollHeight; // Auto-scroll
    }
});
