const form = document.getElementById('user-form');
const resultsSection = document.getElementById('results');
const exerciseList = document.getElementById('exercise-list');
const progressText = document.getElementById('progress-text');
const progressFill = document.getElementById('progress-fill');

let exercises = [];
let completedExercises = 0;

// Exercise database with goal-based exercises
const exerciseDatabase = {
  weight_loss: [
    { name: 'Running', completed: false },
    { name: 'Cycling', completed: false },
    { name: 'Jumping Jacks', completed: false },
    { name: 'High Knees', completed: false },
    { name: 'Burpees', completed: false }
  ],
  muscle_gain: [
    { name: 'Squats', completed: false },
    { name: 'Deadlifts', completed: false },
    { name: 'Push-ups', completed: false },
    { name: 'Bench Press', completed: false },
    { name: 'Bicep Curls', completed: false }
  ],
  general_fitness: [
    { name: 'Yoga', completed: false },
    { name: 'Pilates', completed: false },
    { name: 'Swimming', completed: false },
    { name: 'Walking', completed: false },
    { name: 'Bodyweight Squats', completed: false }
  ]
};

// Fetch exercises based on the user's selected goal
function fetchExercises(goal) {
  return exerciseDatabase[goal] || [];
}

// Update the progress tracker bar
function updateProgress() {
  const total = exercises.length;
  progressText.textContent = `Progress: ${completedExercises}/${total}`;
  const progressPercentage = (completedExercises / total) * 100;
  progressFill.style.width = `${progressPercentage}%`;
}

// Render the list of exercises dynamically
function renderExercises(exercises) {
  exerciseList.innerHTML = '';
  exercises.forEach((exercise, index) => {
    const card = document.createElement('div');
    card.classList.add('exercise-card');
    card.innerHTML = `
      <h3>${exercise.name}</h3>
      <button class="complete-btn" data-index="${index}">Mark as Done</button>
    `;
    exerciseList.appendChild(card);
  });
  resultsSection.classList.remove('hidden');
}

// Display a completion message when all exercises are done
function showCompletionMessage() {
  if (completedExercises === exercises.length) {
    const message = document.createElement('div');
    message.classList.add('congratulations-message');
    message.innerHTML = `
      <h2>Congratulations!</h2>
      <p>You've completed all the exercises. Well done!</p>
    `;
    resultsSection.appendChild(message);
  }
}

// Event listener for form submission
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const goal = document.getElementById('goal').value;
  exercises = fetchExercises(goal);
  completedExercises = 0;
  renderExercises(exercises);
  updateProgress();
});

// Event listener for marking exercises as complete
exerciseList.addEventListener('click', (e) => {
  if (e.target.classList.contains('complete-btn')) {
    const index = e.target.dataset.index;
    if (!exercises[index].completed) {
      exercises[index].completed = true;
      completedExercises++;
      updateProgress();
      showCompletionMessage();
    }
  }
});
