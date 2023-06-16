import React from "react";
import MaterialCard from "./MaterialCard";
import "./OutlineCard.css";

const MaterialCardList = ({ materialCards }) => {
  return (
    <div className="outlineCardList">
      {materialCards.map((card, index) => (
        <MaterialCard key={index} value={card} />
      ))}
    </div>
  );
};

export default MaterialCardList;
