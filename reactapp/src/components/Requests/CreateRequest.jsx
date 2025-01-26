import React, { useState, useEffect } from 'react';
import styles from './CreateRequest.module.css';
import axiosInstance from '../../Api';
const CreateRequest = () => {

    const getTodayDate = () => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, "0");
        const dd = String(today.getDate()).padStart(2, "0");
      
        return `${yyyy}-${mm}-${dd}`;
    };
    const user=JSON.parse(localStorage.getItem("user"));
    const [currentDate, setCurrentDate] = useState(new Date());
    const [property,setProperty]=useState({});
    const [properties,setProperties]=useState([]);
    const [updated,setUpdated]=useState(false);
    const [selectedProperty,setSelectedProperty]=useState({});
    const [currlease,setCurrlease]=useState({});
    const [formData,setFormData]=useState({
        description:user.role==="ROLE_Tenant"?"Repair & Maintenance":"Payment Reminder", 
        requestDate:getTodayDate(), 
        remarks:"",
        requestMadeBy:{username:user.sub},
        lease:currlease, 
        madeBy:user.role
    });


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
                axiosInstance.get(`/plmapprop/${res.data.id}`)
                .then((d)=>{
                    setFormData({...formData, lease:d.data.lease});
                    setCurrlease(d.data.lease);
                })
                .catch((err)=>{
                    window.alert("Error getting lease details!");
                });
            })
            .catch((err)=>{
                window.alert("Error getting details!");
            })
        }
        else{
            axiosInstance.get(`/leasedownerproperties/${user.sub}`)
            .then((res)=>{
                setProperties(res.data);
                setSelectedProperty(res.data[0]);
                axiosInstance.get(`/plmapprop/${res.data[0].id}`)
                .then((d)=>{
                    setFormData({...formData, lease:d.data.lease});
                    setCurrlease(d.data.lease);
                })
                .catch((err)=>{
                    window.alert("Error getting lease details!");
                });
            })
            .catch((err)=>{
                window.alert("Error getting details!");
            })
        }
    },[user.role,user.sub]);

    useEffect(()=>{
        if(selectedProperty && selectedProperty.id){
            axiosInstance.get(`/plmapprop/${selectedProperty.id}`)
            .then((res)=>{
                setFormData({...formData, lease:res.data.lease});
                setCurrlease(res.data.lease);
            })
            .catch((err)=>{
                window.alert("Error!!!");
            }); 
        }
    },[selectedProperty,selectedProperty.id])


    function handleChange(e){
        setFormData({...formData, [e.target.name]:e.target.value});
    }

    function handleSelectedPropertyChange(e){
        const {name,value}=e.target;
        setSelectedProperty(JSON.parse(value));
    }
    function handleSubmit(e){
        e.preventDefault();
        axiosInstance.post("/requests",formData)
        .then((res)=>{
            setUpdated(!updated);
        })
        .catch((err)=>{
            window.alert("Error creating request!");
        });
    };
    return (
        <div className={styles.container}>
            {!updated &&<>
            <h2 className={styles.heading}>Create Request</h2>
            <br></br>
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formheader}>
                {user.role==="ROLE_Tenant" ? (<label >Property: {property.name}</label>):<></>}
                <label >{currentDate.toDateString()}</label>
            </div><br />
            {user.role==="ROLE_Owner" && <><label className={styles.formlabel}>Property: </label>
            <select className={styles.forminput} value={JSON.stringify(formData.property)} name="property" onChange={handleSelectedPropertyChange} required >
                {properties.map((data,index)=>(
                    <option key={index} value={JSON.stringify(data)}>{data.name}</option>))}
            </select>
            <br/></>}
            <label className={styles.formlabel}>Description: </label>
            <select className={styles.forminput} value={formData.description} name="description" onChange={handleChange} required >
                {user.role==="ROLE_Owner" && <option value="Payment Reminder">Payment Reminder</option>}
                {user.role==="ROLE_Tenant" && <option value="Repair & Maintenance">Repair & Maintenance</option>}
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

export default CreateRequest;
