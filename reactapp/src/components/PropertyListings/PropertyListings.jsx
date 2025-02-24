import React, { useEffect, useState } from "react";
import styles from "./PropertyListings.module.css";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../Api";
const PropertyListings = () =>{

    const [properties,setProperties]=useState([]);
    const navigate=useNavigate();
    useEffect(()=>{
        axiosInstance.get(`/availableproperties`)
        .then((response)=>setProperties(response.data))
        .catch((error)=>window.alert("Unable to fetch Properties!"))
    },[]);

    function redirect(id){
        navigate(`/viewproperty/${id}`)
    }
    return(
        <div className={styles.page}>
            <h1 className={styles.heading}>Property Listings</h1>
            <div className={styles.container}>
                {properties.length>0 ? (properties.map(property=>(
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
                ))):<h3>There are no available properties!</h3>}
            </div>
        </div>
    )
}

export default PropertyListings;