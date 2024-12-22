
document.addEventListener("DOMContentLoaded", () => {
    const userInput = document.getElementById("user-input");
    const sendBtn = document.getElementById("send-btn");
    const chatWindow = document.getElementById("chat-window");

    sendBtn.addEventListener("click", () => {
        const userMessage = userInput.value.trim();
        if (userMessage) {
            appendMessage("You", userMessage);
            userInput.value = "";

            fetch(`https://api.paxsenix.biz.id/ai/gpt4o?text=${encodeURIComponent(userMessage)}`)
                .then(response => response.json())
                .then(data => {
                    appendMessage("ChatBot", data.response || "Sorry, no response.");
                })
                .catch(error => {
                    appendMessage("ChatBot", "Error: Unable to fetch response.");
                });
        }
    });

    function appendMessage(sender, message) {
        const messageElement = document.createElement("div");
        messageElement.classList.add("message");
        messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
        chatWindow.appendChild(messageElement);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }
});
