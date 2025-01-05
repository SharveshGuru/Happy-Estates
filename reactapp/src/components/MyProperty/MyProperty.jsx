import React from "react";
import styles from "./MyProperty.module.css"
import { useNavigate } from "react-router-dom";

const MyProperty = () =>{

    const navigate=useNavigate();
    const myProperty={
        name:"Gopal Housing",
        id:"PROP-001",
        address:"St. Thomas Mount, Chennai, Tamil Nadu",
        owner:"Dummy Bro",
        price:"₹50000",
        leaseDuration:"12 months",
        leaseStartDate:"1 January 2025",
        leaseEndDate:"31 December 2025",
    };
    const owner={
        name:"Dummy Bro",
        email:"dummy@bro.com",
        phone:"1234567890",
    };

    const handleRequest=()=>{
        navigate("/requests")
    }

    const docurl="../../../public/assets/docs/Beige Floral Page Border.pdf";
    return(
        <div className={styles.page}>
            <h1 className={styles.heading}>My Property</h1>
            <div className={styles.container}>
                <div className={styles.listing}>
                    <div className={styles.listingContent}>
                        <div>
                            <h2>Property Details:</h2><br />
                            <p  title={myProperty.id}>Property Name: {myProperty.name}</p>
                            <p >Address: {myProperty.address}</p>
                            <p >Lease Amount: {myProperty.price}</p>
                            <p >Lease Duration: {myProperty.leaseDuration}</p>
                            <p >Lease Start Date: {myProperty.leaseStartDate}</p>
                            <p >Lease End Date: {myProperty.leaseEndDate}</p>
                        </div>
                        <div className={styles.ownerContent}>
                            <h2>Owner Details:</h2><br />
                            <p  title={myProperty.id}>Owner Name: {owner.name}</p>
                            <p >Email ID: {owner.email}</p>
                            <p >Phone Number: {owner.phone}</p>
                            <button onClick={handleRequest} className={styles.requestButton}>Raise Requests</button>
                        </div>
                    </div>
                </div>
                <div className={styles.listing}>
                    <h2>Property Documents:</h2>
                    <br></br>
                    <table className={styles.table}>
                        <tr className={styles.headerRow}>
                            <th className={styles.th}>Document Name</th>
                            <th className={styles.th}>Actions</th>
                        </tr>
                        <tr className={styles.row}>
                            <td className={styles.td}>Lease Agreement 2025</td>
                            <td className={styles.td + " "+ styles.buttonRow}>
                                <button className={styles.actionButton}>View</button>    
                                <button className={styles.actionButton}>Download</button>
                            </td>
                        </tr>
                        <tr className={styles.row}>
                            <td className={styles.td}>Lease Agreement 2024</td>
                            <td className={styles.td + " "+ styles.buttonRow}>
                                <button className={styles.actionButton}>View</button>    
                                <button className={styles.actionButton}>Download</button>
                            </td>
                        </tr>
                        <tr className={styles.row}>
                            <td className={styles.td}>Lease Agreement 2023</td>
                            <td className={styles.td + " "+ styles.buttonRow}>
                                <button className={styles.actionButton}>View</button>    
                                <button className={styles.actionButton}>Download</button>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default MyProperty;