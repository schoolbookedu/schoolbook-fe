import React from "react";
import OutlineCard from "./OutlineCard";
import "./OutlineCard.css";

const OutlineCardList = ({ cards }) => {
  return (
    <div className="outlineCardList">
      {cards.map((card, index) => (
        <OutlineCard key={index} value={card} index={index + 1} />
      ))}
    </div>
  );
};

export default OutlineCardList;
