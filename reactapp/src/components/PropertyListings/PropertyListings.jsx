import React, { useEffect, useState } from "react";
import axios from 'axios';
import styles from "./PropertyListings.module.css";
import { useNavigate } from "react-router-dom";
const PropertyListings = () =>{

    const [properties,setProperties]=useState([]);
    const navigate=useNavigate();
    useEffect(()=>{
        axios.get("http://localhost:8080/availableproperties")
        .then((response)=>setProperties(response.data))
        .catch((error)=>console.error());
    },[]);

    function redirect(id){
        navigate(`/viewproperty/${id}`)
    }
    return(
        <div className={styles.page}>
            <h1 className={styles.heading}>Property Listings</h1>
            <div className={styles.container}>
                {properties.map(property=>(
                    <div className={styles.listing}>
                        <div className={styles.listingHeader}>
                            <h2>{property.name}</h2>
                            <h2>Posted By: {property.owner.name}</h2>
                        </div>
                        <div className={styles.listingContent}>
                            <div>
                                <p>Property Type: {property.type}</p>
                                <p>Number of Rooms: {property.numberOfRooms}</p>
                                <p>Plot Area: {property.plotArea} sqft</p>
                                <p>Address: {property.address}</p>
                                <p>Price: ₹{property.price}/month</p>
                            </div>
                            <div>
                                <button onClick={()=>redirect(property.id)} className={styles.viewButton}>View Property</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PropertyListings;