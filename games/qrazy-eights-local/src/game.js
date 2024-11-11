// Game.js
/**
 * Game is a class that represents the game, which includes players, the quantum circuit, and card piles.
 */
import Circuit from "./components/Circuit.js";
import Player from "./components/Player.js";
import Pile from "./components/Pile.js";
import Scoreboard from "./components/Scoreboard.js";
import GameSettings from "./components/Gamesettings.js";
import Qubit from "./components/Qubit.js";
import Deck from "./components/Deck.js";
import { main } from "./main.js";
import { execute } from "./util/QuantumAPI.js";

export default class Game {
  constructor(players, gameSettings) {
    this.gameSettings = gameSettings;

    this.players = players;
    this.players.forEach((player) => {
      player.game = this;
    });
    this.currentPlayer = players[0]; // The first player goes first

    this.scoreboard = new Scoreboard(players);

    const qubits = [];
    for (let i = 0; i < gameSettings.qubitCount; i++) {
      qubits.push(new Qubit(i));
    }
    this.circuit = new Circuit(qubits);

    this.drawPile = new Deck([]);
    this.drawPile.addCards(
      { cardType: "gate", gateType: "hadamard" },
      gameSettings.hadamardCountPP *
        this.players.length *
        gameSettings.totalCardMultiplier
    );
    this.drawPile.addCards(
      { cardType: "gate", gateType: "pauli-x" },
      gameSettings.pauli_xCountPP *
        this.players.length *
        gameSettings.totalCardMultiplier
    );
    this.drawPile.addCards(
      { cardType: "gate", gateType: "pauli-y" },
      gameSettings.pauli_yCountPP *
        this.players.length *
        gameSettings.totalCardMultiplier
    );
    this.drawPile.addCards(
      { cardType: "gate", gateType: "pauli-z" },
      gameSettings.pauli_zCountPP *
        this.players.length *
        gameSettings.totalCardMultiplier
    );
    this.drawPile.addCards(
      { cardType: "gate", gateType: "prep-x" },
      gameSettings.prep_xCountPP *
        this.players.length *
        gameSettings.totalCardMultiplier
    );
    this.drawPile.addCards(
      { cardType: "gate", gateType: "prep-y" },
      gameSettings.prep_yCountPP *
        this.players.length *
        gameSettings.totalCardMultiplier
    );
    this.drawPile.addCards(
      { cardType: "gate", gateType: "prep-z" },
      gameSettings.prep_zCountPP *
        this.players.length *
        gameSettings.totalCardMultiplier
    );
    this.drawPile.addCards(
      { cardType: "gate", gateType: "cnot" },
      gameSettings.hadamardCountPP *
        this.players.length *
        gameSettings.totalCardMultiplier
    );
    this.drawPile.addCards(
      { cardType: "destroy", gateType: "hadamard" },
      gameSettings.hadamardCountPP *
        this.players.length *
        gameSettings.destroyPerGateCount *
        gameSettings.totalCardMultiplier
    );
    this.drawPile.addCards(
      { cardType: "destroy", gateType: "pauli-x" },
      gameSettings.pauli_xCountPP *
        this.players.length *
        gameSettings.destroyPerGateCount *
        gameSettings.totalCardMultiplier
    );
    this.drawPile.addCards(
      { cardType: "destroy", gateType: "pauli-y" },
      gameSettings.pauli_yCountPP *
        this.players.length *
        gameSettings.destroyPerGateCount *
        gameSettings.totalCardMultiplier
    );
    this.drawPile.addCards(
      { cardType: "destroy", gateType: "pauli-z" },
      gameSettings.pauli_zCountPP *
        this.players.length *
        gameSettings.destroyPerGateCount *
        gameSettings.totalCardMultiplier
    );
    this.drawPile.addCards(
      { cardType: "destroy", gateType: "prep-x" },
      gameSettings.prep_xCountPP *
        this.players.length *
        gameSettings.destroyPerGateCount *
        gameSettings.totalCardMultiplier
    );
    this.drawPile.addCards(
      { cardType: "destroy", gateType: "prep-y" },
      gameSettings.prep_yCountPP *
        this.players.length *
        gameSettings.destroyPerGateCount *
        gameSettings.totalCardMultiplier
    );
    this.drawPile.addCards(
      { cardType: "destroy", gateType: "prep-z" },
      gameSettings.prep_zCountPP *
        this.players.length *
        gameSettings.destroyPerGateCount *
        gameSettings.totalCardMultiplier
    );
    // this.drawPile.addCards({cardType: "destroy", gateType: "cnot"}, gameSettings.hadamardCountPP * this.players.length * gameSettings.destroyPerGateCount * gameSettings.totalCardMultiplier)
    this.drawPile.addCards(
      { cardType: "measure", gateType: undefined },
      gameSettings.measureCountPP *
        this.players.length *
        gameSettings.totalCardMultiplier
    );

    this.discardPile = new Pile([]);
    this.measureCircuit = false;
  }
  /**
   * Starts the game, including shuffling the deck and dealing cards to players.
   */
  startGame() {
    this.drawPile.shuffle();
    this.players.forEach((player) => {
      player.drawCards(this.gameSettings.startingHandSize, true);
    });
    this.currentPlayer.isCurrentTurn = true;
    this.forceRender();
  }

  /**
   * Advances the game to the next turn.
   */
  async nextTurn() {
    console.log(this.circuit.to_cQASM())
    if (this.isGameOver()) {
      alert(`${this.currentPlayer.name} heeft gewonnen!`);
      main();
      return;
    }
    if (this.measureCircuit) {
      // console.log("Circuit as cQasm")
      // console.log(this.circuit)
      // console.log(this.circuit.to_cQASM())
      // const measurementValue = Math.floor(Math.random() * 17); // Binary value of the qubits 0 1 0 0
      const results = await execute(this.circuit.to_cQASM());
      const measurementValue = this.findMostFrequentNumber(results); // Binary value of the qubits 0 1 0 0
      var binaryResult = measurementValue.toString(2)
      while (binaryResult.length < this.circuit.qubits.length) {
        binaryResult = "0" + binaryResult;
      }
      console.log(measurementValue);
      alert(
        `The result of the measurement is ${measurementValue}! (binary: ${binaryResult})\n${
          measurementValue === 0
            ? `Nobody needs to draw a card.`
            : `Everybody except for ${this.currentPlayer.name} gets to draw ${measurementValue} cards.`
        }`
      );
      // Now give the other players this amount of cards
      this.players.forEach((player) => {
        if (player != this.currentPlayer) player.drawCards(measurementValue);
      });
      this.measureCircuit = false;
      this.circuit.clear();
    }
    this.currentPlayer.isCurrentTurn = false;
    const currentPlayerIndex = this.players.indexOf(this.currentPlayer);
    this.currentPlayer =
      this.players[(currentPlayerIndex + 1) % this.players.length];
    this.currentPlayer.giveTurn();
    console.log(
      `Current turn player ${(currentPlayerIndex + 2) % this.players.length}: ${
        this.currentPlayer.name
      }`
    );
    this.forceRender();
  }
  findMostFrequentNumber(numbers) {
    const frequency = {};

    numbers.forEach((num) => {
      frequency[num] = (frequency[num] || 0) + 1;
    });

    return +Object.keys(frequency).reduce((a, b) =>
      frequency[a] > frequency[b] ? a : b
    );
  }
  /**
   * Checks if the game is over.
   * @return {Boolean} True if the game is over, false otherwise.
   */
  isGameOver() {
    console.log("Cards" + this.currentPlayer.hand.cards.length);
    return this.currentPlayer.hand.cards.length === 0;
  }

  forceRender() {
    this.circuit.render();
    this.currentPlayer.hand.render();
    this.scoreboard.render();
  }
}
