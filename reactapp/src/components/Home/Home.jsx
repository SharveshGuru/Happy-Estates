import React,{useContext} from 'react';
import styles from "./Home.module.css";
import { UserContext } from '../UserContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { BiSolidBuildingHouse } from "react-icons/bi";
import { HiHome } from "react-icons/hi2";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { TbHelpSquareFilled } from "react-icons/tb";
import { FaUser } from "react-icons/fa";
import { IoPeopleSharp } from "react-icons/io5";
import Logout from '../Login/Logout';


const Home = () => {

  const {user}=useContext(UserContext)
  const navigate=useNavigate();

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
          <h1 className={styles.name}>Welcome {toTitleCase(user.name)}!</h1>
          <Logout bs="homeLogout"/>
        </div>
        <br></br>
        
        {user.usertype==="Tenant" && 
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
            <CardActionArea onClick={redirectPayments}>
              <CardContent sx={{ textAlign: "center",fontFamily: "'Jost', serif" }}>
                <RiMoneyRupeeCircleFill size={50} color="rgb(212, 158, 39)" />
                  <Typography variant="h6" component="div" sx={{ marginTop: 2, fontFamily: "'Jost', serif" }}>
                    Payments
                  </Typography>
              </CardContent>
            </CardActionArea>
          </Card>

          <Card sx={{ minWidth: 250, margin: "auto", boxShadow: 3,backgroundColor:"rgb(253, 234, 193)" }}>
            <CardActionArea onClick={redirectRequests}>
              <CardContent sx={{ textAlign: "center",fontFamily: "'Jost', serif" }}>
                <TbHelpSquareFilled  size={50} color="rgb(212, 158, 39)" />
                  <Typography variant="h6" component="div" sx={{ marginTop: 2, fontFamily: "'Jost', serif" }}>
                    Requests
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
        }
        {user.usertype==="Owner" && 
        <div className={styles.cards}>
        
          <Card sx={{ minWidth: 250, margin: "auto", boxShadow: 3,backgroundColor:"rgb(253, 234, 193)" }}>
            <CardActionArea onClick={redirectManageProperties}>
              <CardContent sx={{ textAlign: "center",fontFamily: "'Jost', serif" }}>
                <BiSolidBuildingHouse size={50} color="rgb(212, 158, 39)" />
                <Typography variant="h6" component="div" sx={{ marginTop: 2, fontFamily: "'Jost', serif" }}>
                  Manage Properties
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>

          <Card sx={{ minWidth: 250, margin: "auto", boxShadow: 3,backgroundColor:"rgb(253, 234, 193)" }}>
            <CardActionArea onClick={redirectManageTenants}>
              <CardContent sx={{ textAlign: "center",fontFamily: "'Jost', serif" }}>
                <IoPeopleSharp  size={50} color="rgb(212, 158, 39)" />
                  <Typography variant="h6" component="div" sx={{ marginTop: 2, fontFamily: "'Jost', serif" }}>
                    Manage Tenants
                  </Typography>
              </CardContent>
            </CardActionArea>
          </Card>

          <Card sx={{ minWidth: 250, margin: "auto", boxShadow: 3,backgroundColor:"rgb(253, 234, 193)" }}>
            <CardActionArea onClick={redirectPayments}>
              <CardContent sx={{ textAlign: "center",fontFamily: "'Jost', serif" }}>
                <RiMoneyRupeeCircleFill size={50} color="rgb(212, 158, 39)" />
                  <Typography variant="h6" component="div" sx={{ marginTop: 2, fontFamily: "'Jost', serif" }}>
                    Payments
                  </Typography>
              </CardContent>
            </CardActionArea>
          </Card>

          <Card sx={{ minWidth: 250, margin: "auto", boxShadow: 3,backgroundColor:"rgb(253, 234, 193)" }}>
            <CardActionArea onClick={redirectRequests}>
              <CardContent sx={{ textAlign: "center",fontFamily: "'Jost', serif" }}>
                <TbHelpSquareFilled size={50} color="rgb(212, 158, 39)" />
                  <Typography variant="h6" component="div" sx={{ marginTop: 2, fontFamily: "'Jost', serif" }}>
                    Requests
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
        }
      </div>
      }
    </div>
  );
};

export default Home;
