import React,{useState,useEffect} from "react";
import styles from "./Profile.module.css"
import { useContext } from "react";
import { UserContext } from "../UserContext";
import Popup from "../Popup/Popup";
import EditProfile from "./EditProfile.jsx";
import ChangePassword from "./ChangePassword.jsx";
const Profile = () =>{
    const {user}=useContext(UserContext);
    const [edit,setEdit]=useState(false);
    const [change,setChange]=useState(false);

    function handleChange(){
        setChange(!change);
    }
    function handleEdit(){
        setEdit(!edit);
    }

    return(
        <div className={styles.homepage}>
            <h1 className={styles.heading}>Profile</h1>
                <div className={styles.container}>
                    <div className={styles.content}>
                        <p>Name: {user.name}</p>
                        <p>Email: {user.email}</p>
                        <p>Phone Number: {user.phoneno}</p>
                        <p>User Type: {user.usertype}</p>
                        <p>Username: {user.username}</p>
                        <div>
                            <button onClick={handleEdit} className={styles.buttons}>Edit Profile</button>
                            <button onClick={handleChange} className={styles.buttons}s>Change Password</button>
                        </div>
                    </div>
                </div>

                <Popup isOpen={edit} onClose={handleEdit}>
                    <EditProfile />
                </Popup>

                <Popup isOpen={change} onClose={handleChange}>
                    <ChangePassword />
                </Popup>
        </div>
    )
}

export default Profile;