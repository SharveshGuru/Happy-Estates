import React, { useEffect, useState } from "react";
import axios from 'axios';
import styles from "./PropertyListings.module.css";
const PropertyListings = () =>{

    const [properties,setProperties]=useState([]);

    useEffect(()=>{
        axios.get("http://localhost:8080/propertylistings")
        .then((response)=>setProperties(response.data))
        .catch((error)=>console.error(error));
    },[]);
    return(
        <div className={styles.page}>
            <h1 className={styles.heading}>Property Listings</h1>
            <div className={styles.container}>
                {properties.map(property=>(
                    <div className={styles.listing}>
                        <div className={styles.listingHeader}>
                            <h2>{property.name}</h2>
                            <h2>Posted By: {property.owner}</h2>
                        </div>
                        <div className={styles.listingContent}>
                            <div>
                                <p>Property Type: {property.type}</p>
                                <p>Number of Rooms: {property.bhk}</p>
                                <p>Plot Area: {property.area}</p>
                                <p>Address: {property.address}</p>
                                <p>Price: ₹{property.price}</p>
                            </div>
                            <div>
                                <button className={styles.viewButton}>View Property</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PropertyListings;