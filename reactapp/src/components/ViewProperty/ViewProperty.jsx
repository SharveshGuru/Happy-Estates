import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./ViewProperty.module.css";
import axios from "axios";
import { format } from 'date-fns';
import Popup from "../Popup/Popup";
import ApplyForLease from "./ApplyForLease";

const ViewProperty=()=>{

    const { id } = useParams();
    const [open,setOpen]=useState(false);
    
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
        "tenant": null,
        "availabilityStatus": null,
        "postedOn": null,
        "images": [],
        "details": null
    });

    useEffect(()=>{
        axios.get(`http://localhost:8080/property/${id}`)
        .then((response)=>{
            setProperty(response.data)
            console.log(property);
        })
        .catch((error)=>window.alert(error));
    },[id]);

    function handlePopup(){
        setOpen(!open);
    }

    return(
        <div className={styles.page}>
            <h1 className={styles.heading}>{property.name}</h1>
            <div className={styles.container}>
                <div className={styles.listing}>
                    <div className={styles.listingContent}>
                        <div>
                            <h2>Property Details:</h2><br />
                            <p>Property Name: {property.name}</p>
                            <p>Address: {property.address}</p>
                            <p>Price: ₹{property.price}/month</p>
                            <p>Description: {property.details}</p>
                            <p>Posted On: {format(new Date(property.postedOn),'dd MMMM yyyy')}</p>

                        </div>
                        <div className={styles.ownerContent}>
                            <h2>Owner Details:</h2><br />
                            <p>Owner Name: {property.owner.name}</p>
                            <p>Email ID: {property.owner.email}</p>
                            <p>Phone Number: {property.owner.phone}</p>
                            <button onClick={handlePopup} className={styles.requestButton}>Apply for Lease</button>
                        </div>
                    </div>
                </div>
                <div className={styles.listing}>
                    <h2>Property Images:</h2>
                    <br></br>
                    
                </div>
            </div>
            <Popup isOpen={open} onClose={handlePopup}>
                <ApplyForLease id={id} property={property}/>
            </Popup>
        </div>
    )
}
export default ViewProperty;