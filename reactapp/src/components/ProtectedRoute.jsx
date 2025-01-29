import React from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute=({children})=>{
    const loggedIn=JSON.parse(localStorage.getItem("loggedIn"));
    return loggedIn?children:<Navigate to="/login" />;
}
export const OwnerRoute=({children})=>{
    const loggedIn=JSON.parse(localStorage.getItem("loggedIn"));
    const user=JSON.parse(localStorage.getItem("user"));
    return loggedIn?(user.role==="ROLE_Owner"?children:<Navigate to="/home" />):<Navigate to="/login" />;
}
export const TenantRoute=({children})=>{
    const loggedIn=JSON.parse(localStorage.getItem("loggedIn"));
    const user=JSON.parse(localStorage.getItem("user"));
    return loggedIn?(user.role==="ROLE_Tenant"?children:<Navigate to="/home" />):<Navigate to="/login" />;
}