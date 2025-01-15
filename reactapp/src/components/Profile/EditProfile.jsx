import React, { useState,useContext } from 'react';
import styles from './EditProfile.module.css';
import { UserContext } from '../UserContext';
import axios from 'axios';
const EditProfile = () => {
  const {user,setUser}=useContext(UserContext);
  const [formData,setFormData]=useState(user);
  const [updated,setUpdated]=useState(false);

  function handleChange(e){
    setFormData({...formData, [e.target.name]:e.target.value})
  }
  function handleSubmit(e){
    e.preventDefault();
    
    axios.put(`http://localhost:8080/user/${user.id}`,formData)
    .then(response=>{
      setUser(formData);
      setUpdated(!updated);
    })
    .catch(error=>{
      window.alert("There was a trouble in updating the Profile!")
    })
  };
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
