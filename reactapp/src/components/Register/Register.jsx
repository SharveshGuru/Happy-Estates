import React, { useState,useContext } from 'react';
import {useNavigate} from 'react-router-dom';
import styles from './Register.module.css';
import { UserContext } from '../UserContext';

const Register = () => {
  
  const [formData,setFormData]=useState({name:"", email:"", phoneno:"", username:"", password:"", usertype:"Tenant"});
  const {setUser}=useContext(UserContext);
  const navigate=useNavigate()

  function handleChange(e){
    setFormData({...formData, [e.target.name]:e.target.value})
    // console.log(formData[e.target.name]);
  }
  function handleSubmit(e){
    e.preventDefault();
    setUser(formData);
    navigate("/login");
  };
  return (
    <div className={styles.page}>
      <div className={styles.registercontainer}>
        <h2 className={styles.heading}>REGISTER</h2>
        <br></br>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.formlabel}>Name: </label>
          <input className={styles.forminput} onChange={handleChange} type="text" name='name' value={formData.name} placeholder='Enter your Name' required></input>
          <br/>
          <label className={styles.formlabel}>Email ID: </label>
          <input className={styles.forminput} onChange={handleChange} type="email" name='email' value={formData.email} placeholder='Enter your Email ID' required></input>
          <br/>
          <label className={styles.formlabel}>Phone Number: </label>
          <input className={styles.forminput} onChange={handleChange} type="tel" name='phoneno' value={formData.phoneno} placeholder='Enter your Phone Number' required></input>
          <br/>
          <label className={styles.formlabel}>User Type: </label>
          <select className={styles.forminput} onChange={handleChange} value={formData.usertype} name="usertype" required>
            <option name='tenant'>Tenant</option>
            <option name='owner'>Owner</option>
          </select>
          <br></br>
          <label className={styles.formlabel}>Username: </label>
          <input className={styles.forminput} onChange={handleChange} type="text" value={formData.username} name='username' placeholder='Set your Username' required></input>
          <br/>
          <label className={styles.formlabel}>Password: </label>
          <input className={styles.forminput} onChange={handleChange} type="password" value={formData.password} name='password' placeholder='Set your Password' required></input>
          <br/>
          <button className={styles.submit} type='submit'>Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
