document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-btn");
  const questionContainer = document.getElementById("question-container");
  const resultContainer = document.getElementById("result-container");
  const questionElement = document.getElementById("question");
  const optionsContainer = document.getElementById("options");
  const userIqElement = document.getElementById("user-iq");
  const comparisonMessage = document.getElementById("comparison-message");
  const chartCanvas = document.getElementById("chart");

  let currentQuestion = 0;
  let score = 0;
  let questions = [];

  function loadQuestions() {
    fetch("/api/questions")
      .then((response) => response.json())
      .then((data) => {
        questions = data;
        startQuiz();
      })
      .catch((err) => {
        console.error("Failed to load questions", err);
      });
  }

  function startQuiz() {
    startBtn.style.display = "none";
    questionContainer.classList.remove("hidden");
    loadQuestion();
  }

  function loadQuestion() {
    if (currentQuestion < questions.length) {
      const q = questions[currentQuestion];
      questionElement.innerText = q.question;
      optionsContainer.innerHTML = ""; // Clear old options
      q.options.forEach((option, index) => {
        const btn = document.createElement("button");
        btn.classList.add("btn");
        btn.innerText = option;
        btn.onclick = () => checkAnswer(index);
        optionsContainer.appendChild(btn);
      });
    } else {
      showResult();
    }
  }

  function checkAnswer(selectedIndex) {
    if (selectedIndex === questions[currentQuestion].answer) {
      score++;
    }
    currentQuestion++;
    loadQuestion();
  }

  function showResult() {
    questionContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");
    const iqScore = score * 20; // Example calculation
    userIqElement.innerText = iqScore;
    displayComparison(iqScore);
    displayChart(iqScore);
  }

  function displayComparison(iq) {
    fetch("/api/compare")
      .then((response) => response.json())
      .then((data) => {
        const genius = data.find((g) => iq < g.iq) || data[data.length - 1];
        comparisonMessage.innerText = `Your IQ is comparable to ${genius.name} with an IQ of ${genius.iq}.`;
      });
  }

  function displayChart(userIq) {
    const ctx = chartCanvas.getContext("2d");
    const chartData = {
      labels: ["Your IQ", "Albert Einstein", "Nikola Tesla", "Marilyn vos Savant"],
      datasets: [
        {
          label: "IQ Comparison",
          data: [userIq, 160, 180, 228],
          backgroundColor: ["#007BFF", "#6c757d", "#ffc107", "#28a745"],
        },
      ],
    };
    new Chart(ctx, {
      type: "bar",
      data: chartData,
    });
  }

  startBtn.addEventListener("click", loadQuestions);
});
