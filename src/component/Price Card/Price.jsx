import React from "react";
import './Price.css'
import { Link } from "react-router-dom";

const Price = () => {
  return (
    <div className="price-card">
      <span className="course-price">Course price</span>
      <h2>$15.00</h2>
      <Link to="#">
        <button>Pay to Access</button>
      </Link>
    </div>
  );
};

export default Price;
