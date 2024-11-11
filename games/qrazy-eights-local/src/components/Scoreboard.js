export default class Scoreboard {
  constructor (players) {
    this.players = players
  }

  render() {
    var playerHTML = ""
    this.players.forEach(player => {
      playerHTML += player.getHTML()
    });
    document.getElementById("player-info-container").innerHTML = playerHTML
  }
}