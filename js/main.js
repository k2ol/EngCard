// Main JavaScript for English Learning Platform

// Global variables
let currentSection = 'home';
let userProgress = {
    wordsLearned: 0,
    currentStreak: 0,
    totalExercises: 0,
    correctAnswers: 0,
    studyTime: 0,
    achievements: []
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    loadUserProgress();
    setupEventListeners();
    updateProgressDisplay();
});

// Initialize application
function initializeApp() {
    console.log('English Learning Platform initialized');
    
    // Set up navigation
    setupNavigation();
    
    // Initialize sections
    showSection('home');
    
    // Start study timer
    startStudyTimer();
}

// Setup navigation functionality
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    // Navigation link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = link.getAttribute('href').substring(1);
            navigateToSection(targetSection);
            
            // Close mobile menu
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    // Mobile hamburger menu
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

// Navigate to a specific section
function navigateToSection(sectionName) {
    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionName}`) {
            link.classList.add('active');
        }
    });
    
    // Show the target section
    showSection(sectionName);
    currentSection = sectionName;
    
    // Track section visit
    trackSectionVisit(sectionName);
}

// Show specific section
function showSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.classList.add('active');
    }
}

// Setup event listeners
function setupEventListeners() {
    // Feature card clicks on home page
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', function() {
            const onclick = this.getAttribute('onclick');
            if (onclick) {
                eval(onclick);
            }
        });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case '1':
                    e.preventDefault();
                    navigateToSection('home');
                    break;
                case '2':
                    e.preventDefault();
                    navigateToSection('vocabulary');
                    break;
                case '3':
                    e.preventDefault();
                    navigateToSection('grammar');
                    break;
                case '4':
                    e.preventDefault();
                    navigateToSection('reading');
                    break;
                case '5':
                    e.preventDefault();
                    navigateToSection('listening');
                    break;
                case '6':
                    e.preventDefault();
                    navigateToSection('progress');
                    break;
            }
        }
    });
}

// Load user progress from localStorage
function loadUserProgress() {
    const savedProgress = localStorage.getItem('englishLearningProgress');
    if (savedProgress) {
        userProgress = { ...userProgress, ...JSON.parse(savedProgress) };
    }
}

// Save user progress to localStorage
function saveUserProgress() {
    localStorage.setItem('englishLearningProgress', JSON.stringify(userProgress));
}

// Update progress display
function updateProgressDisplay() {
    // Update vocabulary stats
    const wordsLearnedEl = document.getElementById('words-learned');
    const currentStreakEl = document.getElementById('current-streak');
    
    if (wordsLearnedEl) wordsLearnedEl.textContent = userProgress.wordsLearned;
    if (currentStreakEl) currentStreakEl.textContent = userProgress.currentStreak;
    
    // Update progress page stats
    const totalExercisesEl = document.getElementById('total-exercises');
    const accuracyRateEl = document.getElementById('accuracy-rate');
    const studyTimeEl = document.getElementById('study-time');
    const overallPercentageEl = document.getElementById('overall-percentage');
    
    if (totalExercisesEl) totalExercisesEl.textContent = userProgress.totalExercises;
    if (studyTimeEl) studyTimeEl.textContent = Math.floor(userProgress.studyTime / 60);
    
    // Calculate accuracy rate
    const accuracyRate = userProgress.totalExercises > 0 
        ? Math.round((userProgress.correctAnswers / userProgress.totalExercises) * 100)
        : 0;
    if (accuracyRateEl) accuracyRateEl.textContent = `${accuracyRate}%`;
    
    // Calculate overall progress
    const overallProgress = Math.min(100, Math.round(
        (userProgress.wordsLearned * 2 + userProgress.totalExercises) / 2
    ));
    if (overallPercentageEl) overallPercentageEl.textContent = `${overallProgress}%`;
    
    // Update circular progress
    updateCircularProgress(overallProgress);
    
    // Update achievements
    updateAchievements();
}

// Update circular progress indicator
function updateCircularProgress(percentage) {
    const progressCircle = document.querySelector('.progress-circle');
    if (progressCircle) {
        const degrees = (percentage / 100) * 360;
        progressCircle.style.background = `conic-gradient(#667eea ${degrees}deg, #e9ecef ${degrees}deg)`;
    }
}

// Update achievements
function updateAchievements() {
    const badges = document.querySelectorAll('.badge');
    
    // First Steps - Complete first exercise
    if (userProgress.totalExercises >= 1) {
        unlockAchievement(0, 'First Steps');
    }
    
    // Word Master - Learn 50 words
    if (userProgress.wordsLearned >= 50) {
        unlockAchievement(1, 'Word Master');
    }
    
    // Grammar Guru - Complete 25 grammar exercises
    if (userProgress.totalExercises >= 25) {
        unlockAchievement(2, 'Grammar Guru');
    }
    
    // Perfect Score - Get 10 exercises correct in a row
    if (userProgress.currentStreak >= 10) {
        unlockAchievement(3, 'Perfect Score');
    }
}

// Unlock achievement
function unlockAchievement(index, name) {
    const badges = document.querySelectorAll('.badge');
    if (badges[index] && !userProgress.achievements.includes(name)) {
        badges[index].classList.remove('locked');
        badges[index].classList.add('unlocked');
        userProgress.achievements.push(name);
        showAchievementNotification(name);
        saveUserProgress();
    }
}

// Show achievement notification
function showAchievementNotification(achievementName) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'achievement-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">🏆</span>
            <div class="notification-text">
                <strong>Achievement Unlocked!</strong>
                <p>${achievementName}</p>
            </div>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 1rem;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideIn 0.5s ease-out;
        max-width: 300px;
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        .notification-content {
            display: flex;
            align-items: center;
            gap: 1rem;
        }
        .notification-icon {
            font-size: 2rem;
        }
        .notification-text strong {
            display: block;
            margin-bottom: 0.25rem;
        }
        .notification-text p {
            margin: 0;
            opacity: 0.9;
        }
    `;
    document.head.appendChild(style);
    
    // Add to page
    document.body.appendChild(notification);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideIn 0.5s ease-out reverse';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 4000);
}

// Track section visits
function trackSectionVisit(sectionName) {
    const visitKey = `section_${sectionName}_visits`;
    const visits = parseInt(localStorage.getItem(visitKey) || '0') + 1;
    localStorage.setItem(visitKey, visits.toString());
}

// Start study timer
function startStudyTimer() {
    setInterval(() => {
        if (currentSection !== 'home' && currentSection !== 'progress') {
            userProgress.studyTime += 1;
            saveUserProgress();
            
            // Update display every minute
            if (userProgress.studyTime % 60 === 0) {
                updateProgressDisplay();
            }
        }
    }, 1000);
}

// Utility function to show loading state
function showLoading(element) {
    if (element) {
        element.innerHTML = '<div class="loading">Loading...</div>';
        element.style.opacity = '0.7';
    }
}

// Utility function to hide loading state
function hideLoading(element) {
    if (element) {
        element.style.opacity = '1';
    }
}

// Utility function to show toast notification
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#667eea'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 25px;
        z-index: 10000;
        animation: toastSlide 0.3s ease-out;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'toastSlide 0.3s ease-out reverse';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// Add toast animation styles
const toastStyle = document.createElement('style');
toastStyle.textContent = `
    @keyframes toastSlide {
        from { transform: translateX(-50%) translateY(100%); opacity: 0; }
        to { transform: translateX(-50%) translateY(0); opacity: 1; }
    }
`;
document.head.appendChild(toastStyle);

// Export functions for use in other modules
window.englishLearningPlatform = {
    navigateToSection,
    showSection,
    updateProgressDisplay,
    saveUserProgress,
    showToast,
    userProgress
};