# Homework4Quiz
This is the javascript quiz homework. In this assignment I have created a 10 questions multiple choice quiz.

It includes an index.html, a homepage.html, a highscore.html, with their respective external css stylesheets, as well as the javascript code for making all of this work

We start with the homepage
- this homepage will redirect the user to the Javascript quiz itself, using the "start quiz" button
- from their the quiz will start and the timer will begin to countdown

A little abou the JS 
- the JS starts off with a questions variable, which holds all of the questions in an array. These are later iterated through a loop using the "renderQuestion()" function

- Next is a set of variables that correspond to the index.html page where all of the id elements are listed

- Another set of variables are defined for the timer interval that will be counting down during the duration of the quiz.

Functions:
- renderQuestion();
    - this function will render all 10 questions of the quiz, as well as include a timer interval 

- nextQuestion();
    -this function brings up the next question, using renderQuestion(); to render the questions

- updateTime();
    - this is the timer interval that will decrement every second, and once the time is gone to 0, the endQuiz(); function will work, ending the quiz automatically

- checkAnswer();
    - this is a series of if else statements that will check to see if the target matches the correct answer
    - if incorrect, the timer should essentially decrement by 2 seconds (still a work in progress)

- endQuiz();
    - will end the quiz and clear the timer interval
    - it will also present a new screen saying that the game is over and showing how many points are scored

-   showHighScore(); (still working on it)
    - this will show the high score and will redirect to a new page that allows the user to input their initials and store their score in their local storage
    