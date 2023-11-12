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
        Unable to fetch your courses, please reloading this page
      </div>
    );
  }
  const courses = data?.resources ?? [];
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
        <img src={img} alt="course" />
      </div>
      <div className="course-title">
        <div className="text">
          <h2>{course?.title}</h2>
          <span>Tutor: Prof John Tobiloba</span>
        </div>
      </div>
    </div>
  );
};

export default Courses;
