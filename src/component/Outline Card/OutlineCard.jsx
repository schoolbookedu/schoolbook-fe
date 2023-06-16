import React from "react";
import { Link } from "react-router-dom";
import "./OutlineCard.css";

const OutlineCard = ({ index, value }) => {
  return (
    <Link to="/CourseContent" style={{ textDecoration: "none" }}>
      <div className="outline-card">
        <span>Module {index}</span>
        <h3>{value}</h3>
      </div>
    </Link>
  );
};

export default OutlineCard;
