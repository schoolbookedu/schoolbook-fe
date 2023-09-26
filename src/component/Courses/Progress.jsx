import React from "react";
import img from "../../utils/img.png";
import "./Course.css";
import EmptyMessage from "../../component/EmptyMessage";

const coursesInProgress = [];

const Progress = () => {
  return (
    <>
      {coursesInProgress.length > 0 ? (
        coursesInProgress?.map((course) => (
          <Course key={course?.id} course={course} />
        ))
      ) : (
        <EmptyMessage content=" You have no course in progress" />
      )}
    </>
  );
};

const Course = ({ course }) => {
  return (
    <div className="progress-container">
      <div className="course-img">
        <img src={img} alt="course" />
      </div>
      <div className="course-title">
        <div className="text">
          <h2>INTRODUCTION TO GRAPHIC DESIGN</h2>
          <span>Tutor: Prof John Tobiloba</span>
          <div className="progress">
            <span>40% completed</span>
            <input type="range" value="40" min="0" max="100" id="range" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;
