import React, { Component } from "react";
import Hand from "./components/Hand.js";

export default class App extends Component {
  state = {
    playerTurn: true,
    gameStarted: false,
    deckId: "",
    dealerHand: [],
    dealerScore: 0,
    playerHand: [],
    playerScore: 0
  };

  returnValue(value) {
    const cardValues = {
      ACE: 1,
      KING: 10,
      QUEEN: 10,
      JACK: 10,
      "10": 10,
      "9": 9,
      "8": 8,
      "7": 7,
      "6": 6,
      "5": 5,
      "4": 4,
      "3": 3,
      "2": 2
    };

    return cardValues[value];
  }

  handleStartGame() {
    fetch(`https://deckofcardsapi.com/api/deck/new/draw/?count=2`)
      .then(res => res.json())
      .then(json => {
        const value0 = this.returnValue(json.cards[0].value);
        const value1 = this.returnValue(json.cards[1].value);
        this.setState({
          gameStarted: true,
          deckId: json.deck_id,
          dealerHand: [...this.state.dealerHand, json.cards[0]],
          dealerScore: (this.state.dealerScore += value0),
          playerHand: [...this.state.playerHand, json.cards[1]],
          playerScore: (this.state.playerScore += value1)
        });
      });
  }

  handleEndGame() {
    this.setState({
      gameStarted: false,
      deckId: "",
      dealerHand: [],
      dealerScore: 0,
      playerHand: [],
      playerScore: 0
    });
  }

  handleHit = (event) => {
    const hand = event.target.value + "Hand";
    const score = event.target.value + "Score";
    const handArr = this.state[hand];

    if (this.state[score] < 21) {
      fetch(
        `https://deckofcardsapi.com/api/deck/${this.state.deckId}/draw/?count=1`
      )
        .then(res => res.json())
        .then(json => {
          const newValue = this.returnValue(json.cards[0].value);
          this.setState({
            [hand]: [...this.state[hand], json.cards[0]],
            [score]: (this.state[score] += newValue)
          });
        });
    }
  };

  endPlayerTurn = (event) => {
    console.log("Ended player turn")
    // this.setState({
    //   playerTurn: false
    // })
  }

  render() {
    // I see the assingment states that a 'start game' and 'deal' button should be present
    // but I feel that both events could be accomplished with one 'start game' button
    // which in turn makes a cleaner UI.
    return (
      <div className="App">
        <div>
          <h1>Reackjack</h1>
          <div className="byline">
            Made with <span className="heart">♥</span> by{" "}
            <a href="mailto:hello@adamtowers.tech">Adam Towers</a>
          </div>
          {this.state.gameStarted ? (
            <button className="lg red" onClick={() => this.handleEndGame()}>
              End Game
            </button>
          ) : (
            <button className="lg" onClick={() => this.handleStartGame()}>
              Start Game
            </button>
          )}
        </div>
        {this.state.dealerHand.length > 0 ? (
          <div className="hands-container">
            <Hand
              name="Dealer"
              cards={this.state.dealerHand}
              score={this.state.dealerScore}
              playerTurn={this.state.playerTurn}
              handleHit={this.handleHit}
            />
            <Hand
              name="Player"
              cards={this.state.playerHand}
              score={this.state.playerScore}
              playerTurn={this.state.playerTurn}
              endPlayerTurn={this.endPlayerTurn}
              handleHit={this.handleHit}
            />
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}
