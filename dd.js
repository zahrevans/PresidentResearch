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
            question: "What political party was jackson a part of?",
            answers: {
                a: "Green",
                b: "Democrat",
                c: "Republican",
                d: "Whig"
            },
            correctAnswer: "b"
        },
        {
            question: "What year was Andrew Jackson Born?",
            answers: {
                a: "1767",
                b: "1766",
                c: "1768",
                d: "1804"
            },
            correctAnswer: "a"
        },
        {
            question: "Where was Andrew Jackson Born?",
            answers: {
                a: "Marlboro",
                b: "Los Angelas",
                c: "Hawaii",
                d: "Waxhaws"
            },
            correctAnswer: "d"
        },
        {
            question: "What number president was Jackson?",
            answers: {
                a: "5",
                b: "6",
                c: "7",
                d: "8"
            },
            correctAnswer: "c"
        },
        {
            question: "How many terms did Jackson serve?",
            answers: {
                a: "0, he was never a president",
                b: "1",
                c: "2",
                d: "4"
            },
            correctAnswer: "c"
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