import React,{useContext} from 'react';
import styles from "./Home.module.css";
import { UserContext } from '../UserContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { BiSolidBuildingHouse } from "react-icons/bi";
import { HiHome } from "react-icons/hi2";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { CiSquareQuestion } from "react-icons/ci";
import { FaUser } from "react-icons/fa";
import Logout from '../Login/Logout';


const Home = () => {

  const {user}=useContext(UserContext)
  const navigate=useNavigate();
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
  function redirectPayRent(){
    navigate("/pay-rent");
  }
  function redirectRaiseRequest(){
    navigate("/raise-request");
  }
  function redirectProfile(){
    navigate("/profile")
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
          <h1 className={styles.name}>Welcome {user.name}</h1>
          <Logout bs="homeLogout"/>
        </div>
        <br></br>
        <div className={styles.cards}>
          
          <Card sx={{ minWidth: 250, margin: "auto", boxShadow: 3,backgroundColor:"rgb(253, 234, 193)" }}>
            <CardActionArea onClick={redirectPropertyListings}>
              <CardContent sx={{ textAlign: "center",fontFamily: "'Jost', serif" }}>
                <BiSolidBuildingHouse size={50} color="rgb(212, 158, 39)" />
                <Typography variant="h6" component="div" sx={{ marginTop: 2, fontFamily: "'Jost', serif" }}>
                  Property Listings
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>

          <Card sx={{ minWidth: 250, margin: "auto", boxShadow: 3,backgroundColor:"rgb(253, 234, 193)" }}>
            <CardActionArea onClick={redirectMyProperty}>
              <CardContent sx={{ textAlign: "center",fontFamily: "'Jost', serif" }}>
                <HiHome  size={50} color="rgb(212, 158, 39)" />
                  <Typography variant="h6" component="div" sx={{ marginTop: 2, fontFamily: "'Jost', serif" }}>
                    My Property
                  </Typography>
              </CardContent>
            </CardActionArea>
          </Card>

          <Card sx={{ minWidth: 250, margin: "auto", boxShadow: 3,backgroundColor:"rgb(253, 234, 193)" }}>
            <CardActionArea onClick={redirectPayRent}>
              <CardContent sx={{ textAlign: "center",fontFamily: "'Jost', serif" }}>
                <RiMoneyRupeeCircleFill size={50} color="rgb(212, 158, 39)" />
                  <Typography variant="h6" component="div" sx={{ marginTop: 2, fontFamily: "'Jost', serif" }}>
                    Pay Rent
                  </Typography>
              </CardContent>
            </CardActionArea>
          </Card>

          <Card sx={{ minWidth: 250, margin: "auto", boxShadow: 3,backgroundColor:"rgb(253, 234, 193)" }}>
            <CardActionArea onClick={redirectRaiseRequest}>
              <CardContent sx={{ textAlign: "center",fontFamily: "'Jost', serif" }}>
                <CiSquareQuestion  size={50} color="rgb(212, 158, 39)" />
                  <Typography variant="h6" component="div" sx={{ marginTop: 2, fontFamily: "'Jost', serif" }}>
                    Raise Request
                  </Typography>
              </CardContent>
            </CardActionArea>
          </Card>

          <Card sx={{ minWidth: 250, margin: "auto", boxShadow: 3,backgroundColor:"rgb(253, 234, 193)" }}>
            <CardActionArea onClick={redirectProfile}>
              <CardContent sx={{ textAlign: "center",fontFamily: "'Jost', serif" }}>
                <FaUser size={50} color="rgb(212, 158, 39)" />
                  <Typography variant="h6" component="div" sx={{ marginTop: 2, fontFamily: "'Jost', serif" }}>
                    Profile
                  </Typography>
              </CardContent>
            </CardActionArea>
          </Card>

        </div>
      </div>
      }
    </div>
  );
};

export default Home;
