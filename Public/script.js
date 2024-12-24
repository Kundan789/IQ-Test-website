document.getElementById('start-btn').addEventListener('click', startTest);

function startTest() {
  const questionContainer = document.getElementById('question-container');
  const resultContainer = document.getElementById('result-container');
  const userIqElement = document.getElementById('user-iq');
  const comparisonMessage = document.getElementById('comparison-message');

  // Simulate user IQ calculation
  const userIQ = Math.floor(Math.random() * 50) + 100; // Random IQ between 100-150
  userIqElement.textContent = userIQ;

  // Fetch high IQ data and compare
  fetch('/api/compare')
    .then(response => response.json())
    .then(data => {
      let message = '';
      data.forEach(person => {
        const diff = person.iq - userIQ;
        message += `You're ${Math.abs(diff)} points ${diff > 0 ? 'below' : 'above'} ${person.name} (IQ: ${person.iq}).<br>`;
      });
      comparisonMessage.innerHTML = message;
    });

  // Show results
  questionContainer.classList.add('hidden');
  resultContainer.classList.remove('hidden');
}
