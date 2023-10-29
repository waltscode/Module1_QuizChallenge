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

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

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