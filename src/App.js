import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import InstructorDashboard from "./pages/Instructor Dash/InstructorDashboard";
import Signup from "./pages/Signup/Signup";
import PassRecover from "./pages/Signup/PassRecover";
import Newpass from "./pages/Signup/Newpass";
import Dashboard from "./pages/DashboardPage/Dashboard";
import CourseMaterials from "./pages/CoursePage/CourseMaterials";
import CourseContent from "./pages/Course Content/CourseContent";
import Profile from "./pages/User Profile/Profile";
import ChangePass from "./pages/Signup/ChangePass";
import CourseOutline from "./pages/Instructor Dash/CourseOutline";
import InstructorMaterials from "./pages/CoursePage/InstructorMaterials";
import InstructorMaterials2 from "./pages/CoursePage/InstructorMaterials2";
import { Provider } from "react-redux";
import store from "./store/store";
import InstructorEdit from "./pages/Instructor Edit Page/InstructorEdit";
import InstructorOutline from "./pages/Instructor Edit Page/InstructorOutline";
import CreatedCourse from "./pages/Instructor Dash/CreatedCourse";
import Verify from "./pages/Signup/Verify";
import InstructorLogin from "./component/Register/InstructorLogin";
import StudentLogin from "./component/Register/StudentLogin";
import PrivateRoutes from "./component/PrivateRoutes";
import { PublicRoutes } from "./component/PublicRoutes";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path="/instructor" element={<InstructorLogin />} />
              <Route path="/student" element={<StudentLogin />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/course-materials" element={<CourseMaterials />} />
              <Route path="/course-materials/:id" element={<CourseMaterials />} />
              <Route path="/course-content" element={<CourseContent />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/change-pass" element={<ChangePass />} />

              {/*Instructor Page*/}

              <Route
                path="/instructor-dashboard"
                element={<InstructorDashboard />}
              />
              <Route path="/course-outline" element={<CourseOutline />} />
              <Route path="/created-course" element={<CreatedCourse />} />
              <Route
                path="/instructor-materials"
                element={<InstructorMaterials />}
              />
              <Route
                path="/instructor-materials-2"
                element={<InstructorMaterials2 />}
              />
              <Route path="/instructor-edit" element={<InstructorEdit />} />
              <Route
                path="/instructor-Outline"
                element={<InstructorOutline />}
              />
            </Route>

            <Route element={<PublicRoutes />}>
              <Route path="/verify" element={<Verify />} />
              <Route path="/pass-recover" element={<PassRecover />} />
              <Route path="/new-pass" element={<Newpass />} />
              <Route path="/" element={<Signup />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
