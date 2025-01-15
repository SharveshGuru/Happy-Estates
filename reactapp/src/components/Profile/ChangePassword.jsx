import React, { useState,useContext } from 'react';
import styles from './EditProfile.module.css';
import { UserContext } from '../UserContext';
import axios from 'axios';
const ChangePassword = () => {
  const {user,setUser}=useContext(UserContext);
  const [formData,setFormData]=useState({currentPassword:"",newPassword:""});
  // const [userData,setUserData]=useState(user);
  const [updated,setUpdated]=useState(false);
  const [error,setError]=useState("");

  function handleChange(e){
    setFormData({...formData, [e.target.name]:e.target.value})
  }

  function putUser(user){
    axios.put(`http://localhost:8080/user/${user.id}`,user)
      .then(response=>{
        setUpdated(!updated);
      })
      .catch(error=>{
        setError("There was a trouble in changing the password!")
      })
  }

  function handleSubmit(e){
    e.preventDefault();
    if(user && user.password===formData.currentPassword){
      setUser({...user, password:formData.newPassword});
      putUser(user);
    }
    else{
      setError("Invalid credentials!")
    }
  };

  
  return (
      <div className={styles.registercontainer}>
         {!updated &&<>
        <h2 className={styles.heading}>Change Password</h2>
        <br></br>
       <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.formlabel}>Current Password: </label>
          <input className={styles.forminput} onChange={handleChange} type="password" value={formData.password} name='currentPassword' placeholder='Enter Current Password' required></input>
          <br/>
          <label className={styles.formlabel}>New Password: </label>
          <input className={styles.forminput} onChange={handleChange} type="password" value={formData.password} name='newPassword' placeholder='Set your New Password' required></input>
          <br/>
          {error && <p style={{color:"red"}}>{error}</p>}
          
          <button className={styles.submit} type='submit'>Change Password</button>
        </form></>}
        {updated && <h2>Password has been changed successfully!</h2>}
      </div>
  );
};

export default ChangePassword;
