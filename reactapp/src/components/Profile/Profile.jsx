import React,{ useEffect, useState} from 'react';
import styles from "./Profile.module.css"
import Popup from "../Popup/Popup";
import EditProfile from "./EditProfile.jsx";
import ChangePassword from "./ChangePassword.jsx";
import axiosInstance from '../../Api';

const Profile = () =>{
    const [profile,setProfile]=useState({});
    const [edit,setEdit]=useState(false);
    const [change,setChange]=useState(false);

    function handleChange(){
        setChange(!change);
    }
    function handleEdit(){
        setEdit(!edit);
    }

    useEffect(()=>{
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if(storedUser && storedUser.sub){
          axiosInstance.get(`user/${storedUser.sub}`)
          .then((response)=>{
            setProfile(response.data);
          })
          .catch((error)=>console.log(error));
        }
      },[edit,change]);

    return(
        <div className={styles.homepage}>
            <h1 className={styles.heading}>Profile</h1>
                <div className={styles.container}>
                    <div className={styles.content}>
                        <p>Name: {profile.name}</p>
                        <p>Email: {profile.email}</p>
                        <p>Phone Number: {profile.phone}</p>
                        <p>User Type: {profile.userType}</p>
                        <p>Username: {profile.username}</p>
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