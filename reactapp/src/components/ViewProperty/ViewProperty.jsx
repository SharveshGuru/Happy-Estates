import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./ViewProperty.module.css";
import axios from "axios";
import { format } from 'date-fns';
import Popup from "../Popup/Popup";
import ApplyForLease from "./ApplyForLease";
import { UserContext } from "../UserContext";
import EditProperty from "../ManageProperties/EditProperty";

const ViewProperty=()=>{

    const { id } = useParams();
    const {user}=useContext(UserContext);
    const [editOpen,setEditOpen]=useState(false);
    const [leaseOpen,setLeaseOpen]=useState(false);
    const [leaseUpdateTrigger, setLeaseUpdateTrigger] = useState(false); 
    const [tableData,setTableData]=useState([]);
    
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

    useEffect(() => {
        axios.get(`http://localhost:8080/property/${id}`)
            .then((response) => {
                setProperty(response.data);
            })
            .catch((error) => window.alert(error));
    
        if (user.userType === "Owner") {
            axios.get(`http://localhost:8080/pendinglease/${user.username}/${id}`)
                .then((response) => {
                    setTableData(response.data);
                })
                .catch((error) => { window.alert("There was trouble getting Lease Applications!"); });
        }
    }, [id, user.userType, user.username, leaseOpen, editOpen, leaseUpdateTrigger]);
    

    function handleLeasePopup(){
        setLeaseOpen(!leaseOpen);
    }

    function handleEditPopup(){
        setEditOpen(!editOpen);
    }

    function handlePropertyUpdate(propertytenant) {
        if (propertytenant && propertytenant.tenant) {
            let updatedProperty = { 
                ...property,
                tenant: propertytenant.tenant, 
                availabilityStatus: false,
            };
            console.log(updatedProperty);
    
            axios.put(`http://localhost:8080/property/${id}`, updatedProperty)
                .then((response) => {
                    setLeaseUpdateTrigger(!leaseUpdateTrigger);
                })
                .catch((error) => {
                    window.alert("There was a trouble in approving the application!");
                });
        } else {
            window.alert("Tenant data is missing!");
        }
    }
    
    function handleApprove(leaseindex,leaseid) {
        const updatedLease = { ...tableData[leaseindex], approved: true };
        if (updatedLease.tenant) {
            setProperty({
                ...property,
                tenant: updatedLease.tenant
            });
        } else {
            window.alert("Tenant data is missing!");
            return; 
        }

        axios.put(`http://localhost:8080/lease/${leaseid}`, updatedLease)
            .then((response) => {
                setLeaseUpdateTrigger(!leaseUpdateTrigger);
            })
            .catch((error) => {
                window.alert("There was a problem in approving the application!");
            });
    
        handlePropertyUpdate(updatedLease);
    }

    function handleReject(leaseindex,leaseid){
        const updatedLease = { ...tableData[leaseindex], rejected: true };
        axios.put(`http://localhost:8080/lease/${leaseid}`,updatedLease)
        .then((response)=>{setLeaseUpdateTrigger(!leaseUpdateTrigger)})
        .catch((error)=>window.alert("There was a problem in rejecting the application!"))
    }

    function displayStatus(approved,rejected){
        if(!approved && !rejected)
            return "Pending";
        if(approved)
            return "Approved";
        if(rejected)
            return "Rejected";
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
                            <p>Plot Area: {property.plotArea} sqft</p>
                            <p>Description: {property.details}</p>
                            <p>Posted On: {format(new Date(property.postedOn),'dd MMMM yyyy')}</p>

                        </div>
                        {user.role==="Tenant" && <div className={styles.ownerContent}>
                            <h2>Owner Details:</h2><br />
                            <p>Owner Name: {property.owner.name}</p>
                            <p>Email ID: {property.owner.email}</p>
                            <p>Phone Number: {property.owner.phone}</p>
                            <button onClick={handleLeasePopup} className={styles.requestButton}>Apply for Lease</button>
                        </div>}
                        {user.role==="Owner" && <div className={styles.ownerContent}>
                            <h2>Tenant Details:</h2><br />
                            {property.tenant ? (<><p>Tenant Name: {property.tenant.name}</p>
                            <p>Email ID: {property.tenant.email}</p>
                            <p>Phone Number: {property.tenant.phone}</p></>) : <p>Property is unoccupied</p>}
                            <button onClick={handleEditPopup} className={styles.requestButton}>Edit Property Details</button>
                        </div>}
                    </div>
                </div>
                {user.role==="Owner" && <div className={styles.listing}>
                    <h2>Lease Applications:</h2>
                    
                    {tableData.length>0 ? (<table className={styles.table}>
                        <thead>
                            <tr className={styles.headerRow}>
                                <th className={styles.th}>Applicant</th>
                                <th className={styles.th}>Applied On</th>
                                <th className={styles.th}>Phone Number</th>
                                <th className={styles.th}>Email ID</th>
                                <th className={styles.th}>Status</th>
                                <th className={styles.th}>Action</th>                        
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((data,index)=>(
                                <tr className={styles.row} key={index}>
                                    {data.tenant && <><td className={styles.td}>{data.tenant.name}</td>
                                    <td className={styles.td}>{format(new Date(data.appliedOn),'dd MMMM yyyy')}</td>
                                    <td className={styles.td}>{data.tenant.phone}</td>
                                    <td className={styles.td}>{data.tenant.email}</td></>}
                                    <td className={styles.td}>{displayStatus(data.approved,data.rejected)}</td>
                                    <td className={styles.td+ " "+ styles.buttonRow}>
                                        {displayStatus(data.approved,data.rejected)==="Pending" ?
                                        <> 
                                        <button onClick={()=>handleApprove(index,data.id)} className={styles.approveButton}>Approve</button>
                                        <button onClick={()=>handleReject(index,data.id)} className={styles.rejectButton}>Reject</button>
                                        </>
                                        : <p>-</p>
                                        }
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>):(<p>No Applications to show</p>)}
                    
                </div>}
                <div className={styles.listing}>
                    <h2>Property Images:</h2>
                    <br></br>
                    
                </div>
            </div>
            <Popup isOpen={leaseOpen} onClose={handleLeasePopup}>
                <ApplyForLease id={id} property={property}/>
            </Popup>

            <Popup isOpen={editOpen} onClose={handleEditPopup}>
                <EditProperty property={property}/>
            </Popup>
        </div>
    )
}
export default ViewProperty;