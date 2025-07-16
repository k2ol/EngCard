// Quiz module for English Learning Platform

// Reading comprehension data
const readingData = {
    beginner: {
        title: "A Day at the Park",
        text: `
            Yesterday, Sarah went to the park with her dog, Max. The weather was sunny and warm. 
            Many people were enjoying the beautiful day. Children were playing on the swings and slides. 
            Some families were having picnics on the grass.
            
            Sarah threw a ball for Max to catch. Max ran very fast and brought the ball back to Sarah. 
            They played for one hour. After that, they sat under a big tree to rest. 
            Sarah gave Max some water to drink.
            
            Before going home, Sarah and Max walked around the lake. They saw ducks swimming in the water. 
            It was a perfect day at the park.
        `,
        questions: [
            {
                question: "Who did Sarah go to the park with?",
                options: ["Her friend", "Her dog Max", "Her family", "Alone"],
                correct: 1
            },
            {
                question: "What was the weather like?",
                options: ["Rainy", "Cold", "Sunny and warm", "Windy"],
                correct: 2
            },
            {
                question: "How long did Sarah and Max play?",
                options: ["30 minutes", "One hour", "Two hours", "All day"],
                correct: 1
            }
        ]
    },
    intermediate: {
        title: "The Benefits of Reading",
        text: `
            Reading is one of the most beneficial activities for personal development. It not only improves 
            vocabulary and language skills but also enhances critical thinking abilities. When we read, 
            our brains create new neural pathways, which help us process information more effectively.
            
            Regular reading has been shown to reduce stress levels significantly. The act of focusing on 
            a book allows our minds to escape from daily worries and immerse ourselves in different worlds. 
            This mental break is essential for maintaining good psychological health.
            
            Furthermore, reading exposes us to diverse perspectives and cultures. Through literature, 
            we can experience life from different viewpoints and develop greater empathy for others. 
            This cultural awareness is increasingly important in our interconnected world.
            
            Scientists recommend reading for at least 30 minutes daily to maximize these benefits. 
            Whether fiction or non-fiction, any type of reading contributes to cognitive improvement 
            and personal growth.
        `,
        questions: [
            {
                question: "According to the text, reading helps create:",
                options: ["New friendships", "New neural pathways", "New languages", "New problems"],
                correct: 1
            },
            {
                question: "How much daily reading do scientists recommend?",
                options: ["15 minutes", "30 minutes", "1 hour", "2 hours"],
                correct: 1
            },
            {
                question: "What does reading help us develop towards others?",
                options: ["Competition", "Criticism", "Empathy", "Indifference"],
                correct: 2
            }
        ]
    },
    advanced: {
        title: "Climate Change and Renewable Energy",
        text: `
            The transition to renewable energy sources represents one of the most critical challenges 
            of the 21st century. As atmospheric carbon dioxide levels continue to rise, reaching 
            unprecedented concentrations, the urgency for sustainable energy solutions has never 
            been more apparent.
            
            Solar and wind technologies have experienced remarkable cost reductions over the past decade, 
            making them increasingly competitive with fossil fuels. However, the intermittent nature 
            of these energy sources presents significant challenges for grid stability and energy storage. 
            Advanced battery technologies and smart grid systems are being developed to address these 
            limitations.
            
            The economic implications of this energy transition are profound. While initial investments 
            in renewable infrastructure require substantial capital, the long-term benefits include 
            reduced operational costs, energy independence, and the creation of new industries and 
            employment opportunities.
            
            International cooperation is essential for achieving global climate goals. The Paris Agreement 
            established a framework for coordinated action, but implementation requires unprecedented 
            collaboration between governments, private sector entities, and civil society organizations.
        `,
        questions: [
            {
                question: "What is described as one of the most critical challenges of the 21st century?",
                options: ["Population growth", "Transition to renewable energy", "Space exploration", "Artificial intelligence"],
                correct: 1
            },
            {
                question: "What challenge do solar and wind technologies face?",
                options: ["High costs", "Intermittent nature", "Public opposition", "Technical complexity"],
                correct: 1
            },
            {
                question: "What framework was established by the Paris Agreement?",
                options: ["Economic cooperation", "Coordinated climate action", "Technology sharing", "Energy trading"],
                correct: 1
            }
        ]
    }
};

// Listening exercise data (simulated)
const listeningData = [
    {
        title: "Weather Forecast",
        instruction: "Listen to the weather forecast and answer the questions.",
        audioText: "Good morning! Today's weather will be partly cloudy with temperatures reaching 25 degrees Celsius. There's a 30% chance of rain in the afternoon. Tomorrow will be sunny with highs of 28 degrees.",
        questions: [
            {
                question: "What will the temperature be today?",
                options: ["23°C", "25°C", "28°C", "30°C"],
                correct: 1
            },
            {
                question: "What's the chance of rain?",
                options: ["20%", "30%", "40%", "50%"],
                correct: 1
            }
        ]
    }
];

// Quiz state
let currentReadingLevel = 'beginner';
let currentReadingQuestions = [];
let currentQuestionIndex = 0;
let readingScore = 0;
let listeningScore = 0;
let isListeningMode = false;

// Initialize quiz module
document.addEventListener('DOMContentLoaded', function() {
    initializeQuiz();
});

function initializeQuiz() {
    setupQuizEventListeners();
    loadReadingLevel('beginner');
    setupListeningExercise();
}

function setupQuizEventListeners() {
    // Reading level buttons
    const levelButtons = document.querySelectorAll('.level-btn');
    levelButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const level = this.dataset.level;
            selectReadingLevel(level);
        });
    });
    
    // Reading submit button
    const submitReadingBtn = document.getElementById('submit-reading-btn');
    if (submitReadingBtn) {
        submitReadingBtn.addEventListener('click', submitReadingAnswers);
    }
    
    // Listening controls
    const playAudioBtn = document.getElementById('play-audio-btn');
    const pauseAudioBtn = document.getElementById('pause-audio-btn');
    const replayAudioBtn = document.getElementById('replay-audio-btn');
    const submitListeningBtn = document.getElementById('submit-listening-btn');
    
    if (playAudioBtn) playAudioBtn.addEventListener('click', playListeningAudio);
    if (pauseAudioBtn) pauseAudioBtn.addEventListener('click', pauseListeningAudio);
    if (replayAudioBtn) replayAudioBtn.addEventListener('click', replayListeningAudio);
    if (submitListeningBtn) submitListeningBtn.addEventListener('click', submitListeningAnswers);
}

// Reading Comprehension Functions
function selectReadingLevel(level) {
    // Update active level button
    document.querySelectorAll('.level-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.level === level) {
            btn.classList.add('active');
        }
    });
    
    currentReadingLevel = level;
    loadReadingLevel(level);
}

function loadReadingLevel(level) {
    const data = readingData[level];
    if (!data) return;
    
    const titleElement = document.getElementById('reading-title');
    const textElement = document.getElementById('reading-text');
    const questionsContainer = document.getElementById('questions-container');
    const submitBtn = document.getElementById('submit-reading-btn');
    
    // Update title and text
    if (titleElement) titleElement.textContent = data.title;
    if (textElement) textElement.innerHTML = `<p>${data.text.trim().replace(/\n\s+/g, '</p><p>')}</p>`;
    
    // Create questions
    if (questionsContainer) {
        questionsContainer.innerHTML = data.questions.map((q, index) => `
            <div class="question" data-question="${index}">
                <p><strong>Question ${index + 1}:</strong> ${q.question}</p>
                <div class="question-options">
                    ${q.options.map((option, optIndex) => `
                        <label>
                            <input type="radio" name="question_${index}" value="${optIndex}">
                            ${option}
                        </label>
                    `).join('')}
                </div>
            </div>
        `).join('');
    }
    
    // Enable submit button
    if (submitBtn) {
        submitBtn.disabled = false;
    }
    
    currentReadingQuestions = data.questions;
}

function submitReadingAnswers() {
    const questions = currentReadingQuestions;
    let score = 0;
    
    questions.forEach((question, index) => {
        const selectedOption = document.querySelector(`input[name="question_${index}"]:checked`);
        const questionElement = document.querySelector(`[data-question="${index}"]`);
        
        if (selectedOption) {
            const selectedValue = parseInt(selectedOption.value);
            const isCorrect = selectedValue === question.correct;
            
            if (isCorrect) {
                score++;
                questionElement.style.background = '#d4edda';
                questionElement.style.border = '2px solid #28a745';
            } else {
                questionElement.style.background = '#f8d7da';
                questionElement.style.border = '2px solid #dc3545';
            }
            
            // Highlight correct answer
            const labels = questionElement.querySelectorAll('label');
            labels[question.correct].style.fontWeight = 'bold';
            labels[question.correct].style.color = '#28a745';
        }
    });
    
    // Show results
    const percentage = Math.round((score / questions.length) * 100);
    window.englishLearningPlatform.showToast(
        `Reading Score: ${score}/${questions.length} (${percentage}%)`, 
        percentage >= 70 ? 'success' : 'info'
    );
    
    // Update global progress
    if (window.englishLearningPlatform && window.englishLearningPlatform.userProgress) {
        window.englishLearningPlatform.userProgress.totalExercises++;
        window.englishLearningPlatform.userProgress.correctAnswers += score;
        window.englishLearningPlatform.updateProgressDisplay();
        window.englishLearningPlatform.saveUserProgress();
    }
    
    // Disable submit button
    const submitBtn = document.getElementById('submit-reading-btn');
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitted';
    }
}

// Listening Exercise Functions
function setupListeningExercise() {
    const data = listeningData[0]; // Use first listening exercise
    const instructionElement = document.getElementById('listening-instruction');
    const questionsElement = document.getElementById('listening-questions');
    
    if (instructionElement) {
        instructionElement.textContent = data.instruction;
    }
    
    if (questionsElement) {
        questionsElement.innerHTML = data.questions.map((q, index) => `
            <div class="question" data-question="${index}">
                <p><strong>Question ${index + 1}:</strong> ${q.question}</p>
                <div class="question-options">
                    ${q.options.map((option, optIndex) => `
                        <label>
                            <input type="radio" name="listening_question_${index}" value="${optIndex}">
                            ${option}
                        </label>
                    `).join('')}
                </div>
            </div>
        `).join('');
    }
}

let currentAudio = null;
let audioProgress = 0;

function playListeningAudio() {
    const data = listeningData[0];
    
    // Use Speech Synthesis API to simulate audio
    if ('speechSynthesis' in window) {
        // Stop any existing speech
        speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(data.audioText);
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
        
        // Update progress bar
        utterance.onstart = () => {
            startProgressAnimation();
            updateAudioButtons(true);
        };
        
        utterance.onend = () => {
            stopProgressAnimation();
            updateAudioButtons(false);
            enableListeningSubmit();
        };
        
        speechSynthesis.speak(utterance);
        currentAudio = utterance;
    } else {
        // Fallback: show text and enable submit
        window.englishLearningPlatform.showToast('Audio playback not supported. Text: ' + data.audioText, 'info');
        enableListeningSubmit();
    }
}

function pauseListeningAudio() {
    if (speechSynthesis.speaking) {
        speechSynthesis.pause();
        updateAudioButtons(false);
    }
}

function replayListeningAudio() {
    speechSynthesis.cancel();
    setTimeout(() => {
        playListeningAudio();
    }, 100);
}

function updateAudioButtons(isPlaying) {
    const playBtn = document.getElementById('play-audio-btn');
    const pauseBtn = document.getElementById('pause-audio-btn');
    
    if (playBtn) playBtn.disabled = isPlaying;
    if (pauseBtn) pauseBtn.disabled = !isPlaying;
}

function startProgressAnimation() {
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
        progressFill.style.width = '0%';
        progressFill.style.transition = 'width 10s linear';
        setTimeout(() => {
            progressFill.style.width = '100%';
        }, 100);
    }
}

function stopProgressAnimation() {
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
        progressFill.style.transition = 'none';
        progressFill.style.width = '100%';
    }
}

function enableListeningSubmit() {
    const submitBtn = document.getElementById('submit-listening-btn');
    if (submitBtn) {
        submitBtn.disabled = false;
    }
}

function submitListeningAnswers() {
    const data = listeningData[0];
    const questions = data.questions;
    let score = 0;
    
    questions.forEach((question, index) => {
        const selectedOption = document.querySelector(`input[name="listening_question_${index}"]:checked`);
        const questionElement = document.querySelector(`[data-question="${index}"]`);
        
        if (selectedOption) {
            const selectedValue = parseInt(selectedOption.value);
            const isCorrect = selectedValue === question.correct;
            
            if (isCorrect) {
                score++;
                questionElement.style.background = '#d4edda';
                questionElement.style.border = '2px solid #28a745';
            } else {
                questionElement.style.background = '#f8d7da';
                questionElement.style.border = '2px solid #dc3545';
            }
            
            // Highlight correct answer
            const labels = questionElement.querySelectorAll('label');
            labels[question.correct].style.fontWeight = 'bold';
            labels[question.correct].style.color = '#28a745';
        }
    });
    
    // Show results
    const percentage = Math.round((score / questions.length) * 100);
    window.englishLearningPlatform.showToast(
        `Listening Score: ${score}/${questions.length} (${percentage}%)`, 
        percentage >= 70 ? 'success' : 'info'
    );
    
    // Update global progress
    if (window.englishLearningPlatform && window.englishLearningPlatform.userProgress) {
        window.englishLearningPlatform.userProgress.totalExercises++;
        window.englishLearningPlatform.userProgress.correctAnswers += score;
        window.englishLearningPlatform.updateProgressDisplay();
        window.englishLearningPlatform.saveUserProgress();
    }
    
    // Disable submit button
    const submitBtn = document.getElementById('submit-listening-btn');
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitted';
    }
}

// Export quiz functions
window.quizModule = {
    selectReadingLevel,
    loadReadingLevel,
    submitReadingAnswers,
    playListeningAudio,
    pauseListeningAudio,
    replayListeningAudio,
    submitListeningAnswers
};