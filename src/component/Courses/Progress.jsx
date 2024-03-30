import React from "react";
import img from "../../utils/img.png";
import "./Course.css";
import EmptyMessage from "../../component/EmptyMessage";
import { queries } from "../../api";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";


const coursesInProgress = [];

const Progress = () => {
  const navigate = useNavigate();

  const viewCourse = (courseId) => {
    navigate(`/course-materials/${courseId}`);
  };
  const {getStudentCourses } = queries;
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["student-courses"],
    queryFn: getStudentCourses,
  });

  if (isLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  if (isError) {
    console.log(error);
    return (
      <div className="flex items-center justify-center ">
        Unable to fetch your courses, please reload this page
      </div>
    );
  }

  const courses = data?.data?.resource ?? [];
  console.log({ courses });

  return (
    <>
      {courses?.length > 0 ? (
        courses?.map((course) => (
          <Course key={course?.id} course={course} onViewCourse={viewCourse} />
        ))
      ) : (
        <EmptyMessage content=" You have no course in progress" />
      )}
    </>
  );
};

const Course = ({ course, onViewCourse }) => {
  return (
    <div
      key={course?.id}
      className="progress-container"
      onClick={() => onViewCourse(course?._id)}
    >
      <div className="course-img">
        <img src={course?.thumbnail} alt="course" />
      </div>
      <div className="course-title">
        <div className="text">
          <h2>{course?.title}</h2>
          <span>{course?.tutor?.fullName}</span>
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
