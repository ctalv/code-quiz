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
var enterScoreEl = document.querySelector('#enter-scores');
var highScorePageEl = document.querySelector("#score-page");
var viewScoresEl = document.querySelector('.view-scores')
var mainEl = document.querySelector('main');
var score = 0;
var timer = 75
var timerEl = document.querySelector('.timer');
timerEl.textContent = timer;

// function init() to describe start page which will have
function init() {

    startPage();
    addEventListener.viewScoresEl("click", function () {
        // mainEl.innerHTML = '';
        var highScoreTitleEl = document.querySelector("#score-page h2");
        var listHighScoresEl = document.querySelector("#score-page ol")
    })
}

function startPage() {
    // titleEl = document.querySelector('#title-page');
    timer = 75;
    var h1El = document.createElement('h1');
    var pEl = document.createElement('p');
    // var h1El = titleEl.childNodes[1];
    // var pEl = titleEl.childNodes[2];
    var startButton = document.createElement('button');

    titleEl.appendChild(h1El);
    titleEl.appendChild(pEl);
    titleEl.appendChild(startButton);


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

        question: 'Which of the following is NOT a function of HTML?',
        choices: [
            'Defining the structure of web pages',
            'Adding visual styling to web pages',
            'Creating hyperlinks between web pages',
            'Displaying text and media content on web pages',
        ],
        answer: 'Adding visual styling to web pages'

    },
    {
        question: 'What is the primary function of CSS in web development?',
        choices: [
            'Defining the structure of web pages',
            'Adding interactivity to web pages',
            'Creating hyperlinks between web pages',
            'Adding visual styling to web pages'
        ],
        answer: 'Adding visual styling to web pages'
    },
    {
        question: 'What is JavaScript primarily used for in web development?',
        choices: [
            'Defining the structure of web pages',
            'Adding interactivity to web pages',
            'Creating hyperlinks between web pages',
            'Adding visual styling to web pages'
        ],
        answer: 'Adding interactivity to web pages'
    },
    {
        question: 'Which of the following CSS techniques can be used to create responsive web design?',
        choices: [
            'Media queries',
            'Class selectors',
            'Pseudo-classes',
            'Attribute selectors'
        ],
        answer: 'Media queries'
    },
    {
        question: 'Which of the following HTML tags can be used to add JavaScript to a web page?',
        choices: [
            '<script>',
            '<head>',
            '<body>',
            '<html>'
        ],
        answer: '<script>'
    },
    {
        question: 'Which of the following is an HTML attribute that can be used to specify the location of an external JavaScript file?',
        choices: [
            'src',
            'href',
            'class',
            'id'
        ],
        answer: 'src'
    },
    {
        question: 'What is the purpose of the HTML <form> element in web development?',
        choices: [
            'To define a container for HTML content',
            'To create a table layout for web pages',
            'To create input fields for user data',
            'To add visual styling to web pages'
        ],
        answer: 'To create input fields for user data'
    },
    {
        question: 'What is an event in JavaScript?',
        choices: [
            'A function that runs automatically',
            'A conditional statement that controls program flow',
            'An action triggered by user interaction with a web page',
            'A loop that iterates over a collection of values'
        ],
        answer: 'An action triggered by user interaction with a web page'
    }]

function questions() {
    titleEl.textContent = ''
    setTime();

    var questionCount = 0

    function questionNumber() {
        var currentQ = qA[questionCount];

        var h2El = document.createElement('h2');
        var olEl = document.createElement('ol');
        questionsEl.appendChild(h2El);
        questionsEl.appendChild(olEl);
        h2El.textContent = "Q" + (questionCount + 1) + ": " + currentQ.question;


        for (var i = 0; i < currentQ.choices.length; i++) {

            var liEl = document.createElement('li')
            liEl.textContent = currentQ.choices[i];
            olEl.appendChild(liEl);

            liEl.addEventListener('click', function () {

                var clickedChoice = this.textContent;
                var rightDisplay = document.createElement('p');

                if (clickedChoice === currentQ.answer) {
                    rightDisplay.textContent = 'correct'
                    questionCount++;
                    score++;
                    if (questionCount < qA.length) {
                        questionNumber();
                    } else {
                        timer = 0;
                    }

                    olEl.remove();
                    h2El.remove();
                } else {
                    rightDisplay.textContent = 'wrong'
                    timer = timer - 15;

                    questionCount++;
                    if (questionCount < qA.length) {
                        questionNumber();
                    } else {
                        timer = 0;
                    }
                    olEl.remove();
                    h2El.remove();

                }


            })

        }

    }

    if (questionCount < qA.length) {
        questionNumber();
    } else {
        timer = 0;
    }
}

function setTime() {
    // Sets interval in variable
    var timerInterval = setInterval(function () {
        timer--; // subtract one
        timerEl.textContent = timer;

        if (timer < 0) {
            timer = 0;
        }
        if (timer === 0) {
            // Stops execution of action at set interval
            clearInterval(timerInterval);
            endGame();
        }

    }, 1000);
}

function endGame() {
    // questionsEl.remove();
    questionsEl.textContent = '';
    timerEl.textContent = timer;
    console.log('GAME OVER')
    enterScore();

}


var initialsListEl = [];
var scoresListEl = [];


function enterScore() {
    var gameOverEl = document.createElement('h2')
    var initialsEl = document.createElement('input')
    var scoreEl = document.createElement('p')
    var saveButtonEl = document.createElement('button')

    gameOverEl.textContent = 'GAME OVER! Enter your initials to save your score!'
    scoreEl.textContent = "Your score: " + score;
    saveButtonEl.innerHTML = 'Save Score'

    enterScoreEl.appendChild(gameOverEl)
    enterScoreEl.appendChild(initialsEl)
    enterScoreEl.appendChild(scoreEl)
    enterScoreEl.appendChild(saveButtonEl)

    saveButtonEl.addEventListener('click', function (event) {
        event.preventDefault

        var scoreForm = {
            initials: initialsEl.value,
            score: score,
        }


        if (scoreForm.initials === '') {
            alert('Please enter initials.')
     
        } else {

            initialsListEl.push(scoreForm.initials);
            scoresListEl.push(scoreForm.score);

            var scoreList = {
                initials: initialsListEl,
                score: scoresListEl,
            }

            console.log(scoreForm)
            console.log(scoreList)
            localStorage.setItem('scoreForm', JSON.stringify(scoreForm));
            localStorage.setItem('scoreList', JSON.stringify(scoreList));

            var playAgainEl = document.createElement('button')
            saveButtonEl.remove()
            playAgainEl.innerHTML = 'Play Again'
            enterScoreEl.append(playAgainEl)
            playAgainEl.addEventListener('click', function (event) {
                event.preventDefault
                erasePage();
                enterScoreEl.textContent = '';


                init();
            })
        }


    })


}


function erasePage() {
    mainEl.childNodes.textContent = '';
}

// function to make score page on click event
function generateScorePage() {
    erasePage();

    var h2El = document.createElement('h2')
    var olEl = document.createElement('ol')
    var liEl = document.createElement('li')


}


// function to erase score page on click event

// function endGame() to
// tell user score
// allow user to add initials
// click event on submit
// stores score
// stores associated initals 
// without erasing previous

// init() at bottom to call start page



init();