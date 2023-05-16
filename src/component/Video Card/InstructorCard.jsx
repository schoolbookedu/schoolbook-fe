import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { React } from "react";
import "./VideoCard.css";

const InstructorCard = ({ title, icon, onDelete, setShowModule }) => {
  const handleButtonClick = () => {
    setShowModule(true);
  };

  return (
    <div className="outlineCard">
      <div className="red">
        <FontAwesomeIcon icon={faEllipsisVertical} className="icon" />
        <div className="dropdown-content">
          <div className="option">
            <button onClick={handleButtonClick}>Edit</button>
            <button onClick={onDelete}>Delete</button>
          </div>
        </div>
      </div>

      <p>
        {icon} {title}
      </p>
    </div>
  );
};

export default InstructorCard;
