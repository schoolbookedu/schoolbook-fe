import React from "react";

const Created = ({ resource }) => {
  const alt = `${resource?.title} by ${resource?.tutor?.fullName}`;
  return (
    <div className="fcourse-created">
      <div className="fcourse-img">
        <img src={resource?.thumbnail} alt={alt} />
      </div>
      <div className="fcourse-text">
        <h2>{resource?.title}</h2>
        <div className="fcourse-span">
          <span>Tutor: {resource?.tutor?.fullName}</span>
        </div>
      </div>
    </div>
    
  );
};

export default Created;
