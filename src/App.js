import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Signup from './pages/Signup/Signup';
import PassRecover from './pages/Signup/PassRecover';
import Newpass from './pages/Signup/Newpass';
import Dashboard from './pages/Dash/Dashboard';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={(<Signup/>)} />
          <Route path="/PassRecover" element={(<PassRecover/>)} />
          <Route path="/Newpass" element={(<Newpass/>)} />
          <Route path="/Dashboard" element={(<Dashboard/>)} />
        </Routes>
      </BrowserRouter>   
    </div>
  );
}

export default App;
