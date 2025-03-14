// Projects Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-projects');
    const searchBtn = document.getElementById('search-btn');
    const categoryFilter = document.getElementById('category-filter');
    const sortFilter = document.getElementById('sort-filter');
    const projectsContainer = document.getElementById('projects-container');
    const emptyProjects = document.getElementById('empty-projects');
    const submitProjectBtn = document.getElementById('submit-project-btn');
    const submitCtaBtn = document.getElementById('submit-cta-btn');
    const submitProjectModal = document.getElementById('submit-project-modal');
    const closeModal = document.querySelectorAll('.close-modal');
    const submitProjectForm = document.getElementById('submit-project-form');
    const projectImage = document.getElementById('project-image');
    const imageInfo = document.getElementById('image-info');
    
    // Sample projects data (in a real app, this would come from a database)
    let projects = JSON.parse(localStorage.getItem('projects')) || [
        {
            id: 1,
            title: 'Neural Style Transfer Web Application',
            description: 'A web-based neural style transfer application that allows users to apply artistic styles to their photos using deep learning techniques.',
            category: 'dl',
            technologies: 'TensorFlow, Python, Flask, JavaScript',
            github: 'https://github.com/alicesmith/neural-style-transfer',
            demo: 'https://neural-style-demo.example.com',
            image: 'neural-style.jpg',
            author: {
                name: 'Alice Smith',
                avatar: 'AS'
            },
            date: '2025-03-10',
            featured: true,
            views: 245
        }
    ];
    
    // Initialize projects display
    displayProjects(projects);
    
    // Search functionality
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', function() {
            filterProjects();
        });
        
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                filterProjects();
            }
        });
    }
    
    // Filter change events
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterProjects);
    }
    
    if (sortFilter) {
        sortFilter.addEventListener('change', filterProjects);
    }
    
    // Open submit project modal
    if (submitProjectBtn && submitProjectModal) {
        submitProjectBtn.addEventListener('click', function() {
            // Check if user is logged in
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            
            if (!currentUser || !currentUser.isLoggedIn) {
                alert('Please log in to submit a project');
                return;
            }
            
            submitProjectModal.style.display = 'block';
        });
    }
    
    if (submitCtaBtn && submitProjectModal) {
        submitCtaBtn.addEventListener('click', function() {
            // Check if user is logged in
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            
            if (!currentUser || !currentUser.isLoggedIn) {
                alert('Please log in to submit a project');
                return;
            }
            
            submitProjectModal.style.display = 'block';
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
    if (projectImage && imageInfo) {
        projectImage.addEventListener('change', function() {
            if (this.files.length > 0) {
                const file = this.files[0];
                const fileSize = (file.size / (1024 * 1024)).toFixed(2); // Convert to MB
                imageInfo.textContent = `${file.name} (${fileSize} MB)`;
            } else {
                imageInfo.textContent = '';
            }
        });
        
        // Drag and drop functionality
        const fileUpload = projectImage.closest('.file-upload');
        
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
                    projectImage.files = files;
                    const file = files[0];
                    const fileSize = (file.size / (1024 * 1024)).toFixed(2); // Convert to MB
                    imageInfo.textContent = `${file.name} (${fileSize} MB)`;
                }
            }
        }
    }
    
    // Submit project form
    if (submitProjectForm) {
        submitProjectForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get current user
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            
            if (!currentUser || !currentUser.isLoggedIn) {
                alert('Please log in to submit a project');
                return;
            }
            
            // Get form data
            const title = document.getElementById('project-title').value;
            const description = document.getElementById('project-description').value;
            const category = document.getElementById('project-category').value;
            const technologies = document.getElementById('project-technologies').value;
            const github = document.getElementById('project-github').value;
            const demo = document.getElementById('project-demo').value;
            const image = projectImage.files[0];
            
            if (!title || !description || !category || !technologies || !github || !image) {
                alert('Please fill in all required fields');
                return;
            }
            
            // Create new project object
            const newProject = {
                id: Date.now(), // Use timestamp as ID
                title,
                description,
                category,
                technologies,
                github,
                demo: demo || null,
                image: image.name, // In a real app, this would be uploaded to a server
                author: {
                    name: currentUser.name,
                    avatar: getInitials(currentUser.name)
                },
                date: new Date().toISOString().split('T')[0],
                featured: false,
                views: 0
            };
            
            // Add to projects array
            projects.unshift(newProject);
            
            // Save to localStorage
            localStorage.setItem('projects', JSON.stringify(projects));
            
            
            // Update display
            displayProjects(projects);
            
            // Close modal and reset form
            submitProjectModal.style.display = 'none';
            submitProjectForm.reset();
            imageInfo.textContent = '';
            
            // Add points to user (gamification)
            addPointsToUser(currentUser.email, 20, 'Submitted a project');
            
            alert('Project submitted successfully!');
        });
    }
    
    // Filter projects based on search and filters
    function filterProjects() {
        const searchTerm = searchInput.value.toLowerCase();
        const category = categoryFilter.value;
        const sortBy = sortFilter.value;
        
        let filteredProjects = projects.filter(project => {
            // Search term filter
            const matchesSearch = searchTerm === '' || 
                project.title.toLowerCase().includes(searchTerm) || 
                project.description.toLowerCase().includes(searchTerm) ||
                project.technologies.toLowerCase().includes(searchTerm);
            
            // Category filter
            const matchesCategory = category === 'all' || project.category === category;
            
            return matchesSearch && matchesCategory;
        });
        
        // Sort projects
        switch (sortBy) {
            case 'recent':
                filteredProjects.sort((a, b) => new Date(b.date) - new Date(a.date));
                break;
            case 'popular':
                filteredProjects.sort((a, b) => b.views - a.views);
                break;
            case 'az':
                filteredProjects.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'za':
                filteredProjects.sort((a, b) => b.title.localeCompare(a.title));
                break;
        }
        
        displayProjects(filteredProjects);
    }
    
    // Display projects in the container
    function displayProjects(projectsToDisplay) {
        if (!projectsContainer) return;
        
        projectsContainer.innerHTML = '';
        
        if (projectsToDisplay.length === 0) {
            if (emptyProjects) {
                emptyProjects.style.display = 'block';
            }
            return;
        }
        
        if (emptyProjects) {
            emptyProjects.style.display = 'none';
        }
        
        projectsToDisplay.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            
            // Format category name for display
            let categoryName = '';
            switch (project.category) {
                case 'ml': categoryName = 'Machine Learning'; break;
                case 'dl': categoryName = 'Deep Learning'; break;
                case 'nlp': categoryName = 'NLP'; break;
                case 'cv': categoryName = 'Computer Vision'; break;
                case 'rl': categoryName = 'Reinforcement Learning'; break;
                case 'web': categoryName = 'Website Development'; break;
                default: categoryName = project.category;
            }
            
            // Create placeholder image URL
            const imageUrl = project.image ? 
                `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200"><rect width="400" height="200" fill="%234a6cf7"/><text x="50%" y="50%" font-family="Arial" font-size="24" fill="%23ffffff" text-anchor="middle" dominant-baseline="middle">${project.title}</text></svg>` : 
                `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200"><rect width="400" height="200" fill="%23f8f9fa"/><text x="50%" y="50%" font-family="Arial" font-size="24" fill="%236c757d" text-anchor="middle" dominant-baseline="middle">No Image</text></svg>`;
            
            projectCard.innerHTML = `
                <div class="project-image" style="background-image: url('${imageUrl}')">
                    <div class="project-category">${categoryName}</div>
                </div>
                <div class="project-content">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-meta">
                        <div class="project-author">
                            <div class="author-avatar">${project.author.avatar}</div>
                            <span class="author-name">${project.author.name}</span>
                        </div>
                        <div class="project-date">${formatDate(project.date)}</div>
                    </div>
                    <div class="project-links">
                        <a href="${project.github}" target="_blank" class="project-link github-link">GitHub</a>
                        ${project.demo ? `<a href="${project.demo}" target="_blank" class="project-link demo-link">Demo</a>` : ''}
                    </div>
                </div>
            `;
            
            projectsContainer.appendChild(projectCard);
        });
    }
    
    // Format date for display
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
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
    
    // Neural Style Transfer Demo Functionality
    const styleOptions = document.querySelectorAll('.style-option');
    const demoBtn = document.querySelector('.demo-btn');
    const contentImage = document.querySelector('.content-image');
    const resultImage = document.querySelector('.result-image');
    
    if (styleOptions && demoBtn) {
        // Style selection
        styleOptions.forEach(option => {
            option.addEventListener('click', function() {
                // Remove active class from all options
                styleOptions.forEach(opt => opt.classList.remove('active'));
                
                // Add active class to selected option
                this.classList.add('active');
            });
        });
        
        // Generate button click
        demoBtn.addEventListener('click', function() {
            // Get selected style
            const selectedStyle = document.querySelector('.style-option.active').getAttribute('data-style');
            
            // Simulate processing (in a real app, this would call an API)
            demoBtn.textContent = 'Processing...';
            demoBtn.disabled = true;
            
            setTimeout(() => {
                // Update result image based on selected style
                let resultImageUrl;
                
                switch (selectedStyle) {
                    case 'starry-night':
                        resultImageUrl = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120"><rect width="120" height="120" fill="%23001853"/><circle cx="30" cy="30" r="10" fill="%23fff9c4"/><circle cx="75" cy="45" r="15" fill="%23ffeb3b"/><circle cx="100" cy="20" r="8" fill="%23fff9c4"/><path d="M0,90 Q60,30 120,90 L120,120 L0,120 Z" fill="%23263238"/></svg>';
                        break;
                    case 'wave':
                        resultImageUrl = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120"><rect width="120" height="120" fill="%23b3e5fc"/><path d="M0,60 Q30,30 60,60 Q90,90 120,60 L120,120 L0,120 Z" fill="%230277bd"/></svg>';
                        break;
                    case 'scream':
                        resultImageUrl = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120"><rect width="120" height="120" fill="%23ffb74d"/><path d="M60,30 Q80,60 60,100 Q40,60 60,30 Z" fill="%23f57c00"/><circle cx="50" cy="50" r="5" fill="%23000"/><circle cx="70" cy="50" r="5" fill="%23000"/><path d="M50,70 Q60,80 70,70" stroke="%23000" stroke-width="3" fill="none"/></svg>';
                        break;
                    case 'kandinsky':
                        resultImageUrl = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120"><rect width="120" height="120" fill="%23ffeb3b"/><circle cx="40" cy="40" r="15" fill="%23f44336"/><rect x="70" y="30" width="30" height="30" fill="%234caf50"/><path d="M30,80 L50,100 L70,80 L90,100" stroke="%233f51b5" stroke-width="5" fill="none"/></svg>';
                        break;
                }
                
                resultImage.style.backgroundImage = `url('${resultImageUrl}')`;
                
                // Reset button
                demoBtn.textContent = 'Generate';
                demoBtn.disabled = false;
            }, 1500);
        });
    }
});