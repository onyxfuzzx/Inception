// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const themeSwitch = document.getElementById('theme-switch');
    const body = document.body;
    
    // Check for saved theme preference or respect OS preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Apply theme based on saved preference or OS preference
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        body.classList.add('dark');
        themeSwitch.checked = true;
    }
    
    // Toggle theme when switch is clicked
    themeSwitch.addEventListener('change', function() {
        if (this.checked) {
            body.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    });
});