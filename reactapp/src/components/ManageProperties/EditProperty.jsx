import React, { useState} from 'react';
import styles from './AddProperty.module.css';
import axiosInstance from '../../Api';

const EditProperty = ({property}) => {

    const [formData,setFormData]=useState(property);
    const [updated,setUpdated]=useState(false);

    function handleChange(e){
        setFormData({...formData, [e.target.name]:e.target.value});
    }
    function handleSubmit(e){
        e.preventDefault();
        // console.log(formData);
        axiosInstance.put(`property/${property.id}`,formData)
        .then(response=>setUpdated(!updated))
        .catch((error)=>window.alert("There was a problem in Editing Property Details!"));

    };
    return (
        <div className={styles.container}>
            {/* {console.log(formData)} */}
            {!updated &&<>
            <h2 className={styles.heading}>Edit Property Details</h2>
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
            <label className={styles.formlabel}>Plot Area: </label>
            <input className={styles.forminput} onChange={handleChange} type="number" name='plotArea' value={formData.plotArea} placeholder='Enter Plot Area in sqft' step="0.01" min="0" required></input>
            <br/>
            <label className={styles.formlabel}>Property Details: </label>
            <textarea className={styles.forminput} onChange={handleChange} name='details' value={formData.details} placeholder='Enter Property Details' required /><br />
            <label className={styles.formlabel}>Property Price(per month): </label>
            <input className={styles.forminput} onChange={handleChange} type="number" name='price' value={formData.price} placeholder='Enter Property Price per month' step="0.01" min="0" required></input>
            <button className={styles.submit} type='submit'>Edit Property</button>
            </form></>}
            {updated && <h2>Property has been edited successfully!</h2>}
        </div>
    );
};

export default EditProperty;
