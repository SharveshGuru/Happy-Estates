import React from "react";
import styles from "./LeaseApplications.module.css";

const LeaseApplications=()=>{

    const tableData=[
        {
            applicant:"Prasath",
            property:"Gopal Housing",
            date:"1 December 2024",
            phoneno:"9274829310",
            email:"usp@gmail.com"
        },
        {
            applicant:"Sheegan",
            property:"Mukesh Housing",
            date:"26 November 2024",
            phoneno:"9211193431",
            email:"sheegone@gmail.com"
        },
        {
            applicant:"Siva",
            property:"Gopal Housing",
            date:"1 December 2024",
            phoneno:"9237542310",
            email:"smartsiva@gmail.com"
        },
    ]
    return(
        <div className={styles.container}>
            <h2 className={styles.heading}>Lease Applications</h2>

            <table className={styles.table}>
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
                            <td className={styles.td}>{data.applicant}</td>
                            <td className={styles.td}>{data.property}</td>
                            <td className={styles.td}>{data.date}</td>
                            <td className={styles.td}>{data.phoneno}</td>
                            <td className={styles.td}>{data.email}</td>
                            <td className={styles.td+ " "+ styles.buttonRow}>
                                <button className={styles.actionButton}>View Application</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}

export default LeaseApplications;