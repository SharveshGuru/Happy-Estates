import React, { useState } from "react";
import styles from "./ManageProperties.module.css";
import Popup from "../Popup/Popup";
import AddProperty from "./AddProperty";
const ManageProperties = () =>{
    const [open,setOpen]=useState(false);

    function handleAdd(){
        setOpen(!open);
    }
    const property=[
        {
            name:"Gopal Housing",
            id:"PROP-001",
            type:"Apartment",
            bhk:"3BHK",
            area:"1800 sqft",
            address:"St. Thomas Mount, Chennai, Tamil Nadu",
            tenant:"Dummy Bro",
            price:"₹50000",
        },
        {
            name:"Gopal Housing",
            id:"PROP-002",
            type:"Apartment",
            bhk:"3BHK",
            area:"1800 sqft",
            address:"St. Thomas Mount, Chennai, Tamil Nadu",
            tenant:"",
            price:"₹50000",
        },
        {
            name:"Gopal Housing",
            id:"PROP-003",
            type:"Apartment",
            bhk:"3BHK",
            area:"1800 sqft",
            address:"St. Thomas Mount, Chennai, Tamil Nadu",
            tenant:"Dummy Bro",
            price:"₹50000",
        },
        {
            name:"Gopal Housing",
            id:"PROP-004",
            type:"Apartment",
            bhk:"3BHK",
            area:"1800 sqft",
            address:"St. Thomas Mount, Chennai, Tamil Nadu",
            tenant:"Dummy Bro",
            price:"₹50000",
        },
    ];
    return(
        <div className={styles.page}>
            <div className={styles.header}>
                <h1 className={styles.heading}>Manage Properties</h1>
                <button onClick={handleAdd} className={styles.addProperty}>Add Property</button>
            </div>
            <div className={styles.container}>
                {property.map((data,index)=>(
                    <div className={styles.listing}>
                        <div className={styles.listingHeader}>
                            <h2>{data.name}</h2>
                            <h2>Tenant: {data.tenant?data.tenant:"Unoccupied"}</h2>
                        </div>
                        <div className={styles.listingContent}>
                            <div>
                                <p>Property Type: {data.type}</p>
                                <p>Number of Rooms: {data.bhk}</p>
                                <p>Plot Area: {data.area}</p>
                                <p>Address: {data.address}</p>
                                <p>Price: {data.price}</p>
                            </div>
                            <div>
                                <button className={styles.viewButton}>Manage</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <Popup isOpen={open} onClose={handleAdd}>
                <AddProperty />
            </Popup>

        </div>
    )
}

export default ManageProperties;