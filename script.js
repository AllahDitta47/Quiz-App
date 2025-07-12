
      const quizData = [
        {
          question: "What does HTML stand for?",
          options: [
            "Hyper Text Markup Language",
            "High Text Markup Language",
            "Hyper Tabular Markup Language",
            "None of these",
          ],
          answer: "Hyper Text Markup Language",
        },
        {
          question: "Which CSS property controls text size?",
          options: ["font-style", "text-size", "font-size", "text-transform"],
          answer: "font-size",
        },
        {
          question:
            "What is the correct syntax for a JavaScript arrow function?",
          options: [
            "function() => {}",
            "() => {}",
            "=> () {}",
            "function => {}",
          ],
          answer: "() => {}",
        },
      ];

      let currentQuestionIndex = 0;
      let score = 0;

      const questionElement = document.getElementById("question");
      const optionsElement = document.getElementById("options");
      const feedbackElement = document.getElementById("feedback");
      const scoreElement = document.getElementById("score");
      const nextButton = document.getElementById("next-btn");

      function loadQuestion() {
        const currentQuestion = quizData[currentQuestionIndex];
        questionElement.textContent = currentQuestion.question;
        optionsElement.innerHTML = "";

        currentQuestion.options.forEach((option) => {
          const button = document.createElement("button");
          button.textContent = option;
          button.addEventListener("click", () => selectOption(option));
          optionsElement.appendChild(button);
        });

        feedbackElement.textContent = "";
        nextButton.disabled = true;
      }

      function selectOption(selectedOption) {
        const currentQuestion = quizData[currentQuestionIndex];
        const isCorrect = selectedOption === currentQuestion.answer;

        if (isCorrect) {
          score++;
          scoreElement.textContent = score;
          feedbackElement.textContent = "Correct!";
          feedbackElement.style.color = "green";
        } else {
          feedbackElement.textContent = `Wrong! The correct answer is "${currentQuestion.answer}".`;
          feedbackElement.style.color = "red";
        }

        Array.from(optionsElement.children).forEach((button) => {
          button.disabled = true;
          if (button.textContent === currentQuestion.answer) {
            button.style.backgroundColor = "#28a745";
          } else if (button.textContent === selectedOption && !isCorrect) {
            button.style.backgroundColor = "#dc3545";
          }
        });

        nextButton.disabled = false;
      }

      nextButton.addEventListener("click", () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
          loadQuestion();
        } else {
          questionElement.textContent = "Quiz Completed!";
          optionsElement.innerHTML = "";
          feedbackElement.textContent = `Final Score: ${score} out of ${quizData.length}`;
          nextButton.style.display = "none";
        }
      });

      loadQuestion();
  