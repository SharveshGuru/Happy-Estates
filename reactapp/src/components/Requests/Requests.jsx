import React,{ useEffect, useState} from "react";
import styles from "./Requests.module.css";
import Popup from "../Popup/Popup";
import CreateRequest from "./CreateRequest";
import axiosInstance from "../../Api";
import {format} from "date-fns";
const Requests = () =>{
    const [open,setOpen]=useState(false);
    const user=JSON.parse(localStorage.getItem("user"));
    const [tableData,setTableData]=useState([]);
    const [trigger,setTrigger]=useState(false);
    useEffect(()=>{
        if(user.role==="ROLE_Tenant"){
            axiosInstance.get(`/requeststenant/${user.sub}`)
            .then((res)=>{
                setTableData(res.data);
                console.log(res.data);
            })
            .catch((err)=>{
                window.alert("Error getting requests!");
            })  
        }

        else if(user.role==="ROLE_Owner"){
            axiosInstance.get(`/requestsowner/${user.sub}`)
            .then((res)=>{
                setTableData(res.data);
                console.log(res.data);
            })
            .catch((err)=>{
                window.alert("Error getting requests!");
            })  
        }
    },[user.role,user.sub,open,trigger]);

    function handleRequest(){
        setOpen(!open);
    }

    function markCompleted(id){
        axiosInstance.patch(`/markcompleted/${id}`)
        .then((res)=>setTrigger(!trigger))
        .catch((err)=>window.alert("Error updating Request!"))
        // setTableData(prevData=>prevData.map((request,i)=> i===index?{...request,status:"Completed"}:request));
    }

    function markAcknowledged(id){
        axiosInstance.patch(`/markacknowledged/${id}`)
        .then((res)=>setTrigger(!trigger))
        .catch((err)=>window.alert("Error updating Request!"))
        // setTableData(prevData=>prevData.map((request,i)=> i===index?{...request,status:"In Progress"}:request));
    }
    
    return(
        <div className={styles.page}>
            <h1 className={styles.heading}>Requests</h1>
            <div className={styles.container}>
                <div className={styles.listing}>
                    <div className={styles.listingHeader}>
                        <h2>Request History</h2>
                        <button onClick={handleRequest} className={styles.createRequestButton}>Create Request</button>
                    </div><br />
                    {tableData.length>0 ? (<table className={styles.table}>
                        <thead>
                            <tr className={styles.headerRow}>
                                <th className={styles.th}>Made By</th>
                                <th className={styles.th}>Property</th>
                                <th className={styles.th}>Description</th>
                                <th className={styles.th}>Date</th>
                                <th className={styles.th}>Remarks</th>
                                <th className={styles.th}>Status</th>                        
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((request,index)=>(
                                <tr className={styles.row} key={index}>
                                    <td className={styles.td}>{request.requestMadeBy.name}</td>
                                    <td className={styles.td}>{request.lease.property.name}</td>
                                    <td className={styles.td}>{request.description}</td>
                                    <td className={styles.td}>{format(new Date(request.requestDate),'dd MMMM yyyy')}</td>
                                    <td className={styles.td}>{request.remarks}</td>
                                    {user.role==="ROLE_Tenant" && request.status==="new" && request.madeBy==="ROLE_Tenant" && <td className={styles.td+ " "+ styles.buttonRow}>
                                        <button onClick={()=>markCompleted(request.id)} className={styles.approveButton}>Mark as Completed</button>    
                                        </td>
                                    }
                                    {user.role==="ROLE_Tenant" && request.status==="Acknowledged" && request.madeBy==="ROLE_Tenant" && <td className={styles.td+ " "+ styles.buttonRow}>
                                        <button onClick={()=>markCompleted(request.id)} className={styles.approveButton}>Mark as Completed</button>    
                                        </td>
                                    }
                                    {user.role==="ROLE_Tenant" && request.status==="new" && request.madeBy==="ROLE_Owner" && <td className={styles.td+ " "+ styles.buttonRow}>
                                        <button onClick={()=>markAcknowledged(request.id)} className={styles.actionButton}>Acknowledge</button>    
                                        </td>
                                    }
                                    {user.role==="ROLE_Owner" && request.status==="new" && request.madeBy==="ROLE_Owner" && <td className={styles.td+ " "+ styles.buttonRow}>
                                        <button onClick={()=>markCompleted(request.id)} className={styles.approveButton}>Mark as Completed</button>    
                                        </td>
                                    }
                                    {user.role==="ROLE_Owner" && request.status==="Acknowledged" && request.madeBy==="ROLE_Owner" && <td className={styles.td+ " "+ styles.buttonRow}>
                                        <button onClick={()=>markCompleted(request.id)} className={styles.approveButton}>Mark as Completed</button>    
                                        </td>
                                    }
                                    {user.role==="ROLE_Owner" && request.status==="new" && request.madeBy==="ROLE_Tenant" && <td className={styles.td+ " "+ styles.buttonRow}>
                                        <button onClick={()=>markAcknowledged(request.id)} className={styles.actionButton}>Acknowledge</button>    
                                        </td>
                                    }
                                    {request.status==="Completed" && <td className={styles.td}>{request.status}</td>}
                                    {user.role==="ROLE_Tenant" && request.madeBy==="ROLE_Owner" && request.status==="Acknowledged" && <td className={styles.td}>Acknowledged</td>}
                                    {user.role==="ROLE_Owner" && request.madeBy==="ROLE_Tenant" && request.status==="Acknowledged" && <td className={styles.td}>Acknowledged</td>}
                                </tr>
                            ))}
                        </tbody>
                    </table>):<h3>There are no requests to show</h3>}
                </div>
            </div>
            <Popup isOpen={open} onClose={handleRequest}>
                <CreateRequest />
            </Popup>
        </div>
    )
}

export default Requests;