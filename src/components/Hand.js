import React, { Component } from "react";
import Card from "./Card.js";

export default class Hand extends Component {
  render() {
    let deg = -15;

    let cards;
    if (this.props.cards.length) {
      cards = this.props.cards.map(card => (
        <Card
          key={card.code}
          card={card}
          history={this.props.history}
          rotation={(deg += 15)}
        />
      ));
    }

    return (
      <div className={this.props.name + " Hand"}>
        <h3>{this.props.name}</h3>
        <h5>{this.props.score}</h5>
        {
          this.props.playerTurn && this.props.score < 21 ?
          <div>
            <button
              className="sm"
              onClick={event => this.props.handleHit(event)}
              value={this.props.name.toLowerCase()}
            >
              Hit
            </button>
            <button
              className="sm"
              onClick={event => this.props.handleStay(event)}
              value={this.props.name.toLowerCase()}
            >
              Stay
            </button>
          </div>
          :
          ''
        }

        <div className="cards-container">{cards}</div>
      </div>
    );
  }
}
