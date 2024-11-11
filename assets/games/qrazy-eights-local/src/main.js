// main.js
/**
 * The entry point of the application.
 * This function creates objects, links them together, and starts the game.
 */
import Game from "./game.js";
import Player from "./components/Player.js";
import GameSettings from "./components/Gamesettings.js";

export var game = undefined;
export function main() {
  console.log("Start main")
  // Create players
  const players = [
    new Player("Alice"),
    new Player("Bob"),
    new Player("Thomas"),
    new Player("Arthur"),
    new Player("Avi"),
  ]

  // Create game
  game = new Game(players, new GameSettings());
  // game = new Game(players, circuit, deck, discardPile);

  
  console.log(game)
  // Start the game
  game.startGame();
}
