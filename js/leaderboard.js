// Leaderboard Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    const leaderboardTabs = document.querySelectorAll('.leaderboard-tab');
    const timePeriodElement = document.getElementById('time-period');
    const searchInput = document.getElementById('search-users');
    const searchBtn = document.getElementById('search-btn');
    const topThreeContainer = document.getElementById('top-three');
    const leaderboardBody = document.getElementById('leaderboard-body');
    
    // Current tab
    let currentTab = 'overall';
    
    // Sample leaderboard data (in a real app, this would come from a database)
    let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [
        {
            name: 'Alice Smith',
            email: 'alice@example.com',
            points: 1250,
            level: 5,
            badges: ['newcomer', 'note-contributor', 'project-master', 'top-contributor'],
            activities: [
                { reason: 'Uploaded a note', points: 10, date: '2025-03-12T14:30:00' },
                { reason: 'Submitted a project', points: 20, date: '2025-03-10T09:15:00' },
                { reason: 'Created a chat room', points: 5, date: '2025-03-08T16:45:00' }
            ],
            stats: {
                notes: 15,
                projects: 4,
                messages: 187,
                events: 3
            }
        },
        {
            name: 'Bob Johnson',
            email: 'bob@example.com',
            points: 980,
            level: 4,
            badges: ['newcomer', 'discussion-leader', 'project-master'],
            activities: [
                { reason: 'Submitted a project', points: 20, date: '2025-03-11T11:20:00' },
                { reason: 'Sent a message', points: 1, date: '2025-03-11T10:05:00' },
                { reason: 'Downloaded a note', points: 2, date: '2025-03-09T15:30:00' }
            ],
            stats: {
                notes: 8,
                projects: 3,
                messages: 256,
                events: 2
            }
        },
        {
            name: 'Carol Williams',
            email: 'carol@example.com',
            points: 1450,
            level: 5,
            badges: ['newcomer', 'note-contributor', 'discussion-leader', 'event-organizer', 'top-contributor'],
            activities: [
                { reason: 'Submitted an event', points: 15, date: '2025-03-13T13:10:00' },
                { reason: 'Uploaded a note', points: 10, date: '2025-03-12T09:45:00' },
                { reason: 'Created a chat room', points: 5, date: '2025-03-10T14:20:00' }
            ],
            stats: {
                notes: 18,
                projects: 2,
                messages: 142,
                events: 5
            }
        },
        {
            name: 'David Miller',
            email: 'david@example.com',
            points: 720,
            level: 4,
            badges: ['newcomer', 'project-master'],
            activities: [
                { reason: 'Submitted a project', points: 20, date: '2025-03-09T10:30:00' },
                { reason: 'Downloaded a note', points: 2, date: '2025-03-08T16:15:00' },
                { reason: 'Sent a message', points: 1, date: '2025-03-08T14:50:00' }
            ],
            stats: {
                notes: 5,
                projects: 3,
                messages: 98,
                events: 1
            }
        },
        {
            name: 'Emily Jones',
            email: 'emily@example.com',
            points: 1680,
            level: 5,
            badges: ['newcomer', 'note-contributor', 'project-master', 'discussion-leader', 'event-organizer', 'top-contributor'],
            activities: [
                { reason: 'Submitted a project', points: 20, date: '2025-03-13T09:20:00' },
                { reason: 'Uploaded a note', points: 10, date: '2025-03-12T15:40:00' },
                { reason: 'Submitted an event', points: 15, date: '2025-03-11T11:30:00' }
            ],
            stats: {
                notes: 22,
                projects: 5,
                messages: 176,
                events: 4
            }
        },
        {
            name: 'Frank Lee',
            email: 'frank@example.com',
            points: 540,
            level: 4,
            badges: ['newcomer', 'note-contributor'],
            activities: [
                { reason: 'Uploaded a note', points: 10, date: '2025-03-10T14:15:00' },
                { reason: 'Downloaded a note', points: 2, date: '2025-03-09T11:30:00' },
                { reason: 'Sent a message', points: 1, date: '2025-03-08T16:45:00' }
            ],
            stats: {
                notes: 12,
                projects: 1,
                messages: 87,
                events: 2
            }
        },
        {
            name: 'Grace Kim',
            email: 'grace@example.com',
            points: 890,
            level: 4,
            badges: ['newcomer', 'discussion-leader', 'event-organizer'],
            activities: [
                { reason: 'Created a chat room', points: 5, date: '2025-03-12T10:20:00' },
                { reason: 'Submitted an event', points: 15, date: '2025-03-11T13:45:00' },
                { reason: 'Sent a message', points: 1, date: '2025-03-10T15:30:00' }
            ],
            stats: {
                notes: 7,
                projects: 2,
                messages: 215,
                events: 3
            }
        },
        {
            name: 'Henry Chen',
            email: 'henry@example.com',
            points: 320,
            level: 3,
            badges: ['newcomer'],
            activities: [
                { reason: 'Downloaded a note', points: 2, date: '2025-03-13T09:10:00' },
                { reason: 'Sent a message', points: 1, date: '2025-03-12T14:25:00' },
                { reason: 'Downloaded a note', points: 2, date: '2025-03-11T11:40:00' }
            ],
            stats: {
                notes: 3,
                projects: 0,
                messages: 56,
                events: 1
            }
        },
        {
            name: 'Isabella Martinez',
            email: 'isabella@example.com',
            points: 1120,
            level: 5,
            badges: ['newcomer', 'note-contributor', 'discussion-leader', 'top-contributor'],
            activities: [
                { reason: 'Uploaded a note', points: 10, date: '2025-03-12T16:30:00' },
                { reason: 'Created a chat room', points: 5, date: '2025-03-11T10:15:00' },
                { reason: 'Sent a message', points: 1, date: '2025-03-10T14:50:00' }
            ],
            stats: {
                notes: 16,
                projects: 2,
                messages: 198,
                events: 2
            }
        },
        {
            name: 'Jack Wilson',
            email: 'jack@example.com',
            points: 420,
            level: 3,
            badges: ['newcomer', 'project-master'],
            activities: [
                { reason: 'Submitted a project', points: 20, date: '2025-03-09T15:20:00' },
                { reason: 'Downloaded a note', points: 2, date: '2025-03-08T11:45:00' },
                { reason: 'Sent a message', points: 1, date: '2025-03-07T16:30:00' }
            ],
            stats: {
                notes: 4,
                projects: 3,
                messages: 67,
                events: 1
            }
        }
    ];
    
    // Initialize leaderboard
    updateLeaderboard();
    
    // Tab switching
    if (leaderboardTabs) {
        leaderboardTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const tabName = this.getAttribute('data-tab');
                
                // Remove active class from all tabs
                leaderboardTabs.forEach(t => t.classList.remove('active'));
                
                // Add active class to selected tab
                this.classList.add('active');
                
                // Update current tab
                currentTab = tabName;
                
                // Update leaderboard
                updateLeaderboard();
            });
        });
    }
    
    // Search functionality
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', function() {
            updateLeaderboard();
        });
        
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                updateLeaderboard();
            }
        });
    }
    
    // Update leaderboard based on current tab and search
    function updateLeaderboard() {
        // Get search term
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        
        // Filter leaderboard based on tab and search
        let filteredLeaderboard = [...leaderboard];
        
        // Apply tab filter
        switch (currentTab) {
            case 'monthly':
                // In a real app, this would filter by monthly points
                // For this demo, we'll just use the same data
                if (timePeriodElement) {
                    timePeriodElement.textContent = 'This Month';
                }
                break;
            case 'notes':
                // Sort by notes count
                filteredLeaderboard.sort((a, b) => (b.stats.notes || 0) - (a.stats.notes || 0));
                if (timePeriodElement) {
                    timePeriodElement.textContent = 'Notes Contribution';
                }
                break;
            case 'projects':
                // Sort by projects count
                filteredLeaderboard.sort((a, b) => (b.stats.projects || 0) - (a.stats.projects || 0));
                if (timePeriodElement) {
                    timePeriodElement.textContent = 'Project Contribution';
                }
                break;
            case 'discussions':
                // Sort by messages count
                filteredLeaderboard.sort((a, b) => (b.stats.messages || 0) - (a.stats.messages || 0));
                if (timePeriodElement) {
                    timePeriodElement.textContent = 'Discussion Participation';
                }
                break;
            default:
                // Overall - sort by total points
                filteredLeaderboard.sort((a, b) => b.points - a.points);
                if (timePeriodElement) {
                    timePeriodElement.textContent = 'All Time';
                }
        }
        
        // Apply search filter
        if (searchTerm) {
            filteredLeaderboard = filteredLeaderboard.filter(user => 
                user.name.toLowerCase().includes(searchTerm)
            );
        }
        
        // Update top three
        updateTopThree(filteredLeaderboard.slice(0, 3));
        
        // Update leaderboard table
        updateLeaderboardTable(filteredLeaderboard);
    }
    
    // Update top three display
    function updateTopThree(topUsers) {
        if (!topThreeContainer) return;
        
        topThreeContainer.innerHTML = '';
        
        if (topUsers.length === 0) {
            topThreeContainer.innerHTML = '<p>No users found</p>';
            return;
        }
        
        // Create top three elements
        topUsers.forEach((user, index) => {
            const position = index + 1;
            let positionClass = '';
            
            switch (position) {
                case 1: positionClass = 'first'; break;
                case 2: positionClass = 'second'; break;
                case 3: positionClass = 'third'; break;
            }
            
            const userElement = document.createElement('div');
            userElement.className = `top-user ${positionClass}`;
            userElement.setAttribute('data-email', user.email);
            
            userElement.innerHTML = `
                <div class="top-rank">${position}</div>
                <div class="top-avatar">${getInitials(user.name)}</div>
                <div class="top-name">${user.name}</div>
                <div class="top-points">${user.points} points</div>
                <div class="top-level">Level ${user.level} - ${getLevelName(user.level)}</div>
            `;
            
            topThreeContainer.appendChild(userElement);
            
            // Add click event to show user profile
            userElement.addEventListener('click', function() {
                showUserProfile(user.email);
            });
        });
    }
    
    // Update leaderboard table
    function updateLeaderboardTable(users) {
        if (!leaderboardBody) return;
        
        leaderboardBody.innerHTML = '';
        
        if (users.length === 0) {
            const emptyRow = document.createElement('tr');
            emptyRow.innerHTML = `
                <td colspan="5" class="empty-table">No users found</td>
            `;
            leaderboardBody.appendChild(emptyRow);
            return;
        }
        
        // Create table rows
        users.forEach((user, index) => {
            const position = index + 1;
            
            const row = document.createElement('tr');
            row.setAttribute('data-email', user.email);
            
            row.innerHTML = `
                <td class="rank-cell">
                    <div class="rank-number">${position}</div>
                </td>
                <td>
                    <div class="user-cell">
                        <div class="user-avatar">${getInitials(user.name)}</div>
                        <div class="user-info">
                            <h4>${user.name}</h4>
                            <p>Level ${user.level} - ${getLevelName(user.level)}</p>
                        </div>
                    </div>
                </td>
                <td class="points-cell">${user.points}</td>
                <td>
                    <div class="badges-cell">
                        ${user.badges.map(badge => `
                            <div class="badge ${badge}" title="${formatBadgeName(badge)}"></div>
                        `).join('')}
                    </div>
                </td>
                <td class="level-cell">Level ${user.level}</td>
            `;
            
            leaderboardBody.appendChild(row);
            
            // Add click event to show user profile
            row.addEventListener('click', function() {
                showUserProfile(user.email);
            });
        });
    }
    
    // Show user profile modal
    function showUserProfile(email) {
        const user = leaderboard.find(u => u.email === email);
        
        if (!user) return;
        
        const userProfileModal = document.getElementById('user-profile-modal');
        
        if (!userProfileModal) return;
        
        // Update modal content
        document.getElementById('modal-user-initials').textContent = getInitials(user.name);
        document.getElementById('modal-user-name').textContent = user.name;
        document.getElementById('modal-user-level').textContent = `Level ${user.level} - ${getLevelName(user.level)}`;
        document.getElementById('modal-user-points').textContent = `${user.points} points`;
        
        // Update badges
        const badgesContainer = document.getElementById('modal-user-badges');
        badgesContainer.innerHTML = '';
        
        user.badges.forEach(badge => {
            const badgeElement = document.createElement('div');
            badgeElement.className = 'user-badge';
            
            badgeElement.innerHTML = `
                <div class="badge-icon small ${badge}"></div>
                <div class="badge-name">${formatBadgeName(badge)}</div>
            `;
            
            badgesContainer.appendChild(badgeElement);
        });
        
        // Update stats
        document.getElementById('modal-notes-count').textContent = user.stats.notes || 0;
        document.getElementById('modal-projects-count').textContent = user.stats.projects || 0;
        document.getElementById('modal-messages-count').textContent = user.stats.messages || 0;
        document.getElementById('modal-events-count').textContent = user.stats.events || 0;
        
        // Update activity
        const activityList = document.getElementById('modal-activity-list');
        activityList.innerHTML = '';
        
        if (user.activities && user.activities.length > 0) {
            user.activities.forEach(activity => {
                const activityElement = document.createElement('div');
                activityElement.className = 'activity-item';
                
                // Determine icon based on activity
                let iconClass = '';
                if (activity.reason.includes('note')) {
                    iconClass = 'notes-points-icon';
                } else if (activity.reason.includes('project')) {
                    iconClass = 'projects-points-icon';
                } else if (activity.reason.includes('message') || activity.reason.includes('chat')) {
                    iconClass = 'chat-points-icon';
                } else if (activity.reason.includes('event')) {
                    iconClass = 'events-points-icon';
                }
                
                // Format date
                const activityDate = new Date(activity.date);
                const formattedDate = activityDate.toLocaleDateString();
                const formattedTime = activityDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                
                activityElement.innerHTML = `
                    <div class="activity-icon ${iconClass}"></div>
                    <div class="activity-info">
                        <div class="activity-text">${activity.reason}</div>
                        <div class="activity-time">${formattedDate} at ${formattedTime}</div>
                    </div>
                    <div class="activity-points">+${activity.points}</div>
                `;
                
                activityList.appendChild(activityElement);
            });
        } else {
            activityList.innerHTML = '<p>No recent activity</p>';
        }
        
        // Show modal
        userProfileModal.style.display = 'block';
    }
    
    // Helper function to get initials from name
    function getInitials(name) {
        return name
            .split(' ')
            .map(word => word.charAt(0).toUpperCase())
            .join('')
            .substring(0, 2);
    }
    
    // Helper function to get level name
    function getLevelName(level) {
        switch (level) {
            case 1: return 'Beginner';
            case 2: return 'Novice';
            case 3: return 'Intermediate';
            case 4: return 'Advanced';
            case 5: return 'Expert';
            case 6: return 'Master';
            default: return 'Unknown';
        }
    }
    
    // Helper function to format badge name
    function formatBadgeName(badge) {
        switch (badge) {
            case 'newcomer': return 'Newcomer';
            case 'note-contributor': return 'Note Contributor';
            case 'project-master': return 'Project Master';
            case 'discussion-leader': return 'Discussion Leader';
            case 'event-organizer': return 'Event Organizer';
            case 'top-contributor': return 'Top Contributor';
            default: return badge.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
        }
    }
    
    // Gamification: Add points to user
    function addPointsToUser(email, points, reason) {
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
            
            // Update level based on points
            leaderboard[userIndex].level = calculateLevel(leaderboard[userIndex].points);
            
            // Update badges
            updateUserBadges(userIndex);
        } else {
            // Add new user to leaderboard
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(u => u.email === email);
            
            if (user) {
                const newUser = {
                    name: user.name,
                    email: user.email,
                    points: points,
                    level: calculateLevel(points),
                    badges: ['newcomer'],
                    activities: [{
                        reason,
                        points,
                        date: new Date().toISOString()
                    }],
                    stats: {
                        notes: 0,
                        projects: 0,
                        messages: 0,
                        events: 0
                    }
                };
                
                // Update stats based on activity
                if (reason.includes('note')) {
                    newUser.stats.notes++;
                } else if (reason.includes('project')) {
                    newUser.stats.projects++;
                } else if (reason.includes('message') || reason.includes('chat')) {
                    newUser.stats.messages++;
                } else if (reason.includes('event')) {
                    newUser.stats.events++;
                }
                
                leaderboard.push(newUser);
            }
        }
        
        // Sort leaderboard by points (descending)
        leaderboard.sort((a, b) => b.points - a.points);
        
        // Save to localStorage
        localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
        
        // Update leaderboard display
        updateLeaderboard();
    }
    
    // Calculate level based on points
    function calculateLevel(points) {
        if (points >= 2000) return 6; // Master
        if (points >= 1000) return 5; // Expert
        if (points >= 500) return 4; // Advanced
        if (points >= 250) return 3; // Intermediate
        if (points >= 100) return 2; // Novice
        return 1; // Beginner
    }
    
    // Update user badges based on stats and points
    function updateUserBadges(userIndex) {
        const user = leaderboard[userIndex];
        
        // Initialize badges array if it doesn't exist
        if (!user.badges) {
            user.badges = [];
        }
        
        // Newcomer badge (everyone gets this)
        if (!user.badges.includes('newcomer')) {
            user.badges.push('newcomer');
        }
        
        // Note Contributor badge (5+ notes)
        if (user.stats.notes >= 5 && !user.badges.includes('note-contributor')) {
            user.badges.push('note-contributor');
        }
        
        // Project Master badge (3+ projects)
        if (user.stats.projects >= 3 && !user.badges.includes('project-master')) {
            user.badges.push('project-master');
        }
        
        // Discussion Leader badge (created a chat room with 10+ members or 100+ messages)
        if (user.stats.messages >= 100 && !user.badges.includes('discussion-leader')) {
            user.badges.push('discussion-leader');
        }
        
        // Event Organizer badge (submitted an event)
        if (user.stats.events >= 1 && !user.badges.includes('event-organizer')) {
            user.badges.push('event-organizer');
        }
        
        // Top Contributor badge (top 10 on leaderboard)
        const isTop10 = leaderboard.findIndex(u => u.email === user.email) < 10;
        if (isTop10 && !user.badges.includes('top-contributor')) {
            user.badges.push('top-contributor');
        } else if (!isTop10 && user.badges.includes('top-contributor')) {
            // Remove badge if no longer in top 10
            user.badges = user.badges.filter(badge => badge !== 'top-contributor');
        }
    }
});