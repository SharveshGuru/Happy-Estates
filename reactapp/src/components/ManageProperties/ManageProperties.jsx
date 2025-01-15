import React, { useState,useEffect, useContext } from "react";
import styles from "./ManageProperties.module.css";
import Popup from "../Popup/Popup";
import AddProperty from "./AddProperty";
import axios from "axios";
import { UserContext } from "../UserContext";
import { format } from 'date-fns';


const ManageProperties = () =>{
    const {user}=useContext(UserContext);
    const [open,setOpen]=useState(false);
    const [property,setProperty]=useState([]);

    function handleAdd(){
        setOpen(!open);
    }

    useEffect(()=>{
        axios.get(`http://localhost:8080/ownerproperties/${user.username}`)
        .then((response)=>{
            setProperty(response.data);
            console.log(response.data);
        })
        .catch((error)=>console.error(error));
    },[user.username,open]);

    // const property=[
    //     {
    //         name:"Gopal Housing",
    //         id:"PROP-001",
    //         type:"Apartment",
    //         bhk:"3BHK",
    //         area:"1800 sqft",
    //         address:"St. Thomas Mount, Chennai, Tamil Nadu",
    //         tenant:"Dummy Bro",
    //         price:"₹50000",
    //     },
    //     {
    //         name:"Gopal Housing",
    //         id:"PROP-002",
    //         type:"Apartment",
    //         bhk:"3BHK",
    //         area:"1800 sqft",
    //         address:"St. Thomas Mount, Chennai, Tamil Nadu",
    //         tenant:"",
    //         price:"₹50000",
    //     },
    //     {
    //         name:"Gopal Housing",
    //         id:"PROP-003",
    //         type:"Apartment",
    //         bhk:"3BHK",
    //         area:"1800 sqft",
    //         address:"St. Thomas Mount, Chennai, Tamil Nadu",
    //         tenant:"Dummy Bro",
    //         price:"₹50000",
    //     },
    //     {
    //         name:"Gopal Housing",
    //         id:"PROP-004",
    //         type:"Apartment",
    //         bhk:"3BHK",
    //         area:"1800 sqft",
    //         address:"St. Thomas Mount, Chennai, Tamil Nadu",
    //         tenant:"Dummy Bro",
    //         price:"₹50000",
    //     },
    // ];
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
                            <h2>Tenant: {data.tenant?data.tenant.username:"Unoccupied"}</h2>
                        </div>
                        <div className={styles.listingContent}>
                            <div>
                                <p>Property Type: {data.type}</p>
                                <p>Number of Rooms: {data.numberOfRooms}</p>
                                <p>Plot Area: {data.plotArea}</p>
                                <p>Address: {data.address}</p>
                                <p>Posted On: {format(new Date(data.postedOn),'dd MMMM yyyy')}</p>
                                <p>Price: ₹{data.price}</p>
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