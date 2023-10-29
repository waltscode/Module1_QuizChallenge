var questions = [
    {
        question: 'what is the largest animal in the world?',
        answers: [
            { text: "shark", correct: false },
            { text: "bird", correct: false },
            { text: "snake", correct: false },
            { text: "blue whale", correct: true },
        ]
    },
    {
        question: 'what is the smallest animal?',
        answers: [
            { text: "shark", correct: false },
            { text: "bird", correct: true },
            { text: "snake", correct: false },
            { text: "blue whale", correct: false },
        ]
    },
    {
        question: 'what city was Wayne Gretzky from?',
        answers: [
            { text: "Toronto", correct: false },
            { text: "Vancouver", correct: false },
            { text: "Barrie", correct: false },
            { text: "Brantford", correct: true },
        ]
    },
    {
        question: 'Who is the best dog in the world?',
        answers: [
            { text: "Rocky", correct: true },
            { text: "Old Yeller", correct: false },
            { text: "Air Bud", correct: false },
            { text: "Toby", correct: false },
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

let timeRemaining = 40;

// adding an eventlistener to the START BUTTON in order to launch the quiz and remove the display:none setting on the quiz - MAKING IT VISIBLE
startButton.addEventListener('click', () => {
    startContainer.style.display = 'none';
    quizContainer.style.display = 'block';
    const countdown = setInterval(function () {
        timeRemaining--;
        timerElement.textContent = `Timer: ${timeRemaining}`;
        if (timeRemaining <= 0) {
            clearInterval(countdown);
            alert('Oops! Out of Time!');
            showScore();
        }
    },1000);
    startQuiz();
});



let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
       showQuestion();
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

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = 'block'; 
}


function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener('click', ()=>{
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    }else{
      startQuiz();  
    }
});


startQuiz();