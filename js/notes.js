// Notes Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    const uploadBtn = document.getElementById('upload-note-btn');
    const uploadModal = document.getElementById('upload-modal');
    const closeModal = document.querySelectorAll('.close-modal');
    const uploadForm = document.getElementById('upload-form');
    const fileInput = document.getElementById('note-file');
    const fileInfo = document.getElementById('file-info');
    const searchInput = document.getElementById('search-notes');
    const searchBtn = document.getElementById('search-btn');
    const semesterFilter = document.getElementById('semester-filter');
    const subjectFilter = document.getElementById('subject-filter');
    const notesContainer = document.getElementById('notes-container');
    const emptyNotes = document.getElementById('empty-notes');
    
    // Sample notes data (in a real app, this would come from a database)
    let notes = JSON.parse(localStorage.getItem('notes')) || [
        {
            id: 1,
            title: 'Introduction to Machine Learning',
            description: 'Comprehensive notes covering the basics of machine learning algorithms, supervised and unsupervised learning.',
            subject: 'ml',
            semester: 'sem1',
            author: {
                name: 'John Doe',
                avatar: 'JD'
            },
            uploadDate: '2025-02-15',
            fileSize: '2.4 MB',
            downloads: 128
        },
        {
            id: 2,
            title: 'Neural Networks and Deep Learning',
            description: 'Detailed explanation of neural network architectures, backpropagation, and deep learning frameworks.',
            subject: 'dl',
            semester: 'sem2',
            author: {
                name: 'Alice Smith',
                avatar: 'AS'
            },
            uploadDate: '2025-02-10',
            fileSize: '3.8 MB',
            downloads: 95
        },
        {
            id: 3,
            title: 'Natural Language Processing Techniques',
            description: 'Notes on text processing, tokenization, word embeddings, and transformer models for NLP tasks.',
            subject: 'nlp',
            semester: 'sem3',
            author: {
                name: 'Bob Johnson',
                avatar: 'BJ'
            },
            uploadDate: '2025-01-28',
            fileSize: '1.9 MB',
            downloads: 76
        },
        {
            id: 4,
            title: 'Computer Vision Fundamentals',
            description: 'Overview of image processing, feature extraction, object detection, and CNN architectures for vision tasks.',
            subject: 'cv',
            semester: 'sem2',
            author: {
                name: 'Carol Williams',
                avatar: 'CW'
            },
            uploadDate: '2025-01-15',
            fileSize: '4.2 MB',
            downloads: 112
        },
        {
            id: 5,
            title: 'Statistical Methods for Data Science',
            description: 'Comprehensive notes on probability, statistical inference, hypothesis testing, and regression analysis.',
            subject: 'stats',
            semester:  'hypothesis testing, and regression analysis.',
            subject: 'stats',
            semester: 'sem1',
            author: {
                name: 'David Miller',
                avatar: 'DM'
            },
            uploadDate: '2025-01-05',
            fileSize: '2.7 MB',
            downloads: 89
        }
    ];
    
    // Initialize notes display
    displayNotes(notes);
    
    // Open upload modal
    if (uploadBtn && uploadModal) {
        uploadBtn.addEventListener('click', function() {
            uploadModal.style.display = 'block';
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
    
    // File input change
    if (fileInput && fileInfo) {
        fileInput.addEventListener('change', function() {
            if (this.files.length > 0) {
                const file = this.files[0];
                const fileSize = (file.size / (1024 * 1024)).toFixed(2); // Convert to MB
                fileInfo.textContent = `${file.name} (${fileSize} MB)`;
            } else {
                fileInfo.textContent = '';
            }
        });
        
        // Drag and drop functionality
        const fileUpload = fileInput.closest('.file-upload');
        
        if (fileUpload) {
            ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
                fileUpload.addEventListener(eventName, preventDefaults, false);
            });
            
            function preventDefaults(e) {
                e.preventDefault();
                e.stopPropagation();
            }
            
            ['dragenter', 'dragover'].forEach(eventName => {
                fileUpload.addEventListener(eventName, highlight, false);
            });
            
            ['dragleave', 'drop'].forEach(eventName => {
                fileUpload.addEventListener(eventName, unhighlight, false);
            });
            
            function highlight() {
                fileUpload.classList.add('highlight');
            }
            
            function unhighlight() {
                fileUpload.classList.remove('highlight');
            }
            
            fileUpload.addEventListener('drop', handleDrop, false);
            
            function handleDrop(e) {
                const dt = e.dataTransfer;
                const files = dt.files;
                
                if (files.length > 0) {
                    fileInput.files = files;
                    const file = files[0];
                    const fileSize = (file.size / (1024 * 1024)).toFixed(2); // Convert to MB
                    fileInfo.textContent = `${file.name} (${fileSize} MB)`;
                }
            }
        }
    }
    
    // Upload form submission
    if (uploadForm) {
        uploadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get current user
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            
            if (!currentUser || !currentUser.isLoggedIn) {
                alert('Please log in to upload notes');
                return;
            }
            
            // Get form data
            const title = document.getElementById('note-title').value;
            const description = document.getElementById('note-description').value;
            const subject = document.getElementById('note-subject').value;
            const semester = document.getElementById('note-semester').value;
            const file = fileInput.files[0];
            
            if (!title || !description || !subject || !semester || !file) {
                alert('Please fill in all fields and select a file');
                return;
            }
            
            // Create new note object
            const newNote = {
                id: Date.now(), // Use timestamp as ID
                title,
                description,
                subject,
                semester,
                author: {
                    name: currentUser.name,
                    avatar: getInitials(currentUser.name)
                },
                uploadDate: new Date().toISOString().split('T')[0],
                fileSize: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
                downloads: 0
            };
            
            // Add to notes array
            notes.unshift(newNote);
            
            // Save to localStorage
            localStorage.setItem('notes', JSON.stringify(notes));
            
            // Update display
            displayNotes(notes);
            
            // Close modal and reset form
            uploadModal.style.display = 'none';
            uploadForm.reset();
            fileInfo.textContent = '';
            
            // Add points to user (gamification)
            addPointsToUser(currentUser.email, 10, 'Uploaded a note');
        });
    }
    
    // Search functionality
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', function() {
            filterNotes();
        });
        
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                filterNotes();
            }
        });
    }
    
    // Filter change events
    if (semesterFilter) {
        semesterFilter.addEventListener('change', filterNotes);
    }
    
    if (subjectFilter) {
        subjectFilter.addEventListener('change', filterNotes);
    }
    
    // Filter notes based on search and filters
    function filterNotes() {
        const searchTerm = searchInput.value.toLowerCase();
        const semester = semesterFilter.value;
        const subject = subjectFilter.value;
        
        const filteredNotes = notes.filter(note => {
            // Search term filter
            const matchesSearch = searchTerm === '' || 
                note.title.toLowerCase().includes(searchTerm) || 
                note.description.toLowerCase().includes(searchTerm);
            
            // Semester filter
            const matchesSemester = semester === 'all' || note.semester === semester;
            
            // Subject filter
            const matchesSubject = subject === 'all' || note.subject === subject;
            
            return matchesSearch && matchesSemester && matchesSubject;
        });
        
        displayNotes(filteredNotes);
    }
    
    // Display notes in the container
    function displayNotes(notesToDisplay) {
        if (!notesContainer) return;
        
        notesContainer.innerHTML = '';
        
        if (notesToDisplay.length === 0) {
            if (emptyNotes) {
                emptyNotes.style.display = 'block';
            }
            return;
        }
        
        if (emptyNotes) {
            emptyNotes.style.display = 'none';
        }
        
        notesToDisplay.forEach(note => {
            const noteCard = document.createElement('div');
            noteCard.className = 'note-card';
            
            // Format subject name for display
            let subjectName = '';
            switch (note.subject) {
                case 'ml': subjectName = 'Machine Learning'; break;
                case 'dl': subjectName = 'Deep Learning'; break;
                case 'nlp': subjectName = 'NLP'; break;
                case 'cv': subjectName = 'Computer Vision'; break;
                case 'stats': subjectName = 'Statistics'; break;
                default: subjectName = note.subject;
            }
            
            // Format semester name for display
            let semesterName = '';
            switch (note.semester) {
                case 'sem1': semesterName = 'Semester 1'; break;
                case 'sem2': semesterName = 'Semester 2'; break;
                case 'sem3': semesterName = 'Semester 3'; break;
                case 'sem4': semesterName = 'Semester 4'; break;
                default: semesterName = note.semester;
            }
            
            noteCard.innerHTML = `
                <div class="note-header">
                    <h3 class="note-title">${note.title}</h3>
                    <div class="note-meta">
                        <span class="note-subject">${subjectName}</span>
                        <span class="note-date">${semesterName}</span>
                    </div>
                </div>
                <div class="note-body">
                    <p class="note-description">${note.description}</p>
                    <div class="note-footer">
                        <div class="note-author">
                            <div class="author-avatar">${note.author.avatar}</div>
                            <span class="author-name">${note.author.name}</span>
                        </div>
                        <div class="note-actions">
                            <button class="note-action-btn download-btn" data-id="${note.id}">
                                <span class="download-icon"></span>
                            </button>
                            <button class="note-action-btn share-btn" data-id="${note.id}">
                                <span class="share-icon"></span>
                            </button>
                        </div>
                    </div>
                </div>
            `;
            
            notesContainer.appendChild(noteCard);
            
            // Add event listeners to buttons
            const downloadBtn = noteCard.querySelector('.download-btn');
            const shareBtn = noteCard.querySelector('.share-btn');
            
            downloadBtn.addEventListener('click', function() {
                downloadNote(note.id);
            });
            
            shareBtn.addEventListener('click', function() {
                shareNote(note.id);
            });
        });
    }
    
    // Download note function
    function downloadNote(noteId) {
        const note = notes.find(n => n.id === noteId);
        
        if (!note) return;
        
        // In a real app, this would download the actual file
        // For this demo, we'll just show an alert
        alert(`Downloading: ${note.title}`);
        
        // Update download count
        note.downloads++;
        localStorage.setItem('notes', JSON.stringify(notes));
        
        // Get current user
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        
        if (currentUser && currentUser.isLoggedIn) {
            // Add points to user (gamification)
            addPointsToUser(currentUser.email, 2, 'Downloaded a note');
        }
    }
    
    // Share note function
    function shareNote(noteId) {
        const note = notes.find(n => n.id === noteId);
        
        if (!note) return;
        
        // In a real app, this would open a share dialog
        // For this demo, we'll just show an alert
        alert(`Sharing: ${note.title}`);
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
});