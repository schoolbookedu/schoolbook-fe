import React from "react";
import './Price.css'
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';


const Price = () => {
  const inputValue = useSelector((state) => state.inputValue);
  return (
    <div className="price-card">
      <span className="course-price">Course price</span>
      <h2>${inputValue}</h2>
      <Link to="#">
        <button>Pay to Access</button>
      </Link>
    </div>
  );
};

export default Price;
