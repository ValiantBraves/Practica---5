var currentAnswer = {
    'one': '',
    'two': '',
    'three': ''
};

var itemList = document.querySelectorAll('.choice-grid div');
for (const item of itemList) {
    item.addEventListener('click', changeToChecked);
}

function changeToChecked(event) {
    const item = event.currentTarget;
    const image = item.querySelector('.checkbox');
    image.src = 'images/checked.png';
    item.style.backgroundColor = '#cfe3ff';
    item.style.opacity = '1';

    const questionPicked = item.dataset.questionId;
    changeOpacity(questionPicked, item);
    currentAnswer[questionPicked] = item.dataset.choiceId;

    // Check if all questions have been answered
    lockToAnswer();
}

function changeOpacity(question, itemNoChange) {
    const index = "[data-question-id='" + question + "']";
    const Items = document.querySelectorAll(index);
    for (let item of Items) {
        if (!(item === itemNoChange)) {
            item.style.opacity = '0.6'; // Set opacity for unselected items
        }
    }
}

function lockToAnswer() {
    if (currentAnswer['one'] && currentAnswer['two'] && currentAnswer['three']) {
        for (let item of itemList) {
            item.removeEventListener('click', changeToChecked);
        }
        displayResult();
    }
}

function displayResult() {
    let output = document.querySelector('.result');
    let outputTitle = document.querySelector('.result #result-title');
    let outputContent = document.querySelector('.result #result-contents');
    
    // Scoring logic here
    const resultKey = determineResult(); // Implement this function
    outputTitle.innerHTML = "You got: " + RESULTS_MAP[resultKey]['title'];
    outputContent.innerHTML = RESULTS_MAP[resultKey]['contents'];
    
    output.style.display = 'block';
    const restartBtn = document.querySelector('#restart-quiz');
    restartBtn.addEventListener('click', refreshWeb);
}

function determineResult() {
    // Implement scoring logic based on currentAnswer
    const score = {};
    for (const key in currentAnswer) {
        const choiceId = currentAnswer[key];
        if (!score[choiceId]) {
            score[choiceId] = 0;
        }
        score[choiceId]++;
    }

    // Find the max scored choice
    let maxScore = 0;
    let resultKey = '';
    for (const choice in score) {
        if (score[choice] > maxScore) {
            maxScore = score[choice];
            resultKey = choice;
        } else if (score[choice] === maxScore) {
            resultKey = currentAnswer['one']; // Tie-breaker
        }
    }
    
    return resultKey;
}

function refreshWeb() {
    currentAnswer = { 'one': '', 'two': '', 'three': '' }; // Reset answers
    itemList.forEach(item => {
        const image = item.querySelector('.checkbox');
        image.src = 'images/unchecked.png'; // Reset checkbox
        item.style.backgroundColor = '#f4f4f4'; // Reset background
        item.style.opacity = '1'; // Reset opacity
    });
    
    const output = document.querySelector('.result');
    output.style.display = 'none'; // Hide results
    document.querySelector('.question-name').scrollIntoView(); // Scroll to top
}
