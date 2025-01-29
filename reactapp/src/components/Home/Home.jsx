import React,{ useEffect, useState} from 'react';
import styles from "./Home.module.css";
import { useNavigate } from 'react-router-dom';
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { BiSolidBuildingHouse } from "react-icons/bi";
import { HiHome } from "react-icons/hi2";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { TbHelpSquareFilled } from "react-icons/tb";
import { FaUser } from "react-icons/fa";
import { IoPeopleSharp } from "react-icons/io5";
import Logout from '../Login/Logout';
import axiosInstance from '../../Api';

const Home = () => {

  const [profile,setProfile]=useState({name:""});
  const user=JSON.parse(localStorage.getItem("user"));
  const navigate=useNavigate();

  useEffect(()=>{
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if(storedUser && storedUser.sub){
      axiosInstance.get(`user/${storedUser.sub}`)
      .then((response)=>{
        setProfile(response.data);
      })
      .catch((error)=>console.log());
    }
  },[]);

  function toTitleCase(str) {
    return str
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }  
  function redirectRegister(){
    navigate("/register");
  }
  function redirectLogin(){
    navigate("/login");
  }
  function redirectPropertyListings(){
    navigate("/property-listings");
  }
  function redirectMyProperty(){
    navigate("/my-property");
  }
  function redirectPayments(){
    navigate("/payments");
  }
  function redirectRequests(){
    navigate("/requests");
  }
  function redirectProfile(){
    navigate("/profile")
  }
  function redirectManageProperties(){
    navigate("/manage-properties");
  }
  function redirectManageTenants(){
    navigate("/manage-tenants");
  }

  return (
    <div className="home-container">
      {!user &&
      <div className={styles.homepage}>
        <h1 className={styles.heading}>Happy Estates</h1>
        <br></br>
        <p className={styles.content}>Welcome to Happy Estates!<br></br> Your solution for real estate management.</p>
        <div className={styles.buttondiv}>
          <button className={styles.button} onClick={redirectRegister}>Register Now!</button>
          <button className={styles.button} onClick={redirectLogin}>Login Now!</button>
        </div>
      </div>
      }
      {user && 
      <div className={styles.homepage}>
        <h1 className={styles.heading}>Happy Estates</h1>
        <div className={styles.welcomeHeader}>
          <h1 className={styles.name}>Welcome {toTitleCase(profile.name)}!</h1>
          <Logout bs="homeLogout"/>
        </div>
        <br></br>
        
        {user.role==="ROLE_Tenant" && 
        <div className={styles.cards}>
        
          <Card sx={{ 
            minWidth: "15vw",
            margin: "auto",
            boxShadow: 3,
            backgroundColor:"rgb(253, 234, 193)",
            "&:hover":{
              transform:'scale(1.05)',
              backgroundColor:"rgb(236, 198, 116)",
            }
            }}>
            <CardActionArea onClick={redirectPropertyListings}>
              <CardContent sx={{ textAlign: "center",fontFamily: "'Jost', serif" }}>
                <BiSolidBuildingHouse size={50} color="rgb(60, 51, 31)" />
                <Typography variant="h6" component="div" sx={{ marginTop: 2, fontFamily: "'Jost', serif" }}>
                  Property Listings
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>

          <Card sx={{ 
            minWidth: "15vw",
            margin: "auto",
            boxShadow: 3,
            backgroundColor:"rgb(253, 234, 193)",
            "&:hover":{
              transform:'scale(1.05)',
              backgroundColor:"rgb(236, 198, 116)",
            }
            }}>
            <CardActionArea onClick={redirectMyProperty}>
              <CardContent sx={{ textAlign: "center",fontFamily: "'Jost', serif" }}>
                <HiHome  size={50} color="rgb(60, 51, 31)" />
                  <Typography variant="h6" component="div" sx={{ marginTop: 2, fontFamily: "'Jost', serif" }}>
                    My Property
                  </Typography>
              </CardContent>
            </CardActionArea>
          </Card>

          <Card sx={{ 
            minWidth: "15vw",
            margin: "auto",
            boxShadow: 3,
            backgroundColor:"rgb(253, 234, 193)",
            "&:hover":{
              transform:'scale(1.05)',
              backgroundColor:"rgb(236, 198, 116)",
            }
            }}>
            <CardActionArea onClick={redirectPayments}>
              <CardContent sx={{ textAlign: "center",fontFamily: "'Jost', serif" }}>
                <RiMoneyRupeeCircleFill size={50} color="rgb(60, 51, 31)" />
                  <Typography variant="h6" component="div" sx={{ marginTop: 2, fontFamily: "'Jost', serif" }}>
                    Payments
                  </Typography>
              </CardContent>
            </CardActionArea>
          </Card>

          <Card sx={{ 
            minWidth: "15vw",
            margin: "auto",
            boxShadow: 3,
            backgroundColor:"rgb(253, 234, 193)",
            "&:hover":{
              transform:'scale(1.05)',
              backgroundColor:"rgb(236, 198, 116)",
            }
            }}>
            <CardActionArea onClick={redirectRequests}>
              <CardContent sx={{ textAlign: "center",fontFamily: "'Jost', serif" }}>
                <TbHelpSquareFilled  size={50} color="rgb(60, 51, 31)" />
                  <Typography variant="h6" component="div" sx={{ marginTop: 2, fontFamily: "'Jost', serif" }}>
                    Requests
                  </Typography>
              </CardContent>
            </CardActionArea>
          </Card>

          <Card sx={{ 
            minWidth: "15vw",
            margin: "auto",
            boxShadow: 3,
            backgroundColor:"rgb(253, 234, 193)",
            "&:hover":{
              transform:'scale(1.05)',
              backgroundColor:"rgb(236, 198, 116)",
            }
            }}>
            <CardActionArea onClick={redirectProfile}>
              <CardContent sx={{ textAlign: "center",fontFamily: "'Jost', serif" }}>
                <FaUser size={50} color="rgb(60, 51, 31)" />
                  <Typography variant="h6" component="div" sx={{ marginTop: 2, fontFamily: "'Jost', serif" }}>
                    Profile
                  </Typography>
              </CardContent>
            </CardActionArea>
          </Card>

        </div>
        }
        {user.role==="ROLE_Owner" && 
        <div className={styles.cards}>
        
          <Card sx={{ 
            minWidth: "15vw",
            margin: "auto",
            boxShadow: 3,
            backgroundColor:"rgb(253, 234, 193)",
            "&:hover":{
              transform:'scale(1.05)',
              backgroundColor:"rgb(236, 198, 116)",
            }
            }}>
            <CardActionArea onClick={redirectManageProperties}>
              <CardContent sx={{ textAlign: "center",fontFamily: "'Jost', serif" }}>
                <BiSolidBuildingHouse size={50} color="rgb(60, 51, 31)" />
                <Typography variant="h6" component="div" sx={{ marginTop: 2, fontFamily: "'Jost', serif" }}>
                  Manage Properties
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>

          <Card sx={{ 
            minWidth: "15vw",
            margin: "auto",
            boxShadow: 3,
            backgroundColor:"rgb(253, 234, 193)",
            "&:hover":{
              transform:'scale(1.05)',
              backgroundColor:"rgb(236, 198, 116)",
            }
            }}>
            <CardActionArea onClick={redirectManageTenants}>
              <CardContent sx={{ textAlign: "center",fontFamily: "'Jost', serif" }}>
                <IoPeopleSharp  size={50} color="rgb(60, 51, 31)" />
                  <Typography variant="h6" component="div" sx={{ marginTop: 2, fontFamily: "'Jost', serif" }}>
                    Manage Tenants
                  </Typography>
              </CardContent>
            </CardActionArea>
          </Card>

          <Card sx={{ 
            minWidth: "15vw",
            margin: "auto",
            boxShadow: 3,
            backgroundColor:"rgb(253, 234, 193)",
            "&:hover":{
              transform:'scale(1.05)',
              backgroundColor:"rgb(236, 198, 116)",
            }
            }}>
            <CardActionArea onClick={redirectPayments}>
              <CardContent sx={{ textAlign: "center",fontFamily: "'Jost', serif" }}>
                <RiMoneyRupeeCircleFill size={50} color="rgb(60, 51, 31)" />
                  <Typography variant="h6" component="div" sx={{ marginTop: 2, fontFamily: "'Jost', serif" }}>
                    Payments
                  </Typography>
              </CardContent>
            </CardActionArea>
          </Card>

          <Card sx={{ 
            minWidth: "15vw",
            margin: "auto",
            boxShadow: 3,
            backgroundColor:"rgb(253, 234, 193)",
            "&:hover":{
              transform:'scale(1.05)',
              backgroundColor:"rgb(236, 198, 116)",
            }
            }}>
            <CardActionArea onClick={redirectRequests}>
              <CardContent sx={{ textAlign: "center",fontFamily: "'Jost', serif" }}>
                <TbHelpSquareFilled size={50} color="rgb(60, 51, 31)" />
                  <Typography variant="h6" component="div" sx={{ marginTop: 2, fontFamily: "'Jost', serif" }}>
                    Requests
                  </Typography>
              </CardContent>
            </CardActionArea>
          </Card>

          <Card sx={{ 
            minWidth: "15vw",
            margin: "auto",
            boxShadow: 3,
            backgroundColor:"rgb(253, 234, 193)",
            "&:hover":{
              transform:'scale(1.05)',
              backgroundColor:"rgb(236, 198, 116)",
            }
            }}>
            <CardActionArea onClick={redirectProfile}>
              <CardContent sx={{ textAlign: "center",fontFamily: "'Jost', serif" }}>
                <FaUser size={50} color="rgb(60, 51, 31)" />
                  <Typography variant="h6" component="div" sx={{ marginTop: 2, fontFamily: "'Jost', serif" }}>
                    Profile
                  </Typography>
              </CardContent>
            </CardActionArea>
          </Card>

        </div>
        }
      </div>
      }
    </div>
  );
};

export default Home;
