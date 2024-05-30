import React from "react";
import "./Course.css";
import EmptyMessage from "../../component/EmptyMessage";
import { queries } from "../../api";
import { useQuery } from "@tanstack/react-query";
import { useNavigate} from "react-router-dom";

const Courses = () => {
  const { getStudentCourses } = queries;
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["student-courses"],
    queryFn: getStudentCourses,
  });

  const navigate = useNavigate();

  const viewCourse = (courseId) => {
    navigate(`/course-materials/${courseId}`);
  };
  if (isLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full flex items-center justify-center">
        Unable to fetch your courses, please try reloading this page
      </div>
    );
  }
  const courses = data?.data?.resource ?? [];
  return (
    <>
      {courses?.length > 0 ? (
        courses?.map((course) => <Course key={courses?.id}  course={course} onViewCourse={viewCourse}/>)
      ) : (
        <EmptyMessage content="You have not enrolled for a course yet" />
      )}
    </>
  );
};

const Course = ({ course, onViewCourse }) => {

  return (
    <>
      <div className='fcourse mt-4'>
      <div className='fcourse-img'>
        <img src={course?.thumbnail} alt="course" />
      </div>
      <div className="course-title w-full mt-4">
        <div className="text cursor-pointer" onClick={() => onViewCourse(course?._id)}>
          <h2>{course?.title}</h2>
          {/* <span>Tutor: {courses?.tutor?.fullName}</span> */}
        </div>
      </div>
    </div>
     </>
  );
};

export default Courses;
