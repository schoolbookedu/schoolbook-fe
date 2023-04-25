


import {React} from "react";
import './Price.css'
import { useDispatch } from 'react-redux';

const InstructorPrice = () => {
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    dispatch({ type: 'UPDATE_INPUT_VALUE', payload: event.target.value });
  };


  return (
    <div className="price-card">
      <span className="course-price">Enter Course price</span>
      <form>
        <input type="text"  placeholder="$0.00" 
        onChange={handleInputChange} />
      </form>
    </div>
  );
};

export default InstructorPrice;