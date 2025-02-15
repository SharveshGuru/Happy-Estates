import React, { useState } from 'react';
import styles from './AddProperty.module.css';
import axiosInstance from '../../Api';

const AddProperty = () => {
    const getTodayDate = () => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, "0");
        const dd = String(today.getDate()).padStart(2, "0");
      
        return `${yyyy}-${mm}-${dd}`;
    };

    const user = JSON.parse(localStorage.getItem("user"));

    const [formData,setFormData]=useState({
        name:"",
        type:"Apartment",
        numberOfRooms:"",
        plotArea:"",
        address:"",
        price:"",
        postedOn:getTodayDate(),
        details:"",
        owner:null,
    });
    const [updated,setUpdated]=useState(false);

    function handleChange(e){
        setFormData({...formData, [e.target.name]:e.target.value});
    }
    function handleSubmit(e){
        e.preventDefault();

        axiosInstance.post(`/property/${user.sub}`, formData)
        .then((response => {
            setUpdated(true);
        }))
        .catch((error)=>window.alert("There was a problem in Adding Property!"));
    }

    return (
        <div className={styles.container}>
            {/* {console.log(formData)} */}
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
            <input className={styles.forminput} onChange={handleChange} type="text" name='numberOfRooms' value={formData.numberOfRooms} placeholder='Enter Number of Rooms (Eg: 2BHK)' required></input><br />
            <label className={styles.formlabel}>Plot Area (sqft): </label>
            <input className={styles.forminput} onChange={handleChange} type="number" name='plotArea' value={formData.plotArea} placeholder='Enter Plot Area in sqft' step="0.01" min="0" required></input>
            <br/>
            <label className={styles.formlabel}>Property Details: </label>
            <textarea className={styles.forminput} onChange={handleChange} name='details' value={formData.details} placeholder='Enter Property Details' required /><br />
            <label className={styles.formlabel}>Property Price(per month): </label>
            <input className={styles.forminput} onChange={handleChange} type="number" name='price' value={formData.price} placeholder='Enter Property Price per month' step="0.01" min="0" required></input>
            <button className={styles.submit} type='submit'>Add Property</button>
            </form></>}
            {updated && <h2>Property has been added successfully!</h2>}
        </div>
    );
};

export default AddProperty;
