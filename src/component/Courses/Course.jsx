import React from "react";
import img from "../../utils/img.png";
import "./Course.css";
import EmptyMessage from "../../component/EmptyMessage";
import { queries } from "../../api";
import { useQuery } from "@tanstack/react-query";

const Courses = () => {
  const { getStudentCourses } = queries;
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
    return (
      <div className="flex items-center justify-center ">
        Unable to fetch your courses, please try reloading this page
      </div>
    );
  }
  const courses = data?.data?.resource ?? [];
  console.log({ courses });
  return (
    <>
      {courses?.length > 0 ? (
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
        <img src={course?.thumbnail} alt="course" />
      </div>
      <div className="course-title">
        <div className="text">
          <h2>{course?.title}</h2>
          <span>{course?.tutor?.fullName}</span>
        </div>
      </div>
    </div>
  );
};

export default Courses;
