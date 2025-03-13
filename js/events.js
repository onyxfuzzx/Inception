// Events Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    const eventTabs = document.querySelectorAll('.event-tab');
    const eventTabContents = document.querySelectorAll('.events-tab-content');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    const currentMonthElement = document.getElementById('current-month');
    const calendarGrid = document.getElementById('calendar-grid');
    const eventsList = document.getElementById('events-list');
    const announcementsList = document.getElementById('announcements-list');
    const eventTypeFilter = document.getElementById('event-type-filter');
    const eventTimeFilter = document.getElementById('event-time-filter');
    const eventSearch = document.getElementById('event-search');
    const searchEventBtn = document.getElementById('search-event-btn');
    const submitEventBtn = document.getElementById('submit-event-btn');
    const submitEventModal = document.getElementById('submit-event-modal');
    const closeModal = document.querySelectorAll('.close-modal');
    const submitEventForm = document.getElementById('submit-event-form');
    const eventDetailsModal = document.getElementById('event-details-modal');
    
    // Current date
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
    
    // Sample events data (in a real app, this would come from a database)
    let events = JSON.parse(localStorage.getItem('events')) || [
        {
            id: 1,
            title: 'Annual AI Research Symposium',
            description: 'Join us for the annual AI Research Symposium featuring keynote speakers from leading tech companies and research institutions. The three-day event will include paper presentations, panel discussions, and networking opportunities. This year\'s theme is "AI for Sustainable Development" with a focus on applications in climate science, resource management, and ethical considerations.',
            type: 'conference',
            date: '2025-03-25',
            endDate: '2025-03-27',
            time: '09:00',
            endTime: '17:00',
            location: 'Main Campus Auditorium',
            organizer: 'Department of Data Science & AI',
            featured: true
        },
        {
            id: 2,
            title: 'Machine Learning Workshop: From Basics to Advanced',
            description: 'A comprehensive workshop covering machine learning fundamentals, algorithms, and practical applications. Participants will learn through hands-on exercises and real-world case studies.',
            type: 'workshop',
            date: '2025-03-15',
            time: '10:00',
            endTime: '16:00',
            location: 'Computer Lab 3',
            organizer: 'ML Research Group',
            featured: false
        },
        {
            id: 3,
            title: 'Ethics in AI Seminar',
            description: 'A seminar discussing ethical considerations in artificial intelligence development and deployment, including bias, fairness, transparency, and accountability.',
            type: 'seminar',
            date: '2025-03-18',
            time: '14:00',
            endTime: '16:00',
            location: 'Lecture Hall B',
            organizer: 'AI Ethics Committee',
            featured: false
        },
        {
            id: 4,
            title: 'Research Paper Submission Deadline',
            description: 'Final deadline for submitting research papers to the International Conference on Machine Learning (ICML).',
            type: 'deadline',
            date: '2025-03-31',
            time: '23:59',
            location: 'Online',
            organizer: 'ICML Committee',
            featured: false
        },
        {
            id: 5,
            title: 'Deep Learning for Computer Vision Workshop',
            description: 'Learn how to apply deep learning techniques to computer vision problems, including object detection, image classification, and semantic segmentation.',
            type: 'workshop',
            date: '2025-04-05',
            time: '09:30',
            endTime: '17:30',
            location: 'AI Lab',
            organizer: 'Computer Vision Group',
            featured: false
        },
        {
            id: 6,
            title: 'Natural Language Processing Conference',
            description: 'A two-day conference focused on recent advances in NLP, including transformer models, language understanding, and generative AI.',
            type: 'conference',
            date: '2025-04-12',
            endDate: '2025-04-13',
            time: '09:00',
            endTime: '18:00',
            location: 'Conference Center',
            organizer: 'NLP Research Team',
            featured: false
        }
    ];
    
    // Sample announcements data
    let announcements = JSON.parse(localStorage.getItem('announcements')) || [
        {
            id: 1,
            title: 'New AI Research Lab Opening',
            content: 'We are excited to announce the opening of our new AI Research Laboratory, equipped with state-of-the-art computing resources and specialized equipment for machine learning and robotics research.',
            date: '2025-03-12',
            author: {
                name: 'Dr. James Wilson',
                avatar: 'JW',
                role: 'Department Chair'
            },
            tag: 'Department News'
        },
        {
            id: 2,
            title: 'Summer Internship Applications Now Open',
            content: 'Applications for summer internships at partner companies including Google, Microsoft, and local AI startups are now open. Undergraduate and graduate students are encouraged to apply by April 15.',
            date: '2025-03-10',
            author: {
                name: 'Sarah Johnson',
                avatar: 'SJ',
                role: 'Career Services Coordinator'
            },
            tag: 'Opportunities'
        },
        {
            id: 3,
            title: 'Curriculum Updates for Fall 2025',
            content: 'The department is introducing new courses in Generative AI, Quantum Machine Learning, and AI Ethics for the Fall 2025 semester. Registration will begin on May 1.',
            date: '2025-03-05',
            author: {
                name: 'Dr. Emily Chen',
                avatar: 'EC',
                role: 'Academic Director'
            },
            tag: 'Academic'
        }
    ];
    
    // Initialize tabs
    if (eventTabs) {
        eventTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const tabName = this.getAttribute('data-tab');
                
                // Remove active class from all tabs and contents
                eventTabs.forEach(t => t.classList.remove('active'));
                eventTabContents.forEach(c => c.classList.remove('active'));
                
                // Add active class to selected tab and content
                this.classList.add('active');
                document.getElementById(`${tabName}-view`).classList.add('active');
            });
        });
    }
    
    // Initialize calendar
    updateCalendar();
    
    // Calendar navigation
    if (prevMonthBtn) {
        prevMonthBtn.addEventListener('click', function() {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            updateCalendar();
        });
    }
    
    if (nextMonthBtn) {
        nextMonthBtn.addEventListener('click', function() {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            updateCalendar();
        });
    }
    
    // Initialize list view
    updateEventsList();
    
    // Initialize announcements
    updateAnnouncementsList();
    
    // Event filters
    if (eventTypeFilter) {
        eventTypeFilter.addEventListener('change', updateEventsList);
    }
    
    if (eventTimeFilter) {
        eventTimeFilter.addEventListener('change', updateEventsList);
    }
    
    // Event search
    if (searchEventBtn && eventSearch) {
        searchEventBtn.addEventListener('click', updateEventsList);
        
        eventSearch.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                updateEventsList();
            }
        });
    }
    
    // Open submit event modal
    if (submitEventBtn && submitEventModal) {
        submitEventBtn.addEventListener('click', function() {
            // Check if user is logged in
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            
            if (!currentUser || !currentUser.isLoggedIn) {
                alert('Please log in to submit an event');
                return;
            }
            
            submitEventModal.style.display = 'block';
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
    
    // Submit event form
    if (submitEventForm) {
        submitEventForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get current user
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            
            if (!currentUser || !currentUser.isLoggedIn) {
                alert('Please log in to submit an event');
                return;
            }
            
            // Get form data
            const title = document.getElementById('event-title').value;
            const description = document.getElementById('event-description').value;
            const type = document.getElementById('event-type').value;
            const organizer = document.getElementById('event-organizer').value;
            const date = document.getElementById('event-date').value;
            const time = document.getElementById('event-time').value;
            const location = document.getElementById('event-location').value;
            
            if (!title || !description || !type || !organizer || !date || !time || !location) {
                alert('Please fill in all required fields');
                return;
            }
            
            // Create new event object
            const newEvent = {
                id: Date.now(), // Use timestamp as ID
                title,
                description,
                type,
                date,
                time,
                location,
                organizer,
                featured: false
            };
            
            // Add to events array
            events.push(newEvent);
            
            // Sort events by date
            events.sort((a, b) => new Date(a.date) - new Date(b.date));
            
            // Save to localStorage
            localStorage.setItem('events', JSON.stringify(events));
            
            // Update displays
            updateCalendar();
            updateEventsList();
            
            // Close modal and reset form
            submitEventModal.style.display = 'none';
            submitEventForm.reset();
            
            // Add points to user (gamification)
            addPointsToUser(currentUser.email, 15, 'Submitted an event');
            
            alert('Event submitted successfully!');
        });
    }
    
    // Update calendar
    function updateCalendar() {
        if (!calendarGrid || !currentMonthElement) return;
        
        // Update month display
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        currentMonthElement.textContent = `${monthNames[currentMonth]} ${currentYear}`;
        
        // Clear grid
        calendarGrid.innerHTML = '';
        
        // Get first day of month and number of days
        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        
        // Get last day of previous month
        const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();
        
        // Create calendar days
        let dayCount = 1;
        let nextMonthDay = 1;
        
        // Create 6 rows (max possible for a month)
        for (let i = 0; i < 6; i++) {
            // Stop if we've gone past the end of the month and filled at least 4 rows
            if (dayCount > daysInMonth && i >= 4) break;
            
            for (let j = 0; j < 7; j++) {
                const dayElement = document.createElement('div');
                dayElement.className = 'calendar-day';
                
                // Previous month days
                if (i === 0 && j < firstDay) {
                    const prevMonthDate = daysInPrevMonth - (firstDay - j - 1);
                    dayElement.innerHTML = `<div class="day-number">${prevMonthDate}</div>`;
                    dayElement.classList.add('other-month');
                }
                // Current month days
                else if (dayCount <= daysInMonth) {
                    const currentDayDate = new Date(currentYear, currentMonth, dayCount);
                    const isToday = isSameDay(currentDayDate, new Date());
                    
                    if (isToday) {
                        dayElement.classList.add('today');
                    }
                    
                    dayElement.innerHTML = `
                        <div class="day-number">${dayCount}</div>
                        <div class="day-events"></div>
                    `;
                    
                    // Add events for this day
                    const dayEvents = dayElement.querySelector('.day-events');
                    const eventsForDay = events.filter(event => {
                        const eventDate = new Date(event.date);
                        return eventDate.getDate() === dayCount && 
                               eventDate.getMonth() === currentMonth && 
                               eventDate.getFullYear() === currentYear;
                    });
                    
                    eventsForDay.forEach(event => {
                        const eventElement = document.createElement('div');
                        eventElement.className = `day-event ${event.type}`;
                        eventElement.textContent = event.title;
                        eventElement.setAttribute('data-event-id', event.id);
                        
                        eventElement.addEventListener('click', function() {
                            showEventDetails(event.id);
                        });
                        
                        dayEvents.appendChild(eventElement);
                    });
                    
                    dayCount++;
                }
                // Next month days
                else {
                    dayElement.innerHTML = `<div class="day-number">${nextMonthDay}</div>`;
                    dayElement.classList.add('other-month');
                    nextMonthDay++;
                }
                
                calendarGrid.appendChild(dayElement);
            }
        }
    }
    
    // Update events list
    function updateEventsList() {
        if (!eventsList) return;
        
        // Get filter values
        const typeFilter = eventTypeFilter ? eventTypeFilter.value : 'all';
        const timeFilter = eventTimeFilter ? eventTimeFilter.value : 'upcoming';
        const searchTerm = eventSearch ? eventSearch.value.toLowerCase() : '';
        
        // Filter events
        let filteredEvents = events.filter(event => {
            // Type filter
            const matchesType = typeFilter === 'all' || event.type === typeFilter;
            
            // Time filter
            const eventDate = new Date(event.date);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            const isUpcoming = eventDate >= today;
            const isPast = eventDate < today;
            
            const matchesTime = timeFilter === 'all' || 
                               (timeFilter === 'upcoming' && isUpcoming) || 
                               (timeFilter === 'past' && isPast);
            
            // Search filter
            const matchesSearch = searchTerm === '' || 
                                 event.title.toLowerCase().includes(searchTerm) || 
                                 event.description.toLowerCase().includes(searchTerm) || 
                                 event.location.toLowerCase().includes(searchTerm) || 
                                 event.organizer.toLowerCase().includes(searchTerm);
            
            return matchesType && matchesTime && matchesSearch;
        });
        
        // Sort events by date
        filteredEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
        
        // Clear list
        eventsList.innerHTML = '';
        
        // Display events
        if (filteredEvents.length === 0) {
            eventsList.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon"></div>
                    <h3>No Events Found</h3>
                    <p>Try a different search term or filter.</p>
                </div>
            `;
            return;
        }
        
        filteredEvents.forEach(event => {
            const eventItem = document.createElement('div');
            eventItem.className = 'event-item';
            
            // Format date
            const eventDate = new Date(event.date);
            const day = eventDate.getDate();
            const month = eventDate.toLocaleString('default', { month: 'short' });
            const year = eventDate.getFullYear();
            
            eventItem.innerHTML = `
                <div class="event-date">
                    <div class="event-day">${day}</div>
                    <div class="event-month">${month}</div>
                    <div class="event-year">${year}</div>
                </div>
                <div class="event-info">
                    <div class="event-info-header">
                        <div class="event-title-container">
                            <div class="event-badge ${event.type}">${formatEventType(event.type)}</div>
                            <h3 class="event-title">${event.title}</h3>
                        </div>
                    </div>
                    <div class="event-meta">
                        <div class="event-meta-item">
                            <span class="meta-icon time-icon"></span>
                            <span>${formatTime(event.time)}${event.endTime ? ` - ${formatTime(event.endTime)}` : ''}</span>
                        </div>
                        <div class="event-meta-item">
                            <span class="meta-icon location-icon"></span>
                            <span>${event.location}</span>
                        </div>
                        <div class="event-meta-item">
                            <span class="meta-icon organizer-icon"></span>
                            <span>${event.organizer}</span>
                        </div>
                    </div>
                    <p class="event-description">${event.description}</p>
                    <div class="event-actions">
                        <button class="btn-primary view-details-btn" data-event-id="${event.id}">View Details</button>
                        <button class="btn-secondary add-calendar-btn" data-event-id="${event.id}">Add to Calendar</button>
                    </div>
                </div>
            `;
            
            eventsList.appendChild(eventItem);
            
            // Add event listeners
            const viewDetailsBtn = eventItem.querySelector('.view-details-btn');
            const addCalendarBtn = eventItem.querySelector('.add-calendar-btn');
            
            viewDetailsBtn.addEventListener('click', function() {
                showEventDetails(event.id);
            });
            
            addCalendarBtn.addEventListener('click', function() {
                addToCalendar(event.id);
            });
        });
    }

    // ... (previous code remains the same)

    // Update announcements list
    function updateAnnouncementsList() {
        if (!announcementsList) return;
        
        // Sort announcements by date (newest first)
        announcements.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        // Clear list
        announcementsList.innerHTML = '';
        
        // Display announcements
        if (announcements.length === 0) {
            announcementsList.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon"></div>
                    <h3>No Announcements</h3>
                    <p>Check back later for department announcements.</p>
                </div>
            `;
            return;
        }
        
        announcements.forEach(announcement => {
            const announcementItem = document.createElement('div');
            announcementItem.className = 'announcement-item';
            
            // Format date
            const announcementDate = new Date(announcement.date);
            const formattedDate = announcementDate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            
            announcementItem.innerHTML = `
                <div class="announcement-header">
                    <h4 class="announcement-title">${announcement.title}</h4>
                    <span class="announcement-date">${formattedDate}</span>
                </div>
                <div class="announcement-content">
                    ${announcement.content}
                </div>
                <div class="announcement-footer">
                    <div class="announcement-author">
                        <div class="author-avatar">${announcement.author.avatar}</div>
                        <div class="author-info">
                            <div class="author-name">${announcement.author.name}</div>
                            <div class="author-role">${announcement.author.role}</div>
                        </div>
                    </div>
                    <span class="announcement-tag">${announcement.tag}</span>
                </div>
            `;
            
            announcementsList.appendChild(announcementItem);
        });
    }

    // Helper functions
    function isSameDay(date1, date2) {
        return date1.getFullYear() === date2.getFullYear() &&
               date1.getMonth() === date2.getMonth() &&
               date1.getDate() === date2.getDate();
    }

    function formatEventType(type) {
        return type.charAt(0).toUpperCase() + type.slice(1);
    }

    function formatTime(timeString) {
        const [hours, minutes] = timeString.split(':');
        const hours12 = hours % 12 || 12;
        const ampm = hours >= 12 ? 'PM' : 'AM';
        return `${hours12}:${minutes} ${ampm}`;
    }

    function showEventDetails(eventId) {
        const event = events.find(e => e.id === eventId);
        if (!event) return;

        const modal = document.getElementById('event-details-modal');
        const eventDate = new Date(event.date);
        const formattedDate = eventDate.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        // Set modal content
        document.getElementById('modal-event-type').className = `event-type-badge ${event.type}`;
        document.getElementById('modal-event-type').textContent = formatEventType(event.type);
        document.getElementById('modal-event-title').textContent = event.title;
        document.getElementById('modal-event-date').textContent = formattedDate;
        document.getElementById('modal-event-time').textContent = `${formatTime(event.time)}${event.endTime ? ` - ${formatTime(event.endTime)}` : ''}`;
        document.getElementById('modal-event-location').textContent = event.location;
        document.getElementById('modal-event-description').textContent = event.description;
        document.getElementById('modal-event-organizer').textContent = event.organizer;

        // Show modal
        modal.style.display = 'block';
    }

    function addToCalendar(eventId) {
        const event = events.find(e => e.id === eventId);
        if (!event) return;

        // Create iCalendar format
        const icsContent = [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'BEGIN:VEVENT',
            `DTSTART:${formatDateForICS(event.date, event.time)}`,
            `DTEND:${formatDateForICS(event.date, event.endTime || event.time)}`,
            `SUMMARY:${event.title}`,
            `DESCRIPTION:${event.description}`,
            `LOCATION:${event.location}`,
            'END:VEVENT',
            'END:VCALENDAR'
        ].join('\n');

        // Create download
        const blob = new Blob([icsContent], { type: 'text/calendar' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${event.title.replace(/\s+/g, '_')}.ics`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    function formatDateForICS(dateString, timeString) {
        const date = new Date(dateString);
        const [hours, minutes] = timeString.split(':');
        date.setHours(parseInt(hours), parseInt(minutes));
        
        return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
    }

    function addPointsToUser(email, points, reason) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.email === email);
        
        if (user) {
            user.points = (user.points || 0) + points;
            user.activities = user.activities || [];
            user.activities.push({
                date: new Date().toISOString(),
                points: points,
                reason: reason
            });
            
            localStorage.setItem('users', JSON.stringify(users));
        }
    }
});