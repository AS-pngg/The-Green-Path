document.addEventListener('DOMContentLoaded', () => {
  const scoreDisplay = document.getElementById('score');
  const timerDisplay = document.getElementById('timer');
  const gameArea = document.getElementById('game-area');
  const bins = document.querySelectorAll('.bin');
  const startScreen = document.getElementById('start-screen');
  const gameOverScreen = document.getElementById('game-over-screen');
  const startButton = document.getElementById('start-button');
  const restartButton = document.getElementById('restart-button');
  const finalScoreDisplay = document.getElementById('final-score');

  const trashData = [
    { name: 'Apple Core', type: 'organic', color: '#FFC107' },
    { name: 'Banana Peel', type: 'organic', color: '#FFEB3B' },
    { name: 'Plastic Bottle', type: 'plastic', color: '#2196F3' },
    { name: 'Plastic Bag', type: 'plastic', color: '#03A9F4' },
    { name: 'Soda Can', type: 'metal', color: '#BDBDBD' },
    { name: 'Tin Foil', type: 'metal', color: '#E0E0E0' },
    { name: 'Old Phone', type: 'ewaste', color: '#424242' },
    { name: 'Battery', type: 'ewaste', color: '#616161' }
  ];

  let score = 0;
  let timeLeft = 60;
  let spawnInterval;
  let gameLoopInterval;
  let spawnSpeed = 1500;
  let fallingItems = [];

  function startGame() {
    score = 0;
    timeLeft = 60;
    spawnSpeed = 1500;
    scoreDisplay.textContent = score;
    timerDisplay.textContent = timeLeft;
    startScreen.style.display = 'none';
    gameOverScreen.style.display = 'none';
    gameArea.innerHTML = '';
    fallingItems = [];

    // Spawn new trash items periodically
    spawnInterval = setInterval(spawnTrash, spawnSpeed);

    // Game loop for moving items
    gameLoopInterval = setInterval(moveItems, 20);

    // Timer
    setInterval(() => {
      timeLeft--;
      timerDisplay.textContent = timeLeft;
      if (timeLeft <= 0) endGame();
    }, 1000);
  }

  function spawnTrash() {
    const randomTrash = trashData[Math.floor(Math.random() * trashData.length)];
    const trash = document.createElement('div');
    trash.classList.add('trash-item');
    trash.dataset.type = randomTrash.type;
    trash.textContent = randomTrash.name;
    trash.style.backgroundColor = randomTrash.color;
    trash.style.left = `${Math.random() * (gameArea.clientWidth - 80)}px`;
    trash.style.top = `0px`;
    trash.setAttribute('draggable', 'true');

    gameArea.appendChild(trash);
    fallingItems.push(trash);

    // Drag events
    trash.addEventListener('dragstart', () => {
      trash.classList.add('dragging');
    });
    trash.addEventListener('dragend', () => {
      trash.classList.remove('dragging');
    });
  }

  function moveItems() {
    for (let i = fallingItems.length - 1; i >= 0; i--) {
      const item = fallingItems[i];
      let top = parseFloat(item.style.top);
      top += 2; // falling speed
      item.style.top = top + 'px';

      if (top + item.offsetHeight >= gameArea.clientHeight) {
        // Missed item
        updateScore(-5);
        item.remove();
        fallingItems.splice(i, 1);
      }
    }
  }

  function updateScore(points) {
    score += points;
    if (score < 0) score = 0;
    scoreDisplay.textContent = score;

    // Increase difficulty
    if (score > 0 && score % 50 === 0) {
      clearInterval(spawnInterval);
      spawnSpeed = Math.max(500, spawnSpeed * 0.9);
      spawnInterval = setInterval(spawnTrash, spawnSpeed);
    }
  }


   function endGame() {
    clearInterval(gameInterval); // Stop trash spawning
    clearInterval(timerInterval); // Stop timer
    
    finalScoreDisplay.textContent = score;
    gameOverScreen.style.display = 'flex';
    
    // Clear remaining trash items
    gameArea.querySelectorAll('.trash-item').forEach(item => item.remove());
}


  // Drag & drop bins
  bins.forEach(bin => {
    bin.addEventListener('dragover', (e) => e.preventDefault());
    bin.addEventListener('dragenter', (e) => {
      e.preventDefault();
      bin.classList.add('drag-over');
    });
    bin.addEventListener('dragleave', () => bin.classList.remove('drag-over'));
    bin.addEventListener('drop', (e) => {
      e.preventDefault();
      bin.classList.remove('drag-over');
      const draggedItem = document.querySelector('.trash-item.dragging');
      if (!draggedItem) return;
      const trashType = draggedItem.dataset.type;
      const binType = bin.dataset.binType;
      if (trashType === binType) updateScore(10);
      else updateScore(-5);
      draggedItem.remove();
      fallingItems = fallingItems.filter(item => item !== draggedItem);
    });
  });

  startButton.addEventListener('click', startGame);
  restartButton.addEventListener('click', startGame);
});
