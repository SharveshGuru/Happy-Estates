import React, { useState,useContext } from 'react';
import {useNavigate} from 'react-router-dom';
import styles from './Register.module.css';
import { UserContext } from '../UserContext';

const Register = () => {
  
  const [formData,setFormData]=useState({name:"", email:"", phoneno:"", username:"", password:"", usertype:""});
  const {setUser}=useContext(UserContext);
  const navigate=useNavigate()

  function handleChange(e){
    setFormData({...formData, [e.target.name]:e.target.value})
    console.log(formData[e.target.name]);
  }
  function handleSubmit(e){
    e.preventDefault();
    setUser(formData);
    navigate("/login");
  };
  return (
    <div className={styles.registercontainer}>
      <h1>Register</h1>
      <br></br>
      <form onSubmit={handleSubmit}>
        <label>Name: </label>
        <input onChange={handleChange} type="text" name='name' value={formData.name} placeholder='Enter your Name' required></input>
        <br/>
        <label>Email ID: </label>
        <input onChange={handleChange} type="email" name='email' value={formData.email} placeholder='Enter your Email ID' required></input>
        <br/>
        <label>Phone Number: </label>
        <input onChange={handleChange} type="tel" name='phoneno' value={formData.phoneno} placeholder='Enter your Phone Number' required></input>
        <br/>
        <label>User Type: </label>
        <select onChange={handleChange} value={formData.usertype} name="usertype" required>
          <option name='tenant'>Tenant</option>
          <option name='owner'>Owner</option>
        </select>
        <br></br>
        <label>Username: </label>
        <input onChange={handleChange} type="text" value={formData.username} name='username' placeholder='Set your Username' required></input>
        <br/>
        <label>Password: </label>
        <input onChange={handleChange} type="password" value={formData.password} name='password' placeholder='Set your Password' required></input>
        <br/>
        <button className={styles.submit}type='submit'>Register</button>
      </form>
    </div>
  );
};

export default Register;
