const sentences = [
  "The quick brown fox jumps over the lazy dog.",
  "Sphinx of black quartz, judge my vow.",
  "Pack my box with five dozen liquor jugs.",
  "How vexingly quick daft zebras jump!",
];

let currentSentenceIndex = 0;
let startTime, endTime;
let timerInterval;

const sentenceElement = document.getElementById("sentence");
const inputElement = document.getElementById("input");
const startButton = document.getElementById("start-btn");
const timerElement = document.getElementById("timer");
const speedElement = document.getElementById("speed");
const accuracyElement = document.getElementById("accuracy");
const resultElement = document.getElementById("result");
const retryButton = document.getElementById("retry-btn");

// Ensure the DOM is fully loaded before running the script
document.addEventListener("DOMContentLoaded", () => {
  startButton.addEventListener("click", startTest);
  retryButton.addEventListener("click", resetTest);
});

function startTest() {
  // Display the sentence
  currentSentenceIndex = Math.floor(Math.random() * sentences.length);
  sentenceElement.innerHTML = sentences[currentSentenceIndex];
  // Enable the input field
  inputElement.disabled = false;
  inputElement.value = "";
  inputElement.focus();
  // Disable the start button
  startButton.disabled = true;
  // Initialize the timer
  startTime = new Date();
  timerInterval = setInterval(updateTimer, 1000);
  setTimeout(endTest, 30000); // End the test after 30 seconds
}

function updateTimer() {
  const currentTime = new Date();
  const elapsedTime = Math.floor((currentTime - startTime) / 1000);
  const remainingTime = 30 - elapsedTime;
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;
  timerElement.textContent = `00:${seconds.toString().padStart(2, "0")}`;
}

function endTest() {
  clearInterval(timerInterval);
  endTime = new Date();
  const typedSentence = inputElement.value.trim();
  const correctSentence = sentences[currentSentenceIndex].trim();

  // Calculate speed
  const typedWords = typedSentence ? typedSentence.split(" ") : [];
  const correctWords = correctSentence.split(" ");
  const correctCount = typedWords.reduce(
    (count, word, index) => count + (word === correctWords[index] ? 1 : 0),
    0
  );
  const speed = Math.floor((correctCount / 30) * 60);
  const accuracy = typedSentence
    ? (correctCount / correctWords.length) * 100
    : 0;

  // Display results
  speedElement.textContent = speed;
  accuracyElement.textContent = accuracy.toFixed(2);
  resultElement.style.display = "block";
  retryButton.focus();
}

function resetTest() {
  // Hide the result display
  resultElement.style.display = "none";
  // Enable the start button
  startButton.disabled = false;
  // Clear input and timer
  inputElement.value = "";
  timerElement.textContent = "00:30";
  // Disable the input field
  inputElement.disabled = true;
}
