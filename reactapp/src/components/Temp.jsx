import React,{useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { BiSolidBuildingHouse } from "react-icons/bi";
import { HiHome } from "react-icons/hi2";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { CiSquareQuestion } from "react-icons/ci";
import { FaUser } from "react-icons/fa";
import Logout from './Login/Logout';


const Temp=()=>{
    const navigate=useNavigate();
    function redirectPropertyListings(){
        navigate("/property-listings");
      }
      
    return(
        <div>
            <Logout bs="homeLogout"/>
        </div>
    )
}
export default Temp;