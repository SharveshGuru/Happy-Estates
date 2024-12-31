import React, { useState,useContext } from 'react';
import {useNavigate} from 'react-router-dom';
import styles from './Login.module.css';
import { UserContext } from '../UserContext';

const Login = () => {

  const [formData,setFormData]=useState({name:"",email:"",phoneno:"",username:"",password:""});
  const {user}=useContext(UserContext);
  const {setLoggedIn}=useContext(UserContext);
  const [error,setError]=useState("");
  const navigate=useNavigate()

  function handleChange(e){
    setFormData({...formData, [e.target.name]:e.target.value})
    // console.log(formData[e.target.name]);
  }
  function handleSubmit(e){
    e.preventDefault();
    if(user && user.username===formData.username && user.password===formData.password){
      setLoggedIn(true);
      navigate("/home");
    }
    else{
        setError("Invalid credentials!")
    }
  };
  return (
    <div className={styles.page}>
      <div className={styles.logincontainer}>
        <h2 className={styles.heading}>Login</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.formlabel}>Username: </label>
          <input className={styles.forminput} onChange={handleChange} type="text" value={formData.username} name='username' placeholder='Enter your Username' required></input>
          <br/>
          <label className={styles.formlabel}>Password: </label>
          <input className={styles.forminput} onChange={handleChange} type="password" value={formData.password} name='password' placeholder='Enter your Password' required></input>
          <br/>
          <button className={styles.submit} type='submit'>Login</button>
        </form>
        {error && <p style={{color:"red"}}>{error}</p>}
      </div>
    </div>
  );
};

export default Login;
