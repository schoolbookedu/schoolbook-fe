import React from "react";
import { Link } from "react-router-dom";
import "./OutlineCard.css";

const MaterialCard = ({ value }) => {
  return (
    <Link to="/CourseContent" style={{ textDecoration: "none" }}>
      <div className="material-card">
        <h3>{value}</h3>
      </div>
    </Link>
  );
};

export default MaterialCard;
