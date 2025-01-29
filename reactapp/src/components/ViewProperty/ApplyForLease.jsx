import React, { useState, useEffect } from 'react';
import styles from './ApplyForLease.module.css';
import axiosInstance from '../../Api';

const ApplyForLease = ({id, property,rented}) => {
    const [profile,setProfile]=useState();
    const [currentDate, setCurrentDate] = useState(new Date());
    
    const [updated, setUpdated] = useState(false);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if(storedUser && storedUser.sub){
          axiosInstance.get(`user/${storedUser.sub}`)
          .then((response)=>{
            setProfile(response.data);
          })
          .catch((error)=>console.log());
        }
        const interval = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (profile) {
          setFormData((prevState) => ({
            ...prevState,
            tenant: profile, 
          }));
        }
      }, [profile]);

    const getTodayDate = () => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, "0");
        const dd = String(today.getDate()).padStart(2, "0");
      
        return `${yyyy}-${mm}-${dd}`;
    };

    const [formData, setFormData] = useState({
        property:property,
        owner: property.owner,
        tenant: profile,
        leaseStartDate: getTodayDate(),
        leaseEndDate: null,
        leaseAmount: property.price,
    });

    const [errors, setErrors] = useState({
        leaseStartDate: '',
        leaseEndDate: ''
    });

    const validateDates = () => {
        const errors = {};
        const startDate = new Date(formData.leaseStartDate);
        const endDate = new Date(formData.leaseEndDate);
        const today = new Date();

        if (startDate < today) {
            errors.leaseStartDate = "Lease start date should not be older than the current date.";
        }

        if (endDate <= startDate || (endDate - startDate) < 30 * 24 * 60 * 60 * 1000) {
            errors.leaseEndDate = "Lease end date should be at least 30 days from the start date.";
        }

        setErrors(errors);

        return Object.keys(errors).length === 0; 
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // console.log(formData);
        if (validateDates()) {
            axiosInstance.post(`/lease`,formData)
            .then((response)=>setUpdated(!updated))
            .catch((error)=>window.alert("There was a problem in submitting the lease application!"))
            
        }
    }
    return (
        <div className={styles.container}>
            {!updated ? (rented==="True" ? (
                <>
                    <h2 className={styles.heading}>Apply for Lease</h2>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.formheader}>
                            <label>Property: {property.name}</label>
                            <label>{currentDate.toDateString()}</label>
                        </div>
                        <br />
                        <label className={styles.formlabel}>Enter Lease Start Date: </label>
                        <input
                            type="date"
                            name="leaseStartDate"
                            value={formData.leaseStartDate}
                            onChange={handleChange}
                            required
                        />
                        {errors.leaseStartDate && <span className={styles.error}>{errors.leaseStartDate}</span>}
                        
                        <label className={styles.formlabel}>Enter Lease End Date: </label>
                        <input
                            type="date"
                            name="leaseEndDate"
                            value={formData.leaseEndDate}
                            onChange={handleChange}
                            required
                        />
                        {errors.leaseEndDate && <span className={styles.error}>{errors.leaseEndDate}</span>}

                        
                        <br />
                        <button className={styles.submit} type="submit">Create Request</button>
                    </form>
                </>
            ) : <h2>You have already rented a property! You cannot rent another!</h2>) : (
                <h2>Lease application has been submitted successfully!</h2>
            )}
        </div>
    );
};

export default ApplyForLease;
