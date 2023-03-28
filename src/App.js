import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Signup from './pages/Signup/Signup';
import PassRecover from './pages/Signup/PassRecover';
import Newpass from './pages/Signup/Newpass';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={(<Signup/>)} />
          <Route path="/PassRecover" element={(<PassRecover/>)} />
          <Route path="/Newpass" element={(<Newpass/>)} />
        </Routes>
      </BrowserRouter>   
    </div>
  );
}

export default App;
