# SlotGameBE - Slot Machine Backend

This project is a simple backend for a slot machine game, built with Node.js and Express.js. It provides an API endpoint to simulate a spin on a 3x3 slot machine and calculate the winnings based on predefined paylines.

## Tech Stack

-   Node.js
-   Express.js

## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

-   npm
    ```sh
    npm install npm@latest -g
    ```

### Installation

1.  Clone the repo
    ```sh
    git clone https://github.com/your_username/your_repository.git
    ```
2.  Install NPM packages
    ```sh
    npm install
    ```

### Running the project

```sh
node server.js
```

The server will start on `http://localhost:3000`.

## API Documentation

### POST /spin

Simulates a spin of the slot machine reels.

**Request Body:**

An empty JSON object `{}` can be sent, as the spin does not require any input from the client.

**Response Body:**

A JSON object with the following structure:

```json
{
    "reels": [
        ["A", "B", "C"],
        ["D", "E", "F"],
        ["G", "A", "B"]
    ],
    "winnings": 10,
    "winningPaylines": [
        {
            "payline": 0,
            "symbol": "A"
        }
    ]
}
```

-   `reels`: A 2D array representing the 3x3 grid of symbols.
-   `winnings`: The total amount won from the spin.
-   `winningPaylines`: An array of objects, where each object indicates a winning payline and the symbol that formed the win.

## Game Logic

### Symbols

The game uses the following symbols:

| Symbol | Name      |
| :----: | :-------- |
|   A    | Cherry    |
|   B    | Lemon     |
|   C    | Orange    |
|   D    | Watermelon|
|   E    | Bar       |
|   F    | Seven     |
|   G    | Diamond   |

### Reels

The slot machine has a 3x3 grid of reels. Each position is filled with a randomly selected symbol on every spin.

### Payouts

Payouts are awarded for getting three of the same symbol on a payline.

| Symbol | Payout |
| :----: | :----: |
|   A    |   10   |
|   B    |   20   |
|   C    |   30   |
|   D    |   40   |
|   E    |   50   |
|   F    |   75   |
|   G    |  100   |

### Paylines

There are 5 paylines in the game:

1.  **Middle Row**: `[[1, 0], [1, 1], [1, 2]]`
2.  **Top Row**: `[[0, 0], [0, 1], [0, 2]]`
3.  **Bottom Row**: `[[2, 0], [2, 1], [2, 2]]`
4.  **Diagonal (Top-Left to Bottom-Right)**: `[[0, 0], [1, 1], [2, 2]]`
5.  **Diagonal (Bottom-Left to Top-Right)**: `[[2, 0], [1, 1], [0, 2]]`