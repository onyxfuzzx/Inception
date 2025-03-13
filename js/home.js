// Home Page Specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Animate stats on scroll
    const stats = document.querySelectorAll('.stat-number');
    
    if (stats.length > 0) {
        const animateStats = function() {
            stats.forEach(stat => {
                const targetValue = parseInt(stat.textContent);
                const duration = 2000; // 2 seconds
                const startTime = Date.now();
                
                const updateStat = function() {
                    const currentTime = Date.now();
                    const elapsedTime = currentTime - startTime;
                    
                    if (elapsedTime < duration) {
                        const value = Math.floor((elapsedTime / duration) * targetValue);
                        stat.textContent = value + '+';
                        requestAnimationFrame(updateStat);
                    } else {
                        stat.textContent = targetValue + '+';
                    }
                };
                
                updateStat();
            });
        };
        
        // Use Intersection Observer to trigger animation when stats are visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(document.querySelector('.stats'));
    }
    
    // Smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });
});