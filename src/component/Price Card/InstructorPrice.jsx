import {React, useState} from "react";
import './Price.css'
import {useNavigate} from 'react-router-dom';

const InstructorPrice = ({onSubmit, value}) => {

  return (
    <div className="price-card">
      <span className="course-price">Enter Course price</span>
      <form>
        <input type="text" value={value} placeholder="$0.00" 
        onChange={(e) => onSubmit(e.target.value)}/>
      </form>
    </div>
  );
};

export default InstructorPrice;
