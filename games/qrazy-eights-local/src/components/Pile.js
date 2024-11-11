// Pile.js
/**
 * Pile is a class that represents a pile of cards.
 */
export default class Pile {
  constructor(cards) {
    this.cards = cards; // Cards in the pile
  }

  /**
   * Adds a card to the pile.
   * @param {Object} card - The card to add.
   */
  addCard(card) {
    this.cards.push(card);
  }
}