/* These are questions posed for the quiz itself, which are integrated into the renderQuestion() function */
var questions = [
  {
    question: "Commonly used data types DO NOT include:",
    choices: ["Strings", "Booleans", "Alerts", "Numbers"],
    answer: "Alerts",
  },
  {
    question:
      "The condition in an if / else statement is enclosed within ____.",
    choices: ["Quotes", "Curly brackets", "Parentheses", "Square brackets"],
    answer: "Parentheses",
  },
  {
    question:
      "Inside of what element in the HTML document do we put the Javascript code?",
    choices: ["<script>", "<div>", "<head>", "<javascript>"],
    answer: "<script>",
  },
  {
    question:
      "This function ______ parses a string argument and returns an integer.",
    choices: ["return", "function", "parseInt()", "parseFloat()"],
    answer: "parseInt()",
  },
  {
    question:
      "Does window.prompt() return a true or false value?",
    choices: ["True", "False"],
    answer: "False",
  },
  {
    question:
      "What value does the === operator return?",
    choices: ["True", "False"],
    answer: "True",
  },
  {
    question:
      "All of the following are Javascript pop-ups, EXCEPT _____.",
    choices: ["Alert", "Prompt", "Help", "Confirm"],
    answer: "Help",
  },
  {
    question:
      "Javascript is _____. ",
    choices: ["Good", "Tedious", "Objective", "Object based"],
    answer: "Object based",
  },
  {
    question:
      "Which of these is the correct way to create a new array?",
    choices: ["var newArray = {};", "var newArray = [];", "var newArray = ();", "var newArray = newArray[];"],
    answer: "var newArray = [];",
  },
  {
    question:
      "What is the purpose of the var statement?",
    choices: ["Retreive a variable", "Declare an ID element", "Create a new variable", "Decalre a class element"],
    answer: "Create a new variable",
  },
];

/* Creating element variables and using document.querySelector to select the specific IDs corresponding to the variables.
This is done in order to be able to append the variables to the div */
var questionEl = document.querySelector("#question");
var optionListEl = document.querySelector("#option-list");
var questionResultEl = document.querySelector("#question-result");
var timerEl = document.querySelector("#timer");

/* These set of variables is for the timer interval that will be displayed while the quiz is in progress */
var questionIndex = 0;
var correctCount = 0;
var time = 120;
var intervalId;

function endQuiz() {
  clearInterval(intervalId);
  var body = document.body;
  body.innerHTML = "Game over, You scored " + correctCount + " points!";
// wait 2 seconds and call showHighScore;
setTimeout(showHighScore, 2000);
}


function showHighScore() {
  // write code here
  var name = prompt("What is your name?");

  var user = {
    name: name,
    score: correctCount
  }

  var high_score = localStorage.getItem("scores");

  if(!high_score){
    high_score = []
  } else {
    high_score = JSON.parse(high_score)
  }

  high_score.push(user);

  high_score.sort(function(a,b){
    return b.score-a.score
  })

  var contentUl = document.createElement("ul");

  for (var i=0; i<high_score.length; i++){
    var contentLi = document.createElement("li");
    contentLi.textContent ="Name: " +high_score[i].name+ " Score: " + high_score[i].score;
    
  }

  document.body.append(contentUl);
  // redirecting to highscore page to submit initials 
  window.location.href="highscore.html"
}

function updateTime() {
  time--;
  timerEl.textContent = time;
  if (time <= 0) {
    endQuiz();
  }
}

function renderQuestion() {
  if (time == 0) {
    updateTime();
    return;
  }
  
  intervalId = setInterval(updateTime, 1000);
  questionEl.textContent = questions[questionIndex].question;

  optionListEl.innerHTML = "";
  questionResultEl.innerHTML = "";

  var choices = questions[questionIndex].choices;
  var choicesLength = choices.length;
  


  for (var i = 0; i < choicesLength; i++) {
    var questionListItem = document.createElement("li");
    
    questionListItem.textContent = choices[i];
    optionListEl.append(questionListItem);
  }
}

function nextQuestion() {
  questionIndex++;
  if (questionIndex === questions.length) {
    time = 0;
  }
  renderQuestion();
}

function checkAnswer(event) {
  clearInterval(intervalId);
  if (event.target.matches("li")) {
    var answer = event.target.textContent;
    if (answer === questions[questionIndex].answer) {
      questionResultEl.textContent = "Correct!";
      correctCount++;
    } else {
      questionResultEl.textContent = "Incorrect!";
      time = time - 2;
      timerEl.textContent = time;
    }
  }
  setTimeout(nextQuestion, 2000);
}



// function userInput(){

//   var userName = document.createElement("input");
//   userName.setAttribute("placeholder", "name");
//   document.body.append(userName.Value);

//   localStorage.setItem("userName", user.name);
//   localStorage.setItem("score", correctCount);
// }



renderQuestion();
optionListEl.addEventListener("click", checkAnswer);
