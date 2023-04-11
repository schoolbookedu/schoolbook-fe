import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Signup from './pages/Signup/Signup';
import PassRecover from './pages/Signup/PassRecover';
import Newpass from './pages/Signup/Newpass';
import Dashboard from './pages/DashboardPage/Dashboard';
import CourseMaterials from './pages/CoursePage/CourseMaterials';
import CourseContent from './pages/Course Content/CourseContent';
import Profile from './pages/User Profile/Profile';
import ChangePass from './pages/Signup/ChangePass';


function App() {
  return (
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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
