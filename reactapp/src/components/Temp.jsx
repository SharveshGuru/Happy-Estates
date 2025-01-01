import React,{useContext} from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { BiSolidBuildingHouse } from "react-icons/bi";
import { HiHome } from "react-icons/hi2";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { CiSquareQuestion } from "react-icons/ci";
import { FaUser } from "react-icons/fa";
import Logout from './Login/Logout';
import styles from "./Navbar/Navbar.module.css";
import { Link, useLocation } from "react-router-dom";
const Temp=()=>{
    const location=useLocation();
    const isActive = (path) => location.pathname.startsWith(path);
      
    return(
        <nav className={styles.navbar}>
            <div className={styles.navbarLeft}>
                <Link to="/" className={styles.navbarBrand}>Happy Estates</Link>
            </div>
            <div className={styles.navbarRight}>
                <ul className={styles.navbarNav}>
                    <li>
                        <Link to="/temp" className={isActive("/temp")?`${styles.navLink} ${styles.active}`:styles.navLink}>Temp</Link>
                    </li>
                    <li>
                        <Link to="/property-listings" className={isActive("/property-listings")?`${styles.navLink} ${styles.active}`:styles.navLink}>Property Listings</Link>
                    </li>
                    <li>
                        <Link to="/my-property" className={isActive("/my-property")?`${styles.navLink} ${styles.active}`:styles.navLink}>My Property</Link>
                    </li>
                    <li>
                        <Link to="/payments" className={isActive("/payments")?`${styles.navLink} ${styles.active}`:styles.navLink}>Payments</Link>
                    </li>
                    <li>
                        <Link to="/requests" className={isActive("/requests")?`${styles.navLink} ${styles.active}`:styles.navLink}>Requests</Link>
                    </li>
                    <li>
                        <Link to="/profile" className={isActive("/profile")?`${styles.navLink} ${styles.active}`:styles.navLink}>Profile</Link>
                    </li>
                    <li>
                        <Logout bs="navLogout" />
                    </li>
                </ul>
            </div>
        </nav>
    )
}
export default Temp;