const startButton = document.getElementById("start-button");
const choicesList = document.getElementById("choices-list");
const timerDisplay = document.getElementById("timer-display");
const gameOverContainer = document.getElementById("game-over-container");
const initialsInput = document.getElementById("initials-input");
const saveScoreButton = document.getElementById("save-score-button");
var showAnswerEl = document.getElementById("show-answer");
const welcomeEl = document.getElementById("welcome");
var questionContainerEl = document.getElementById("question-container");
const questionText = document.getElementById("question-text");
var opt1Button = document.getElementById("option1");
var opt2Button = document.getElementById("option2");
var opt3Button = document.getElementById("option3");
var opt4Button = document.getElementById("option4");
var optBtn = document.querySelectorAll("button.optBtn");
// const scoreEl = document.getElementById("score");

var timer;
var score = 0;
var timerValue = 75;
var currentQuestionIndex = 0;

const questions = [
  {
    question: "Inside which HTML element do we put the JavaScript?",
    options: ["1. <javaScript>", "2. <js>", "3. <scripting>", "4. <script>"],
    answer: "3",
  },

  {
    question: "Commonly used data types do NOT include:",
    options: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
    answer: "2",
  },

  {
    question: "YAYAYAYAY?:",
    options: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
    answer: "2",
  },
];

// Add click event listener to the start button
startButton.addEventListener("click", startQuiz);

function startQuiz() {
  welcomeEl.style.display = "none";
  questionContainerEl.style.display = "block";
  showAnswerEl.style.display = "none";
  currentQuestionIndex = 0;
  // Start the timer
  timer = setInterval(updateTimer, 1000);
  // Display the first question
  displayQuestion(currentQuestionIndex);
}

function updateTimer() {
  timerValue--;
  timerDisplay.textContent = `Time: ${timerValue}`;

  if (timerValue <= 0 || currentQuestionIndex === questions.length) {
    clearInterval(timer);
    // scoreEl.textContent = timerValue;
    endGame();
  }
}

function displayQuestion(index) {
  if (index < questions.length) {
    questionText.textContent = questions[index].question;
    opt1Button.textContent = questions[index].options[0];
    opt2Button.textContent = questions[index].options[1];
    opt3Button.textContent = questions[index].options[2];
    opt4Button.textContent = questions[index].options[3];
  }
}

function checkAnswer(event) {
  event.preventDefault();

  //show answer result
  showAnswerEl.style.display = "block";

  var ansList = document.getElementById("show-answer");

  // Clears answer result
  if (ansList.hasChildNodes()) {
    ansList.removeChild(ansList.children[0]);
  }

  var answerEl = document.createElement("p");
  showAnswerEl.appendChild(answerEl);

  // checks answer
  if (questions[currentQuestionIndex].answer === event.target.value) {
    answerEl.textContent = "Correct!";
  } else if (questions[currentQuestionIndex].answer !== event.target.value) {
    answerEl.textContent = "Wrong!";
    timerValue -= 10;
  }

  if (currentQuestionIndex < questions.length) {
    currentQuestionIndex++;
  } else {
    endGame();
  }
  displayQuestion(currentQuestionIndex);
}

function endGame() {
  clearInterval(timer);
  // Display the game over container
  gameOverContainer.style.display = "block";
}

// // Add event listener to the save-score button to save initials and score

optBtn.forEach((item) => {
  item.addEventListener("click", checkAnswer);
});
