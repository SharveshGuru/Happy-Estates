import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Home from './components/Home/Home';
import Register from './components/Register/Register';
import EmployeeManagement from './components/EmployeeManagement/EmployeeManagement';
import ShiftManagement from './components/ShiftManagement/ShiftManagement';
import styles from './App.module.css';
import Login from './components/Login/Login';
import PropertyListings from './components/PropertyListings/PropertyListings';
import MyProperty from './components/MyProperty/MyProperty';
import PayRent from './components/PayRent/PayRent';
import RaiseRequest from './components/RaiseRequest/RaiseRequest';
import Profile from './components/Profile/Profile';
import Temp from './components/Temp';
import { UserProvider } from './components/UserContext';
import { ProtectedRoute } from './components/ProtectedRoute';
function App() {
  return (
    <div className={styles.app}>
      {/* <h1 id="heading">Real Estate Management Portal</h1> */}
      <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/home"></Navigate>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/property-listings" element={<ProtectedRoute><PropertyListings/></ProtectedRoute>}/>
          <Route path="/my-property" element={<ProtectedRoute><MyProperty/></ProtectedRoute>}/>
          <Route path="/pay-rent" element={<ProtectedRoute><PayRent/></ProtectedRoute>}/>
          <Route path="/raise-request" element={<ProtectedRoute><RaiseRequest/></ProtectedRoute>}/>
          <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
          <Route path="/temp" element={<Temp/>}/>
        </Routes>
      </Router>
      </UserProvider>
    </div>
  );
}

export default App;
