import React, { Component } from "react";

export default class Card extends Component {
  state = {
    faceUp: false,
    value: this.props.card.value,
    suit: this.props.card.suit,
    code: this.props.card.code
  };

  flipCard() {
    this.setState({
      faceUp: !this.state.faceUp
    });
  }

  render() {
    let value;
    if (this.props.card.value.split("")[0] === "1") {
      value = "10";
    } else {
      value = this.props.card.value.split("")[0];
    }

    const suit = this.props.card.suit;
    let symbol;
    switch (suit) {
      case "DIAMONDS":
        symbol = "♦";
        break;
      case "HEARTS":
        symbol = "♥";
        break;
      case "CLUBS":
        symbol = "♣";
        break;
      case "SPADES":
        symbol = "♠";
        break;
      default:
        break;
    }

    const style = {
      transform: `rotate(${this.props.rotation}deg)`
    };

    if (this.state.faceUp) {
      return (
        <div className="Card" onClick={() => this.flipCard()} style={style}>
          <div className="face-up">
            <div className={"suit-" + suit.toLowerCase() + " suit-top"}>
              {symbol}
            </div>
            <p>{value}</p>
            <div className={"suit-" + suit.toLowerCase() + " suit-bottom"}>
              {symbol}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="Card" onClick={() => this.flipCard()} style={style}>
          <div className="face-down" />
        </div>
      );
    }
  }
}
