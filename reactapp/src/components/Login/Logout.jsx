import React from "react";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";
import styles from './Logout.module.css';

const Logout=(props)=>{
    const{setUser,setLoggedIn}=useContext(UserContext);
    const navigate=useNavigate();
    const buttonStyle=props && props.bs ? styles[props.bs] : styles.defaultLogout;
    const handleLogout=()=>{
        setLoggedIn(false);
        setUser(null);
        navigate("/home");
    }
    return(
        // <button onClick={handleLogout} className={style?styles[style] : styles.defaultLogout}>Logout</button>
        <button onClick={handleLogout} className={buttonStyle}>Logout</button>

    );
}

export default Logout;