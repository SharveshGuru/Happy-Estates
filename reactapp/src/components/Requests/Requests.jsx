import React,{useContext, useState} from "react";
import styles from "./Requests.module.css";
import Popup from "../Popup/Popup";
import CreateRequest from "./CreateRequest";
const Requests = () =>{
    const [open,setOpen]=useState(false);
    const user=JSON.parse(localStorage.getItem("user"));
    const [tableData,setTableData]=
    useState([
        {
            madeBy:"Tenant",
            description:"Repair & Maintenance",
            date:"7 January 2024",
            remarks:"painting",
            status:"new"
        },
        {
            madeBy:"Owner",
            description:"Payment Reminder",
            date:"31 December 2024",
            remarks:"Lease Payment reminder",
            status:"new"
        },
        {
            madeBy:"Tenant",
            description:"Repair & Maintenance",
            date:"15 July 2024",
            remarks:"painting",
            status:"Completed"
        },
        {
            madeBy:"Tenant",
            description:"Repair & Maintenance",
            date:"17 April 2023",
            remarks:"fan repair",
            status:"Completed"
        }
    ]);

    function handleRequest(){
        setOpen(!open);
    }

    function markCompleted(index){
        setTableData(prevData=>prevData.map((request,i)=> i===index?{...request,status:"Completed"}:request));
    }

    function markAcknowledged(index){
        setTableData(prevData=>prevData.map((request,i)=> i===index?{...request,status:"In Progress"}:request));
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
                    <table className={styles.table}>
                        <thead>
                            <tr className={styles.headerRow}>
                                <th className={styles.th}>Made By</th>
                                <th className={styles.th}>Description</th>
                                <th className={styles.th}>Date</th>
                                <th className={styles.th}>Remarks</th>
                                <th className={styles.th}>Status</th>                        
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((request,index)=>(
                                <tr className={styles.row} key={index}>
                                    <td className={styles.td}>{request.madeBy}</td>
                                    <td className={styles.td}>{request.description}</td>
                                    <td className={styles.td}>{request.date}</td>
                                    <td className={styles.td}>{request.remarks}</td>
                                    {user.role==="ROLE_Tenant" && request.status==="new" && request.madeBy==="Tenant" && <td className={styles.td+ " "+ styles.buttonRow}>
                                        <button onClick={()=>markCompleted(index)} className={styles.approveButton}>Mark as Completed</button>    
                                        </td>
                                    }
                                    {user.role==="ROLE_Tenant" && request.status==="new" && request.madeBy==="Owner" && <td className={styles.td+ " "+ styles.buttonRow}>
                                        <button onClick={()=>markAcknowledged(index)} className={styles.actionButton}>Acknowledge</button>    
                                        </td>
                                    }
                                    {user.role==="ROLE_Owner" && request.status==="new" && request.madeBy==="Owner" && <td className={styles.td+ " "+ styles.buttonRow}>
                                        <button onClick={()=>markCompleted(index)} className={styles.approveButton}>Mark as Completed</button>    
                                        </td>
                                    }
                                    {user.role==="ROLE_Owner" && request.status==="new" && request.madeBy==="Tenant" && <td className={styles.td+ " "+ styles.buttonRow}>
                                        <button onClick={()=>markAcknowledged(index)} className={styles.actionButton}>Acknowledge</button>    
                                        </td>
                                    }
                                    {request.status!=="new" && <td className={styles.td}>{request.status}</td>}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Popup isOpen={open} onClose={handleRequest}>
                <CreateRequest />
            </Popup>
        </div>
    )
}

export default Requests;