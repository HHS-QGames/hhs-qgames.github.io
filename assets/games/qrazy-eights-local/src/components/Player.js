// Player.js
import Hand from "./Hand.js";
import QuantumOperationCard from "./QuantumOperationCard.js";
import QuantumDestroyOperationCard from "./QuantumDestroyOperationCard.js";
import MeasurementCard from "./MeasurementCard.js";
import Gate from "./Gate.js";
export default class Player {
  constructor(name, game) {
    this.name = name; // Player's name
    this.game = game; // Game the player is participating in
    this.hand = new Hand([]); // Player's hand of cards
    this.isCurrentTurn = false;
    this.playedGate = false;
    this.playedDestroy = false;
    this.playedMeasure = false;
  }

  /**
   * Draws a card from the game's draw pile.
   */
  drawCard() {
    const card = this.game.drawPile.drawCard();
    if (card) {
      this.hand.addCard(card);
    }
    this.hand.render()
    this.game.scoreboard.render()
  }

  drawCards(amount, maxOneMeasure = false) {
    this.game.drawPile.drawCards(amount, this, maxOneMeasure);
  }

  /**
   * Plays a card from the player's hand.
   * @param {Number} cardIndex - The index of the card to play from the player's hand.
   * @param {Object} circuit - The quantum circuit to apply the card to (if applicable).
   * @param {Number} qubitIndex - The qubits to apply the card to (if applicable).
   * @return {Object} result - The result of the card action (if applicable).
   */
  playCard(cardIndex, circuit, qubitIndex, targetSlotnumber = undefined) {
    const card = this.hand.cards[cardIndex];
    console.log(card);
    if (!card) {
      throw new Error("Invalid card index");
    }

    var succesfullAction = false;
    if (card instanceof QuantumOperationCard) {
      if (this.playedDestroy || this.playedGate || this.playedMeasure) {
        alert(
          `You already played a ${
            this.playedMeasure
              ? "measure"
              : this.playedDestroy
              ? "destroy"
              : "gate"
          } card!\n\nEach turn you are able to play a gate or destroy card and a single measure card at the end of your turn.`
        );
      } else {
        if (card.cardData.gateType === "cnot") {
          console.log("WIP: CNOT");
          const controllQubit = parseInt(
            prompt("Please enter the number of the controll qubit:")
          );
          const notQubit = parseInt(
            prompt("Please enter the number of the not qubit:")
          );
          const qubitCount = this.game.circuit.qubits.length;
          if (
            controllQubit === notQubit ||
            controllQubit >= qubitCount ||
            controllQubit < 0 ||
            notQubit >= qubitCount ||
            notQubit < 0
          ) {
            succesfullAction = false
            alert(`Incorrect values.\nPlease enter values between 0 and ${qubitCount-1}. Additionaly, the controll and not cannot have the same value.`)
          }else{
            this.game.circuit.applyCNOT(controllQubit, notQubit);
            this.playedGate = true
          }
        } else {
          succesfullAction = this.game.circuit.applyGate(
            new Gate(card.cardData.gateType),
            qubitIndex
          );
          this.playedGate = true;
        }
      }
    } else if (card instanceof QuantumDestroyOperationCard) {
      if (this.playedDestroy || this.playedGate || this.playedMeasure) {
        alert(
          `You already played a ${
            this.playedMeasure
              ? "measure"
              : this.playedDestroy
              ? "destroy"
              : "gate"
          } card!\n\nEach turn you are able to play a gate or destroy card and a single measure card at the end of your turn.`
        );
      } else {
        succesfullAction = this.game.circuit.destroyGate(
          card.cardData.gateType,
          qubitIndex,
          targetSlotnumber
        );
        this.playedDestroy = true;
      }
    } else if (card instanceof MeasurementCard) {
      if (this.playedMeasure) {
        alert(
          "You already played a measure card!\n\nEach turn you are able to play a gate or destroy card and a single measure card at the end of your turn."
        );
      } else {
        succesfullAction = card.measureCircuit(circuit);
        this.playedMeasure = true;
      }
    }
    if (succesfullAction) {
      console.log("Action is succesfull");
      this.hand.removeCard(card);
      this.game.discardPile.addCard(card);
      this.hand.render();
      this.game.scoreboard.render();
    }
  }
  giveTurn() {
    this.isCurrentTurn = true;
    this.playedGate = false;
    this.playedDestroy = false;
    this.playedMeasure = false;
  }
  getHTML() {
    return `<div class="player-info${
      this.isCurrentTurn ? " current-turn" : ""
    }">
    <b>${this.name}</b><br>
    ${this.hand.cards.length} Cards
  </div>`;
  }
}
