import React from "react";
import "./Card.css";

const suitSymbols = {
  Hearts: "♥",
  Diamonds: "♦",
  Clubs: "♣",
  Spades: "♠",
};

const suitColors = {
  Hearts: "red",
  Diamonds: "red",
  Clubs: "black",
  Spades: "black",
};

const Card = ({ face, suit }) => {
  return (
    <div className="card" style={{ color: suitColors[suit] }}>
      <div className="corner top-left">
        {face}
        <br />
        {suitSymbols[suit]}
      </div>
      <div className="suit-large">{suitSymbols[suit]}</div>
      <div className="corner bottom-right">
        {face}
        <br />
        {suitSymbols[suit]}
      </div>
    </div>
  );
};

export default Card;
