import React, { useState,useContext,useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import styles from './Login.module.css';
import { UserContext } from '../UserContext';
import axios from 'axios';
const Login = () => {

  const [formData,setFormData]=useState({name:"",email:"",phoneno:"",username:"",password:""});
  const {setUser}=useContext(UserContext);
  const {setLoggedIn}=useContext(UserContext);
  const [error,setError]=useState("");
  const navigate=useNavigate()
  const [validateUser,setValidateUser]=useState(null);
  function handleChange(e){
    setFormData({...formData, [e.target.name]:e.target.value})
    // console.log(formData[e.target.name]);
  }
  function handleSubmit(e){
    e.preventDefault();

    axios.get(`http://localhost:8080/user/${formData.username}`)
    .then((response)=>{
      setValidateUser(response.data);
    })
    .catch((setError("Invalid credentials!")));
  };

  useEffect(()=>{
    if(validateUser && validateUser.username===formData.username && validateUser.password===formData.password){
      setUser(validateUser);
      setLoggedIn(true);
      navigate("/home");
    }
  })
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
