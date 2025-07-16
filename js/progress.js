// Progress tracking module for English Learning Platform

// Progress tracking functionality
let progressData = {
    dailyGoals: {
        vocabularyWords: 10,
        grammarExercises: 5,
        readingMinutes: 15,
        listeningMinutes: 10
    },
    weeklyProgress: {
        vocabulary: [],
        grammar: [],
        reading: [],
        listening: []
    },
    achievements: [],
    streaks: {
        daily: 0,
        weekly: 0,
        monthly: 0
    },
    totalStats: {
        wordsLearned: 0,
        exercisesCompleted: 0,
        hoursStudied: 0,
        perfectScores: 0
    }
};

// Initialize progress module
document.addEventListener('DOMContentLoaded', function() {
    initializeProgress();
});

function initializeProgress() {
    loadProgressData();
    updateProgressCharts();
    updateAchievementDisplay();
    setupProgressEventListeners();
    startDailyProgressTracking();
}

function setupProgressEventListeners() {
    // Goal setting
    const goalInputs = document.querySelectorAll('.goal-input');
    goalInputs.forEach(input => {
        input.addEventListener('change', updateDailyGoals);
    });
    
    // Reset progress button
    const resetBtn = document.getElementById('reset-progress-btn');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetProgress);
    }
    
    // Export progress button
    const exportBtn = document.getElementById('export-progress-btn');
    if (exportBtn) {
        exportBtn.addEventListener('click', exportProgress);
    }
}

function loadProgressData() {
    const savedProgress = localStorage.getItem('englishLearningProgressData');
    if (savedProgress) {
        progressData = { ...progressData, ...JSON.parse(savedProgress) };
    }
    
    // Initialize weekly progress arrays if empty
    const currentWeek = getCurrentWeek();
    if (progressData.weeklyProgress.vocabulary.length === 0) {
        initializeWeeklyProgress();
    }
}

function saveProgressData() {
    localStorage.setItem('englishLearningProgressData', JSON.stringify(progressData));
}

function updateProgressCharts() {
    updateOverallProgress();
    updateWeeklyChart();
    updateStreakDisplay();
    updateGoalsProgress();
}

function updateOverallProgress() {
    const totalProgress = calculateOverallProgress();
    
    // Update circular progress
    const progressCircle = document.querySelector('.progress-circle');
    const percentageElement = document.getElementById('overall-percentage');
    
    if (progressCircle && percentageElement) {
        const degrees = (totalProgress / 100) * 360;
        progressCircle.style.background = `conic-gradient(#667eea ${degrees}deg, #e9ecef ${degrees}deg)`;
        percentageElement.textContent = `${totalProgress}%`;
    }
    
    // Update stats
    updateStatDisplay('total-exercises', progressData.totalStats.exercisesCompleted);
    updateStatDisplay('study-time', Math.floor(progressData.totalStats.hoursStudied));
    updateStatDisplay('accuracy-rate', calculateAccuracyRate());
}

function calculateOverallProgress() {
    const weights = {
        vocabulary: 0.3,
        grammar: 0.25,
        reading: 0.25,
        listening: 0.2
    };
    
    const vocabularyProgress = Math.min(100, (progressData.totalStats.wordsLearned / 100) * 100);
    const grammarProgress = Math.min(100, (progressData.totalStats.exercisesCompleted / 50) * 100);
    const readingProgress = Math.min(100, (progressData.totalStats.hoursStudied / 20) * 100);
    const listeningProgress = Math.min(100, (progressData.totalStats.hoursStudied / 15) * 100);
    
    return Math.round(
        vocabularyProgress * weights.vocabulary +
        grammarProgress * weights.grammar +
        readingProgress * weights.reading +
        listeningProgress * weights.listening
    );
}

function calculateAccuracyRate() {
    if (progressData.totalStats.exercisesCompleted === 0) return 0;
    
    // Get accuracy from main progress
    const mainProgress = window.englishLearningPlatform?.userProgress;
    if (mainProgress && mainProgress.totalExercises > 0) {
        return Math.round((mainProgress.correctAnswers / mainProgress.totalExercises) * 100);
    }
    
    return 85; // Default fallback
}

function updateWeeklyChart() {
    // Create a simple text-based weekly progress display
    const weeklyContainer = document.getElementById('weekly-progress-container');
    if (!weeklyContainer) return;
    
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const currentWeekData = progressData.weeklyProgress.vocabulary.slice(-7);
    
    weeklyContainer.innerHTML = `
        <div class="weekly-chart">
            <h4>This Week's Progress</h4>
            <div class="chart-bars">
                ${days.map((day, index) => {
                    const value = currentWeekData[index] || 0;
                    const height = Math.max(10, (value / 20) * 100); // Scale to max 20 words per day
                    return `
                        <div class="chart-bar">
                            <div class="bar" style="height: ${height}px; background: #667eea;"></div>
                            <span class="day-label">${day}</span>
                            <span class="value-label">${value}</span>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;
}

function updateStreakDisplay() {
    updateStatDisplay('current-streak', progressData.streaks.daily);
    updateStatDisplay('weekly-streak', progressData.streaks.weekly);
    updateStatDisplay('monthly-streak', progressData.streaks.monthly);
}

function updateGoalsProgress() {
    const today = new Date().toDateString();
    const todayProgress = getTodayProgress();
    
    // Update goal progress bars
    Object.keys(progressData.dailyGoals).forEach(goal => {
        const progressBar = document.getElementById(`${goal}-progress`);
        const progressText = document.getElementById(`${goal}-text`);
        
        if (progressBar && progressText) {
            const current = todayProgress[goal] || 0;
            const target = progressData.dailyGoals[goal];
            const percentage = Math.min(100, (current / target) * 100);
            
            progressBar.style.width = `${percentage}%`;
            progressText.textContent = `${current}/${target}`;
            
            // Color coding
            if (percentage >= 100) {
                progressBar.style.background = '#28a745';
            } else if (percentage >= 50) {
                progressBar.style.background = '#ffc107';
            } else {
                progressBar.style.background = '#dc3545';
            }
        }
    });
}

function getTodayProgress() {
    const today = new Date().toDateString();
    const savedTodayProgress = localStorage.getItem(`dailyProgress_${today}`);
    
    if (savedTodayProgress) {
        return JSON.parse(savedTodayProgress);
    }
    
    return {
        vocabularyWords: 0,
        grammarExercises: 0,
        readingMinutes: 0,
        listeningMinutes: 0
    };
}

function updateTodayProgress(category, increment = 1) {
    const today = new Date().toDateString();
    const todayProgress = getTodayProgress();
    
    todayProgress[category] = (todayProgress[category] || 0) + increment;
    
    localStorage.setItem(`dailyProgress_${today}`, JSON.stringify(todayProgress));
    updateGoalsProgress();
    
    // Check if daily goals are met
    checkDailyGoalsCompletion(todayProgress);
}

function checkDailyGoalsCompletion(todayProgress) {
    const allGoalsMet = Object.keys(progressData.dailyGoals).every(goal => {
        return (todayProgress[goal] || 0) >= progressData.dailyGoals[goal];
    });
    
    if (allGoalsMet) {
        progressData.streaks.daily++;
        saveProgressData();
        
        // Show achievement notification
        window.englishLearningPlatform?.showToast(
            '🎉 Daily goals completed! Great job!', 
            'success'
        );
        
        // Unlock achievement
        unlockAchievement('Daily Achiever', 'Complete all daily goals');
    }
}

function updateAchievementDisplay() {
    const achievementsContainer = document.querySelector('.badges-container');
    if (!achievementsContainer) return;
    
    const achievements = [
        { name: 'First Steps', description: 'Complete your first exercise', icon: '🏆' },
        { name: 'Word Master', description: 'Learn 50 new words', icon: '📚' },
        { name: 'Grammar Guru', description: 'Complete 25 grammar exercises', icon: '✏️' },
        { name: 'Perfect Score', description: 'Get 10 exercises correct in a row', icon: '🎯' },
        { name: 'Daily Achiever', description: 'Complete all daily goals', icon: '⭐' },
        { name: 'Week Warrior', description: 'Study for 7 consecutive days', icon: '🔥' },
        { name: 'Reading Champion', description: 'Complete 20 reading exercises', icon: '📖' },
        { name: 'Listening Expert', description: 'Complete 15 listening exercises', icon: '🎧' }
    ];
    
    achievementsContainer.innerHTML = achievements.map(achievement => {
        const isUnlocked = progressData.achievements.includes(achievement.name);
        return `
            <div class="badge ${isUnlocked ? 'unlocked' : 'locked'}">
                <span class="badge-icon">${achievement.icon}</span>
                <span class="badge-name">${achievement.name}</span>
                <span class="badge-description">${achievement.description}</span>
            </div>
        `;
    }).join('');
}

function unlockAchievement(name, description) {
    if (!progressData.achievements.includes(name)) {
        progressData.achievements.push(name);
        saveProgressData();
        updateAchievementDisplay();
        
        // Show achievement notification
        showAchievementNotification(name, description);
    }
}

function showAchievementNotification(name, description) {
    const notification = document.createElement('div');
    notification.className = 'achievement-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">🏆</div>
            <div class="notification-text">
                <strong>Achievement Unlocked!</strong>
                <p>${name}</p>
                <small>${description}</small>
            </div>
        </div>
    `;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 1.5rem;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideInRight 0.5s ease-out;
        max-width: 350px;
        min-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease-out';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 500);
    }, 5000);
}

function startDailyProgressTracking() {
    // Track progress every minute
    setInterval(() => {
        const currentSection = window.englishLearningPlatform?.currentSection;
        
        if (currentSection && currentSection !== 'home' && currentSection !== 'progress') {
            // Update study time
            progressData.totalStats.hoursStudied += 1/3600; // Add 1 second in hours
            
            // Update section-specific progress
            switch(currentSection) {
                case 'reading':
                    updateTodayProgress('readingMinutes', 1/60);
                    break;
                case 'listening':
                    updateTodayProgress('listeningMinutes', 1/60);
                    break;
            }
            
            saveProgressData();
        }
    }, 1000);
}

function initializeWeeklyProgress() {
    const days = 7;
    progressData.weeklyProgress = {
        vocabulary: new Array(days).fill(0),
        grammar: new Array(days).fill(0),
        reading: new Array(days).fill(0),
        listening: new Array(days).fill(0)
    };
}

function getCurrentWeek() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 1);
    const diff = now - start;
    const oneWeek = 1000 * 60 * 60 * 24 * 7;
    return Math.floor(diff / oneWeek);
}

function updateStatDisplay(elementId, value) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = typeof value === 'number' ? 
            (value % 1 === 0 ? value : value.toFixed(1)) : value;
    }
}

function updateDailyGoals() {
    // Update daily goals based on user input
    const goalInputs = document.querySelectorAll('.goal-input');
    goalInputs.forEach(input => {
        const goalType = input.dataset.goal;
        const value = parseInt(input.value) || 0;
        if (goalType && value > 0) {
            progressData.dailyGoals[goalType] = value;
        }
    });
    
    saveProgressData();
    updateGoalsProgress();
    
    window.englishLearningPlatform?.showToast('Daily goals updated!', 'success');
}

function resetProgress() {
    if (confirm('Are you sure you want to reset all progress? This action cannot be undone.')) {
        // Clear all progress data
        localStorage.removeItem('englishLearningProgressData');
        localStorage.removeItem('englishLearningProgress');
        localStorage.removeItem('vocabularyStats');
        
        // Clear daily progress
        const keys = Object.keys(localStorage);
        keys.forEach(key => {
            if (key.startsWith('dailyProgress_')) {
                localStorage.removeItem(key);
            }
        });
        
        // Reset progress data
        progressData = {
            dailyGoals: {
                vocabularyWords: 10,
                grammarExercises: 5,
                readingMinutes: 15,
                listeningMinutes: 10
            },
            weeklyProgress: {
                vocabulary: [],
                grammar: [],
                reading: [],
                listening: []
            },
            achievements: [],
            streaks: {
                daily: 0,
                weekly: 0,
                monthly: 0
            },
            totalStats: {
                wordsLearned: 0,
                exercisesCompleted: 0,
                hoursStudied: 0,
                perfectScores: 0
            }
        };
        
        // Reset main progress
        if (window.englishLearningPlatform?.userProgress) {
            window.englishLearningPlatform.userProgress = {
                wordsLearned: 0,
                currentStreak: 0,
                totalExercises: 0,
                correctAnswers: 0,
                studyTime: 0,
                achievements: []
            };
        }
        
        // Refresh displays
        initializeProgress();
        window.englishLearningPlatform?.updateProgressDisplay();
        
        window.englishLearningPlatform?.showToast('Progress reset successfully!', 'info');
    }
}

function exportProgress() {
    const exportData = {
        progressData,
        userProgress: window.englishLearningPlatform?.userProgress,
        exportDate: new Date().toISOString(),
        platform: 'English Learning Platform'
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `english-learning-progress-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    window.englishLearningPlatform?.showToast('Progress exported successfully!', 'success');
}

// Add CSS for animations
const progressStyles = document.createElement('style');
progressStyles.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .weekly-chart {
        text-align: center;
        margin: 2rem 0;
    }
    
    .chart-bars {
        display: flex;
        justify-content: space-around;
        align-items: flex-end;
        height: 120px;
        margin: 1rem 0;
        padding: 0 1rem;
    }
    
    .chart-bar {
        display: flex;
        flex-direction: column;
        align-items: center;
        min-width: 30px;
    }
    
    .bar {
        width: 20px;
        background: #667eea;
        border-radius: 3px 3px 0 0;
        transition: height 0.3s ease;
        margin-bottom: 5px;
    }
    
    .day-label {
        font-size: 0.8rem;
        color: #666;
        margin-bottom: 2px;
    }
    
    .value-label {
        font-size: 0.7rem;
        color: #999;
    }
    
    .badge-description {
        display: block;
        font-size: 0.7rem;
        opacity: 0.8;
        margin-top: 0.25rem;
    }
    
    .notification-content {
        display: flex;
        align-items: flex-start;
        gap: 1rem;
    }
    
    .notification-icon {
        font-size: 2rem;
        flex-shrink: 0;
    }
    
    .notification-text strong {
        display: block;
        margin-bottom: 0.25rem;
        font-size: 1.1rem;
    }
    
    .notification-text p {
        margin: 0 0 0.25rem 0;
        font-size: 1rem;
    }
    
    .notification-text small {
        opacity: 0.9;
        font-size: 0.85rem;
    }
`;
document.head.appendChild(progressStyles);

// Export progress functions
window.progressModule = {
    updateTodayProgress,
    unlockAchievement,
    updateProgressCharts,
    resetProgress,
    exportProgress
};