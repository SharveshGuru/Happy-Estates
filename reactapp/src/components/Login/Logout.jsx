import React from "react";
import { useNavigate } from "react-router-dom";
import styles from './Logout.module.css';

const Logout=(props)=>{
    const navigate=useNavigate();
    const buttonStyle=props && props.bs ? styles[props.bs] : styles.defaultLogout;
    const handleLogout=()=>{
        localStorage.removeItem('user');
        localStorage.setItem('token', null);
        localStorage.setItem('loggedIn', false);
        navigate("/home");
    }
    return(
        // <button onClick={handleLogout} className={style?styles[style] : styles.defaultLogout}>Logout</button>
        <button onClick={handleLogout} className={buttonStyle}>Logout</button>

    );
}

export default Logout;