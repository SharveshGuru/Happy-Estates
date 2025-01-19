import React, { useState,useContext,useEffect } from 'react';
import styles from './EditProfile.module.css';
import { UserContext } from '../UserContext';
import axios from 'axios';
import axiosInstance from '../../Api';
import bcrypt from 'bcryptjs';

const ChangePassword = () => {
  const {user}=useContext(UserContext);
  const [formData,setFormData]=useState({currentPassword:"",newPassword:""});
  const [profile,setProfile]=useState({});
  const [updated,setUpdated]=useState(false);
  const [error,setError]=useState("");

  function handleChange(e){
    setFormData({...formData, [e.target.name]:e.target.value})
  }

  function putUser(data){
    axiosInstance.put(`/user/${data.id}`,data)
    .then((response)=>setUpdated(!updated))
    .catch((error)=>setError("There was a trouble in changing the password!"));
    // axios.put(`http://localhost:8080/user/${user.id}`,user)
    //   .then(response=>{
    //     setUpdated(!updated);
    //   })
    //   .catch(error=>{
    //     setError("There was a trouble in changing the password!")
    //   })
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();

    const isMatch=await bcrypt.compare(formData.currentPassword,profile.password);
    // if(profile && profile.password===bcryptpwd){
    if(profile && isMatch){
      const updatedProfile = { ...profile, password: formData.newPassword };
      putUser(updatedProfile);
    }
    else{
      setError("Invalid credentials!")
    }
  };

  useEffect(()=>{
    axiosInstance.get(`user/${user.sub}`)
    .then((response)=>{
      setProfile(response.data);
    })
    .catch((error)=>window.alert("There was a trouble in updating the Profile!"));
  },[user]);
  
  return (
      <div className={styles.registercontainer}>
         {!updated &&<>
        <h2 className={styles.heading}>Change Password</h2>
        <br></br>
       <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.formlabel}>Current Password: </label>
          <input className={styles.forminput} onChange={handleChange} type="password" value={formData.currentPassword} name='currentPassword' placeholder='Enter Current Password' required></input>
          <br/>
          <label className={styles.formlabel}>New Password: </label>
          <input className={styles.forminput} onChange={handleChange} type="password" value={formData.newPassword} name='newPassword' placeholder='Set your New Password' required></input>
          <br/>
          {error && <p style={{color:"red"}}>{error}</p>}
          
          <button className={styles.submit} type='submit'>Change Password</button>
        </form></>}
        {updated && <h2>Password has been changed successfully!</h2>}
      </div>
  );
};

export default ChangePassword;
