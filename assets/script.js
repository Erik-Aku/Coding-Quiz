var startButton = document.getElementById("start-button");
var choicesList = document.getElementById("choices-list");
var timerDisplay = document.getElementById("timer-display");
var gameOverContainer = document.getElementById("game-over-container");
var saveScoreButton = document.getElementById("save-score-button");
var showAnswerEl = document.getElementById("show-answer");
var welcomeEl = document.getElementById("welcome");
var questionContainerEl = document.getElementById("question-container");
var questionText = document.getElementById("question-text");
var opt1Button = document.getElementById("option1");
var opt2Button = document.getElementById("option2");
var opt3Button = document.getElementById("option3");
var opt4Button = document.getElementById("option4");
var optBtn = document.querySelectorAll("button.optBtn");
var scoreEl = document.getElementById("score");
var allTimeScoresEl = document.getElementById("all-time-scores");
var submitScoreButton = document.getElementById("submit-score");
var initialsInput = document.getElementById("initials");
var listOfScoresEl = document.getElementById("list-of-scores");
var goBackButton = document.getElementById("go-back");
var viewHighScoresEl = document.getElementById("view-high-scores");

var timer;
var score = 0;
var timerValue = 75;
var currentQuestionIndex = 0;
var scoreList = [];

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
    question:
      "The condition in an if / else statement is enclosed within ____.",
    options: [
      "1. quotes",
      "2. curly brackets",
      "3. parentheses",
      "4. square brackets",
    ],
    answer: "2",
  },

  {
    question: "Arrays in Javascript can be used to store ____.",
    options: [
      "1. numbers and strings",
      "2. other arrays",
      "3. booleans",
      "4. all of the above",
    ],
    answer: "3",
  },

  {
    question: "Which event occurs when the user clicks on an HTML element?",
    options: ["1. onmouseover", "2. onchange", "3. onmouseclick", "4. onclick"],
    answer: "3",
  },
];

// Starts quiz and timer, displays first question
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

// timer
function updateTimer() {
  timerValue--;
  timerDisplay.textContent = `Time: ${timerValue}`;

  if (timerValue <= 0 || currentQuestionIndex === questions.length) {
    clearInterval(timer);
    scoreEl.textContent = timerValue;
    endGame();
  }
}

// checks if there are questions left and displays the question and multiple choice answers
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

  //Displays the show-answer section to user
  showAnswerEl.style.display = "block";

  var ansList = document.getElementById("show-answer");

  // Clears answer result from previous question
  if (ansList.hasChildNodes()) {
    ansList.removeChild(ansList.children[0]);
  }

  // creates <p> element and appends
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

  // calls displayQuestion function with the index of the next question
  displayQuestion(currentQuestionIndex);
}

// ends the game and clears timer, hides the question-container and displays game-over-container
function endGame() {
  clearInterval(timer);
  questionContainerEl.style.display = "none";
  // Display the game over container
  gameOverContainer.style.display = "block";
  scoreEl.textContent = timerValue;
}

// stores the user's initials, and score in an array, loops through array and creates list elements, appends <li> to <ol>
function submitScore(event) {
  event.preventDefault();
  var initials = initialsInput.value;

  gameOverContainer.style.display = "none";
  allTimeScoresEl.style.display = "block";

  scoreList.push({ initials: initials, score: timerValue });

  listOfScoresEl.innerHTML = "";

  for (var i = 0; i < scoreList.length; i++) {
    var li = document.createElement("li");
    li.textContent = `${scoreList[i].initials}: ${scoreList[i].score}`;
    listOfScoresEl.append(li);
  }

  saveScores();
  showScores();
}

function saveScores() {
  localStorage.setItem("scoreList", JSON.stringify(scoreList));
}

function showScores() {
  var savedScores = JSON.parse(localStorage.getItem("scoreList"));

  if (savedScores !== null) {
    scoreList = savedScores;
  }
}

// Creates an event listener for each answer button and calls the check answer function
optBtn.forEach((item) => {
  item.addEventListener("click", checkAnswer);
});

//event listener to the save-score button to save initials and score
submitScoreButton.addEventListener("click", submitScore);

// back button event listener, resets the timer and set welcome page
goBackButton.addEventListener("click", function () {
  allTimeScoresEl.style.display = "none";
  welcomeEl.style.display = "block";
  timerValue = 75;
  timerDisplay.textContent = `Time: ${timerValue}`;
});

// View High Score button in header to show high scores
viewHighScoresEl.addEventListener("click", function () {
  welcomeEl.style.display = "none";
  allTimeScoresEl.style.display = "block";
});

// Add click event listener to the start button
startButton.addEventListener("click", startQuiz);
