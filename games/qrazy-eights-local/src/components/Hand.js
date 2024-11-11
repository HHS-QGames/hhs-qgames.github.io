// Hand.js
/**
 * Hand is a class that represents a player's hand of cards.
 */
export default class Hand {
  constructor(cards) {
    this.cards = cards; // Cards in the player's hand
  }

  /**
   * Adds a card to the player's hand.
   * @param {Object} card - The card to add.
   */
  addCard(card) {
    this.cards.push(card);
  }

  /**
   * Removes a card from the player's hand.
   * @param {Object} card - The card to remove.
   */
  removeCard(card) {
    const index = this.cards.indexOf(card);
    if (index > -1) {
      this.cards.splice(index, 1);
    }
  }
  render() {
    console.log("Render Hand")
    var cardsHTML = ""
    console.log(this.cards)
    this.cards.forEach(card => {
      cardsHTML += card.getHTML()
    });
    document.getElementById("player-cards").innerHTML = cardsHTML
    // Add event listeners
    const cards = document.getElementsByClassName("card");
    for (const card of cards) {
      card.addEventListener("dragstart", drag);
    }
  }
  
}
function drag(ev) {
  var cardType = ev.target.classList[1]
  var cardIndex = Array.from(ev.target.parentElement.children).findIndex((element)=>element === ev.target)

  ev.dataTransfer.setData("cardType", cardType)
  ev.dataTransfer.setData("cardIndex", cardIndex)
  if(cardType !== "measure") {
    var gateType = ev.target.children[2].innerText
    ev.dataTransfer.setData("gateType", gateType)
  }
}