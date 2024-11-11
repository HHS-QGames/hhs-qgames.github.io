# Qrazy Eights Local Game

"Qrazy Eights Local" represents a captivating fusion of traditional card game strategies and quantum computing principles. Players embark on a unique journey, endeavoring to shed their hand of cards before any of their opponents, with an array of tools at their disposal.

## Core Components

The strategic depth of "Qrazy Eights Local" is built upon several key components:

- Quantum Operation Cards: These cards represent various quantum operations that you can deploy, such as Pauli-X, Pauli-Y, Pauli-Z, Hadamard (H), and Controlled NOT (CNOT), among others.
- Delete Quantum Operation Cards: An antithesis to their creation counterparts, these cards are capable of removing quantum operations from play.
- Quantum Circuit: A digital playground where players conduct their quantum operations, made visible through a user-friendly interface.
- Measurement Cards: Special cards that serve as the catalyst for measuring the current state of the Quantum Circuit.
- Quantum Computer API: A digital bridge connecting the game to an actual quantum computer. This API enables the execution of the Quantum Circuit and delivers the results of the quantum state measurements.

## Classes

The project defines the following classes:

- Player: Represents a player in the game. It has a reference to the Game class.
- Hand: Represents the hand of a player. It is connected to the Player class.
- Card: Represents a card in the game. It is connected to the Hand class.
- Deck: Represents the deck of cards in the game. It is connected to the Game class.
- Game: Represents the game itself. It has a reference to the Circuit and Pile classes. It also has connections to other classes, including Player, Deck, and Logic.
- Pile: Represents the discard pile in the game. It is connected to the Card class.
- Circuit: Represents the quantum circuit used in the game. It is connected to the Game and Gate classes.
- Qubit: Represents a qubit in the quantum circuit. It is connected to the Circuit class.
- Gate: Represents a gate in the quantum circuit. It is connected to the Circuit and Card classes.
- Logic: Represents the logic used in the game. It is connected to the Game class.

## Associations

Here are the associations between the classes:

- Player has a reference to Game.
- Hand is connected to Player.
- Card is connected to Hand.
- Deck is connected to Game.
- Game has a reference to Circuit and Pile.
- Pile is connected to Card.
- Circuit is connected to Game and Gate.
- Qubit is connected to Circuit.
- Gate is connected to Circuit and Card.
- Logic is connected to Game.

## The Journey of Gameplay

Gameplay commences with a thorough shuffle of the Quantum Operation Cards and Measurement Cards, after which each player is dealt 7 cards. The remaining stack serves as the draw pile.

In a clockwise sequence, players take turns, beginning with the first player. Choices on each turn include playing an operation card on the quantum circuit, applying it to any qubit, or playing a measurement card, or a combination of these actions.

By playing an operation card, a player can strategically apply the operation to any qubit in the quantum circuit based on the current circuit situation.

Playing a measurement card results in an exciting progression, where the Quantum Circuit's current state is sent to a real quantum computer for execution. In the aftermath, all players (excluding the one who played the measurement card) have to draw cards based on the most probable outcome of the quantum measurement, which is displayed in binary. This action resets the circuit.

If a player's turn does not yield an operation or measurement card play, they must draw a card from the pile. If the drawn card is playable, it can be used immediately; if not, the turn concludes.

A thrilling aspect of the game is the potential for quantum entanglement. Certain circuit constructions enable players to intertwine their qubits with those of others. This capability allows operations to be applied to multiple qubits simultaneously but also means that measurements will impact all entangled qubits.

The game concludes when a player successfully depletes their hand of cards, with that player being declared the victor. If the draw pile gets exhausted before any player wins, the game terminates prematurely, and the player holding the fewest cards wins.

## Additional Rules

- Players must maintain a minimum of one card in their hand until they emerge as the winner.
- If the Quantum Operation Cards deck depletes, the discard pile can be reshuffled to replenish the deck.
- Only one card can be played per turn unless a special card permits multiple plays.
- If a player is unable to play a card, they must draw from the pile, thus concluding their turn.
- A measurement card can be used immediately after applying a Quantum Operation Card.

## Strategy Nuggets

"Qrazy Eights Local" is a game rich in strategic options. Players need to exercise judicious timing when playing their operation and measurement cards to minimize their draw pile and maximize the draw for other players. The concept of quantum entanglement injects an additional strategic layer, demanding players to manage their entanglements effectively to avoid unwanted card draws. Anticipating the most likely outcome of quantum measurement is a crucial skill, as it directly influences the number of cards each player has to draw.

## Getting Started

To get started with the Qrazy Eights Local Game project, follow these steps:

1. Clone the repository: `git clone https://github.com/username/quantum-mau-mau-game.git`
2. Install the required dependencies.
3. Run the main program.

## Contribution Guidelines

If you would like to contribute to the project, please follow these guidelines:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Implement your changes.
4. Test your changes thoroughly.
5. Create a pull request explaining your changes and their purpose.

## Technologies Used

The entire project is built using HTML, CSS, and JavaScript.

## Folder Hierarchy

Here's the folder hierarchy of the project:

- quantum-mau-mau-game (root folder)
    - src (source code folder)
        - components (folder for game components)
            - Card.js
            - Circuit.js
            - Deck.js
            - Gate.js
            - Hand.js
            - Logic.js
            - MeasurementCard.js
            - Player.js
            - Pile.js
            - QuantumOperationCard.js
            - QuantumComputerAPI.js
            - Qubit.js
        - game.js (main game logic)
        - main.js (entry point of the application)
    - styles (folder for CSS stylesheets)
        - main.css
    - index.html (HTML file for the game interface)
    - LICENSE (file containing the MIT License)
    - README.md (file with project instructions and information)
    - .gitignore (file specifying files and folders to be ignored by Git)
    - package.json (file specifying project dependencies and scripts)

## Game Component Details

**Card.js:**
Variables:
- cardData: Represents the data associated with the card (e.g., card value, suit, etc.).

**Circuit.js:**
Variables:
- qubits: Represents an array of qubits in the circuit.
Functions:
- applyGate(gate, targetQubits): Applies a gate to the specified target qubits in the circuit.

**Deck.js:**
Variables:
- cards: Represents an array of cards in the deck.
Functions:
- shuffle(): Shuffles the cards in the deck.
- drawCard(): Draws a card from the deck.

**Gate.js:**
Variables:
- gateType: Represents the type of gate (e.g., Pauli-X, Pauli-Y, etc.).
Functions:
- applyToQubit(qubit): Applies the gate to the specified qubit.

**Hand.js:**
Variables:
- cards: Represents an array of cards in the player's hand.
Functions:
- addCard(card): Adds a card to the player's hand.
- removeCard(card): Removes a card from the player's hand.

**Logic.js:**
Functions:
- calculateProbability(): Calculates the probability of a measurement outcome.
- determineMostProbableOutcome(): Determines the most probable outcome based on the measured probabilities.

**MeasurementCard.js:**
Variables:
- measurementData: Represents the data associated with the measurement card (e.g., measurement type, outcome, etc.).
Functions:
- measureCircuit(): Measures the current state of the quantum circuit.

**Player.js:**
Variables:
- name: Represents the name of the player.
- game: Represents a reference to the game instance.
Functions:
- playCard(card): Plays a card from the player's hand.

**Pile.js:**
Variables:
- cards: Represents an array of cards in the discard pile.
Functions:
- addCard(card): Adds a card to the discard pile.

**QuantumOperationCard.js:**
Variables:
- operationData: Represents the data associated with the quantum operation card (e.g., operation type, parameters, etc.).
Functions:
- applyOperation(): Applies the quantum operation to the quantum circuit.

**QuantumComputerAPI.js:**
Functions:
- executeCircuit(circuit): Executes the quantum circuit using a quantum computer.
- getMeasurementResult(): Retrieves the measurement result from the quantum computer.

**Qubit.js:**
Variables:
- state: Represents the state of the qubit (e.g., |0⟩, |1⟩, superposition, etc.).

**game.js:**
Variables:
- players: Represents an array of players in the game.
- currentPlayer: Represents the current player taking a turn.
- drawPile: Represents the pile of cards from which players draw.
- discardPile: Represents the discard pile of cards.
- circuit: Represents the quantum circuit instance.
Functions:
- startGame(): Starts the game.
- nextTurn(): Advances the game to the next turn.
- endGame(winner): Ends the game with the specified winner.

**main.js:**
This file serves as the entry point of the application and may contain initialization code or event listeners to set up the game interface.

## License

The Qrazy Eights Local Game project is licensed under the MIT License. See the LICENSE file for more information.

## Acknowledgments

We would like to acknowledge the following resources for their contributions to the project:

- [Resource 1]
- [Resource 2]

Feel free to reach out to us if you have any questions or suggestions. Enjoy the captivating world of "Qrazy Eights Local"!
