import React, {useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./ViewProperty.module.css";
import axiosInstance from "../../Api";
import { format } from 'date-fns';
import Popup from "../Popup/Popup";
import ApplyForLease from "./ApplyForLease";
import EditProperty from "../ManageProperties/EditProperty";

const ViewProperty=()=>{

    const { id } = useParams();
    const [owner,setOwner]=useState({});
    
    const user=JSON.parse(localStorage.getItem("user"));
    const [editOpen,setEditOpen]=useState(false);
    const [leaseOpen,setLeaseOpen]=useState(false);
    const [leaseUpdateTrigger, setLeaseUpdateTrigger] = useState(false); 
    const [tableData,setTableData]=useState([]);
    const [ldata,setLdata]=useState({});
    const [trigger,setTrigger]=useState(false);
    const [rented,setRented]=useState(false);
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

        axiosInstance.get(`/property/${id}`)
        .then((response)=>setProperty(response.data))
        .catch((error)=>window.alert("Unable to get Property Details!"))
    
        if (user.role === "ROLE_Owner") {
            axiosInstance.get(`pendinglease/${user.sub}/${id}`)
            .then((response)=>setTableData(response.data))
            .catch((error)=>window.alert("There was a problem getting pending lease applications!"))

            axiosInstance.get(`user/${user.sub}`)
            .then((response)=>{
                setOwner(response.data);
            })
            .catch((error)=>console.log(error));
        }

        if (user.role==="ROLE_Tenant"){
            axiosInstance.get(`checktenant/${user.sub}`)
            .then((response)=>setRented(response.data))
            .catch((error)=>window.alert("There was a problem in checking tenant status!"));
        }

        // if(property && property.tenant && user.role==="ROLE_Owner"){
        //     axiosInstance.get(`plmapprop/${id}`)
        //     .then((response)=>{
        //         setLdata(response.data.lease);
        //         setTrigger(!trigger);
        //     })
        //     .catch((error)=>window.alert("Unable to get Details!"));
        // }
    }, [id, user.role, user.sub, leaseOpen, editOpen, leaseUpdateTrigger]);
    
    useEffect(()=>{
        if(property && property.tenant && user.role==="ROLE_Owner"){
            axiosInstance.get(`plmapprop/${id}`)
            .then((response)=>{
                setLdata(response.data.lease);
                setTrigger(!trigger);
            })
            .catch((error)=>window.alert("Unable to get Details!"));
        }
    },[property,user.role,id]);

    function handleLeasePopup(){
        setLeaseOpen(!leaseOpen);
    }

    function handleEditPopup(){
        setEditOpen(!editOpen);
    }

    function handlePropertyUpdate(lease) {
        if (lease && lease.tenant) {
            let updatedProperty = { 
                ...property,
                tenant: lease.tenant, 
                availabilityStatus: false,
            };
            axiosInstance.put(`/property/${id}`,updatedProperty)
            .then((response)=>setLeaseUpdateTrigger(!leaseUpdateTrigger))
            .catch((error)=>window.alert("There was a problem in processing the application!"));
            
            axiosInstance.post(`/plmap`,{property,owner,lease})
            .then((response)=>setLeaseUpdateTrigger(!leaseUpdateTrigger))
            .catch((error)=>window.alert("There was a problem in processing the application!"));
            
        } else {
            window.alert("Tenant data is missing!");
        }
    }
    
    function handleApprove(leaseindex,leaseid) {
        const updatedLease = { ...tableData[leaseindex], approved: true };
        if (updatedLease.tenant) {
            setProperty({
                ...property,
                tenant: updatedLease.tenant,
            });
        } else {
            window.alert("Tenant data is missing!");
            return; 
        }
        axiosInstance.put(`/lease/${updatedLease.id}`,updatedLease)
        .then((response)=>setLeaseUpdateTrigger(!leaseUpdateTrigger))
        .catch((error)=>window.alert("There was a problem in approving the application!"));
    
        handlePropertyUpdate(updatedLease);
    }

    function handleReject(leaseindex,leaseid){
        const updatedLease = { ...tableData[leaseindex], rejected: true };

        axiosInstance.put(`/lease/${leaseid}`,updatedLease)
        .then((response)=>setLeaseUpdateTrigger(!leaseUpdateTrigger))
        .catch((error)=>window.alert("There was a problem in rejecting the application!"));

    }

    function handleRemove(){
        const confirmRemove = window.confirm("Are you sure you want to remove the tenant?");
        if(confirmRemove){
            axiosInstance.put(`/removetenant/${id}`)
            .then((response)=>setLeaseUpdateTrigger(!leaseUpdateTrigger))
            .catch((error)=>window.alert("There was a problem in removing the tenant!"));

            axiosInstance.put(`/plmap/${id}`)
            .then((response)=>setLeaseUpdateTrigger(!leaseUpdateTrigger))
            .catch((error)=>window.alert("There was a problem in removing the tenant!"));
        }
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
                            <p>Number of Rooms: {property.numberOfRooms}</p>
                            <p>Price: ₹{property.price}/month</p>
                            <p>Plot Area: {property.plotArea} sqft</p>
                            <p>Description: {property.details}</p>
                            <p>Posted On: {format(new Date(property.postedOn),'dd MMMM yyyy')}</p>

                        </div>
                        {user.role==="ROLE_Tenant" && <div className={styles.ownerContent}>
                            <h2>Owner Details:</h2><br />
                            <p>Owner Name: {property.owner.name}</p>
                            <p>Email ID: {property.owner.email}</p>
                            <p>Phone Number: {property.owner.phone}</p>
                            <button onClick={handleLeasePopup} className={styles.requestButton}>Apply for Lease</button>
                        </div>}
                        {user.role==="ROLE_Owner" && <div className={styles.ownerContent}>
                            <h2>Tenant Details:</h2><br />
                            {property.tenant ? (<><p>Tenant Name: {property.tenant.name}</p>
                            <p>Email ID: {property.tenant.email}</p>
                            <p>Phone Number: {property.tenant.phone}</p>
                            {ldata && ldata.leaseStartDate && ldata.leaseEndDate && <><p>Start Date: {format(new Date(ldata.leaseStartDate),'dd MMMM yyyy')}</p>
                            <p>End Date: {format(new Date(ldata.leaseEndDate),'dd MMMM yyyy')}</p></>}
                            </>) : <p>Property is unoccupied</p>
                            }
                            <button onClick={handleEditPopup} className={styles.requestButton}>Edit Property Details</button>
                            {property.tenant && <button onClick={()=>handleRemove()} className={styles.removeButton}>Remove Tenant</button>}
                        </div>}
                    </div>
                </div>
                {user.role==="ROLE_Owner" && <div className={styles.listing}>
                    <h2>Lease Applications:</h2>
                    {tableData.length>0 ? (<table className={styles.table}>
                        <thead>
                            <tr className={styles.headerRow}>
                                <th className={styles.th}>Applicant</th>
                                <th className={styles.th}>Applied On</th>
                                <th className={styles.th}>Phone Number</th>
                                <th className={styles.th}>Start Date</th>
                                <th className={styles.th}>End Date</th>
                                <th className={styles.th}>Email ID</th>
                                <th className={styles.th}>Status</th>
                                <th className={styles.th}>Action</th>                        
                            </tr>
                        </thead>
                        <tbody>
                            {/* {console.log(tableData)} */}
                            {tableData.map((data,index)=>(
                                <tr className={styles.row} key={index}>
                                    {data.tenant && <><td className={styles.td}>{data.tenant.name}</td>
                                    <td className={styles.td}>{format(new Date(data.appliedOn),'dd MMMM yyyy')}</td>
                                    <td className={styles.td}>{data.tenant.phone}</td>
                                    <td className={styles.td}>{format(new Date(data.leaseStartDate),'dd MMMM yyyy')}</td>
                                    <td className={styles.td}>{format(new Date(data.leaseEndDate),'dd MMMM yyyy')}</td>
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
                <ApplyForLease rented={rented} id={id} property={property}/>
            </Popup>

            <Popup isOpen={editOpen} onClose={handleEditPopup}>
                <EditProperty property={property}/>
            </Popup>
        </div>
    )
}
export default ViewProperty;