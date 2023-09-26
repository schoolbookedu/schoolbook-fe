import { React, useEffect, useState } from "react";
import "./Dashboard.css";
import Courses from "../../component/Courses/Course";
import Fcourse from "../../component/Featured Courses/Fcourse";
import Nav from "../../component/Navbar/Nav";
import Search from "../../component/Searchbar/Search";
import Progress from "../../component/Courses/Progress";
import { queries } from "../../api";
import { OverlayLoader } from "../../loaders";
import { useQuery } from "@tanstack/react-query";
import EmptyMessage from "../../component/EmptyMessage";

const tab = [
  { id: 0, label: "Home" },
  { id: 1, label: "Inprogress" },
];
const Dashboard = () => {
  const [activeTab, setActiveTab] = useState(0);

  const { getCourses } = queries;
  const { data, isLoading, isError } = useQuery({
    queryKey: ["courses"],
    queryFn: getCourses,
  });
  const [search, setSearch] = useState("");

  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);

    if (value === "") {
      // If the search input is empty, display all courses
      setFilteredCourses(courses);
    } else {
      // Otherwise, filter courses based on the search query
      setFilteredCourses(
        courses.filter((course) =>
          course.title.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  };

  useEffect(() => {
    if (data?.data?.resource?.length > 0) {
      setCourses(data?.data?.resource ?? []);
      setFilteredCourses(data?.data?.resource ?? []);
    }
  }, [data?.data?.resource]);

  if (isLoading) {
    return <OverlayLoader showing={true} />;
  }

  console.log(data.data);

  const props = {
    search,
    handleSearch,
  };

  return (
    <>
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
              <h2>Your Courses</h2>
              <Courses />
              <div className="search-container">
                <h2>Featured Courses</h2>
                <Search {...props} />
              </div>
              <div className="fcourse-container">
                {filteredCourses?.length > 0 ? (
                  <div className="fcourse-scroll">
                    {filteredCourses?.map((resource) => (
                      <Fcourse key={resource?.id} resource={resource} />
                    ))}
                  </div>
                ) : (
                  <EmptyMessage content="No courses available" />
                )}
              </div>
            </div>
          )}
          {activeTab === 1 && (
            <div className="content-container">
              <Progress />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
