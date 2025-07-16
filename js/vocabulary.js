// Vocabulary module for English Learning Platform

// Vocabulary data
const vocabularyData = [
    {
        word: "abundant",
        definition: "Existing or available in large quantities; plentiful",
        pronunciation: "/əˈbʌndənt/",
        example: "The garden had an abundant harvest this year.",
        difficulty: "intermediate"
    },
    {
        word: "benevolent",
        definition: "Well meaning and kindly; showing goodwill",
        pronunciation: "/bɪˈnevələnt/",
        example: "The benevolent teacher helped struggling students.",
        difficulty: "advanced"
    },
    {
        word: "curious",
        definition: "Eager to know or learn something; strange or unusual",
        pronunciation: "/ˈkjʊriəs/",
        example: "She was curious about the mysterious package.",
        difficulty: "beginner"
    },
    {
        word: "diligent",
        definition: "Having or showing care and conscientiousness in work",
        pronunciation: "/ˈdɪlɪdʒənt/",
        example: "The diligent student completed all assignments on time.",
        difficulty: "intermediate"
    },
    {
        word: "eloquent",
        definition: "Fluent or persuasive in speaking or writing",
        pronunciation: "/ˈeləkwənt/",
        example: "The politician gave an eloquent speech.",
        difficulty: "advanced"
    },
    {
        word: "fascinating",
        definition: "Extremely interesting or captivating",
        pronunciation: "/ˈfæsɪneɪtɪŋ/",
        example: "The documentary about space was fascinating.",
        difficulty: "intermediate"
    },
    {
        word: "generous",
        definition: "Showing a readiness to give more than is necessary",
        pronunciation: "/ˈdʒenərəs/",
        example: "She was generous with her time and money.",
        difficulty: "beginner"
    },
    {
        word: "harmonious",
        definition: "Forming a pleasing or consistent whole; free from conflict",
        pronunciation: "/hɑːˈmoʊniəs/",
        example: "The team worked in harmonious cooperation.",
        difficulty: "advanced"
    },
    {
        word: "innovative",
        definition: "Featuring new methods; advanced and original",
        pronunciation: "/ˈɪnəveɪtɪv/",
        example: "The company's innovative approach impressed investors.",
        difficulty: "intermediate"
    },
    {
        word: "jovial",
        definition: "Cheerful and friendly; good-humored",
        pronunciation: "/ˈdʒoʊviəl/",
        example: "His jovial personality made everyone feel welcome.",
        difficulty: "advanced"
    },
    {
        word: "knowledge",
        definition: "Facts, information, and skills acquired through experience",
        pronunciation: "/ˈnɑːlɪdʒ/",
        example: "She shared her knowledge with younger colleagues.",
        difficulty: "beginner"
    },
    {
        word: "luminous",
        definition: "Giving off light; bright or shining",
        pronunciation: "/ˈluːmɪnəs/",
        example: "The luminous moon lit up the night sky.",
        difficulty: "advanced"
    },
    {
        word: "magnificent",
        definition: "Impressively beautiful, elaborate, or extravagant",
        pronunciation: "/mæɡˈnɪfɪsənt/",
        example: "The cathedral's magnificent architecture amazed visitors.",
        difficulty: "intermediate"
    },
    {
        word: "optimistic",
        definition: "Hopeful and confident about the future",
        pronunciation: "/ˌɑːptɪˈmɪstɪk/",
        example: "Despite challenges, she remained optimistic.",
        difficulty: "beginner"
    },
    {
        word: "perseverance",
        definition: "Persistence in doing something despite difficulty",
        pronunciation: "/ˌpɜːrsəˈvɪrəns/",
        example: "His perseverance led to eventual success.",
        difficulty: "advanced"
    }
];

// Vocabulary state
let currentWord = null;
let definitionShown = false;
let vocabularyStats = {
    wordsStudied: 0,
    wordsKnown: 0,
    currentStreak: 0
};

// Initialize vocabulary module
document.addEventListener('DOMContentLoaded', function() {
    initializeVocabulary();
});

function initializeVocabulary() {
    setupVocabularyEventListeners();
    loadVocabularyStats();
    updateVocabularyDisplay();
}

function setupVocabularyEventListeners() {
    const newWordBtn = document.getElementById('new-word-btn');
    const showDefinitionBtn = document.getElementById('show-definition-btn');
    const markKnownBtn = document.getElementById('mark-known-btn');
    const pronunciationBtn = document.getElementById('pronunciation-btn');
    
    if (newWordBtn) {
        newWordBtn.addEventListener('click', showNewWord);
    }
    
    if (showDefinitionBtn) {
        showDefinitionBtn.addEventListener('click', showDefinition);
    }
    
    if (markKnownBtn) {
        markKnownBtn.addEventListener('click', markWordAsKnown);
    }
    
    if (pronunciationBtn) {
        pronunciationBtn.addEventListener('click', pronounceWord);
    }
}

function showNewWord() {
    // Get a random word
    currentWord = vocabularyData[Math.floor(Math.random() * vocabularyData.length)];
    definitionShown = false;
    
    // Update display
    const wordElement = document.getElementById('current-word');
    const definitionElement = document.getElementById('word-definition');
    const showDefinitionBtn = document.getElementById('show-definition-btn');
    const markKnownBtn = document.getElementById('mark-known-btn');
    const pronunciationBtn = document.getElementById('pronunciation-btn');
    
    if (wordElement) {
        wordElement.textContent = currentWord.word;
        wordElement.style.animation = 'fadeIn 0.5s ease-in';
    }
    
    if (definitionElement) {
        definitionElement.textContent = "Click 'Show Definition' to see the meaning";
        definitionElement.style.opacity = '0.6';
    }
    
    // Enable buttons
    if (showDefinitionBtn) showDefinitionBtn.disabled = false;
    if (markKnownBtn) markKnownBtn.disabled = false;
    if (pronunciationBtn) pronunciationBtn.disabled = false;
    
    // Update stats
    vocabularyStats.wordsStudied++;
    updateVocabularyDisplay();
    saveVocabularyStats();
    
    // Show toast
    window.englishLearningPlatform.showToast(`New word: ${currentWord.word}`, 'info');
}

function showDefinition() {
    if (!currentWord || definitionShown) return;
    
    const definitionElement = document.getElementById('word-definition');
    if (definitionElement) {
        definitionElement.innerHTML = `
            <strong>Definition:</strong> ${currentWord.definition}<br>
            <strong>Example:</strong> ${currentWord.example}<br>
            <strong>Level:</strong> ${currentWord.difficulty}
        `;
        definitionElement.style.opacity = '1';
        definitionElement.style.animation = 'fadeIn 0.5s ease-in';
    }
    
    definitionShown = true;
    
    // Disable show definition button
    const showDefinitionBtn = document.getElementById('show-definition-btn');
    if (showDefinitionBtn) {
        showDefinitionBtn.disabled = true;
        showDefinitionBtn.textContent = 'Definition Shown';
    }
}

function markWordAsKnown() {
    if (!currentWord) return;
    
    // Update stats
    vocabularyStats.wordsKnown++;
    vocabularyStats.currentStreak++;
    
    // Update global progress
    if (window.englishLearningPlatform && window.englishLearningPlatform.userProgress) {
        window.englishLearningPlatform.userProgress.wordsLearned++;
        window.englishLearningPlatform.userProgress.currentStreak++;
        window.englishLearningPlatform.updateProgressDisplay();
        window.englishLearningPlatform.saveUserProgress();
    }
    
    updateVocabularyDisplay();
    saveVocabularyStats();
    
    // Show success message
    window.englishLearningPlatform.showToast(`Great! You know "${currentWord.word}"`, 'success');
    
    // Automatically show next word after 1 second
    setTimeout(() => {
        showNewWord();
    }, 1000);
}

function pronounceWord() {
    if (!currentWord) return;
    
    // Use Web Speech API for pronunciation
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(currentWord.word);
        utterance.rate = 0.8;
        utterance.pitch = 1;
        utterance.volume = 1;
        
        // Try to use an English voice
        const voices = speechSynthesis.getVoices();
        const englishVoice = voices.find(voice => 
            voice.lang.startsWith('en') && voice.name.includes('English')
        );
        if (englishVoice) {
            utterance.voice = englishVoice;
        }
        
        speechSynthesis.speak(utterance);
        
        // Visual feedback
        const pronunciationBtn = document.getElementById('pronunciation-btn');
        if (pronunciationBtn) {
            pronunciationBtn.style.background = '#28a745';
            pronunciationBtn.style.transform = 'scale(1.1)';
            
            setTimeout(() => {
                pronunciationBtn.style.background = '';
                pronunciationBtn.style.transform = '';
            }, 500);
        }
    } else {
        // Fallback: show pronunciation guide
        window.englishLearningPlatform.showToast(`Pronunciation: ${currentWord.pronunciation}`, 'info');
    }
}

function updateVocabularyDisplay() {
    // Update vocabulary stats in the UI
    const wordsLearnedEl = document.getElementById('words-learned');
    const currentStreakEl = document.getElementById('current-streak');
    
    if (wordsLearnedEl) {
        wordsLearnedEl.textContent = vocabularyStats.wordsKnown;
    }
    
    if (currentStreakEl) {
        currentStreakEl.textContent = vocabularyStats.currentStreak;
    }
}

function loadVocabularyStats() {
    const savedStats = localStorage.getItem('vocabularyStats');
    if (savedStats) {
        vocabularyStats = { ...vocabularyStats, ...JSON.parse(savedStats) };
    }
}

function saveVocabularyStats() {
    localStorage.setItem('vocabularyStats', JSON.stringify(vocabularyStats));
}

// Vocabulary quiz functionality
function startVocabularyQuiz() {
    const quizWords = vocabularyData.slice(0, 5); // Take first 5 words for quiz
    let currentQuestionIndex = 0;
    let score = 0;
    
    function showQuizQuestion() {
        if (currentQuestionIndex >= quizWords.length) {
            showQuizResults();
            return;
        }
        
        const word = quizWords[currentQuestionIndex];
        const options = generateQuizOptions(word);
        
        // Create quiz interface
        const quizContainer = document.createElement('div');
        quizContainer.className = 'vocabulary-quiz';
        quizContainer.innerHTML = `
            <div class="quiz-header">
                <h3>Vocabulary Quiz</h3>
                <p>Question ${currentQuestionIndex + 1} of ${quizWords.length}</p>
            </div>
            <div class="quiz-question">
                <h4>What does "${word.word}" mean?</h4>
            </div>
            <div class="quiz-options">
                ${options.map((option, index) => `
                    <button class="quiz-option" data-correct="${option === word.definition}" onclick="selectQuizAnswer(this, ${option === word.definition})">
                        ${option}
                    </button>
                `).join('')}
            </div>
            <div class="quiz-progress">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${(currentQuestionIndex / quizWords.length) * 100}%"></div>
                </div>
            </div>
        `;
        
        // Replace vocabulary content temporarily
        const vocabularyContainer = document.querySelector('.vocabulary-container');
        if (vocabularyContainer) {
            vocabularyContainer.innerHTML = '';
            vocabularyContainer.appendChild(quizContainer);
        }
    }
    
    function generateQuizOptions(correctWord) {
        const options = [correctWord.definition];
        const otherWords = vocabularyData.filter(w => w.word !== correctWord.word);
        
        // Add 3 random incorrect options
        while (options.length < 4) {
            const randomWord = otherWords[Math.floor(Math.random() * otherWords.length)];
            if (!options.includes(randomWord.definition)) {
                options.push(randomWord.definition);
            }
        }
        
        // Shuffle options
        return options.sort(() => Math.random() - 0.5);
    }
    
    function showQuizResults() {
        const percentage = Math.round((score / quizWords.length) * 100);
        const resultsContainer = document.createElement('div');
        resultsContainer.className = 'quiz-results';
        resultsContainer.innerHTML = `
            <div class="results-header">
                <h3>Quiz Complete!</h3>
                <div class="score-display">
                    <span class="score">${score}/${quizWords.length}</span>
                    <span class="percentage">${percentage}%</span>
                </div>
            </div>
            <div class="results-message">
                <p>${getScoreMessage(percentage)}</p>
            </div>
            <div class="results-actions">
                <button class="btn-primary" onclick="location.reload()">Try Again</button>
                <button class="btn-secondary" onclick="initializeVocabulary()">Back to Vocabulary</button>
            </div>
        `;
        
        const vocabularyContainer = document.querySelector('.vocabulary-container');
        if (vocabularyContainer) {
            vocabularyContainer.innerHTML = '';
            vocabularyContainer.appendChild(resultsContainer);
        }
        
        // Update global progress
        if (window.englishLearningPlatform && window.englishLearningPlatform.userProgress) {
            window.englishLearningPlatform.userProgress.totalExercises++;
            window.englishLearningPlatform.userProgress.correctAnswers += score;
            window.englishLearningPlatform.updateProgressDisplay();
            window.englishLearningPlatform.saveUserProgress();
        }
    }
    
    function getScoreMessage(percentage) {
        if (percentage >= 90) return "Excellent! You have a great vocabulary!";
        if (percentage >= 70) return "Good job! Keep practicing to improve further.";
        if (percentage >= 50) return "Not bad! Review the words and try again.";
        return "Keep studying! Practice makes perfect.";
    }
    
    // Make selectQuizAnswer globally available
    window.selectQuizAnswer = function(button, isCorrect) {
        // Disable all options
        document.querySelectorAll('.quiz-option').forEach(opt => {
            opt.disabled = true;
            if (opt.dataset.correct === 'true') {
                opt.style.background = '#28a745';
                opt.style.color = 'white';
            } else if (opt === button && !isCorrect) {
                opt.style.background = '#dc3545';
                opt.style.color = 'white';
            }
        });
        
        if (isCorrect) {
            score++;
        }
        
        // Move to next question after 2 seconds
        setTimeout(() => {
            currentQuestionIndex++;
            showQuizQuestion();
        }, 2000);
    };
    
    // Start the quiz
    showQuizQuestion();
}

// Add vocabulary quiz button to the interface
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        const vocabularyContainer = document.querySelector('.vocabulary-container');
        if (vocabularyContainer) {
            const quizButton = document.createElement('button');
            quizButton.className = 'btn-primary';
            quizButton.textContent = 'Take Vocabulary Quiz';
            quizButton.style.marginTop = '2rem';
            quizButton.onclick = startVocabularyQuiz;
            
            vocabularyContainer.appendChild(quizButton);
        }
    }, 1000);
});

// Export vocabulary functions
window.vocabularyModule = {
    showNewWord,
    showDefinition,
    markWordAsKnown,
    pronounceWord,
    startVocabularyQuiz
};