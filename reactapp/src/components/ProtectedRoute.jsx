import React,{useContext} from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";

export const ProtectedRoute=({children})=>{
    const {loggedIn}=useContext(UserContext);
    return loggedIn?children:<Navigate to="/login" />;
}
export const OwnerRoute=({children})=>{
    const {loggedIn}=useContext(UserContext);
    const {user}=useContext(UserContext);
    return loggedIn?(user.usertype==="Owner"?children:<Navigate to="/home" />):<Navigate to="/login" />;
}
export const TenantRoute=({children})=>{
    const {loggedIn}=useContext(UserContext);
    const {user}=useContext(UserContext);
    return loggedIn?(user.usertype==="Tenant"?children:<Navigate to="/home" />):<Navigate to="/login" />;
}