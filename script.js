// declare id root variable
// declare class title page variable
// declare class question variable
// declare counter variable

// function init() to describe start page which will have
// title
// description
// button 'start quiz'

// click event for highscore view
// local storage of high score

// click event for start quiz
// timer starts
// pulls questions() function

// function questions()
// create h2 child to question var
// create ul child to question var
// index through preset questions with for loop (can be in order; will add random later)
// var currentQuestion = objectQuestions[i] 
// display question using html = currentQuestion
// display options
// create li children to ul
// at options have click events on each 
// pull answer() function
// counter

// function answer() 
// click event on the selected answer (not in this function)
// if user select correct
// logs score
// sets variable to correct
// else 
// takes off 15 seconds from clock
// sets variable to wrong
// continues to next question (not in this function)
// display answer below (now new) question

// function endGame() to
// tell user score
// allow user to add initials
// click event on submit
// stores score
// stores associated initals 
// without erasing previous

// init() at bottom to call start page




// declare variables
var rootEl = document.querySelector('#root');
var titleEl = document.querySelector('#title-page');
var questionsEl = document.querySelector('#questions');
var viewHighScoreEL = document.querySelector('#high-scores');
var highScorePageEl = document.querySelector(".wins-losses")
var counter = 0;


// function init() to describe start page which will have
function init() {
    startPage();
}

function startPage() {
    // titleEl = document.querySelector('#title-page');
    var h1El = titleEl.childNodes[1];
    var pEl = titleEl.childNodes[2];
    var startButton = document.createElement('button');

    h1El.textContent = "Code Quiz";
    pEl.textContent = "Take this quiz to test your coding knowledge! You will have 75 seconds to complete the quiz. Any wrong answers deduct 15 second from your score. Press the start button when you are ready!"
    startButton.innerText = 'Start'

    titleEl.insertBefore(startButton, null)

    startButton.addEventListener('click', questions);

}


// click event for highscore view
// local storage of high score

// questions
var qA = [
    {
        question: 'Test Question 1 What is CSS?',
        answer: 'Cascading Style Sheets',
        choices: ['Cascading Style Sheets', 'Caca Shoe Stuff','Claire Stays Salty','Crap Something Super']
    }, 
    {
        question: 'What is my name?',
        answer: 'Claire',
        choices: ['Christie','Amy','Warren','Claire']
    }]



function questions() {
    rootEl.removeAttribute(titleEl);
    titleEl.remove();
    setTime()
    for (var i = 0; i < qA.length; i++) {
        var currentQ = qA[i];
        console.log(currentQ.question);
        for (var j = 0; j <qA.choices.length; i++) {
            var event = qA.choices[i]
            
            questions.amendChild()

        }
    }


// index through preset questions with for loop (can be in order; will add random later)
// var currentQuestion = objectQuestions[i] 
// display question using html = currentQuestion
// display options
// create li children to ul
// at options have click events on each 
// pull answer() function
// counter

    
}

var timer = 75
var timerEl = document.querySelector('.timer');
timerEl.textContent = timer;

function setTime() {
    // Sets interval in variable
    var timerInterval = setInterval(function () {
        timer--; // subtract one
        timerEl.textContent = timer;

        if (timer === 0) {
            // Stops execution of action at set interval
            clearInterval(timerInterval);
            // endGame()
        }

    }, 1000);
}

function answerChoice() {
    // if user click === answer
        // add to score
        // make variable correct
    // else (wrong or user click !=== answer)
        // deduct 15 seconds
        // make variable wrong
    // display what answer was
}


// function endGame() to
// tell user score
// allow user to add initials
// click event on submit
// stores score
// stores associated initals 
// without erasing previous

// init() at bottom to call start page
init();