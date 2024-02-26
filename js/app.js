// Object containing questions, their correct answers, and answer choices
const questions = {
    1: {
        question: "WHAT IS THE PURPOSE OF A CSS RESET STYLESHEET?",
        correctAnswer: "B. To reset default browser styles",
        answers: [
            "A. To clear browser caches",
            "B. To reset default browser styles",
            "C. To remove all CSS from a page",
            "D. To optimize CSS loading times"
        ]
    },
    2: {
        question: "WHAT DOES THE TERM 'RESPONSIVE DESIGN' REFER TO IN WEB DEVELOPMENT?",
        correctAnswer: "B. Designing websites that can adapt to different screen sizes",
        answers: [
            "A. Designing websites that are socially conscious",
            "B. Designing websites that can adapt to different screen sizes",
            "C. Designing websites that load quickly",
            "D. Designing websites that are easy to navigate"
        ]
    },
    3: {
        question: "What is the purpose of the 'box-sizing' property in CSS?",
        correctAnswer: "C. To determine how padding and border sizes are calculated",
        answers: [
            "A. To specify the size of the HTML box model",
            "B. To control the appearance of borders",
            "C. To determine how padding and border sizes are calculated",
            "D. To define the shape of elements"
        ]
    },
    4: {
        question: "What is the purpose of the alt attribute in an HTML <img> tag?",
        correctAnswer: "B. To provide alternative text for screen readers",
        answers: [
            "A. To specify the alignment of the image",
            "B. To provide alternative text for screen readers",
            "C. To define the size of the image",
            "D. To set the image source URL"
        ]
    },
    5: {
        question: "What is the purpose of the 'float' property in CSS?",
        correctAnswer: "D. To make elements float within their container",
        answers: [
            "A. To make text float above images",
            "B. To create floating navigation menus",
            "C. To specify how an element should be positioned",
            "D. To make elements float within their container"
        ]
    }
};

// Play Trivia Audio :D MSCA JAMS ( generated using AI for Bob )
window.addEventListener('DOMContentLoaded', function() {
    var audio = document.getElementById("sound");
    audio.play();
});

// Function to format time in hours, minutes, and seconds
function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return (
        String(hours).padStart(2, "0") +
        ":" +
        String(minutes).padStart(2, "0") +
        ":" +
        String(remainingSeconds).padStart(2, "0")
    );
}

// Function to update elapsed time every second
function updateElapsedTime() {
    elapsedTime++;
    document.getElementById("elapsedTime").textContent = formatTime(elapsedTime);
}

// Variable to store elapsed time
let elapsedTime = 0;
setInterval(updateElapsedTime, 1000);

// Selecting DOM elements
const answerButtons = document.querySelectorAll(".answer");
const nextButton = document.querySelector(".next");
const questionText = document.querySelector("#question");
const scoreId = document.querySelector("#trackScore");
const endButton = document.querySelector(".end");
const modal = document.getElementById("modal");
const modalMessage = document.getElementById("modal-message");
const closeModal = document.getElementsByClassName("close")[0];

// Function to display modal with a message
function showModal(message) {
    modal.style.display = "block";
    modalMessage.textContent = message;
}

// Function to hide modal
function hideModal() {
    modal.style.display = "none";
}

// Initialization function (- Question #1 -> Score Default at Zero)
function init() {
    let flag = 0; // Flag to prevent multiple clicks on answer buttons
    let questionNumber = 1; // Initialize question number
    let score = 0; // Initialize score

    // Displaying the first question
    questionText.textContent = questions[questionNumber].question;

    // Answer choices for the first question
    for (let i = 0; i < answerButtons.length; i++) {
        answerButtons[i].textContent = questions[questionNumber].answers[i];
    }

    for (answerButton of answerButtons) {
        answerButton.addEventListener("click", (event) => {
            if (flag != 1) {
                flag = 1;

                // Checking if the selected answer is correct
                if (event.target.textContent === questions[questionNumber].correctAnswer) {
                    showModal("Correct Answer! Herb and Lorraine taught you well. To close this box, please click anywhere to continue this quiz.");
                    // If answer is correct, Score++
                    score++;
                    scoreId.textContent = score;
                } else {
                    showModal("Oops! That's not the correct answer. Click Anywhere to close this box");
                }

                // Correct and Incorrect Answers
                for (checkButton of answerButtons) {
                    if (checkButton.textContent === questions[questionNumber].correctAnswer) {
                        checkButton.classList.add("correctAnswer");
                    } else {
                        checkButton.classList.add("incorrectAnswer");
                    }
                }

                // Showing next button if there are more questions, otherwise showing end button
                if (questionNumber < Object.keys(questions).length) {
                    nextButton.classList.add("visible");
                } else {
                    endButton.classList.add("visible");
                }
            }
        });
    }

    // Adding click event listener to next button
    nextButton.addEventListener("click", () => {
        questionNumber++;
        flag = 0;

        // Displaying the next question
        questionText.textContent = questions[questionNumber].question;

        // Removing highlight classes from answer buttons
        for (let i = 0; i < answerButtons.length; i++) {
            answerButtons[i].classList.remove("correctAnswer");
            answerButtons[i].classList.remove("incorrectAnswer");
        }

        // Displaying answer choices for the next question
        for (let i = 0; i < answerButtons.length; i++) {
            answerButtons[i].textContent = questions[questionNumber].answers[i];
        }

        // Hiding the next button
        nextButton.classList.remove("visible");
    });

    // Adding click event listener to end button
    endButton.addEventListener("click", () => {
        location.replace("./index.html");
    });

    // Adding click event listener to close modal button
    closeModal.onclick = () => {
        hideModal();
    }

    // Adding click event listener to hide modal when clicking outside of it
    window.onclick = (event) => {
        if (event.target == modal) {
            hideModal();
        }
    }
}

// Initializing the quiz
init();