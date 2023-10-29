var questions = [
    {
        question: 'What is the correct way to declare a variable in JavaScript?',
        answers: [
            { text: "variable x", correct: false },
            { text: "I Declare that x", correct: false },
            { text: "x = var", correct: false },
            { text: "var x", correct: true },
        ]
    },
    {
        question: 'What is the purpose of the "console.log()" function in JavaScript?',
        answers: [
            { text: "It displays a message in an alert", correct: false },
            { text: "It logs messages in the console for debugging", correct: true },
            { text: "Creates a variable", correct: false },
            { text: "It prints text to the webpage", correct: false },
        ]
    },
    {
        question: 'Which of the following is a primitive data type in JavaScript?',
        answers: [
            { text: "Array", correct: false },
            { text: "Object", correct: false },
            { text: "Function", correct: false },
            { text: "String", correct: true },
        ]
    },
    {
        question: 'What does the "DOM" stand for in the context of web development with JavaScript?',
        answers: [
            { text: "Document Object Model", correct: true },
            { text: "Data Object Mixture", correct: false },
            { text: "Delta Omega Mega", correct: false },
            { text: "Document Order Mechanism", correct: false },
        ]
    }
];

// The elements created are for the Quiz & Questions
const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

// These elements are created for the start button on the main page that launches the quiz
const startContainer = document.getElementById('start-container');
const startButton = document.getElementById('start-btn');
const quizContainer = document.getElementById('quiz-container');

// creating a function that when startQuiz function runs, the timer will then begin to count down
const timerElement = document.getElementById('timer');

const scoreForm = document.getElementById('score-form');

let timeRemaining = 40;
let countdown;
// adding an eventlistener to the START BUTTON in order to launch the quiz and remove the display:none setting on the quiz - MAKING IT VISIBLE
startButton.addEventListener('click', () => {
    startContainer.style.display = 'none';
    quizContainer.style.display = 'block';
    timerElement.style.display = 'block';
    resetTimer();
    const countdown = setInterval(function () {
        timeRemaining--;
        timerElement.textContent = `Timer: ${timeRemaining}`;
        if (timeRemaining <= 0 || currentQuestionIndex[3]) {
            clearInterval(countdown);
            alert('Oops! Out of Time!');
            showScore()
        }

    }, 1000);
    startQuiz();
});

function resetTimer() {
    clearInterval(countdown);
    timeRemaining = 40;
    timerElement.textContent = `Timer: ${timeRemaining}`;
}

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
    resetTimer();
}


function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + '. ' + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add('btn');
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;

        }
        button.addEventListener('click', selectAnswer);
    });
    document.getElementById('score-form').style.display = 'none';
}


function resetState() {
    nextButton.style.display = 'none';
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}


function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    score++;
    if (isCorrect) {
        selectedBtn.classList.add("correct");
    } else {
        selectedBtn.classList.add("incorrect");
        score--;
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;

    const playAgainButton = document.createElement("button");
    playAgainButton.innerHTML = "Play Again";
    playAgainButton.classList.add('btn', 'play-again-btn');
    answerButtons.appendChild(playAgainButton);

    const submitScoreButton = document.createElement("button");
    submitScoreButton.innerHTML = "Submit Score";
    submitScoreButton.classList.add('btn', 'submit-score-btn');
    answerButtons.appendChild(submitScoreButton);

    submitScoreButton.addEventListener('click', () => {
        const scoreForm = document.getElementById('score-form');
        scoreForm.style.display = 'block';
        playAgainButton.style.display = 'none';
        submitScoreButton.style.display = 'none';

    });


    playAgainButton.addEventListener('click', () => {
        startQuiz();

    });


    playAgainButton.style.display = 'block';
    submitScoreButton.style.display = 'block';
}




scoreForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    saveHighScore(username, score);
    alert('Score submitted successfully!');
    startQuiz();
});


function saveHighScore(username, score) {
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    highScores.push({ username, score });
    highScores.sort((a, b) => b.score - a.score);
    localStorage.setItem('highScores', JSON.stringify(highScores));
}


const highscoreButton = document.getElementById('highscoreButton');
const highscoresContainer = document.getElementById('highscores-container');
const highscoresList = document.getElementById('highscores-list');
const closeHighscoresButton = document.getElementById('close-highscores');



highscoreButton.addEventListener('click', showHighscores);
closeHighscoresButton.addEventListener('click', () => {
    hideHighscores();
    startContainer.style.display = 'block';
    quizContainer.style.display = 'none';
    timerElement.style.display = 'none';
});

function showHighscores() {
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    highscoresList.innerHTML = '';

    highScores.forEach((score, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${index + 1}. ${score.username}: ${score.score}`;
        highscoresList.appendChild(listItem);
    });


    highscoresContainer.style.display = 'block';
    highscoreButton.style.display = "none";
    timerElement.style.display = "none";
    quizContainer.style.display = "none";
    startContainer.style.display = "none";
}

function hideHighscores() {
    highscoresContainer.style.display = 'none';
}


function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
        nextButton.innerHTML = "Next";
    } else {
        showScore();
        nextButton.innerHTML = "Test button for End"
        timeRemaining = 40;
    }
}

nextButton.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        showScore();
        nextButton.innerHTML = 'test button 12121';
        resetTimer();
        resetQuiz();
    }
});

function resetQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    startContainer.style.display = 'block';
    quizContainer.style.display = 'none';
    timerElement.style.display = 'none';
    nextButton.innerHTML = 'Next';
}


startQuiz();