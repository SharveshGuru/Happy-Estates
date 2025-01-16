import React, { useState, useEffect } from 'react';
import styles from './ApplyForLease.module.css';

const ApplyForLease = ({id,property}) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [formData,setFormData]=useState({description:"Payment Reminder", date:currentDate.toDateString(), remarks:"" });
    const [updated,setUpdated]=useState(false);

    useEffect(()=>{
        const interval=setInterval(()=>{
            setCurrentDate(new Date());
        },1000);
        return ()=>clearInterval(interval);
    },[]);

    const getTodayDate = () => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, "0");
        const dd = String(today.getDate()).padStart(2, "0");
      
        return `${yyyy}-${mm}-${dd}`;
    };

    

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
            <h2 className={styles.heading}>Apply for Lease</h2>
            <br></br>
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formheader}>
                <label >Property: {property.name}</label>
                <label >{formData.date}</label>
            </div><br />
            <label className={styles.formlabel}>Description: </label>
            <select className={styles.forminput} value={formData.description} name="description" onChange={handleChange} required >
                <option value="Payment Reminder">Payment Reminder</option>
                <option value="Repair & Maintenance">Repair & Maintenance</option>
                <option value="Others">Others</option>
            </select>
            <br/>
            <label className={styles.formlabel}>Remarks: </label>
            <input className={styles.forminput} onChange={handleChange} type="text" name='remarks' value={formData.remarks} placeholder='Enter remarks' required></input>
            <br/>
            
            <button className={styles.submit} type='submit'>Create Request</button>
            </form></>}
            {updated && <h2>Request has been created successfully!</h2>}
        </div>
    );
};

export default ApplyForLease;
