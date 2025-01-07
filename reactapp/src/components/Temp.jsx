import React,{useContext} from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { BiSolidBuildingHouse } from "react-icons/bi";
import { HiHome } from "react-icons/hi2";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { CiSquareQuestion } from "react-icons/ci";
import { FaUser } from "react-icons/fa";
import Logout from './Login/Logout';
import styles from "../components/Home/Home.module.css";
import { Link, useLocation } from "react-router-dom";
const Temp=()=>{
    const location=useLocation();
    const isActive = (path) => location.pathname.startsWith(path);
      
    return(
        <div className={styles.cards}>
        <Card sx={{ minWidth: "16.5vw",
                    margin: "auto",
                    boxShadow: 3,backgroundColor:"rgb(253, 234, 193)",
                    transition:'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover':{
                      transform:'scale(1.05)',
                      backgroundColor:'white',
                    },
                     }}>
                    <CardActionArea onClick={isActive}>
                      <CardContent sx={{ textAlign: "center",fontFamily: "'Jost', serif" }}>
                        <BiSolidBuildingHouse size={50} color="rgb(60, 51, 31)" />
                        <Typography variant="h6" component="div" sx={{ marginTop: 2, fontFamily: "'Jost', serif" }}>
                          Property Listings
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                  </div>
    )
}
export default Temp;