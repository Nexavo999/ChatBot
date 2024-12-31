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

            // Check if the response is OK
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // Parse the JSON data from the API
            const data = await response.json();
            console.log("Raw API Response:", data); // Log the raw API response for debugging

            // Handle the response
            if (data && data.ok && data.message) {
                appendMessage("bot", data.message);  // Display the bot's response
            } else {
                console.error("Unexpected API Response Format:", data); // Log the unexpected response
                appendMessage("bot", "Sorry, the AI assistant did not provide a valid response.");
            }
        } catch (error) {
            console.error("Error fetching API:", error);
            appendMessage("bot", "Error: Unable to connect to the server.");
        }
    }
}
