const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Allow CORS for frontend development
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// --- Game Configuration ---
const SYMBOLS = ['A', 'B', 'C', 'D', 'E', 'F', 'G']; // Cherry, Lemon, Orange, Watermelon, Bar, Seven, Diamond
const REEL_ROWS = 3;
const REEL_COLS = 3;

// Payouts for 3 of a kind
const PAYOUTS = {
    'A': 10, // Cherry
    'B': 20, // Lemon
    'C': 30, // Orange
    'D': 40, // Watermelon
    'E': 50, // Bar
    'F': 75, // Seven
    'G': 100 // Diamond
};

// Paylines (0-indexed coordinates [row, col])
// As defined in API_DOCUMENTATION.md
const PAYLINES = [
    [[1, 0], [1, 1], [1, 2]], // Middle Row
    [[0, 0], [0, 1], [0, 2]], // Top Row
    [[2, 0], [2, 1], [2, 2]], // Bottom Row
    [[0, 0], [1, 1], [2, 2]], // Diagonal Top-Left to Bottom-Right
    [[2, 0], [1, 1], [0, 2]]  // Diagonal Bottom-Left to Top-Right
];

// --- Helper Functions ---

function getRandomSymbol() {
    const randomIndex = Math.floor(Math.random() * SYMBOLS.length);
    return SYMBOLS[randomIndex];
}

function generateReels() {
    const reels = [];
    for (let r = 0; r < REEL_ROWS; r++) {
        const row = [];
        for (let c = 0; c < REEL_COLS; c++) {
            row.push(getRandomSymbol());
        }
        reels.push(row);
    }
    return reels;
}

function calculateWinnings(reels) {
    let totalWinnings = 0;
    const winningPaylines = [];

    PAYLINES.forEach((payline, index) => {
        const symbol1 = reels[payline[0][0]][payline[0][1]];
        const symbol2 = reels[payline[1][0]][payline[1][1]];
        const symbol3 = reels[payline[2][0]][payline[2][1]];

        // Check for 3 of a kind on the payline
        if (symbol1 === symbol2 && symbol2 === symbol3) {
            const payout = PAYOUTS[symbol1];
            if (payout) {
                totalWinnings += payout;
                winningPaylines.push({ payline: index, symbol: symbol1 });
            }
        }
    });

    return { totalWinnings, winningPaylines };
}

// --- API Endpoint ---

app.post('/spin', (req, res) => {
    const reels = generateReels();
    const { totalWinnings, winningPaylines } = calculateWinnings(reels);

    res.json({
        reels: reels,
        winnings: totalWinnings,
        winningPaylines: winningPaylines
    });
});

// --- Start Server ---
app.listen(port, () => {
    console.log(`Slot game backend listening at http://localhost:${port}`);
});
