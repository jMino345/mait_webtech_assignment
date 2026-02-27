// =====================
// ADMIN SECTION
// =====================
const ADMIN_PASSWORD = "admin123";

function adminLogin() {
    const pass = document.getElementById("adminPass").value;
    if (pass === ADMIN_PASSWORD) {
        document.getElementById("adminControls").classList.remove("d-none");
        alert("Admin Login Successful");
    } else {
        alert("Incorrect Password");
    }
}

function addQuestion() {
    alert("Connect this to backend/database for real admin control.");
}

// =====================
// QUIZ DATA
// =====================
let questions = [
    { question: "In which year was the college established?", options: ["1990","1985","2000","1975"], answer: 0 },
    { question: "Which department offers B.Tech in Computer Science?", options: ["Mechanical","Civil","Computer Science","Electrical"], answer: 2 },
    { question: "Who was the founding principal?", options: ["Dr. Sharma","Dr. Rao","Dr. Mehta","Dr. Singh"], answer: 1 },
    { question: "Which course includes Data Structures?", options: ["BBA","BCA","BA","B.Com"], answer: 1 },
    { question: "Which lab is used for programming practice?", options: ["Physics","Chemistry","Computer","Biology"], answer: 2 },
    { question: "Annual cultural fest is called?", options: ["TechnoFest","EduFair","Udaan","Innovate"], answer: 2 },
    { question: "Which accreditation does the college have?", options: ["NAAC","NASA","WHO","UNESCO"], answer: 0 },
    { question: "Which subject covers Operating Systems?", options: ["Networking","OS","AI","DBMS"], answer: 1 },
    { question: "Which course focuses on business management?", options: ["BCA","BBA","BSc IT","BA English"], answer: 1 },
    { question: "Which library system is used?", options: ["Digital","Manual","Hybrid","None"], answer: 0 }
];

// Randomize Questions
questions.sort(() => Math.random() - 0.5);

// =====================
// QUIZ LOGIC
// =====================
let currentQuestion = 0;
let score = 0;
let selectedOption = null;
let timer;
let timeLeft = 15;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const feedbackEl = document.getElementById("feedback");
const progressBar = document.getElementById("progress-bar");

function startTimer() {
    timeLeft = 15;
    document.getElementById("time").textContent = timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("time").textContent = timeLeft;

        if (timeLeft === 0) {
            clearInterval(timer);
            submitAnswer();
        }
    }, 1000);
}

function loadQuestion() {
    clearInterval(timer);
    startTimer();

    const q = questions[currentQuestion];
    questionEl.textContent = q.question;
    optionsEl.innerHTML = "";
    feedbackEl.classList.remove("show");
    feedbackEl.textContent = "";

    q.options.forEach((option, index) => {
        const col = document.createElement("div");
        col.className = "col-md-6";

        const card = document.createElement("div");
        card.className = "card p-3 option-card";
        card.textContent = option;
        card.setAttribute("tabindex", "0");

        card.onclick = () => selectOption(card, index);
        card.onkeypress = (e) => {
            if (e.key === "Enter") selectOption(card, index);
        };

        col.appendChild(card);
        optionsEl.appendChild(col);
    });

    updateProgress();
}

function selectOption(element, index) {
    document.querySelectorAll(".option-card").forEach(opt =>
        opt.classList.remove("selected")
    );
    element.classList.add("selected");
    selectedOption = index;
}

function submitAnswer() {
    clearInterval(timer);

    if (selectedOption === null) {
        alert("Please select an option!");
        return;
    }

    const correctAnswer = questions[currentQuestion].answer;
    const cards = document.querySelectorAll(".option-card");

    if (selectedOption === correctAnswer) {
        score++;
        cards[selectedOption].classList.add("correct");
        feedbackEl.textContent = "✅ Correct!";
    } else {
        cards[selectedOption].classList.add("incorrect");
        cards[correctAnswer].classList.add("correct");
        feedbackEl.textContent = "❌ Incorrect!";
    }

    feedbackEl.classList.add("show");

    setTimeout(() => {
        currentQuestion++;
        selectedOption = null;

        if (currentQuestion < questions.length) {
            loadQuestion();
        } else {
            showResults();
        }
    }, 1500);
}

function updateProgress() {
    let percent = (currentQuestion / questions.length) * 100;
    progressBar.style.width = percent + "%";
}

function showResults() {
    document.getElementById("quiz-section").classList.add("d-none");
    document.getElementById("result-section").classList.remove("d-none");
    document.getElementById("finalScore").textContent =
        `You scored ${score} out of ${questions.length}`;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    document.getElementById("result-section").classList.add("d-none");
    document.getElementById("quiz-section").classList.remove("d-none");
    loadQuestion();
}

// Start Quiz
loadQuestion();
document.getElementById("submitBtn").addEventListener("click", submitAnswer);