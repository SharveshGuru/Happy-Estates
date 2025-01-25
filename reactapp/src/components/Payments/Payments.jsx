import React, { useEffect, useState } from "react";
import styles from "./Payments.module.css";
import Popup from "../Popup/Popup";
import MakePayment from "./MakePayment";
import axiosInstance from "../../Api";
import { format } from 'date-fns';

const Payments = () =>{
    const user=JSON.parse(localStorage.getItem("user"));
    const [open,setOpen]=useState(false);
    const [payments,setPayments]=useState([]);
    function handlePay(){
        setOpen(!open);
    }

    useEffect(()=>{

        if(user.role==="ROLE_Tenant"){
            axiosInstance.get(`/tenantpayments/${user.sub}`)
            .then((res)=>{
                setPayments(res.data);
                console.log(res.data);
            })
            .catch((err)=>{
                window.alert("Error getting payments!");
            });
        }

        if(user.role==="ROLE_Owner"){
            axiosInstance.get(`/ownerpayments/${user.sub}`)
            .then((res)=>{
                setPayments(res.data);
                console.log(res.data);
            })
            .catch((err)=>{
                window.alert("Error getting payments!");
            });
        }
    },[user.sub,user.role,open]);

    return(
        <div className={styles.page}>
            <h1 className={styles.heading}>Payments</h1>
            <div className={styles.container}>
                <div className={styles.listing}>
                    <div className={styles.listingHeader}>
                        <h2>Payment History</h2>
                        <button onClick={handlePay} className={styles.makePaymentButton}>Make Payment</button>
                    </div><br />
                    {payments.length>0 ? (<table className={styles.table}>
                        <thead>
                            <tr className={styles.headerRow}>
                                <th className={styles.th}>Property</th>
                                <th className={styles.th}>Made By</th>
                                <th className={styles.th}>Description</th>
                                <th className={styles.th}>Amount</th>
                                <th className={styles.th}>Date</th>
                                <th className={styles.th}>Remarks</th>
                                <th className={styles.th}>Proof</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((payment,index)=>(
                                <tr key={index} className={styles.row}>
                                    <td className={styles.td}>{payment.lease.property.name}</td>
                                    <td className={styles.td}>{payment.paymentMadeBy.name}</td>
                                    <td className={styles.td}>{payment.description}</td>
                                    <td className={styles.td}>₹{payment.amount}</td>
                                    <td className={styles.td}>{format(new Date(payment.paymentDate),"dd MMMM yyyy")}</td>
                                    <td className={styles.td}>{payment.remarks}</td>
                                    <td className={styles.td + " "+ styles.buttonRow}>
                                        <button className={styles.actionButton}>View</button>    
                                        <button className={styles.actionButton}>Download</button>
                                    </td>
                            </tr>))}
                        </tbody>
                    </table>):<h3>No payments have been made yet!</h3>}
                </div>
            </div>

            <Popup isOpen={open} onClose={handlePay}>
                <MakePayment />
            </Popup>
        </div>
    )
}

export default Payments;