import React, { useState,useEffect } from "react";
import styles from "./ManageProperties.module.css";
import Popup from "../Popup/Popup";
import AddProperty from "./AddProperty";
import axiosInstance from "../../Api";
import { useNavigate } from "react-router-dom";
import { format } from 'date-fns';


const ManageProperties = () =>{
    const user=JSON.parse(localStorage.getItem("user"));
    const [open,setOpen]=useState(false);
    const [property,setProperty]=useState([]);

    const navigate=useNavigate();

    function redirect(id){
        navigate(`/viewproperty/${id}`)
    }

    function handleAdd(){
        setOpen(!open);
    }

    useEffect(()=>{
        axiosInstance.get(`/ownerproperties/${user.sub}`)
        .then((response => {
            setProperty(response.data);
        }))
        .catch((error)=>window.alert("There was a problem in Adding Property!"));
    },[user.sub,open]);

    return(
        <div className={styles.page}>
            <div className={styles.header}>
                <h1 className={styles.heading}>Manage Properties</h1>
                <button onClick={handleAdd} className={styles.addProperty}>Add Property</button>
            </div>
            <div className={styles.container}>
                {property.length>0 ? (property.map((data,index)=>(
                    <div className={styles.listing}>
                        <div className={styles.listingHeader}>
                            <h2>{data.name}</h2>
                            <h2>Tenant: {data.tenant?data.tenant.name:"Unoccupied"}</h2>
                        </div>
                        <div className={styles.listingContent}>
                            <div>
                                <p>Property Type: {data.type}</p>
                                <p>Number of Rooms: {data.numberOfRooms}</p>
                                <p>Plot Area: {data.plotArea} sqft</p>
                                <p>Address: {data.address}</p>
                                <p>Posted On: {format(new Date(data.postedOn),'dd MMMM yyyy')}</p>
                                <p>Price: ₹{data.price}/month</p>
                            </div>
                            <div>
                                <button onClick={()=>redirect(data.id)} className={styles.viewButton}>Manage</button>
                            </div>
                        </div>
                    </div>
                ))):<h3>You haven't added any properties</h3>}
            </div>

            <Popup isOpen={open} onClose={handleAdd}>
                <AddProperty />
            </Popup>

        </div>
    )
}

export default ManageProperties;