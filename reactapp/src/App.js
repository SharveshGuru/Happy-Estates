import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Home from './components/Home/Home';
import Register from './components/Register/Register';
import EmployeeManagement from './components/EmployeeManagement/EmployeeManagement';
import ShiftManagement from './components/ShiftManagement/ShiftManagement';
import styles from './App.module.css';
import Login from './components/Login/Login';
import { UserProvider } from './components/UserContext';

function App() {
  return (
    <div className={styles.app}>
      {/* <h1 id="heading">Real Estate Management Portal</h1> */}
      <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/register"></Navigate>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/home" element={<Home/>}/>
        </Routes>
      </Router>
      </UserProvider>
    </div>
  );
}

export default App;
