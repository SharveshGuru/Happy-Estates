import React, { useState, useEffect } from 'react';
import styles from './AddProperty.module.css';

const AddProperty = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [formData,setFormData]=useState({
        name:"",
        id:"PROP-001",
        type:"Apartment",
        bhk:"",
        area:"",
        address:"",
        tenant:"",
        price:"",
    });
    const [updated,setUpdated]=useState(false);

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
            <h2 className={styles.heading}>Add Property</h2>
            <br></br>
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formheader}>
                <label>{formData.date}</label>
            </div><br />
            <label className={styles.formlabel}>Property Name: </label>
            <input className={styles.forminput} onChange={handleChange} type="text" name='name' value={formData.name} placeholder='Enter Property Name' required></input><br />
            <label className={styles.formlabel}>Property Address: </label>
            <input className={styles.forminput} onChange={handleChange} type="text" name='address' value={formData.address} placeholder='Enter Property Address' required></input><br />
            <label className={styles.formlabel}>Property Type: </label>
            <select className={styles.forminput} value={formData.type} name="type" onChange={handleChange} required >
                <option value="Apartment">Apartment</option>
                <option value="Bunglow/Villa">Bunglow/Villa</option>
                <option value="Penthouse">Penthouse</option>
                <option value="Land">Land</option>
            </select>
            <br/>
            <label className={styles.formlabel}>Number of Rooms: </label>
            <input className={styles.forminput} onChange={handleChange} type="text" name='bhk' value={formData.bhk} placeholder='Enter Number of Rooms (Eg: 2BHK)' required></input><br />
            <label className={styles.formlabel}>Plot Area: </label>
            <input className={styles.forminput} onChange={handleChange} type="number" name='area' value={formData.area} placeholder='Enter Plot Area in sqft' required></input>
            <br/>
            <label className={styles.formlabel}>Property Price: </label>
            <input className={styles.forminput} onChange={handleChange} type="number" name='price' value={formData.price} placeholder='Enter Property Price' required></input>
            <br/>
            
            <button className={styles.submit} type='submit'>Create Request</button>
            </form></>}
            {updated && <h2>Request has been created successfully!</h2>}
        </div>
    );
};

export default AddProperty;
