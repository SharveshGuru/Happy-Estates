import React, { useState } from "react";
import styles from "./Payments.module.css";
import Popup from "../Popup/Popup";
import MakePayment from "./MakePayment";
const Payments = () =>{

    const [open,setOpen]=useState(false);

    function handlePay(){
        setOpen(!open);
    }
    return(
        <div className={styles.page}>
            <h1 className={styles.heading}>Payments</h1>
            <div className={styles.container}>
                <div className={styles.listing}>
                    <div className={styles.listingHeader}>
                        <h2>Payment History</h2>
                        <button onClick={handlePay} className={styles.makePaymentButton}>Make Payment</button>
                    </div><br />
                    <table className={styles.table}>
                        <thead>
                            <tr className={styles.headerRow}>
                                <th className={styles.th}>Made By</th>
                                <th className={styles.th}>Description</th>
                                <th className={styles.th}>Date</th>
                                <th className={styles.th}>Remarks</th>
                                <th className={styles.th}>Proof</th>
                                <th className={styles.th}>Invoice</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className={styles.row}>
                                <td className={styles.td}>Tenant</td>
                                <td className={styles.td}>Lease Payment</td>
                                <td className={styles.td}>1 January 2025</td>
                                <td className={styles.td}>payment for 2025</td>
                                <td className={styles.td + " "+ styles.buttonRow}>
                                    <button className={styles.actionButton}>View</button>    
                                    <button className={styles.actionButton}>Download</button>
                                </td>
                                <td className={styles.td + " "+ styles.buttonRow}>
                                    <button className={styles.actionButton}>View</button>    
                                    <button className={styles.actionButton}>Download</button>
                                </td>
                            </tr>
                            <tr className={styles.row}>
                                <td className={styles.td}>Tenant</td>
                                <td className={styles.td}>Lease Payment</td>
                                <td className={styles.td}>1 January 2024</td>
                                <td className={styles.td}>payment for 2024</td>
                                <td className={styles.td + " "+ styles.buttonRow}>
                                    <button className={styles.actionButton}>View</button>    
                                    <button className={styles.actionButton}>Download</button>
                                </td>
                                <td className={styles.td + " "+ styles.buttonRow}>
                                    <button className={styles.actionButton}>View</button>    
                                    <button className={styles.actionButton}>Download</button>
                                </td>
                            </tr>
                            <tr className={styles.row}>
                                <td className={styles.td}>Tenant</td>
                                <td className={styles.td}>Lease Payment</td>
                                <td className={styles.td}>1 January 2023</td>
                                <td className={styles.td}>payment for 2023</td>
                                <td className={styles.td + " "+ styles.buttonRow}>
                                    <button className={styles.actionButton}>View</button>    
                                    <button className={styles.actionButton}>Download</button>
                                </td>
                                <td className={styles.td + " "+ styles.buttonRow}>
                                    <button className={styles.actionButton}>View</button>    
                                    <button className={styles.actionButton}>Download</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <Popup isOpen={open} onClose={handlePay}>
                <MakePayment />
            </Popup>
        </div>
    )
}

export default Payments;