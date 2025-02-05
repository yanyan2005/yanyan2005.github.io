let currentUser = null;
const users = ["KO KO", "Thel"];  // Predefined users list
let chatHistory = {}; // Store messages for each user
let chatSize = 0; // Track total size of chat data (in bytes)
const MAX_SIZE = 500 * 1024 * 1024; // 500MB in bytes

// Load chat history from localStorage (if available)
window.onload = function () {
    const savedChatHistory = localStorage.getItem('chatHistory');
    if (savedChatHistory) {
        chatHistory = JSON.parse(savedChatHistory);
    }
};

// Login event
document.getElementById('loginBtn').addEventListener('click', () => {
    const usernameInput = document.getElementById('username').value;
    if (usernameInput && users.includes(usernameInput)) {
        currentUser = usernameInput;
        document.getElementById('userNameDisplay').innerText = currentUser;
        toggleChatScreen(true); // Show chat screen
        displayChatHistory(); // Display chat history
    } else {
        alert("Please enter a valid username: 'KO KO' or 'Thel'");
    }
});

// Send message event
document.getElementById('sendBtn').addEventListener('click', () => {
    const messageInput = document.getElementById('message').value;
    const fileInput = document.getElementById('fileInput').files[0];
    if (messageInput || fileInput) {
        const message = createMessage(messageInput, fileInput);
        if (chatSize + message.size <= MAX_SIZE) {
            saveMessage(message); // Save message to the current user’s chat
            displayMessage(message); // Display the message in the UI
            chatSize += message.size; // Track message size
            localStorage.setItem('chatHistory', JSON.stringify(chatHistory)); // Store chat history in localStorage
            clearInputs(); // Clear input fields
        } else {
            alert("Maximum storage size reached! Please clear some data.");
        }
    }
});

// Logout event
document.getElementById('logoutBtn').addEventListener('click', () => {
    currentUser = null;
    toggleChatScreen(false); // Show auth screen and hide chat screen
    clearInputs(); // Optionally clear inputs
});

// Clear data event
document.getElementById('clearBtn').addEventListener('click', () => {
    if (confirm("Are you sure you want to clear all data?")) {
        chatHistory = {}; // Clear chat history
        chatSize = 0; // Reset chat size tracker
        localStorage.removeItem('chatHistory'); // Remove from localStorage
        displayChatHistory(); // Refresh the chat history display
    }
});

// Toggle between auth and chat screens
function toggleChatScreen(showChat) {
    document.getElementById('auth').style.display = showChat ? 'none' : 'block';
    document.getElementById('chat').style.display = showChat ? 'block' : 'none';
}

// Clear inputs (message and file inputs)
function clearInputs() {
    document.getElementById('message').value = '';
    document.getElementById('fileInput').value = '';
}

// Create a new message object
function createMessage(messageInput, fileInput) {
    const currentDate = new Date();
    const dateString = `${currentDate.getDate().toString().padStart(2, '0')}/${(currentDate.getMonth() + 1).toString().padStart(2, '0')}/${currentDate.getFullYear()} ${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}:${currentDate.getSeconds().toString().padStart(2, '0')}`;

    // Get file size (if present)
    let fileSize = 0;
    if (fileInput) {
        fileSize = fileInput.size;
    }

    const messageSize = new TextEncoder().encode(messageInput).length + fileSize;
    return {
        user: currentUser,
        text: messageInput,
        timestamp: dateString,
        file: fileInput ? URL.createObjectURL(fileInput) : null,
        size: messageSize
    };
}

// Save message to chat history
function saveMessage(message) {
    if (!chatHistory[currentUser]) {
        chatHistory[currentUser] = []; // Initialize empty array for this user if not present
    }
    
    // Append the new message to the chat history for this user
    chatHistory[currentUser].push(message);
}

// Display chat history specific to the current user
function displayChatHistory() {
    const chatBox = document.getElementById('chatBox');
    chatBox.innerHTML = ''; // Clear current chat box

    users.forEach(user => {
        if (chatHistory[user]) {
            chatHistory[user].forEach(message => displayMessage(message));
        }
    });
}

// Display a single message with styling based on the sender
function displayMessage(message) {
    const chatBox = document.getElementById('chatBox');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');

    // Align messages differently for each user
    if (message.user === "KO KO") {
        messageDiv.classList.add('koKoMessage');
    } else if (message.user === "Thel") {
        messageDiv.classList.add('thelMessage');
    }

    messageDiv.innerHTML = `${message.user}: ${message.text} <span class="timestamp">(${message.timestamp})</span>`;

    if (message.file) {
        const img = document.createElement('img');
        img.src = message.file;
        img.style.width = '100%';
        img.style.height = '300px';
        img.style.border = '2px solid black';
        img.style.borderRadius = '10px';
        messageDiv.appendChild(img);
    }

    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
}
