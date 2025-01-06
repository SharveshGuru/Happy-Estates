import React from 'react';
import {BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Home from './components/Home/Home';
import Register from './components/Register/Register';
import EmployeeManagement from './components/EmployeeManagement/EmployeeManagement';
import ShiftManagement from './components/ShiftManagement/ShiftManagement';
import styles from './App.module.css';
import Login from './components/Login/Login';
import PropertyListings from './components/PropertyListings/PropertyListings';
import MyProperty from './components/MyProperty/MyProperty';
import RaiseRequest from './components/Requests/Requests';
import Profile from './components/Profile/Profile';
import Temp from './components/Temp';
import { UserProvider } from './components/UserContext';
import { ProtectedRoute,OwnerRoute,TenantRoute } from './components/ProtectedRoute';
import Payments from './components/Payments/Payments';
import ManageProperties from './components/ManageProperties/ManageProperties';
import ManageTenants from './components/ManageTenants.jsx/ManageTenants';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <div className={styles.app}>
      <UserProvider>
        <Router>
          <AppContent />
        </Router>
      </UserProvider>
    </div>
  );
}

function AppContent() {
  const location = useLocation(); 
  return (
    <>
      {!location.pathname.startsWith('/home') && <Navbar />}
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/property-listings" element={<TenantRoute><PropertyListings /></TenantRoute>} />
        <Route path="/my-property" element={<TenantRoute><MyProperty /></TenantRoute>} />
        <Route path="/payments" element={<ProtectedRoute><Payments /></ProtectedRoute>} />
        <Route path="/requests" element={<ProtectedRoute><RaiseRequest /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/manage-properties" element={<OwnerRoute><ManageProperties /></OwnerRoute>} />
        <Route path="/manage-tenants" element={<OwnerRoute><ManageTenants /></OwnerRoute>} />
        <Route path="/temp" element={<Temp />} />
      </Routes>
    </>
  );
}

export default App;

