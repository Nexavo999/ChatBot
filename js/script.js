document.addEventListener('DOMContentLoaded', () => {
    const messageInput = document.getElementById('message-input');
    const sendButton = document.querySelector('.send-button');
    const chatMessages = document.querySelector('.chat-messages');

    sendButton.addEventListener('click', async () => {
        const messageText = messageInput.value.trim();
        if (messageText !== "") {
            appendMessage("user", messageText);
            messageInput.value = ""; // Clear input

            // Send the message to the Paxsenix AI API
            try {
                const response = await fetch('https://api.paxsenix.biz.id/ai/gpt4o?text=' + messageText, {
                    method: 'GET'
                });

                if (!response.ok) {
                    throw new Error(`Error fetching AI response: ${response.status}`);
                }

                const data = await response.json();
                appendMessage("bot", data.text); // Assuming the response contains a "text" property
            } catch (error) {
                console.error('Error fetching AI response:', error);
                appendMessage("bot", "An error occurred while processing your request. Please try again later.");
            }
        }
    });

    function appendMessage(sender, message) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `${sender}-message`);
        messageDiv.innerHTML = sender === "bot" ? `<div class="bot-icon"></div><div class="message-content">${message}</div><div class="message-actions"><button></button><button></button><button></button><button></button><button>⌄</button></div>` : `<div class="message-content">${message}</div>`;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to bottom
    }
});
