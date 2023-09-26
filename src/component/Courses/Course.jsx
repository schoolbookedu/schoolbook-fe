import React from "react";
import img from "../../utils/img.png";
import "./Course.css";
import EmptyMessage from "../../component/EmptyMessage";

// temp data

const courses = [];

// TODO
// 1. Get the list of courses that belongs to the user
const Courses = () => {
  return (
    <>
      {courses.length > 0 ? (
        courses?.map((course) => <Course key={course?.id} course={course} />)
      ) : (
        <EmptyMessage content="You have not enrolled for a course yet" />
      )}
    </>
  );
};

const Course = ({ course }) => {
  return (
    <div key={course?.id} className="course">
      <div className="course-img">
        <img src={img} alt="course" />
      </div>
      <div className="course-title">
        <div className="text">
          <h2>INTRODUCTION TO GRAPHIC DESIGN</h2>
          <span>Tutor: Prof John Tobiloba</span>
        </div>
      </div>
    </div>
  );
};

export default Courses;
