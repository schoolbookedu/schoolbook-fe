// import { React, useState } from "react";
// import "../DashboardPage/Dashboard.css";
// import "./InstructorDashboard.css";
// import Nav from "../../component/Navbar/Nav";
// import Create from "../../component/Create Courses/Create";
// import Created from "../../component/Featured Courses/Created";
// import { queries } from "../../api";
// import { useQuery } from "@tanstack/react-query";
// import { OverlayLoader } from "../../loaders";
// import EmptyMessage from "../../component/EmptyMessage";
// import { useNavigate } from "react-router-dom";

// const tab = [
//   { id: 0, label: "Home" },
//   { id: 1, label: "Create Course" },
//   { id: 2, label: "Course Created" },
// ];
// const InstructorDashboard = () => {
//   const [activeTab, setActiveTab] = useState(0);
//   const { getTutorCourses } = queries;
//   const navigate = useNavigate();
//   const { data, isLoading, isError } = useQuery({
//     queryKey: ["tutor-courses"],
//     queryFn: getTutorCourses,
//   });
//   if (isLoading) {
//     return <OverlayLoader showing={true} />;
//   }
//   console.log(data.data);

  

//   const viewCourse = (courseId) => {
//     navigate(`/course-materials/${courseId}`);
//   };


//   return (
//     <div>
//       <Nav />
//       <div className="dashboard">
//         <div className="dashboard-container">
//           <div className="dashboard-tab">
//             {tab.map((tab) => (
//               <button
//                 key={tab.id}
//                 className={activeTab === tab.id ? "active" : ""}
//                 onClick={() => setActiveTab(tab.id)}
//               >
//                 {tab.label}
//               </button>
//             ))}
//           </div>
//         </div>
//         <div className="dashboard-content">
//           {activeTab === 0 && (
//             <div className="content-container">
//               <h2>CREATE COURSES</h2>
//               <div className="create-course">
//                 <Create />
//               </div>
//               <div className="search-container">
//                 <h2>COURSE CREATED</h2>
//               </div>
//               <div className="fcourse-container">
//                 {data?.data?.resource?.length > 0 ? (
//                   <div className="fcourse-scroll">
//                     {data.data.resource.map((resource) => (
//                       <Created key={resource?._id} resource={resource} />
//                     ))}
//                   </div>
//                 ) : (
//                   <>
//                     <EmptyMessage content="You have not created a course yet" />
//                   </>
//                 )}
//               </div>
//             </div>
//           )}
//           {activeTab === 1 && (
//             <div className="content-container">
//               <div className="create-container">
//                 <Create />
//               </div>
//             </div>
//           )}
//           {activeTab === 2 && (
//             <div className="fcourse-container" 
//             onClick={(resource) => viewCourse(resource?._id)}>
//               <div className="instcourse-container">
//                 {data?.data?.resource?.length > 0 ? (
//                   <div className="fcourse-scroll">
//                     {data.data.resource.map((resource) => (
//                       <Created key={resource?.id} resource={resource} />
//                     ))}
//                   </div>
//                 ) : (
//                   <>
//                     <EmptyMessage content="You have not created a course yet" />
//                   </>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InstructorDashboard;



import React, { useState } from "react";
import "../DashboardPage/Dashboard.css";
import "./InstructorDashboard.css";
import Nav from "../../component/Navbar/Nav";
import Create from "../../component/Create Courses/Create";
import Created from "../../component/Featured Courses/Created";
import { queries } from "../../api";
import { useQuery } from "@tanstack/react-query";
import { OverlayLoader } from "../../loaders";
import EmptyMessage from "../../component/EmptyMessage";
import { useNavigate } from "react-router-dom";

const tab = [
  { id: 0, label: "Home" },
  { id: 1, label: "Create Course" },
  { id: 2, label: "Course Created" },
];

const InstructorDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { getTutorCourses } = queries;
  const navigate = useNavigate();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["tutor-courses"],
    queryFn: getTutorCourses,
  });

  if (isLoading) {
    return <OverlayLoader showing={true} />;
  }

  const viewCourse = (courseId) => {
    navigate(`/course-materials/${courseId}`);
  };

  return (
    <div>
      <Nav />
      <div className="dashboard">
        <div className="dashboard-container">
          <div className="dashboard-tab">
            {tab.map((tab) => (
              <button
                key={tab.id}
                className={activeTab === tab.id ? "active" : ""}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        <div className="dashboard-content">
          {activeTab === 0 && (
            <div className="content-container">
              <h2>CREATE COURSES</h2>
              <div className="create-course">
                <Create />
              </div>
              <div className="search-container">
                <h2>COURSE CREATED</h2>
              </div>
              <div className="fcourse-container">
                {data?.data?.resource?.length > 0 ? (
                  <div className="fcourse-scroll">
                     {data.data.resource.map((resource) => (
                      <div
                        key={resource?._id}
                        className="created-course"
                        onClick={() => viewCourse(resource?._id)}
                      >
                        <Created resource={resource} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    <EmptyMessage content="You have not created a course yet" />
                  </>
                )}
              </div>
            </div>
          )}
          {activeTab === 1 && (
            <div className="content-container">
              <div className="create-container">
                <Create />
              </div>
            </div>
          )}
          {activeTab === 2 && (
            <div className="fcourse-container">
              <div className="instcourse-container">
                {data?.data?.resource?.length > 0 ? (
                  <div className="fcourse-scroll">
                    {data.data.resource.map((resource) => (
                      <div
                        key={resource?._id}
                        className="created-course"
                        onClick={() => viewCourse(resource?._id)}
                      >
                        <Created resource={resource} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    <EmptyMessage content="You have not created a course yet" />
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;
