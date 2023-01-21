/* GLOBAL VARIABLES */
var textEl = document.querySelector("#question-title");
var timerEl = document.querySelector("#timer");
var questionsEl = document.querySelector("#questions");
var countdownTimer;
var questionCount = 0;
var answersEl = document.querySelector("#answers");
var storeScore = [];
var scoreResults = document.querySelector("#score-results");
var viewHighScore = document.querySelector(".high-score");
/* GV: BUTTONS */
var startButtonEl = document.querySelector("#start-quiz");
var aButtonEl = document.querySelector("#a");
var bButtonEl = document.querySelector("#b");
var cButtonEl = document.querySelector("#c");
var dButtonEl = document.querySelector("#d");
var submitButtonEl = document.querySelector("#submit");
var buttonEl = document.querySelectorAll(".answers");
var goBackButtonEl = document.querySelector("#go-back");
/*GV: INPUT */
var initialsEl = document.querySelector("#initials");
/* GV: SECTIONS */
var introSection = document.querySelector(".intro-section")
var questionSection = document.querySelector(".question-section");
var highscoreSection = document.querySelector(".high-score-section");
var dashboardSection = document.querySelector(".dashboard-section");

/* QUESTION ARRAY: (questions provided by courses.bootcampspot.com)*/
const questionArr = [
    {
        text: 'Commonly used data types DO NOT include:',
        a: '1. strings',
        b: '2. booleans',
        c: '3. alerts',
        d: '4. numbers',
        answer: '3. alerts'
    },
    {
        text: 'The condition in an if/else statement is enclosed with ____.',
        a: '1. quotes',
        b: '2. curly braces',
        c: '3. parenthesis',
        d: '4. square brackets',
        answer: '2. curly braces'
    },
    {
        text: 'Arrays in JavaScript can be used to store ____.',
        a: '1. numbers and strings',
        b: '2. other arrays',
        c: '3. booleans',
        d: '4. all of the above',
        answer: '4. all of the above'
    },
    {
        text: 'String values must be enclosed within ____ when being assigned to variables.',
        a: '1. commas',
        b: '2. curly braces',
        c: '3. quotes',
        d: '4. parentheses',
        answer: '3. quotes'
    },
    {
        text: 'A very useful tool used during development and debugging for printing content to the debugger is:',
        a: '1. JavaScript',
        b: '2. terminal/bash',
        c: '3. for loops',
        d: '4. console log',
        answer: '4. console log'
    },
]

/* TIMER SECTION */
// Create a timer that counts down, starting at 75 seconds
// Starter code from: https://stackoverflow.com/questions/31106189/create-a-simple-10-second-countdown
var timeLeft = 75;

var countdown = function() {
    countdownTimer = setInterval(function(){
        if(timeLeft <= 0){
          clearInterval(countdownTimer);
          document.getElementById("timer").innerHTML = "Finished";
        } else {
          document.getElementById("timer").innerHTML = "Time: " + timeLeft;
        }
        timeLeft -= 1;
      }, 1000);
}

/* QUIZ SECTION */
// display next question
var displayNextQuestion = function() {
    if (questionCount < questionArr.length) {

    answersEl.textContent = "";
    var question = document.createElement('div');

// #question section
    question.setAttribute("id", "question-div")
  console.log(questionCount);
    
    var text = questionArr[questionCount].text;
     textEl.textContent=text

    var a = questionArr[questionCount].a;
    aButtonEl.textContent=a
    var b = questionArr[questionCount].b;
    bButtonEl.textContent=b
    var c = questionArr[questionCount].c;
    cButtonEl.textContent=c
    var d = questionArr[questionCount].d;
    dButtonEl.textContent=d
    console.log(text);   
} 

}
for (var i=0; i < buttonEl.length; i++) {
    buttonEl[i].addEventListener("click", function(event){
        console.log(event.target.textContent, questionArr[questionCount].answer)
            // when user selects correct answer, 'Correct!' is displayed at the bottom of screen 
            // **NEED TO MAKE SURE THIS DISPLAYS ON THE LAST QUESTION**
            if (event.target.textContent === questionArr[questionCount].answer) {
                 answersEl.textContent='Correct!'; 
             // when user selects incorrect answer, 'Wrong!' is displayed at the bottom of screen
                } else {
                 answersEl.textContent='Wrong!';
                 timeLeft = timeLeft - 10;
             }
             questionCount++ // goes through questions until you reach the end
             if (questionCount < questionArr.length) {
                 setTimeout(displayNextQuestion, 500);
             } else {
                //questionSection.setAttribute("class", "question-section display");
                //highscoreSection.setAttribute("class", "test");
                questionSection.classList.add("display");
                highscoreSection.classList.remove("display");
                console.log("stop");
                clearInterval(countdownTimer);  
             }  
     })
}

// display stored results
var displayScore = function() {
    var initialInput = JSON.parse(localStorage.getItem("initialInput"));
    if (initialInput) {
        storeScore = initialInput;
        scoreResults.textContent = "";
        for(i=0; i < storeScore.length; i++) {
            var li = document.createElement("li");
            li.textContent = storeScore[i];
            scoreResults.appendChild(li);
        }
    }
}
displayScore();

// #start-quiz
startButtonEl.addEventListener("click", function() {
        countdown();
        // when you click 'start' hide intro section and display question section
        questionSection.classList.remove("display"); 
        introSection.classList.add("display");
    displayNextQuestion();           
});

// #submit score button
submitButtonEl.addEventListener("click", function() {
    storeScore.push(initialsEl.value + " - " + timerEl.textContent.replace("Time:", ""));
    localStorage.setItem("initialInput", JSON.stringify(storeScore));
    highscoreSection.classList.add("display");
    dashboardSection.classList.remove("display");
    displayScore();
});

// view high score link
viewHighScore.addEventListener("click", function() {
    introSection.classList.add("display");
    dashboardSection.classList.remove("display");
});

// #go-back button
goBackButtonEl.addEventListener("click", function() {
    introSection.classList.remove("display");
    dashboardSection.classList.add("display");
});



