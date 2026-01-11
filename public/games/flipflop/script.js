const allCardPairs = [
    { id: 1, pair: "tree", emoji: "🌳", fact: "Trees clean the air by absorbing CO₂." },
    { id: 2, pair: "air", emoji: "💨", fact: "Fresh air keeps us healthy." },
    { id: 3, pair: "river", emoji: "💧", fact: "Rivers provide clean water for life." },
    { id: 4, pair: "fish", emoji: "🐟", fact: "Clean rivers help fish live." },
    { id: 5, pair: "sun", emoji: "☀", fact: "Sunlight gives clean solar energy." },
    { id: 6, pair: "solar", emoji: "🔋", fact: "Solar panels save electricity." },
    { id: 7, pair: "banana", emoji: "🍌", fact: "Food waste can be composted." },
    { id: 8, pair: "compost", emoji: "♻", fact: "Composting reduces landfill waste." },
];

let cards = [];
let flipped = [];
let matched = [];
let score = 0;
let tries = 20;
let fact = "";
let lockBoard = false;

const gameBoard = document.getElementById('game-board');
const scoreElement = document.getElementById('score');
const triesElement = document.getElementById('tries');
const factDisplay = document.getElementById('fact-display');
const badgeDisplay = document.getElementById('badge-display');
const gameOverMessage = document.getElementById('game-over-message');
const resetButton = document.getElementById('reset-button');
const saveScoreButton = document.getElementById('save-score-button');

// Shuffles and duplicates the card pairs
const shuffleCards = (pairs) => {
    const duplicatedCards = [...pairs, ...pairs].map((card, index) => ({
        ...card,
        uniqueId: index
    }));
    return duplicatedCards.sort(() => Math.random() - 0.5);
};

// Renders the game board
const renderCards = () => {
    gameBoard.innerHTML = '';
    cards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card', 'w-24', 'h-24', 'relative', 'cursor-pointer');
        cardElement.dataset.index = index;

        const frontFace = document.createElement('div');
        frontFace.classList.add('card-face', 'card-front');
        frontFace.textContent = '❓';

        const backFace = document.createElement('div');
        backFace.classList.add('card-face', 'card-back');
        backFace.textContent = card.emoji;

        cardElement.appendChild(frontFace);
        cardElement.appendChild(backFace);
        gameBoard.appendChild(cardElement);

        cardElement.addEventListener('click', flipCard);
    });
};

// Flip card logic
const flipCard = (event) => {
    if (lockBoard) return;
    const clickedCard = event.currentTarget;
    const index = clickedCard.dataset.index;

    if (flipped.length < 2 && !flipped.includes(index) && !matched.includes(index) && tries > 0) {
        flipped.push(index);
        clickedCard.classList.add('is-flipped');
    }

    if (flipped.length === 2) {
        lockBoard = true;
        checkForMatch();
    }
};

// Check for match
const checkForMatch = () => {
    const [firstIndex, secondIndex] = flipped;
    const firstCard = cards[firstIndex];
    const secondCard = cards[secondIndex];

    if (firstCard.pair === secondCard.pair) {
        matched.push(firstIndex, secondIndex);
        score += 10;
        setFact(firstCard.fact);
        checkWin();
        lockBoard = false;
    } else {
        score = Math.max(0, score - 2);
        tries -= 1;
        setFact("");
        setTimeout(() => {
            document.querySelector(`.card[data-index="${firstIndex}"]`).classList.remove('is-flipped');
            document.querySelector(`.card[data-index="${secondIndex}"]`).classList.remove('is-flipped');
            updateTries();
            lockBoard = false;
        }, 1000);
    }

    updateScore();
    flipped = [];
};

// Update score display
const updateScore = () => {
    scoreElement.textContent = score;
    updateBadge();
};

// Update tries display
const updateTries = () => {
    triesElement.textContent = tries;
    if (tries <= 0) {
        gameOverMessage.classList.remove('hidden');
        lockBoard = true;
    }
};

// Display fact
const setFact = (newFact) => {
    factDisplay.textContent = newFact;
    factDisplay.classList.toggle('hidden', !newFact);
};

// Update badge
const updateBadge = () => {
    let badge = null;
    if (score >= 60) badge = "🌟 Eco Genius";
    else if (score >= 30) badge = "🌍 Eco Explorer";
    else if (score > 0) badge = "🌱 Eco Learner";
    
    if (badge) {
        badgeDisplay.textContent = `🏆 ${badge}`;
        badgeDisplay.classList.remove('hidden');
    } else {
        badgeDisplay.classList.add('hidden');
    }
};

// Check if game won
const checkWin = () => {
    if (matched.length === cards.length) {
        setTimeout(() => alert("🎉 Congratulations! You won the game!"), 500);
    }
};

// Reset game
const resetGame = () => {
    cards = shuffleCards(allCardPairs);
    flipped = [];
    matched = [];
    score = 0;
    tries = 20;
    setFact("");
    lockBoard = false;
    updateScore();
    updateTries();
    gameOverMessage.classList.add('hidden');
    renderCards();
};

// Initialize
const init = () => {
    resetGame();
    resetButton.addEventListener('click', resetGame);
    saveScoreButton.addEventListener('click', () => {
        alert("Score saved locally! Connect to a backend for real saving.");
    });
};

init();
