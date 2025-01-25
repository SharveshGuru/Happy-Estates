import React, { useState, useEffect } from 'react';
import styles from './MakePayment.module.css';
import axiosInstance from '../../Api';
const MakePayment = () => {

    const getTodayDate = () => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, "0");
        const dd = String(today.getDate()).padStart(2, "0");
      
        return `${yyyy}-${mm}-${dd}`;
    };
    const user=JSON.parse(localStorage.getItem("user"));
    const [currentDate, setCurrentDate] = useState(new Date());
    const [trigger,setTrigger]=useState(false);
    const [property, setProperty] = useState({});
    const [properties,setProperties]=useState([]);
    const [formData,setFormData]=useState({
        paymentMadeBy:{username:user.sub},
        lease:{},
        description:user.role==="ROLE_Tenant"?"Lease Payment":"Repair & Maintenance", 
        property:{},
        paymentDate:getTodayDate(), 
        remarks:"",
        amount:"",
    });
    const [updated,setUpdated]=useState(false);
    

    useEffect(()=>{
        const interval=setInterval(()=>{
            setCurrentDate(new Date());
        },1000);
        return ()=>clearInterval(interval);
    },[]);

    useEffect(()=>{
        if(user.role==="ROLE_Tenant"){
            axiosInstance.get(`/tenantproperty/${user.sub}`)
            .then((res)=>{
                setProperty(res.data);
                // console.log(res.data);
            })
            .catch((err)=>{
                window.alert("Error getting details!");
            })
        }
        else{
            axiosInstance.get(`/leasedownerproperties/${user.sub}`)
            .then((res)=>{
                setProperties(res.data);
                axiosInstance.get(`/plmapprop/${res.data[0].id}`)
                .then((d)=>{
                    setFormData({...formData, lease:d.data.lease});
                })
                .catch((err)=>{
                    window.alert("Error getting lease details!");
                });
                // console.log(res.data);
            })
            .catch((err)=>{
                window.alert("Error getting details!");
            })
        }
    },[user.role,user.sub]);

    useEffect(()=>{
        if(user.role==="ROLE_Tenant" && property.id){
            // setFormData({...formData, property:property});
            axiosInstance.get(`/plmapprop/${property.id}`)
            .then((res)=>{
                setFormData({...formData, lease:res.data.lease});
            })
            .catch((err)=>{
                window.alert("Error getting lease details!");
            });
        }
    },[user.role,property.id]);


    function updateLease(propid,newFormData){
        axiosInstance.get(`/plmapprop/${propid}`)
        .then((d)=>{
            // console.log(d);
            setFormData({...newFormData, lease:d.data.lease});
        })
        .catch((err)=>{
            window.alert("Error getting lease details!");
        });
    }


    function handleChange(e){
        const { name, value } = e.target;
        const newFormData ={
            ...formData, 
            [name]: name === "property" ? JSON.parse(value) : value
        };

        if(name==="property" && user.role==="ROLE_Owner"){
            const propData=JSON.parse(value);
            updateLease(propData.id,newFormData);
        }
        else{
            setFormData(newFormData);
        }
    }

    function handleSubmit(e){
        e.preventDefault();
        console.log(formData);
        axiosInstance.post(`/payments`,formData)
        .then((res)=>{
            setUpdated(!updated);
        })
        .catch((err)=>{
            window.alert("Error updating payment!");
        });
    };
    return (
        <div className={styles.container}>
            {!updated &&<>
            <h2 className={styles.heading}>Make Payment</h2>
            <br></br>
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formheader}>
                {user.role==="ROLE_Tenant" ? (<label >Property: {property.name}</label>):<></>}
                <label >{currentDate.toDateString()}</label>
            </div><br />
            {user.role==="ROLE_Owner" && <><label className={styles.formlabel}>Property: </label>
            <select className={styles.forminput} value={JSON.stringify(formData.property)} name="property" onChange={handleChange} required >
                {properties.map((data,index)=>(
                    <option key={index} value={JSON.stringify(data)}>{data.name}</option>))}
            </select>
            <br/></>}
            {/* {console.log(formData)} */}
            <label className={styles.formlabel}>Description: </label>
            <select className={styles.forminput} value={formData.description} name="description" onChange={handleChange} required > 
                {user.role==="ROLE_Tenant" && <option value="Lease Payment">Lease Payment</option>}
                {user.role==="ROLE_Owner" && <option value="Repair & Maintenance">Repair & Maintenance</option>}
                <option value="Others">Others</option>
            </select><br/>
            <label className={styles.formlabel}>Amount Paid: </label>
            <input className={styles.forminput} onChange={handleChange} type="number" name='amount' value={formData.amount} placeholder='Enter the Amount paid' step="0.01" min="0" required></input>
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
