import React, { useState,useContext, useEffect } from 'react';
import styles from './EditProfile.module.css';
import { UserContext } from '../UserContext';
import axiosInstance from '../../Api';

const EditProfile = () => {
  const {user}=useContext(UserContext);
  const [updated,setUpdated]=useState(false);
  const [profile,setProfile]=useState({name:"",email:"",phone:null});
  const [formData,setFormData]=useState(profile);

  function handleChange(e){
    setFormData({...formData, [e.target.name]:e.target.value})
  }
  function handleSubmit(e){
    e.preventDefault();

    axiosInstance.put(`/user/${profile.id}`,formData)
    .then((response)=>setUpdated(!updated))
    .catch((error)=>window.alert("There was a trouble in updating the Profile!"));
    
  };

  useEffect(()=>{
    axiosInstance.get(`user/${user.sub}`)
    .then((response)=>{
      setProfile(response.data);
      setFormData(response.data);
    })
    .catch((error)=>window.alert("There was a trouble in updating the Profile!"));
  },[user]);
  
  return (
      <div className={styles.registercontainer}>
         {!updated &&<>
        <h2 className={styles.heading}>Edit Profile</h2>
        <br></br>
       <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.formlabel}>Name: </label>
          <input className={styles.forminput} onChange={handleChange} type="text" name='name' value={formData.name} placeholder='Enter your Name' required></input>
          <br/>
          <label className={styles.formlabel}>Email ID: </label>
          <input className={styles.forminput} onChange={handleChange} type="email" name='email' value={formData.email} placeholder='Enter your Email ID' required></input>
          <br/>
          <label className={styles.formlabel}>Phone Number: </label>
          <input className={styles.forminput} onChange={handleChange} type="tel" name='phone' value={formData.phone} placeholder='Enter your Phone Number' required></input>
          <br/>
          
          <button className={styles.submit} type='submit'>Update Profile</button>
        </form></>}
        {updated && <h2>Profile has been updated successfully!</h2>}
      </div>
  );
};

export default EditProfile;
