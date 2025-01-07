import React from "react";
import styles from "./PropertyListings.module.css";
const PropertyListings = () =>{
    const property={
        name:"Gopal Housing",
        id:"PROP-001",
        type:"Apartment",
        bhk:"3BHK",
        area:"1800 sqft",
        address:"St. Thomas Mount, Chennai, Tamil Nadu",
        owner:"Dummy Bro",
        price:"₹50000",
    };
    return(
        <div className={styles.page}>
            <h1 className={styles.heading}>Property Listings</h1>
            <div className={styles.container}>
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
                            <p>Price: {property.price}</p>
                        </div>
                        <div>
                            <button className={styles.viewButton}>View Property</button>
                        </div>
                    </div>
                </div>

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
                            <p>Price: {property.price}</p>
                        </div>
                        <div>
                            <button className={styles.viewButton}>View Property</button>
                        </div>
                    </div>
                </div>

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
                            <p>Price: {property.price}</p>
                        </div>
                        <div>
                            <button className={styles.viewButton}>View Property</button>
                        </div>
                    </div>
                </div>

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
                            <p>Price: {property.price}</p>
                        </div>
                        <div>
                            <button className={styles.viewButton}>View Property</button>
                        </div>
                    </div>
                </div>
                
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
                            <p>Price: {property.price}</p>
                        </div>
                        <div>
                            <button className={styles.viewButton}>View Property</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PropertyListings;