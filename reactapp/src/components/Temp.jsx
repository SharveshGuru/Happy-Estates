import React,{useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { BiSolidBuildingHouse } from "react-icons/bi";
import { HiHome } from "react-icons/hi2";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { CiSquareQuestion } from "react-icons/ci";
import { FaUser } from "react-icons/fa";


const Temp=()=>{
    const navigate=useNavigate();
    function redirectPropertyListings(){
        navigate("/property-listings");
      }
      
    return(
        <div>
            <Card sx={{ maxWidth: 345, margin: "auto", boxShadow: 3,backgroundColor:"rgb(253, 234, 193)" }}>
                <CardActionArea onClick={redirectPropertyListings}>
                    <CardContent sx={{ textAlign: "center",fontFamily: "'Jost', serif" }}>
                        <BiSolidBuildingHouse size={50} color="rgb(212, 158, 39)" />
                        <Typography variant="h6" component="div" sx={{ marginTop: 2, fontFamily: "'Jost', serif" }}>
                            Property Listings
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
            <br></br>
            <Card sx={{ maxWidth: 345, margin: "auto", boxShadow: 3,backgroundColor:"rgb(253, 234, 193)" }}>
                <CardActionArea onClick={redirectPropertyListings}>
                    <CardContent sx={{ textAlign: "center",fontFamily: "'Jost', serif" }}>
                        <HiHome  size={50} color="rgb(212, 158, 39)" />
                        <Typography variant="h6" component="div" sx={{ marginTop: 2, fontFamily: "'Jost', serif" }}>
                            My Property
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
            <br></br>
            <Card sx={{ maxWidth: 345, margin: "auto", boxShadow: 3,backgroundColor:"rgb(253, 234, 193)" }}>
                <CardActionArea onClick={redirectPropertyListings}>
                    <CardContent sx={{ textAlign: "center",fontFamily: "'Jost', serif" }}>
                        <RiMoneyRupeeCircleFill size={50} color="rgb(212, 158, 39)" />
                        <Typography variant="h6" component="div" sx={{ marginTop: 2, fontFamily: "'Jost', serif" }}>
                            Pay Rent
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
            <br></br>
            <Card sx={{ maxWidth: 345, margin: "auto", boxShadow: 3,backgroundColor:"rgb(253, 234, 193)" }}>
                <CardActionArea onClick={redirectPropertyListings}>
                    <CardContent sx={{ textAlign: "center",fontFamily: "'Jost', serif" }}>
                        <CiSquareQuestion  size={50} color="rgb(212, 158, 39)" />
                        <Typography variant="h6" component="div" sx={{ marginTop: 2, fontFamily: "'Jost', serif" }}>
                            Raise Request
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
            <br />
            <Card sx={{ maxWidth: 345, margin: "auto", boxShadow: 3,backgroundColor:"rgb(253, 234, 193)" }}>
                <CardActionArea onClick={redirectPropertyListings}>
                    <CardContent sx={{ textAlign: "center",fontFamily: "'Jost', serif" }}>
                        <FaUser size={50} color="rgb(212, 158, 39)" />
                        <Typography variant="h6" component="div" sx={{ marginTop: 2, fontFamily: "'Jost', serif" }}>
                            Profile
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    )
}
export default Temp;