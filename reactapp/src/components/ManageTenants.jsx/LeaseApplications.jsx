import React, { useContext, useEffect, useState } from "react";
import styles from "./LeaseApplications.module.css";
import axios from "axios";
import { format } from 'date-fns';
import {UserContext} from "../UserContext";
import { useNavigate } from "react-router-dom";
const LeaseApplications=()=>{
    const {user}=useContext(UserContext)
    const [tableData,setTableData]=useState([]);
    const navigate=useNavigate();
    useEffect(()=>{
        axios.get(`http://localhost:8080/pendinglease/${user.username}`)
        .then((response)=>{
            setTableData(response.data);
        })
        .catch((error)=>{window.alert("There was trouble getting Lease Applications!")})
    },[user]);

    function handleView(index){
        navigate(`/viewproperty/${tableData[index].property.id}`)
    }
    return(
        <div className={styles.container}>
            <h2 className={styles.heading}>Lease Applications</h2>

            {tableData.length>0 ? (<table className={styles.table}>
                <thead>
                    <tr className={styles.headerRow}>
                        <th className={styles.th}>Applicant</th>
                        <th className={styles.th}>Property</th>
                        <th className={styles.th}>Applied On</th>
                        <th className={styles.th}>Phone Number</th>
                        <th className={styles.th}>Email ID</th>
                        <th className={styles.th}>Action</th>                        
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((data,index)=>(
                        <tr className={styles.row} key={index}>
                            <td className={styles.td}>{data.tenant.name}</td>
                            <td className={styles.td}>{data.property.name}</td>
                            <td className={styles.td}>{format(new Date(data.appliedOn),'dd MMMM yyyy')}</td>
                            <td className={styles.td}>{data.tenant.phone}</td>
                            <td className={styles.td}>{data.tenant.email}</td>
                            <td className={styles.td+ " "+ styles.buttonRow}>
                                <button className={styles.actionButton} onClick={()=>{handleView(index)}}>View Application</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>):(<p>No Applications to show</p>)}

        </div>
    )
}

export default LeaseApplications;