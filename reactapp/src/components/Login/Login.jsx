import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import styles from './Login.module.css';
import authServiceInstance from '../../AuthService';
import { jwtDecode } from 'jwt-decode';

const Login = () => {

  const [formData,setFormData]=useState({name:"",email:"",phone:"",username:"",password:""});
  const [error,setError]=useState("");
  const navigate=useNavigate()
  function handleChange(e){
    setFormData({...formData, [e.target.name]:e.target.value})
    // console.log(formData[e.target.name]);
  }
  async function handleSubmit(e) {
    e.preventDefault();
  
    try {
      let creds = { username: formData.username, password: formData.password };
      const response = await authServiceInstance.login(creds);
  
      if (response.data !== "Invalid Credentials") {
        localStorage.setItem('token', response.data);
        localStorage.setItem('loggedIn', true);
        const userdata = jwtDecode(response.data);
  
        if (userdata) {
          localStorage.setItem('user', JSON.stringify(userdata));  
          navigate("/home");
        } else {
          setError("Failed to retrieve user data.");
        }
      } else {
        setError("Invalid credentials!");
      }
    } catch (error) {
      setError("Invalid credentials!");
    }
  }

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
