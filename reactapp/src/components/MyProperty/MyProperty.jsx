import React, { useEffect, useState } from "react";
import styles from "./MyProperty.module.css"
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../Api";
import { format } from "date-fns";

const MyProperty = () =>{

    const navigate=useNavigate();
    const user=JSON.parse(localStorage.getItem("user"));
    const [property,setProperty]=useState({
        "id": null,
        "name": null,
        "type": null,
        "numberOfRooms": null,
        "plotArea": null,
        "address": null,
        "price": null,
        "owner": {
            "id": null,
            "name": null,
            "email": null,
            "phone": null,
            "username": null,
        },
        "tenant": {},
        "availabilityStatus": null,
        "postedOn": null,
        "images": [],
        "details": null
    });
    const [ldata,setLdata]=useState({});

    useEffect(()=>{
        axiosInstance.get(`/tenantproperty/${user.sub}`)
        .then((res)=>{
            setProperty(res.data);
            // console.log(res.data);
        })
        .catch((err)=>{
            window.alert("Error getting details!");
        })
    },[user.sub]);

    useEffect(()=>{
        if(property && property.id){
            axiosInstance.get(`plmapprop/${property.id}`)
            .then((res)=>{
                setLdata(res.data);
                // console.log(res.data);
            })
            .catch((err)=>{
                window.alert("Error getting details!");
            });
        }
    },[property]);

    const handleRequest=()=>{
        navigate("/requests")
    }

    const docurl="../../../public/assets/docs/Beige Floral Page Border.pdf";
    return(
        <div className={styles.page}>
            <h1 className={styles.heading}>My Property</h1>
            <div className={styles.container}>
                <div className={styles.listing}>
                    {(property && ldata.lease) ? (<div className={styles.listingContent}>
                        <div>
                            <h2>Property Details:</h2><br />
                            <p>Property Name: {property.name}</p>
                            <p>Address: {property.address}</p>
                            <p>Lease Amount: ₹{property.price}/month</p>
                            <p>Lease Start Date: {format(new Date(ldata.lease.leaseStartDate),"dd MMMM yyyy")}</p>
                            <p>Lease End Date: {format(new Date(ldata.lease.leaseEndDate),"dd MMMM yyyy")}</p>
                            <p>Lease Duration: {ldata.lease.duration} days</p>
                        </div>
                        <div className={styles.ownerContent}>
                            <h2>Owner Details:</h2><br />
                            <p>Owner Name: {property.owner.name}</p>
                            <p>Email ID: {property.owner.email}</p>
                            <p>Phone Number: {property.owner.phone}</p>
                            <button onClick={handleRequest} className={styles.requestButton}>Raise Requests</button>
                        </div>
                    </div>):<h3>You have no property rented</h3>}
                </div>
                <div className={styles.listing}>
                    <h2>Property Documents:</h2>
                    <br></br>
                    <table className={styles.table}>
                        <thead>
                            <tr className={styles.headerRow}>
                                <th className={styles.th}>Document Name</th>
                                <th className={styles.th}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className={styles.row}>
                                <td className={styles.td}>Lease Agreement 2025</td>
                                <td className={styles.td + " "+ styles.buttonRow}>
                                    <button className={styles.actionButton}>View</button>    
                                    <button className={styles.actionButton}>Download</button>
                                </td>
                            </tr>
                            <tr className={styles.row}>
                                <td className={styles.td}>Lease Agreement 2024</td>
                                <td className={styles.td + " "+ styles.buttonRow}>
                                    <button className={styles.actionButton}>View</button>    
                                    <button className={styles.actionButton}>Download</button>
                                </td>
                            </tr>
                            <tr className={styles.row}>
                                <td className={styles.td}>Lease Agreement 2023</td>
                                <td className={styles.td + " "+ styles.buttonRow}>
                                    <button className={styles.actionButton}>View</button>    
                                    <button className={styles.actionButton}>Download</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default MyProperty;