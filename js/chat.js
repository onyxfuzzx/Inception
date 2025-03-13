// Chat Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    const roomsList = document.getElementById('rooms-list');
    const dmList = document.getElementById('dm-list');
    const chatMessages = document.getElementById('chat-messages');
    const messageInput = document.getElementById('message-input');
    const sendMessageBtn = document.getElementById('send-message-btn');
    const currentRoomName = document.getElementById('current-room-name');
    const currentRoomMembers = document.getElementById('current-room-members');
    const createRoomBtn = document.getElementById('create-room-btn');
    const createRoomModal = document.getElementById('create-room-modal');
    const createRoomForm = document.getElementById('create-room-form');
    const closeModal = document.querySelectorAll('.close-modal');
    const roomInfoBtn = document.getElementById('room-info-btn');
    const membersPanel = document.querySelector('.chat-members-panel');
    const closePanelBtn = document.querySelector('.close-panel-btn');
    
    // Current active room
    let currentRoom = 'general';
    
    // Sample messages data (in a real app, this would come from a database or WebSocket)
    let messages = JSON.parse(localStorage.getItem('chat_messages')) || {
        general: [
            {
                id: 1,
                author: {
                    name: 'Alice Smith',
                    avatar: 'AS'
                },
                text: 'Hello everyone! Welcome to the General Discussion room.',
                timestamp: '2025-03-13T10:30:00'
            },
            {
                id: 2,
                author: {
                    name: 'Bob Johnson',
                    avatar: 'BJ'
                },
                text: 'Thanks Alice! I\'m excited to discuss AI and data science topics with everyone.',
                timestamp: '2025-03-13T10:32:00'
            },
            {
                id: 3,
                author: {
                    name: 'Carol Williams',
                    avatar: 'CW'
                },
                text: 'Has anyone been working with the new transformer models? I\'d love to hear your experiences.',
                timestamp: '2025-03-13T10:35:00'
            }
        ],
        ml: [
            {
                id: 1,
                author: {
                    name: 'David Miller',
                    avatar: 'DM'
                },
                text: 'Welcome to the Machine Learning room! Let\'s discuss ML algorithms and applications.',
                timestamp: '2025-03-12T14:20:00'
            },
            {
                id: 2,
                author: {
                    name: 'Alice Smith',
                    avatar: 'AS'
                },
                text: 'I\'ve been experimenting with gradient boosting for a classification problem. Anyone have tips for hyperparameter tuning?',
                timestamp: '2025-03-12T14:25:00'
            }
        ],
        dl: [
            {
                id: 1,
                author: {
                    name: 'Bob Johnson',
                    avatar: 'BJ'
                },
                text: 'Deep Learning discussion room is now open! Share your neural network architectures and challenges.',
                timestamp: '2025-03-11T09:15:00'
            }
        ],
        nlp: [
            {
                id: 1,
                author: {
                    name: 'Carol Williams',
                    avatar: 'CW'
                },
                text: 'Welcome to the NLP Group! Let\'s talk about natural language processing techniques and models.',
                timestamp: '2025-03-10T16:40:00'
            }
        ],
        cv: [
            {
                id: 1,
                author: {
                    name: 'David Miller',
                    avatar: 'DM'
                },
                text: 'Computer Vision room is ready for discussions about image processing and vision systems.',
                timestamp: '2025-03-09T11:10:00'
            }
        ]
    };
    
    // Initialize chat
    loadRoom(currentRoom);
    
    // Room selection
    if (roomsList) {
        const roomItems = roomsList.querySelectorAll('.room-item');
        
        roomItems.forEach(room => {
            room.addEventListener('click', function() {
                const roomId = this.getAttribute('data-room');
                
                // Remove active class from all rooms
                roomItems.forEach(r => r.classList.remove('active'));
                
                // Add active class to selected room
                this.classList.add('active');
                
                // Load room messages
                loadRoom(roomId);
            });
        });
    }
    
    // Send message
    if (sendMessageBtn && messageInput) {
        sendMessageBtn.addEventListener('click', sendMessage);
        
        messageInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
    }
    
    // Create room modal
    if (createRoomBtn && createRoomModal) {
        createRoomBtn.addEventListener('click', function() {
            createRoomModal.style.display = 'block';
        });
    }
    
    // Close modals
    if (closeModal) {
        closeModal.forEach(function(btn) {
            btn.addEventListener('click', function() {
                const modal = this.closest('.modal');
                if (modal) {
                    modal.style.display = 'none';
                }
            });
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    });
    
    // Create room form submission
    if (createRoomForm) {
        createRoomForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get current user
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            
            if (!currentUser || !currentUser.isLoggedIn) {
                alert('Please log in to create a room');
                return;
            }
            
            // Get form data
            const roomName = document.getElementById('room-name').value;
            const roomDescription = document.getElementById('room-description').value;
            const roomType = document.getElementById('room-type').value;
            const roomTopic = document.getElementById('room-topic').value;
            
            if (!roomName || !roomDescription || !roomType || !roomTopic) {
                alert('Please fill in all fields');
                return;
            }
            
            // Generate room ID
            const roomId = roomTopic + '-' + Date.now();
            
            // Create new room in DOM
            const newRoomItem = document.createElement('div');
            newRoomItem.className = 'room-item';
            newRoomItem.setAttribute('data-room', roomId);
            
            newRoomItem.innerHTML = `
                <div class="room-icon ${roomTopic}-icon"></div>
                <div class="room-info">
                    <h4>${roomName}</h4>
                    <p>${roomDescription}</p>
                </div>
            `;
            
            roomsList.appendChild(newRoomItem);
            
            // Add click event to new room
            newRoomItem.addEventListener('click', function() {
                const roomItems = roomsList.querySelectorAll('.room-item');
                
                // Remove active class from all rooms
                roomItems.forEach(r => r.classList.remove('active'));
                
                // Add active class to selected room
                this.classList.add('active');
                
                // Load room messages
                loadRoom(roomId);
            });
            
            // Initialize messages for new room
            messages[roomId] = [
                {
                    id: 1,
                    author: {
                        name: currentUser.name,
                        avatar: getInitials(currentUser.name)
                    },
                    text: `Welcome to ${roomName}! ${roomDescription}`,
                    timestamp: new Date().toISOString()
                }
            ];
            
            // Save messages to localStorage
            localStorage.setItem('chat_messages', JSON.stringify(messages));
            
            // Close modal and reset form
            createRoomModal.style.display = 'none';
            createRoomForm.reset();
            
            // Switch to new room
            loadRoom(roomId);
            
            // Add points to user (gamification)
            addPointsToUser(currentUser.email, 5, 'Created a chat room');
        });
    }
    
    // Toggle members panel
    if (roomInfoBtn && membersPanel) {
        roomInfoBtn.addEventListener('click', function() {
            membersPanel.classList.toggle('active');
        });
    }
    
    // Close members panel
    if (closePanelBtn && membersPanel) {
        closePanelBtn.addEventListener('click', function() {
            membersPanel.classList.remove('active');
        });
    }
    
    // Load room messages
    function loadRoom(roomId) {
        if (!chatMessages || !currentRoomName || !currentRoomMembers) return;
        
        // Update current room
        currentRoom = roomId;
        
        // Update room header
        let roomDisplayName = '';
        switch (roomId) {
            case 'general': roomDisplayName = 'General Discussion'; break;
            case 'ml': roomDisplayName = 'Machine Learning'; break;
            case 'dl': roomDisplayName = 'Deep Learning'; break;
            case 'nlp': roomDisplayName = 'NLP Group'; break;
            case 'cv': roomDisplayName = 'Computer Vision'; break;
            default: 
                // For custom rooms, get name from DOM
                const roomElement = document.querySelector(`.room-item[data-room="${roomId}"]`);
                if (roomElement) {
                    roomDisplayName = roomElement.querySelector('h4').textContent;
                } else {
                    roomDisplayName = roomId;
                }
        }
        
        currentRoomName.textContent = roomDisplayName;
        
        // Set random member count for demo
        const onlineCount = Math.floor(Math.random() * 20) + 5;
        const totalCount = onlineCount + Math.floor(Math.random() * 100) + 20;
        currentRoomMembers.textContent = `${totalCount} members, ${onlineCount} online`;
        
        // Clear messages
        chatMessages.innerHTML = '';
        
        // Check if room exists in messages
        if (!messages[roomId]) {
            messages[roomId] = [];
        }
        
        // Display messages
        messages[roomId].forEach(message => {
            displayMessage(message);
        });
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Send message function
    function sendMessage() {
        if (!messageInput.value.trim()) return;
        
        // Get current user
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        
        if (!currentUser || !currentUser.isLoggedIn) {
            alert('Please log in to send messages');
            return;
        }
        
        // Create message object
        const newMessage = {
            id: Date.now(),
            author: {
                name: currentUser.name,
                avatar: getInitials(currentUser.name)
            },
            text: messageInput.value.trim(),
            timestamp: new Date().toISOString()
        };
        
        // Add to messages
        messages[currentRoom].push(newMessage);
        
        // Save to localStorage
        localStorage.setItem('chat_messages', JSON.stringify(messages));
        
        // Display message
        displayMessage(newMessage, true);
        
        // Clear input
        messageInput.value = '';
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Add points to user (gamification)
        addPointsToUser(currentUser.email, 1, 'Sent a message');
    }
    
    // Display message in chat
    function displayMessage(message, isOwn = false) {
        if (!chatMessages) return;
        
        // Get current user
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        
        // Check if message is from current user
        if (currentUser && currentUser.isLoggedIn && message.author.name === currentUser.name) {
            isOwn = true;
        }
        
        const messageElement = document.createElement('div');
        messageElement.className = `message ${isOwn ? 'own' : ''}`;
        
        // Format timestamp
        const timestamp = new Date(message.timestamp);
        const formattedTime = timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const formattedDate = timestamp.toLocaleDateString();
        
        messageElement.innerHTML = `
            <div class="message-avatar">
                <div class="avatar-placeholder">${message.author.avatar}</div>
            </div>
            <div class="message-content">
                <div class="message-header">
                    <span class="message-author">${message.author.name}</span>
                    <span class="message-time" title="${formattedDate}">${formattedTime}</span>
                </div>
                <div class="message-text">${formatMessageText(message.text)}</div>
            </div>
        `;
        
        chatMessages.appendChild(messageElement);
    }
    
    // Format message text (add links, emojis, etc.)
    function formatMessageText(text) {
        // Convert URLs to links
        text = text.replace(
            /(https?:\/\/[^\s]+)/g, 
            '<a href="$1" target="_blank">$1</a>'
        );
        
        // Convert line breaks to <br>
        text = text.replace(/\n/g, '<br>');
        
        return text;
    }
    
    // Helper function to get initials from name
    function getInitials(name) {
        return name
            .split(' ')
            .map(word => word.charAt(0).toUpperCase())
            .join('')
            .substring(0, 2);
    }
    
    // Gamification: Add points to user
    function addPointsToUser(email, points, reason) {
        // Get leaderboard data
        const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
        
        // Find user in leaderboard
        const userIndex = leaderboard.findIndex(user => user.email === email);
        
        if (userIndex !== -1) {
            // Update existing user
            leaderboard[userIndex].points += points;
            leaderboard[userIndex].activities.push({
                reason,
                points,
                date: new Date().toISOString()
            });
        } else {
            // Add new user to leaderboard
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(u => u.email === email);
            
            if (user) {
                leaderboard.push({
                    name: user.name,
                    email: user.email,
                    points: points,
                    activities: [{
                        reason,
                        points,
                        date: new Date().toISOString()
                    }]
                });
            }
        }
        
        // Sort leaderboard by points (descending)
        leaderboard.sort((a, b) => b.points - a.points);
        
        // Save to localStorage
        localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
    }
    
    // Auto-resize textarea
    if (messageInput) {
        messageInput.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
    }
});