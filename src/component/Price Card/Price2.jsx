import React from "react";
import './Price.css'
import { useSelector } from 'react-redux';

const Price2 = () => {
  const inputValue = useSelector((state) => state.inputValue);
  return (
    <div className="price-card2">
      <span className="course-price">Course price</span>
      <h2>${inputValue}</h2>
    </div>
  );
};

export default Price2;


