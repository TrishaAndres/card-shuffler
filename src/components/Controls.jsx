import React from "react";

const Controls = ({ onShuffle }) => {
  return (
    <div>
      <button onClick={onShuffle}>Shuffle Cards</button>
    </div>
  );
};

export default Controls;
