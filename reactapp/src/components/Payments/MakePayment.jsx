import React, { useState,useContext, useEffect } from 'react';
import styles from './MakePayment.module.css';
import { UserContext } from '../UserContext';
const MakePayment = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [formData,setFormData]=useState({description:"Lease Payment", date:currentDate.toDateString(), remarks:"" });
    const [updated,setUpdated]=useState(false);
    const {user}=useContext(UserContext);
    useEffect(()=>{
        const interval=setInterval(()=>{
            setCurrentDate(new Date());
        },1000);
        return ()=>clearInterval(interval);
    },[]);

    function handleChange(e){
        setFormData({...formData, [e.target.name]:e.target.value});
    }
    function handleSubmit(e){
        e.preventDefault();
        setUpdated(!updated);
    };
    return (
        <div className={styles.container}>
            {!updated &&<>
            <h2 className={styles.heading}>Make Payment</h2>
            <br></br>
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formheader}>
                <label >Property: Gopal Housing</label>
                <label >{formData.date}</label>
            </div><br />
            <label className={styles.formlabel}>Description: </label>
            <select className={styles.forminput} value={formData.description} name="description" onChange={handleChange} required >
                {user.userType==="Tenant" && <option value="Lease Payment">Lease Payment</option>}
                {user.userType==="Owner" && <option value="Repair & Maintenance">Repair & Maintenance</option>}
                <option value="Others">Others</option>
            </select>
            <br/>
            <label className={styles.formlabel}>Remarks: </label>
            <input className={styles.forminput} onChange={handleChange} type="text" name='remarks' value={formData.remarks} placeholder='Enter remarks' required></input>
            <br/>
            <label className={styles.formlabel}>Upload Proof: </label>
            <input className={styles.forminput} type="file" name='fileUpload' required></input>
            <br/>
            
            <button className={styles.submit} type='submit'>Update Payment</button>
            </form></>}
            {updated && <h2>Payment has been updated successfully!</h2>}
        </div>
    );
};

export default MakePayment;
