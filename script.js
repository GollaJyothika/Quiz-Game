const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

const quizQuestions = [
    {
        question: "Which layer of the OSI model is responsible for reliable communication?",
        answers: [
            { text: "Network Layer", correct: false },
            { text: "Transport Layer", correct: true },
            { text: "Data Link Layer", correct: false },
            { text: "Session Layer", correct: false }
        ]
    },
    {
        question: "Which protocol is used to send email?",
        answers: [
            { text: "HTTP", correct: false },
            { text: "SMTP", correct: true },
            { text: "FTP", correct: false },
            { text: "SNMP", correct: false }
        ]
    },
    {
        question: "What is the purpose of a subnet mask?",
        answers: [
            { text: "To secure data", correct: false },
            { text: "To identify the host portion of an IP address", correct: true },
            { text: "To assign IP addresses", correct: false },
            { text: "To convert MAC to IP", correct: false }
        ]
    },
    {
        question: "Which device connects two different networks together?",
        answers: [
            { text: "Switch", correct: false },
            { text: "Router", correct: true },
            { text: "Hub", correct: false },
            { text: "Repeater", correct: false }
        ]
    },
    {
        question: "What does DNS stand for?",
        answers: [
            { text: "Digital Network System", correct: false },
            { text: "Domain Name System", correct: true },
            { text: "Dynamic Name Service", correct: false },
            { text: "Domain Numbering Service", correct: false }
        ]
    }
];

let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent = 0;
    startScreen.classList.remove("active");
    quizScreen.classList.add("active");
    showQuestion();
}

function showQuestion() {
    answersDisabled = false;
    const currentQuestion = quizQuestions[currentQuestionIndex];
    currentQuestionSpan.textContent = currentQuestionIndex + 1;
    const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
    progressBar.style.width = progressPercent + "%";
    questionText.textContent = currentQuestion.question;
    answersContainer.innerHTML = "";
    currentQuestion.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answer-btn");
        button.dataset.correct = answer.correct;
        button.addEventListener("click", selectAnswer);
        answersContainer.appendChild(button);
    });
}

function selectAnswer(event) {
    if (answersDisabled) return;
    answersDisabled = true;
    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true";
    Array.from(answersContainer.children).forEach((button) => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        } else if (button === selectedButton) {
            button.classList.add("incorrect");
        }
    });
    if (isCorrect) {
        score++;
        scoreSpan.textContent = score;
    }
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizQuestions.length) {
            showQuestion();
        } else {
            showResults();
        }
    }, 1000);
}

function showResults() {
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");
    finalScoreSpan.textContent = score;
    const percentage = (score / quizQuestions.length) * 100;
    if (percentage === 100) {
        resultMessage.textContent = "Perfect! You're a genius!";
    } else if (percentage >= 80) {
        resultMessage.textContent = "Great Job! You know your stuff!";
    } else if (percentage >= 60) {
        resultMessage.textContent = "Good effort! Keep learning";
    } else if (percentage >= 40) {
        resultMessage.textContent = "Not bad! Try again to improve!";
    } else {
        resultMessage.textContent = "Keep studying! You'll get better";
    }
}

function restartQuiz() {
    resultScreen.classList.remove("active");
    startQuiz();
}
