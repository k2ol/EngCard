// Grammar module for English Learning Platform

// Grammar exercises data
const grammarData = {
    tenses: [
        {
            question: "I _____ to the store yesterday.",
            options: ["go", "went", "going", "will go"],
            correct: 1,
            explanation: "Use past tense 'went' for actions completed in the past."
        },
        {
            question: "She _____ her homework every day.",
            options: ["do", "does", "did", "doing"],
            correct: 1,
            explanation: "Use 'does' for third person singular in present tense."
        },
        {
            question: "They _____ to the party tomorrow.",
            options: ["go", "went", "will go", "going"],
            correct: 2,
            explanation: "Use 'will go' for future actions."
        },
        {
            question: "I _____ studying English for two years.",
            options: ["am", "have been", "was", "will be"],
            correct: 1,
            explanation: "Use present perfect continuous 'have been' for ongoing actions."
        },
        {
            question: "By next year, I _____ my degree.",
            options: ["complete", "completed", "will complete", "will have completed"],
            correct: 3,
            explanation: "Use future perfect 'will have completed' for actions completed before a future time."
        }
    ],
    articles: [
        {
            question: "I saw _____ elephant at the zoo.",
            options: ["a", "an", "the", "no article"],
            correct: 1,
            explanation: "Use 'an' before words starting with vowel sounds."
        },
        {
            question: "_____ sun rises in the east.",
            options: ["A", "An", "The", "No article"],
            correct: 2,
            explanation: "Use 'the' with unique objects like the sun."
        },
        {
            question: "She is _____ teacher.",
            options: ["a", "an", "the", "no article"],
            correct: 0,
            explanation: "Use 'a' before consonant sounds for professions."
        },
        {
            question: "I love _____ music.",
            options: ["a", "an", "the", "no article"],
            correct: 3,
            explanation: "No article needed with abstract nouns in general sense."
        },
        {
            question: "_____ book you gave me is interesting.",
            options: ["A", "An", "The", "No article"],
            correct: 2,
            explanation: "Use 'the' when referring to a specific item."
        }
    ],
    prepositions: [
        {
            question: "The cat is _____ the table.",
            options: ["in", "on", "at", "under"],
            correct: 1,
            explanation: "Use 'on' for surfaces."
        },
        {
            question: "I'll meet you _____ 3 o'clock.",
            options: ["in", "on", "at", "by"],
            correct: 2,
            explanation: "Use 'at' with specific times."
        },
        {
            question: "She lives _____ New York.",
            options: ["in", "on", "at", "by"],
            correct: 0,
            explanation: "Use 'in' with cities and countries."
        },
        {
            question: "The picture is _____ the wall.",
            options: ["in", "on", "at", "under"],
            correct: 1,
            explanation: "Use 'on' for things attached to walls."
        },
        {
            question: "I'm going _____ vacation next week.",
            options: ["in", "on", "at", "for"],
            correct: 1,
            explanation: "Use 'on' with vacation."
        }
    ],
    conditionals: [
        {
            question: "If it rains, I _____ stay home.",
            options: ["will", "would", "might", "could"],
            correct: 0,
            explanation: "First conditional uses 'will' for likely future results."
        },
        {
            question: "If I _____ rich, I would travel the world.",
            options: ["am", "was", "were", "will be"],
            correct: 2,
            explanation: "Second conditional uses 'were' for hypothetical situations."
        },
        {
            question: "If she _____ harder, she would have passed.",
            options: ["studied", "had studied", "studies", "will study"],
            correct: 1,
            explanation: "Third conditional uses 'had + past participle' for past hypotheticals."
        },
        {
            question: "_____ you help me if I asked?",
            options: ["Will", "Would", "Can", "Could"],
            correct: 1,
            explanation: "Use 'would' in second conditional questions."
        },
        {
            question: "If you heat water to 100°C, it _____.",
            options: ["will boil", "would boil", "boils", "boiled"],
            correct: 2,
            explanation: "Zero conditional uses present tense for scientific facts."
        }
    ]
};

// Grammar state
let currentTopic = 'tenses';
let currentQuestionIndex = 0;
let currentQuestion = null;
let selectedAnswer = null;
let grammarScore = 0;
let grammarStats = {
    questionsAnswered: 0,
    correctAnswers: 0,
    topicProgress: {
        tenses: 0,
        articles: 0,
        prepositions: 0,
        conditionals: 0
    }
};

// Initialize grammar module
document.addEventListener('DOMContentLoaded', function() {
    initializeGrammar();
});

function initializeGrammar() {
    setupGrammarEventListeners();
    loadGrammarStats();
    showGrammarTopic(currentTopic);
}

function setupGrammarEventListeners() {
    // Topic buttons
    const topicButtons = document.querySelectorAll('.topic-btn');
    topicButtons.forEach(button => {
        button.addEventListener('click', function() {
            const topic = this.dataset.topic;
            selectGrammarTopic(topic);
        });
    });
    
    // Exercise buttons
    const checkAnswerBtn = document.getElementById('check-answer-btn');
    const nextQuestionBtn = document.getElementById('next-question-btn');
    
    if (checkAnswerBtn) {
        checkAnswerBtn.addEventListener('click', checkGrammarAnswer);
    }
    
    if (nextQuestionBtn) {
        nextQuestionBtn.addEventListener('click', nextGrammarQuestion);
    }
}

function selectGrammarTopic(topic) {
    // Update active topic button
    document.querySelectorAll('.topic-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.topic === topic) {
            btn.classList.add('active');
        }
    });
    
    currentTopic = topic;
    currentQuestionIndex = 0;
    grammarScore = 0;
    showGrammarTopic(topic);
}

function showGrammarTopic(topic) {
    const questions = grammarData[topic];
    if (!questions || questions.length === 0) {
        showGrammarMessage("No questions available for this topic.");
        return;
    }
    
    currentQuestion = questions[currentQuestionIndex];
    displayGrammarQuestion();
}

function displayGrammarQuestion() {
    const questionElement = document.getElementById('grammar-question');
    const optionsElement = document.getElementById('grammar-options');
    const checkBtn = document.getElementById('check-answer-btn');
    const nextBtn = document.getElementById('next-question-btn');
    const feedback = document.getElementById('feedback');
    
    if (!currentQuestion) return;
    
    // Display question
    if (questionElement) {
        questionElement.innerHTML = `
            <p><strong>Question ${currentQuestionIndex + 1}:</strong> ${currentQuestion.question}</p>
            <p class="topic-indicator">Topic: ${currentTopic.charAt(0).toUpperCase() + currentTopic.slice(1)}</p>
        `;
    }
    
    // Display options
    if (optionsElement) {
        optionsElement.innerHTML = currentQuestion.options.map((option, index) => `
            <div class="option" data-index="${index}" onclick="selectGrammarOption(${index})">
                ${String.fromCharCode(65 + index)}. ${option}
            </div>
        `).join('');
    }
    
    // Reset buttons and feedback
    if (checkBtn) {
        checkBtn.disabled = true;
        checkBtn.textContent = 'Check Answer';
    }
    if (nextBtn) {
        nextBtn.disabled = true;
        nextBtn.style.display = 'none';
    }
    if (feedback) {
        feedback.innerHTML = '';
        feedback.className = 'feedback';
    }
    
    selectedAnswer = null;
}

function selectGrammarOption(index) {
    // Remove previous selection
    document.querySelectorAll('.option').forEach(opt => {
        opt.classList.remove('selected');
    });
    
    // Select new option
    const selectedOption = document.querySelector(`[data-index="${index}"]`);
    if (selectedOption) {
        selectedOption.classList.add('selected');
        selectedAnswer = index;
        
        // Enable check button
        const checkBtn = document.getElementById('check-answer-btn');
        if (checkBtn) {
            checkBtn.disabled = false;
        }
    }
}

function checkGrammarAnswer() {
    if (selectedAnswer === null || !currentQuestion) return;
    
    const isCorrect = selectedAnswer === currentQuestion.correct;
    const options = document.querySelectorAll('.option');
    const feedback = document.getElementById('feedback');
    const checkBtn = document.getElementById('check-answer-btn');
    const nextBtn = document.getElementById('next-question-btn');
    
    // Update stats
    grammarStats.questionsAnswered++;
    if (isCorrect) {
        grammarStats.correctAnswers++;
        grammarScore++;
    }
    grammarStats.topicProgress[currentTopic]++;
    
    // Show correct/incorrect styling
    options.forEach((option, index) => {
        option.style.pointerEvents = 'none';
        if (index === currentQuestion.correct) {
            option.classList.add('correct');
        } else if (index === selectedAnswer && !isCorrect) {
            option.classList.add('incorrect');
        }
    });
    
    // Show feedback
    if (feedback) {
        feedback.innerHTML = `
            <div class="${isCorrect ? 'correct' : 'incorrect'}">
                <strong>${isCorrect ? 'Correct!' : 'Incorrect'}</strong>
                <p>${currentQuestion.explanation}</p>
            </div>
        `;
        feedback.className = `feedback ${isCorrect ? 'correct' : 'incorrect'}`;
    }
    
    // Update buttons
    if (checkBtn) {
        checkBtn.disabled = true;
        checkBtn.textContent = isCorrect ? '✓ Correct' : '✗ Incorrect';
    }
    
    if (nextBtn) {
        nextBtn.disabled = false;
        nextBtn.style.display = 'inline-block';
        
        // Check if this is the last question
        const questions = grammarData[currentTopic];
        if (currentQuestionIndex >= questions.length - 1) {
            nextBtn.textContent = 'Finish Topic';
        } else {
            nextBtn.textContent = 'Next Question';
        }
    }
    
    // Update global progress
    if (window.englishLearningPlatform && window.englishLearningPlatform.userProgress) {
        window.englishLearningPlatform.userProgress.totalExercises++;
        if (isCorrect) {
            window.englishLearningPlatform.userProgress.correctAnswers++;
            window.englishLearningPlatform.userProgress.currentStreak++;
        } else {
            window.englishLearningPlatform.userProgress.currentStreak = 0;
        }
        window.englishLearningPlatform.updateProgressDisplay();
        window.englishLearningPlatform.saveUserProgress();
    }
    
    saveGrammarStats();
}

function nextGrammarQuestion() {
    const questions = grammarData[currentTopic];
    
    if (currentQuestionIndex >= questions.length - 1) {
        // Topic completed
        showTopicResults();
    } else {
        // Next question
        currentQuestionIndex++;
        currentQuestion = questions[currentQuestionIndex];
        displayGrammarQuestion();
    }
}

function showTopicResults() {
    const questions = grammarData[currentTopic];
    const percentage = Math.round((grammarScore / questions.length) * 100);
    
    const questionElement = document.getElementById('grammar-question');
    const optionsElement = document.getElementById('grammar-options');
    const feedback = document.getElementById('feedback');
    const checkBtn = document.getElementById('check-answer-btn');
    const nextBtn = document.getElementById('next-question-btn');
    
    if (questionElement) {
        questionElement.innerHTML = `
            <div class="topic-results">
                <h3>Topic Complete: ${currentTopic.charAt(0).toUpperCase() + currentTopic.slice(1)}</h3>
                <div class="score-display">
                    <span class="score">${grammarScore}/${questions.length}</span>
                    <span class="percentage">${percentage}%</span>
                </div>
                <p class="result-message">${getGrammarResultMessage(percentage)}</p>
            </div>
        `;
    }
    
    if (optionsElement) {
        optionsElement.innerHTML = `
            <div class="topic-actions">
                <button class="btn-primary" onclick="restartGrammarTopic()">Try Again</button>
                <button class="btn-secondary" onclick="selectRandomTopic()">Random Topic</button>
                <button class="btn-success" onclick="showGrammarProgress()">View Progress</button>
            </div>
        `;
    }
    
    if (feedback) {
        feedback.innerHTML = '';
    }
    
    if (checkBtn) checkBtn.style.display = 'none';
    if (nextBtn) nextBtn.style.display = 'none';
    
    // Show achievement notification for perfect score
    if (percentage === 100) {
        window.englishLearningPlatform.showToast('Perfect score! Excellent work!', 'success');
    }
}

function getGrammarResultMessage(percentage) {
    if (percentage >= 90) return "Outstanding! You've mastered this topic!";
    if (percentage >= 70) return "Great job! You have a good understanding.";
    if (percentage >= 50) return "Good effort! Review and try again to improve.";
    return "Keep practicing! You'll get better with more study.";
}

function restartGrammarTopic() {
    currentQuestionIndex = 0;
    grammarScore = 0;
    showGrammarTopic(currentTopic);
}

function selectRandomTopic() {
    const topics = Object.keys(grammarData);
    const randomTopic = topics[Math.floor(Math.random() * topics.length)];
    selectGrammarTopic(randomTopic);
}

function showGrammarProgress() {
    const questionElement = document.getElementById('grammar-question');
    const optionsElement = document.getElementById('grammar-options');
    
    if (questionElement) {
        questionElement.innerHTML = `
            <div class="grammar-progress">
                <h3>Grammar Progress</h3>
                <p>Total Questions Answered: ${grammarStats.questionsAnswered}</p>
                <p>Accuracy Rate: ${grammarStats.questionsAnswered > 0 ? Math.round((grammarStats.correctAnswers / grammarStats.questionsAnswered) * 100) : 0}%</p>
            </div>
        `;
    }
    
    if (optionsElement) {
        optionsElement.innerHTML = `
            <div class="topic-progress">
                ${Object.entries(grammarStats.topicProgress).map(([topic, count]) => `
                    <div class="progress-item">
                        <span class="topic-name">${topic.charAt(0).toUpperCase() + topic.slice(1)}</span>
                        <span class="question-count">${count} questions completed</span>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${Math.min(100, (count / 10) * 100)}%"></div>
                        </div>
                    </div>
                `).join('')}
                <button class="btn-primary" onclick="selectGrammarTopic('tenses')" style="margin-top: 2rem;">Continue Learning</button>
            </div>
        `;
    }
}

function showGrammarMessage(message) {
    const questionElement = document.getElementById('grammar-question');
    const optionsElement = document.getElementById('grammar-options');
    
    if (questionElement) {
        questionElement.innerHTML = `<p>${message}</p>`;
    }
    if (optionsElement) {
        optionsElement.innerHTML = '';
    }
}

function loadGrammarStats() {
    const savedStats = localStorage.getItem('grammarStats');
    if (savedStats) {
        grammarStats = { ...grammarStats, ...JSON.parse(savedStats) };
    }
}

function saveGrammarStats() {
    localStorage.setItem('grammarStats', JSON.stringify(grammarStats));
}

// Make functions globally available
window.selectGrammarOption = selectGrammarOption;
window.restartGrammarTopic = restartGrammarTopic;
window.selectRandomTopic = selectRandomTopic;
window.showGrammarProgress = showGrammarProgress;

// Export grammar functions
window.grammarModule = {
    selectGrammarTopic,
    showGrammarTopic,
    checkGrammarAnswer,
    nextGrammarQuestion,
    showTopicResults
};