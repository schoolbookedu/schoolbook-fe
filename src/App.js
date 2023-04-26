import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import InstructorDashboard from './pages/Instructor Dash/InstructorDashboard';
import Signup from './pages/Signup/Signup';
import PassRecover from './pages/Signup/PassRecover';
import Newpass from './pages/Signup/Newpass';
import Dashboard from './pages/DashboardPage/Dashboard';
import CourseMaterials from './pages/CoursePage/CourseMaterials';
import CourseContent from './pages/Course Content/CourseContent';
import Profile from './pages/User Profile/Profile';
import ChangePass from './pages/Signup/ChangePass';
import CourseOutline from './pages/Instructor Dash/CourseOutline';
import InstructorMaterials from './pages/CoursePage/InstructorMaterials';
import InstructorMaterials2 from './pages/CoursePage/InstructorMaterials2';
import { Provider } from 'react-redux';
import store from './store/store';
import InstructorEdit from './pages/Instructor Edit Page/InstructorEdit';


function App() {
  return (
    <Provider store={store}>
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={(<Signup />)} />
          <Route path="/PassRecover" element={(<PassRecover />)} />
          <Route path="/Newpass" element={(<Newpass />)} />
          <Route path="/Dashboard" element={(<Dashboard />)} />
          <Route path="/CourseMaterials" element={(<CourseMaterials />)} />
          <Route path="/CourseContent" element={(<CourseContent />)} />
          <Route path="/Profile" element={(<Profile />)} />
          <Route path="/ChangePass" element={(<ChangePass />)} />
          
          {/*Instructor Page*/}
          
          <Route path="/InstructorDashboard" element={(<InstructorDashboard />)} />
          <Route path="/CourseOutline" element={(<CourseOutline/> )} />
          <Route path="/InstructorMaterials" element={(<InstructorMaterials /> )} />
          <Route path="/InstructorMaterials2" element={(<InstructorMaterials2/> )} />
          <Route path="/InstructorEdit" element={(<InstructorEdit/> )} />
        </Routes>
      </BrowserRouter>
    </div>
    </Provider>
  );
}

export default App;
