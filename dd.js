(function () {
    function buildQuiz() {
        const output = [];

        myQuestions.forEach((currentQuestion, questionNumber) => {
            const answers = [];

            for (letter in currentQuestion.answers) {
                answers.push(
                    `<label>
                        <input type="radio" name="question${questionNumber}" value="${letter}"/>
                        ${letter} : ${currentQuestion.answers[letter]}
                    </label>`
                );
            }

            output.push(
                `<div class="slide">
                    <div class="question"> ${currentQuestion.question} </div>
                    <div class="answers"> ${answers.join("")} </div>
                </div>`
            );
        });

        quizContainer.innerHTML = output.join('');
    }

    function showResults() {
        const answerContainers = quizContainer.querySelectorAll('.answers');
        score = 0;

        myQuestions.forEach((currentQuestion, questionNumber) => {
            const answerContainer = answerContainers[questionNumber];
            const selector = `input[name=question${questionNumber}]:checked`;
            const userAnswer = (answerContainer.querySelector(selector) || {}).value;

            const labels = answerContainer.querySelectorAll("label");

            if (userAnswer === currentQuestion.correctAnswer) {
                score++;
                labels.forEach(label => {
                    const input = label.querySelector("input");
                    if (input.value === currentQuestion.correctAnswer) {
                        label.style.color = 'lightgreen';
                    }
                });
            } else {
                labels.forEach(label => {
                    const input = label.querySelector("input");
                    if (input.value === userAnswer) {
                        label.style.color = 'red';
                    } else if (input.value === currentQuestion.correctAnswer) {
                        label.style.color = 'lightgreen';
                    }
                });
            }
        });

        resultsContainer.innerHTML = `${score} out of ${myQuestions.length}`;
    }

    function showSlide(n) {
        slides[currentSlide].classList.remove('active-slide');
        slides[n].classList.add('active-slide');
        currentSlide = n;

        previousButton.style.display = currentSlide === 0 ? 'none' : 'inline-block';
        nextButton.style.display = currentSlide === slides.length - 1 ? 'none' : 'inline-block';
        submitButton.style.display = currentSlide === slides.length - 1 ? 'inline-block' : 'none';
    }

    function showNextSlide() {
        showSlide(currentSlide + 1);
    }

    function showPreviousSlide() {
        showSlide(currentSlide - 1);
    }

    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const submitButton = document.getElementById('submit');

    const myQuestions = [
        {
            question: "Who invented JavaScript?",
            answers: {
                a: "Douglas Crockford",
                b: "Sheryl Sandberg",
                c: "Brendan Eich",
                d: "Tim Berners-Lee"
            },
            correctAnswer: "c"
        },
        {
            question: "Which one of these is a JavaScript package manager?",
            answers: {
                a: "Node.js",
                b: "TypeScript",
                c: "npm",
                d: "Python"
            },
            correctAnswer: "c"
        },
        {
            question: "Which tool can you use to ensure code quality?",
            answers: {
                a: "Angular",
                b: "jQuery",
                c: "RequireJS",
                d: "ESLint"
            },
            correctAnswer: "d"
        },
        {
            question: "q3",
            answers: {
                a: "1",
                b: "2",
                c: "3",
                d: "4"
            },
            correctAnswer: "b"
        },
        {
            question: "q4",
            answers: {
                a: "1",
                b: "2",
                c: "3",
                d: "4"
            },
            correctAnswer: "b"
        }
    ];

    let score = 0;

    buildQuiz();

    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;

    showSlide(currentSlide);

    submitButton.addEventListener('click', showResults);
    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide);
})();