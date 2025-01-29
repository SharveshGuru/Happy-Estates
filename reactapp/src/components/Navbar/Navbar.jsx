import React from "react";
import { Link,useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";
import Logout from "../Login/Logout";

const Navbar=()=>{
    
    const loggedIn=JSON.parse(localStorage.getItem("loggedIn"));
    const user=JSON.parse(localStorage.getItem("user"));
    const location=useLocation();
    const isActive = (path) => location.pathname.startsWith(path);
      
    return(
        <>
        {loggedIn && <nav className={styles.navbar}>
            <div className={styles.navbarLeft}>
                <Link to="/" className={styles.navbarBrand}>Happy Estates</Link>
            </div>
            <div className={styles.navbarRight}>
                <ul className={styles.navbarNav}>
                    {user.role==="ROLE_Tenant" && <li>
                        <Link to="/property-listings" className={isActive("/property-listings")?`${styles.navLink} ${styles.active}`:styles.navLink}>Property Listings</Link>
                    </li>}
                    {user.role==="ROLE_Tenant" && <li>
                        <Link to="/my-property" className={isActive("/my-property")?`${styles.navLink} ${styles.active}`:styles.navLink}>My Property</Link>
                    </li>}
                    {user.role==="ROLE_Owner" && <li>
                        <Link to="/manage-properties" className={isActive("/manage-properties")?`${styles.navLink} ${styles.active}`:styles.navLink}>Manage Properties</Link>
                    </li>}
                    {user.role==="ROLE_Owner" && <li>
                        <Link to="/manage-tenants" className={isActive("/manage-tenants")?`${styles.navLink} ${styles.active}`:styles.navLink}>Manage Tenants</Link>
                    </li>}
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
        </nav>}</>
    )
}
export default Navbar;