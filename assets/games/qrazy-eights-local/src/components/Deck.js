// Deck.js

import Card from "./Card.js";
import MeasurementCard from "./MeasurementCard.js";
import QuantumDestroyOperationCard from "./QuantumDestroyOperationCard.js";
import QuantumOperationCard from "./QuantumOperationCard.js";

/**
 * Deck is a class that represents a deck of cards.
 */
export default class Deck {
  constructor(cards) {
    this.cards = cards; // Cards in the deck
  }

  addCard(card) {
    this.cards.push(card)
  }
  addCards({cardType, gateType}, count) {
    for (let i = 0; i < count; i++) {
      if(cardType === "gate")
        this.addCard(new QuantumOperationCard(gateType))      
      if(cardType === "destroy")
        this.addCard(new QuantumDestroyOperationCard(gateType))      
      if(cardType === "measure")
        this.addCard(new MeasurementCard())      
    }
  }
  
  /**
   * Shuffles the deck of cards.
   */
  shuffle() {
    this.cards.sort(() => Math.random() - 0.5);
  }

  /**
   * Draws a card from the deck.
   * @return {Object} card - The card that was drawn.
   */
  drawCard() {
    return this.cards.pop();
  }

  drawCards(amount, player, maxOneMeasure) {
    var measureCount = 0;
    for (let i = 0; i < amount; i++) {
      var card = this.drawCard()
      if(card instanceof MeasurementCard){
        if(maxOneMeasure && (measureCount >= 1)){
          this.addCard(card)
          this.shuffle()
          i--;
          continue
        } else{
          measureCount += 1;
        }
      }
      player.hand.addCard(card)
    }
  }
}
