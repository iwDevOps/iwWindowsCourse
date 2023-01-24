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
        text: 'How many main parts does Icewarp server architecture consist of?:',
        a: '5',
        b: '4',
        c: '3',
        d: '6',
        answer: '3'
    },
    {
        text: 'What tool can be used to connect to a port of a service to see the response from the service?',
        a: '1. nslookup',
        b: '2. netstat',
        c: '3. ping',
        d: '4. telnet',
        answer: '4. telnet'
    },
    {
        text: 'Autodiscover is:',
        a: '1. A tool that assists with VoIP setup',
        b: '2. A tool that evaluates your server’s performance',
        c: '3. A tool that evaluates your network settings and optimises them',
        d: '4. A tool that assists with service discovery and automatic client setup',
        answer: '4. A tool that assists with service discovery and automatic client setup'
    },
    {
        text: 'SMTP runs by default on ports:',
        a: '1. 25 and 143',
        b: '2. 25 and 443',
        c: '3. 25, 465, and 587',
        d: '4. 22, 143, and 993',
        answer: '3. 25, 465, and 587'
    },
    {
        text: 'SNI or Server Name Indication is:',
        a: '1. A technology that provides hostname and certificate pairing so that clients get a certificate for the correct hostname',
        b: '2. A technology that a certificate cannot be abused by a 3rd party',
        c: '3. A watchdog technology that checks service status',
        d: '4. A technology used for server clustering',
        answer: '1. A technology that provides hostname and certificate pairing so that clients get a certificate for the correct hostname'
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



