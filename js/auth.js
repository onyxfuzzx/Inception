// Authentication Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');
    const authModal = document.getElementById('auth-modal');
    const closeModal = document.querySelectorAll('.close-modal');
    const authTabs = document.querySelectorAll('.auth-tab');
    const authForms = document.querySelectorAll('.auth-form');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    
    // Open auth modal
    if (loginBtn) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (authModal) {
                authModal.style.display = 'block';
                // Set active tab to login
                setActiveTab('login');
            }
        });
    }
    
    if (signupBtn) {
        signupBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (authModal) {
                authModal.style.display = 'block';
                // Set active tab to register
                setActiveTab('register');
            }
        });
    }
    
    // Close modal
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
    
    // Tab switching
    if (authTabs) {
        authTabs.forEach(function(tab) {
            tab.addEventListener('click', function() {
                const tabName = this.getAttribute('data-tab');
                setActiveTab(tabName);
            });
        });
    }
    
    function setActiveTab(tabName) {
        // Update tab buttons
        authTabs.forEach(function(tab) {
            if (tab.getAttribute('data-tab') === tabName) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });
        
        // Update form visibility
        authForms.forEach(function(form) {
            if (form.id === tabName + '-form') {
                form.classList.add('active');
            } else {
                form.classList.remove('active');
            }
        });
    }
    
    // Form submission
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            const rememberMe = document.getElementById('remember-me').checked;
            
            // Simple validation
            if (!email || !password) {
                alert('Please fill in all fields');
                return;
            }
            
            // Simulate login (in a real app, this would be an API call)
            simulateLogin(email, password, rememberMe);
        });
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('register-name').value;
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;
            const confirmPassword = document.getElementById('register-confirm').value;
            
            // Simple validation
            if (!name || !email || !password || !confirmPassword) {
                alert('Please fill in all fields');
                return;
            }
            
            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }
            
            // Simulate registration (in a real app, this would be an API call)
            simulateRegistration(name, email, password);
        });
    }
    
    // Simulate authentication (localStorage based)
    function simulateLogin(email, password, rememberMe) {
        // In a real app, this would validate against a server
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            // Store logged in user
            const currentUser = {
                name: user.name,
                email: user.email,
                isLoggedIn: true
            };
            
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            
            // Close modal and update UI
            if (authModal) {
                authModal.style.display = 'none';
            }
            
            updateAuthUI(currentUser);
            
            // Reload page to reflect logged in state
            window.location.reload();
        } else {
            alert('Invalid email or password');
        }
    }
    
    function simulateRegistration(name, email, password) {
        // In a real app, this would send data to a server
        const users = JSON.parse(localStorage.getItem('users')) || [];
        
        // Check if user already exists
        if (users.some(u => u.email === email)) {
            alert('User with this email already exists');
            return;
        }
        
        // Add new user
        users.push({
            name,
            email,
            password,
            createdAt: new Date().toISOString()
        });
        
        localStorage.setItem('users', JSON.stringify(users));
        
        // Auto login after registration
        const currentUser = {
            name,
            email,
            isLoggedIn: true
        };
        
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        // Close modal and update UI
        if (authModal) {
            authModal.style.display = 'none';
        }
        
        updateAuthUI(currentUser);
        
        // Reload page to reflect logged in state
        window.location.reload();
    }
    
    // Check if user is logged in on page load
    function checkAuthStatus() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        
        if (currentUser && currentUser.isLoggedIn) {
            updateAuthUI(currentUser);
        }
    }
    
    function updateAuthUI(user) {
        if (loginBtn) {
            loginBtn.textContent = 'Profile';
            loginBtn.href = 'profile.html';
        }
    }
    
    // Initialize auth status check
    checkAuthStatus();
});