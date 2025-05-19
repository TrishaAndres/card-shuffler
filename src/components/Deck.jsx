import React, { useState } from "react";
import Card from "./Card";
import "./Deck.css";
import "./Card.css";

const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
const faces = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

const generateDeck = () => {
  const deck = [];
  suits.forEach((suit) => {
    faces.forEach((face) => {
      deck.push({ face, suit });
    });
  });
  return deck;
};

const shuffleDeck = (deck) => {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const Deck = () => {
  const [deck, setDeck] = useState(generateDeck());
  const [shuffledDeck, setShuffledDeck] = useState([]);
  const [revealedCards, setRevealedCards] = useState([]);
  const [mode, setMode] = useState("show-all");
  const [dealCount, setDealCount] = useState(5);

  const handleShuffle = () => {
    const shuffled = shuffleDeck(generateDeck());
    setDeck(shuffled);
    setShuffledDeck(shuffled);
    setRevealedCards([]);
  };

  const handleFlipNext = () => {
    if (shuffledDeck.length > 0) {
      const nextCard = shuffledDeck[0];
      setRevealedCards([...revealedCards, nextCard]);
      setShuffledDeck(shuffledDeck.slice(1));
    }
  };

  const handleDeal = () => {
    setRevealedCards(shuffledDeck.slice(0, dealCount));
  };

  return (
    <div className="deck-container">
      <div style={{ marginBottom: "1rem" }}>
        <button onClick={handleShuffle} className="shuffle-button">🔀 Shuffle</button>

        <select
          style={{ marginLeft: "1rem", padding: "0.5rem" }}
          value={mode}
          onChange={(e) => {
            setMode(e.target.value);
            setRevealedCards([]);
          }}
        >
          <option value="show-all">Show All Cards</option>
          <option value="flip-one">Flip One-by-One</option>
          <option value="deal-count">Deal Specific Count</option>
        </select>

        {mode === "deal-count" && (
          <input
            type="number"
            value={dealCount}
            min="1"
            max="52"
            onChange={(e) => setDealCount(Number(e.target.value))}
            style={{ marginLeft: "1rem", width: "60px", padding: "0.3rem" }}
          />
        )}

        {mode === "flip-one" && (
          <button
            onClick={handleFlipNext}
            className="shuffle-button"
            style={{ marginLeft: "1rem", backgroundColor: "#1e90ff" }}
          >
            🔄 Flip
          </button>
        )}

        {mode === "deal-count" && (
          <button
            onClick={handleDeal}
            className="shuffle-button"
            style={{ marginLeft: "1rem", backgroundColor: "#2ed573" }}
          >
            🎯 Deal
          </button>
        )}
      </div>

      <div className="deck-grid">
        {mode === "show-all" &&
          deck.map((card, index) => (
            <Card key={index} face={card.face} suit={card.suit} />
          ))}

        {mode === "flip-one" && (
          <>
            {shuffledDeck.length > 0 && (
              <div
                className="card"
                style={{
                  backgroundColor: "#2f3542",
                  color: "#ccc",
                  fontSize: "1.2rem",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={handleFlipNext}
              >
                Click to Flip
              </div>
            )}
            {revealedCards.map((card, index) => (
              <Card key={index} face={card.face} suit={card.suit} />
            ))}
          </>
        )}

        {mode === "deal-count" &&
          revealedCards.map((card, index) => (
            <Card key={index} face={card.face} suit={card.suit} />
          ))}
      </div>
    </div>
  );
};

export default Deck;
