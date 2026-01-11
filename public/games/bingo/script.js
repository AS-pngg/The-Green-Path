const BINGO_ITEMS = [
    { id: "tree", label: "Tree", emoji: "🌳" },
    { id: "fish", label: "Fish", emoji: "🐟" },
    { id: "water", label: "Water", emoji: "💧" },
    { id: "trash", label: "Trash Bin", emoji: "🗑" },
    { id: "sun", label: "Sun", emoji: "🌞" },
    { id: "bike", label: "Bicycle", emoji: "🚲" },
    { id: "apple", label: "Healthy Food", emoji: "🍎" },
    { id: "box", label: "Cardboard Box", emoji: "📦" },
    { id: "plug", label: "Electric Plug", emoji: "🔌" },
    { id: "plant", label: "Plant", emoji: "🌱" },
    { id: "recycle", label: "Recycling", emoji: "♻" },
    { id: "battery", label: "Battery", emoji: "🔋" },
    { id: "bee", label: "Bee", emoji: "🐝" },
    { id: "factory", label: "Factory Smoke", emoji: "🏭" },
    { id: "ocean", label: "Ocean", emoji: "🌊" },
    { id: "forest", label: "Forest", emoji: "🏞" },
];

const QUESTIONS = [
    { text: "Find the thing that gives us fresh air 🍃", answerId: "tree" },
    { text: "Find the thing that lives in water 🐟", answerId: "fish" },
    { text: "Find the thing that is healthy food 🍎", answerId: "apple" },
    { text: "Find the thing that can be recycled ♻", answerId: "box" },
    { text: "Find the thing that saves electricity ⚡", answerId: "plug" },
    { text: "Find the thing that helps reduce pollution 🚲", answerId: "bike" },
    { text: "Find the thing that produces energy 🌞", answerId: "sun" },
    { text: "Find the thing that pollutes air 🏭", answerId: "factory" },
    { text: "Find the thing that helps biodiversity 🐝", answerId: "bee" },
    { text: "Find the thing that is essential for plants 💧", answerId: "water" },
    { text: "Find the thing that provides habitat 🏞", answerId: "forest" },
    { text: "Find the thing that grows 🌱", answerId: "plant" },
    { text: "Find the thing that stores energy 🔋", answerId: "battery" },
    { text: "Find the thing that cleans waste 🗑", answerId: "trash" },
    { text: "Find the thing that protects oceans 🌊", answerId: "ocean" },
    { text: "Find the thing that helps recycle ♻", answerId: "recycle" },
];

// DOM elements
const scoreElement = document.getElementById('score');
const badgesElement = document.getElementById('badges');
const questionTextElement = document.getElementById('question-text');
const gridContainer = document.getElementById('grid-container');
const messageElement = document.getElementById('message');
const resetBtn = document.getElementById('reset-btn');
const saveBtn = document.getElementById('save-btn');
const gameOverContainer = document.getElementById('game-over');
const gameContainer = document.getElementById('game-container');
const finalScoreElement = document.getElementById('final-score');

// Game state
let score = 0;
let markedItems = new Set();
let currentQuestionIndex = 0;
let isGameOver = false;

// Function to update the UI
const updateUI = () => {
    scoreElement.textContent = score;

    // Update badges
    const badges = [];
    if (score >= 20) badges.push("🌱 Green Starter");
    if (score >= 50) badges.push("🌍 Eco Helper");
    if (score >= 100) badges.push("🌟 Eco Champion");
    badgesElement.textContent = badges.join(" ") || "—";

    // Check if game is over
    if (currentQuestionIndex >= QUESTIONS.length) {
        isGameOver = true;
        gameOverContainer.classList.remove('hidden');
        gameContainer.classList.add('hidden');
        finalScoreElement.textContent = score;
    } else {
        questionTextElement.textContent = QUESTIONS[currentQuestionIndex].text;
    }
};

// Render the bingo grid
const renderGrid = () => {
    gridContainer.innerHTML = '';
    BINGO_ITEMS.forEach(item => {
        const button = document.createElement('button');
        button.dataset.id = item.id;
        button.classList.add('p-4', 'rounded-xl', 'border', 'flex', 'flex-col', 'items-center', 'justify-center', 'transition-colors');
        
        const isMarked = markedItems.has(item.id);
        button.classList.add(isMarked ? 'bg-green-200' : 'bg-emerald-50');
        button.disabled = isMarked || isGameOver;

        button.innerHTML = `
            <div class="text-4xl text-center">${item.emoji}</div>
            <div class="text-center mt-1 text-gray-800">${item.label}</div>
        `;

        button.addEventListener('click', () => handleItemClick(item));
        gridContainer.appendChild(button);
    });
};

// Handle item click
const handleItemClick = (item) => {
    if (isGameOver) return;

    if (item.id === QUESTIONS[currentQuestionIndex].answerId) {
        markedItems.add(item.id);
        score += 10;
        messageElement.textContent = "✅ Correct!";
        currentQuestionIndex++;
    } else {
        score = Math.max(0, score - 5);
        messageElement.textContent = "❌ Try again 🌱";
    }
    updateUI();
    renderGrid();
};

// Reset game
const resetGame = () => {
    score = 0;
    markedItems.clear();
    currentQuestionIndex = 0;
    isGameOver = false;
    messageElement.textContent = "";
    gameOverContainer.classList.add('hidden');
    gameContainer.classList.remove('hidden');
    updateUI();
    renderGrid();
};

// Save score (placeholder)
const saveScore = () => {
    if (score === 0) {
        alert("Your score is 0. Play the game to save a score!");
        return;
    }
    alert(`Score saved: ${score}! (This is a placeholder. In a real app, this would be sent to a database.)`);
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    resetBtn.addEventListener('click', resetGame);
    saveBtn.addEventListener('click', saveScore);
    resetGame();
});
