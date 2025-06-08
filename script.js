// Initialize Firebase
const firebaseConfig = {
    // Replace with your Firebase config
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

let currentUser = null;
const chatMessages = document.getElementById('chat-messages');
const messageInput = document.getElementById('message-input');

function setUsername() {
    const usernameInput = document.getElementById('username');
    const username = usernameInput.value.trim();
    
    if (username) {
        currentUser = username;
        usernameInput.disabled = true;
        document.querySelector('.user-info button').disabled = true;
        messageInput.focus();
        
        // Add system message
        addMessage('System', `${username} has joined the chat`, 'received');
    }
}

function sendMessage() {
    if (!currentUser) {
        alert('Please enter your name first!');
        return;
    }

    const message = messageInput.value.trim();
    if (message) {
        // Add message to Firebase
        db.collection('messages').add({
            sender: currentUser,
            text: message,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        messageInput.value = '';
    }
}

function addMessage(sender, text, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    
    const senderDiv = document.createElement('div');
    senderDiv.className = 'sender';
    senderDiv.textContent = sender;
    
    const textDiv = document.createElement('div');
    textDiv.textContent = text;
    
    messageDiv.appendChild(senderDiv);
    messageDiv.appendChild(textDiv);
    chatMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Listen for new messages
db.collection('messages')
    .orderBy('timestamp', 'asc')
    .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
            if (change.type === 'added') {
                const message = change.doc.data();
                const type = message.sender === currentUser ? 'sent' : 'received';
                addMessage(message.sender, message.text, type);
            }
        });
    });

// Handle Enter key in message input
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
}); 