// Function to create a quiz and save it to local storage
function createQuiz() {
    const question = document.getElementById('question').value;
    const options = [
        document.getElementById('option1').value,
        document.getElementById('option2').value,
        document.getElementById('option3').value,
        document.getElementById('option4').value
    ];
    const correctOption = document.getElementById('correct-option').value;

    if (!question || options.some(opt => !opt) || !correctOption) {
        alert('Please fill in all fields.');
        return;
    }

    const quiz = {
        question,
        options,
        correctOption: parseInt(correctOption) - 1
    };

    let quizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
    quizzes.push(quiz);
    localStorage.setItem('quizzes', JSON.stringify(quizzes));
    alert('Quiz created successfully!');

    // Clear form fields
    document.getElementById('question').value = '';
    document.getElementById('option1').value = '';
    document.getElementById('option2').value = '';
    document.getElementById('option3').value = '';
    document.getElementById('option4').value = '';
    document.getElementById('correct-option').value = '';

    loadQuizzes();
}

// Function to load quizzes and display them
function loadQuizzes() {
    const quizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
    const quizzesContainer = document.getElementById('quizzes');
    quizzesContainer.innerHTML = '';

    quizzes.forEach((quiz, index) => {
        const quizElement = document.createElement('div');
        quizElement.className = 'quiz-item';
        quizElement.textContent = `Quiz ${index + 1}: ${quiz.question}`;
        quizElement.onclick = () => startQuiz(index);
        quizzesContainer.appendChild(quizElement);
    });
}

// Function to start a quiz
function startQuiz(index) {
    const quizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
    const quiz = quizzes[index];

    document.getElementById('quiz-creation').style.display = 'none';
    document.getElementById('quiz-list').style.display = 'none';
    document.getElementById('quiz-taking').style.display = 'block';
    
    const quizQuestions = document.getElementById('quiz-questions');
    quizQuestions.innerHTML = `<h3>${quiz.question}</h3>`;
    
    quiz.options.forEach((option, i) => {
        quizQuestions.innerHTML += `
            <div>
                <input type="radio" name="answer" value="${i}"> ${option}
            </div>
        `;
    });
}

// Function to submit the quiz and show results
function submitQuiz() {
    const quizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    
    if (!selectedOption) {
        alert('Please select an answer.');
        return;
    }

    const selectedIndex = parseInt(selectedOption.value);
    const currentQuizIndex = quizzes.findIndex(q => q.question === document.getElementById('quiz-questions').querySelector('h3').innerText);

    if (currentQuizIndex === -1) {
        alert('Quiz not found.');
        return;
    }

    const quiz = quizzes[currentQuizIndex];
    const result = selectedIndex === quiz.correctOption ? 'Correct!' : 'Incorrect!';

    document.getElementById('quiz-taking').style.display = 'none';
    document.getElementById('quiz-results').style.display = 'block';
    
    document.getElementById('results').innerHTML = `
        <p>${result}</p>
        <p>The correct answer was: ${quiz.options[quiz.correctOption]}</p>
    `;
}

// Function to go back to the quiz list
function goBack() {
    document.getElementById('quiz-results').style.display = 'none';
    document.getElementById('quiz-creation').style.display = 'none';
    document.getElementById('quiz-list').style.display = 'block';
    document.getElementById('quiz-taking').style.display = 'none';
}

// Load quizzes when the page loads
window.onload = loadQuizzes;
