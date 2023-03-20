// declare variables
var rootEl = document.querySelector('#root');
var titleEl = document.querySelector('#title-page');
var questionsEl = document.querySelector('#questions');
var enterScoreEl = document.querySelector('#enter-scores');
var scorePageEl = document.querySelector("#score-page");

var viewScoresEl = document.querySelector('.view-scores');
var timerEl = document.querySelector('.timer');
var mainEl = document.querySelector('main');

var score = 0;
var timer = 75;

// add text to nav bar elements
viewScoresEl.textContent = "View High Scores"

// checks if there are already score stored in local storage
if ((localStorage.getItem("scoreList") === null)) {
    var initialsListEl = [];
    var scoresListEl = [];
} else {
    var highScores = JSON.parse(localStorage.getItem("scoreList"));
    var initialsListEl = highScores.initials;
    var scoresListEl = highScores.score;
}

// function calls start page and sets timer
function init() {
    timer = 75;
    timerEl.textContent = timer;
    startPage();
}

// generates the start page
function startPage() {
    var h1El = document.createElement('h1');
    var pEl = document.createElement('p');
    var startButton = document.createElement('button');

    titleEl.appendChild(h1El);
    titleEl.appendChild(pEl);
    titleEl.appendChild(startButton);

    h1El.textContent = "Code Quiz";
    pEl.textContent = "Take this quiz to test your coding knowledge! You will have 75 seconds to complete the quiz. Any wrong answers deduct 15 second from your score. Each question is worth one point. Press the start button when you are ready!";
    startButton.innerText = 'Start';

    // add start button
    titleEl.insertBefore(startButton, null);

    startButton.addEventListener('click', questions);
    // FUTURE ME: add enter keyup eventlistener
    // document.addEventListener('keyup', function(event) {
    //     if (event.code === 'Enter') {
    //         event.preventDefault();
    //         questions();
    //     }
    // });

    viewScoresEl.addEventListener('click', generateScorePage);

}


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

// generates questions
function questions() {
    viewScoresEl.removeEventListener('click', generateScorePage);
    viewScoresEl.textContent = '';
    titleEl.textContent = '';
    setTime();

    var questionCount = 0;

    function questionNumber() {
        var currentQ = qA[questionCount];

        var h2El = document.createElement('h2');
        var olEl = document.createElement('ol');
        questionsEl.appendChild(h2El);
        questionsEl.appendChild(olEl);
        h2El.textContent = "Q" + (questionCount + 1) + ": " + currentQ.question;

        olEl.classList.add("list-group-numbered", "justify-content-start");

        for (var i = 0; i < currentQ.choices.length; i++) {

            var liEl = document.createElement('li');
            liEl.textContent = currentQ.choices[i];
            olEl.appendChild(liEl);

            liEl.classList.add("list-group-item", "list-group-item-info", "p-2", "m-1");
            liEl.addEventListener('click', function () {

                var clickedChoice = this.textContent;
                var rightDisplay = document.createElement('p');

                if (clickedChoice === currentQ.answer) {
                    rightDisplay.textContent = 'correct';
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

// starts times
function setTime() {
    // Sets interval in variable
    var timerInterval = setInterval(function () {
        timer--; // subtract one
        timerEl.textContent = timer;

        if (timer < 0) {
            timer = 0;
        }
        if (timer === 0) {
            // stops execution of action at set interval (calls end game)
            clearInterval(timerInterval);
            endGame();
        }

    }, 1000);
}

function endGame() {
    // questionsEl.remove();
    questionsEl.textContent = '';
    timerEl.textContent = timer;
    console.log('GAME OVER');
    enterScore();

}



function enterScore() {

    var gameOverEl = document.createElement('h2');
    var initialsEl = document.createElement('input');
    var scoreEl = document.createElement('p');
    var saveButtonEl = document.createElement('button');

    gameOverEl.textContent = 'GAME OVER! Enter your initials to save your score!';
    scoreEl.textContent = "Your score: " + score;
    saveButtonEl.innerHTML = 'Save Score';

    enterScoreEl.appendChild(gameOverEl);
    enterScoreEl.appendChild(initialsEl);
    enterScoreEl.appendChild(scoreEl);
    enterScoreEl.appendChild(saveButtonEl);



    saveButtonEl.addEventListener('click', function (event) {


        // initialsEl = initialsEl.toUpperCase();

        var scoreForm = {
            initials: initialsEl.value,
            score: score,
        }

        scoreForm.initials = scoreForm.initials.toUpperCase();

        console.log(scoreForm)
        var validate = scoreForm.initials.split('')
        if ((scoreForm.initials === '') || (validate.length !== 3)) {
            alert('Please enter initials (3 letters).');

        } else {
            score = 0;
            initialsListEl.unshift(scoreForm.initials);
            scoresListEl.unshift(scoreForm.score);

            var scoreList = {
                initials: initialsListEl,
                score: scoresListEl,
            }

            console.log(scoreForm);
            console.log(scoreList);
            localStorage.setItem('scoreForm', JSON.stringify(scoreForm));
            localStorage.setItem('scoreList', JSON.stringify(scoreList));

            viewScoresEl.addEventListener('click', generateScorePage);
            viewScoresEl.textContent = 'View High Scores'

            var playAgainEl = document.createElement('button')
            saveButtonEl.remove();
            playAgainEl.innerHTML = 'Play Again';
            enterScoreEl.append(playAgainEl);
            playAgainEl.addEventListener('click', function (event) {
                event.preventDefault;
                eraseMainPage();
                enterScoreEl.textContent = '';


                init();
            })
        }

    })

}




// function to make score page on click event
function generateScorePage() {
    titleEl.textContent = '';
    enterScoreEl.textContent = '';
    viewScoresEl.removeEventListener('click', generateScorePage);
    viewScoresEl.textContent = "Back to Start Page"
    viewScoresEl.addEventListener('click', eraseScorePage);

    var h2El = document.createElement('h2');
    var olEl = document.createElement('ol');
    var liEl = document.createElement('li');

    scorePageEl.appendChild(h2El);
    scorePageEl.appendChild(olEl);


    h2El.textContent = 'High Scores';


    var liEl = document.createElement('li')


    console.log(highScores)

    if (!initialsListEl[0]) {
        liEl.textContent = "No scores yet! Be the first!"
        olEl.appendChild(liEl);
    } else {

        for (i = 0; i < initialsListEl.length; i++) {
            var liEl = document.createElement('li')
            liEl.textContent = initialsListEl[i] + ': ' + scoresListEl[i];
            olEl.appendChild(liEl);
        }
    }

}

function eraseMainPage() {
    mainEl.childNodes.textContent = '';
}

// function to erase score page on click event
function eraseScorePage() {
    scorePageEl.textContent = '';
    viewScoresEl.removeEventListener('click', eraseScorePage);
    viewScoresEl.textContent = "View High Scores"
    viewScoresEl.addEventListener('click', generateScorePage);

    init();
    console.log("worked")
}

// init() at bottom to call start page
init();