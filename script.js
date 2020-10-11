var questions = [
  {
    question: "Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts",
  },
  {
    question:
      "The condition in an if / else statement is enclosed within ____.",
    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: "parentheses",
  },
];

var questionEl = document.querySelector("#question");
var optionListEl = document.querySelector("#option-list");
var questionResultEl = document.querySelector("#question-result");
var timerEl = document.querySelector("#timer");

var questionIndex = 0;
var correctCount = 0;
var time = 20;
var intervalId;

function endQuiz() {
  clearInterval(intervalId);
  var body = document.body;
  body.innerHTML = "Game over, You scored " + correctCount;
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
  var choicesLenth = choices.length;

  for (var i = 0; i < choicesLenth; i++) {
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
      questionResultEl.textContent = "Correct";
      correctCount++;
    } else {
      questionResultEl.textContent = "Incorrect";
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
