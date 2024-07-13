let correctAnswers = 0;
let incorrectAnswers = 0;
const totalQuestions = 5;

const messages = [
    { correct: "You try to get up!", incorrect: "The crab spots you!" },
    { correct: "You are crawling!", incorrect: "The crab steps towards you!" },
    { correct: "You shake in fear but continue crawling!", incorrect: "The crab is getting closer!" },
    { correct: "You got up!", incorrect: "The crab is on your tail!" },
];

let currentQuestion = 0;

function generateMathProblem() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operators = ['+', '-', '*', '/'];
    const operator = operators[Math.floor(Math.random() * operators.length)];
    let problem, answer;

    switch (operator) {
        case '+':
            problem = `${num1} + ${num2}`;
            answer = num1 + num2;
            break;
        case '-':
            problem = `${num1} - ${num2}`;
            answer = num1 - num2;
            break;
        case '*':
            problem = `${num1} * ${num2}`;
            answer = num1 * num2;
            break;
        case '/':
            problem = `${num1 * num2} / ${num2}`;
            answer = num1;
            break;
    }

    return { problem, answer };
}

function setNewProblem() {
    currentProblem = generateMathProblem();
    document.getElementById('math-problem').innerText = currentProblem.problem + ' ?';
    document.getElementById('answer').value = '';
    document.getElementById('submit').disabled = true;
}

let currentProblem = generateMathProblem();
document.getElementById('math-problem').innerText = currentProblem.problem + '= ?';

document.getElementById('answer').addEventListener('input', function () {
    const button = document.getElementById('submit');
    button.disabled = !this.value.trim();
});

document.getElementById('submit').addEventListener('click', () => {
    const userAnswer = parseInt(document.getElementById('answer').value);
    const messageElement = document.getElementById('message');

    if (userAnswer === currentProblem.answer) {
        correctAnswers++;
        messageElement.innerText = messages[currentQuestion].correct;
    } else {
        incorrectAnswers++;
        messageElement.innerText = messages[currentQuestion].incorrect;
    }

    currentQuestion++;

    if (currentQuestion < totalQuestions) {
        setNewProblem();
    } else {
        displayFinalResult();
    }
});

function displayFinalResult() {
    const messageElement = document.getElementById('message');

    if (correctAnswers >= 3) {
        messageElement.innerText = "You escaped!";
    } else {
        messageElement.innerText = "The Crab bit you and there is no one to help you!";
    }

    setTimeout(resetGame, 3000); 
}

function resetGame() {
    correctAnswers = 0;
    incorrectAnswers = 0;
    currentQuestion = 0;
    setNewProblem();
    document.getElementById('answer').value = '';
    document.getElementById('message').innerText = '';
    document.getElementById('crab-status').innerText = '';
    document.getElementById('submit').disabled = true;
}
