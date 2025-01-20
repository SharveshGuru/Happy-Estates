import React, { useEffect, useState } from "react";
import styles from "./ManageTenants.module.css"
import { useNavigate } from "react-router-dom";
import Popup from "../Popup/Popup";
import LeaseApplications from "./LeaseApplications";
import axiosInstance from "../../Api";
import { format } from "date-fns";

const ManageTenants = () =>{

    const [open,setOpen]=useState(false);
    const user=JSON.parse(localStorage.getItem("user"));
    const navigate=useNavigate();
    const[activeLeases,setActiveLeases]=useState([]);
    const[trigger,setTrigger]=useState(false);

    useEffect(()=>{
        axiosInstance.get(`/activeleases/${user.sub}`)
        .then((response)=>{
            setActiveLeases(response.data);
            console.log(response.data);
        })
        .catch((error)=>{
            console.error(error);
        })
    }, [user.sub,trigger]);

    function handleOpen(){
        setOpen(!open);
    }

    const handleRequest=()=>{
        navigate("/requests")
    }

    const handlePayments=()=>{
        navigate("/payments")
    }

    const handleViewProperty=(id)=>{
        navigate(`/viewproperty/${id}`)
    }

    function handleRemove(data){
        const confirmRemove = window.confirm("Are you sure you want to remove the tenant?");
        if(confirmRemove){
            axiosInstance.put(`/removetenant/${data.property.id}`)
            .then((response)=>setTrigger(!trigger))
            .catch((error)=>window.alert("There was a problem in removing the tenant!"));

            axiosInstance.put(`/plmap/${data.property.id}`)
            .then((response)=>setTrigger(!trigger))
            .catch((error)=>window.alert("There was a problem in removing the tenant!"));
        }
    }

    return(
        <div className={styles.page}>
            <div className={styles.header}>
                <h1 className={styles.heading}>Manage Tenants</h1>
                <button onClick={handleOpen} className={styles.leaseApplications}>Lease Applications</button>
            </div>
            <div className={styles.container}>
                {activeLeases.map((data,index)=>(
                    <div className={styles.listing}>
                        <div className={styles.tenantListing}>
                            <div className={styles.tenantContent}>
                                <h3>Tenant: {data.lease.tenant.name}</h3>
                                <p style={{fontWeight:"bold"}}>Property: {data.property.name}</p>
                                <p>Address: {data.property.address}</p>
                                <p>Lease Amount: ₹{data.property.price}/month</p>
                                <p>Lease Start Date: {format(new Date(data.lease.leaseStartDate),"dd MMMM yyyy")}</p>
                                <p>Lease End Date: {format(new Date(data.lease.leaseEndDate),"dd MMMM yyyy")}</p>
                                <p>Lease Duration: {data.lease.duration} days</p>
                            </div>
                            <div className={styles.tenantButtons}>
                                <button onClick={handlePayments} className={styles.tenantButton}>Payments</button>
                                <button onClick={handleRequest} className={styles.tenantButton}>Requests</button>
                                <button onClick={()=>{handleRemove(data)}} className={styles.removeButton}>Remove</button>
                                <br></br>
                                <button onClick={()=>{handleViewProperty(data.property.id)}} className={styles.requestButton}>View Property</button>
                            </div>
                        </div>                
                    </div>
                ))}
                
            </div>

            <Popup isOpen={open} onClose={handleOpen}>
                <LeaseApplications />
            </Popup>
        </div>
    )
}

export default ManageTenants;