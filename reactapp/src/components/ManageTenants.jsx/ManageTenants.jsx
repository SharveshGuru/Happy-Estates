import React, { useState } from "react";
import styles from "./ManageTenants.module.css"
import { useNavigate } from "react-router-dom";
import Popup from "../Popup/Popup";
import LeaseApplications from "./LeaseApplications";

const ManageTenants = () =>{

    const [open,setOpen]=useState(false);
    const navigate=useNavigate();
    const tenants=[
        {
            name:"Gopal Housing",
            id:"PROP-001",
            address:"St. Thomas Mount, Chennai, Tamil Nadu",
            owner:"Dummy Bro",
            tenant:"Venkat",
            price:"₹50000",
            leaseDuration:"12 months",
            leaseStartDate:"1 January 2025",
            leaseEndDate:"31 December 2025",
        },

        {
            name:"Mukesh Housing",
            id:"PROP-001",
            address:"St. Thomas Mount, Chennai, Tamil Nadu",
            owner:"Dummy Bro",
            tenant:"Matthew",
            price:"₹70000",
            leaseDuration:"12 months",
            leaseStartDate:"1 January 2025",
            leaseEndDate:"31 December 2025",
        },

    ];

    function handleOpen(){
        setOpen(!open);
    }

    const handleRequest=()=>{
        navigate("/requests")
    }

    const handlePayments=()=>{
        navigate("/payments")
    }

    return(
        <div className={styles.page}>
            <div className={styles.header}>
                <h1 className={styles.heading}>Manage Tenants</h1>
                <button onClick={handleOpen} className={styles.leaseApplications}>Lease Applications</button>
            </div>
            <div className={styles.container}>
                {tenants.map((data,index)=>(
                    <div className={styles.listing}>
                        <div className={styles.tenantListing}>
                            <div className={styles.tenantContent}>
                                <h3>Tenant: {data.tenant}</h3>
                                <p>Property Name: {data.name}</p>
                                <p>Address: {data.address}</p>
                                <p>Lease Amount: {data.price}</p>
                                <p>Lease Duration: {data.leaseDuration}</p>
                                <p>Lease Start Date: {data.leaseStartDate}</p>
                                <p>Lease End Date: {data.leaseEndDate}</p>
                            </div>
                            <div>
                                <button onClick={handlePayments} className={styles.tenantButton}>Payments</button>
                                <br></br>
                                <button onClick={handleRequest} className={styles.tenantButton}>Requests</button>
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