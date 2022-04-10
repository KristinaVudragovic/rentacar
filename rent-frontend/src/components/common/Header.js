import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Collapse, IconButton, Toolbar } from "@material-ui/core";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import FlightTakeoffRoundedIcon from '@material-ui/icons/FlightTakeoffRounded';
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import PersonOutlineRoundedIcon from '@material-ui/icons/PersonOutlineRounded';
import { Link } from "react-scroll";
import { useHistory } from "react-router-dom";
import AuthService from "../../services/AuthService";
import ReceiptIcon from '@material-ui/icons/Receipt';
import GroupIcon from '@material-ui/icons/Group';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';

const useStyles = makeStyles((theme) => ({
  appbar: {
    background: "none",
    fontFamily: "Pattaya",
  },
  icon: {
    color: "#fff",
    fontSize: "3rem",
  },
  appbarTitle: {
    flexGrow: "1",
  },
  appbarWrapper: {
    width: "80%",
    margin: "0 auto",
  },
  colorText: {
    color: "#b3b3ff",
  },
  root: {
    display: "flex",
    justifyContent: "center",
    height: "100vh",
    fontFamily: "Pattaya",
    alignItems: "center",
  },
  title: {
    color: "#000",
    fontFamily: "Pattaya",
    fontSize: "4rem",
  },
  subtitle: {
    color: "#000",
    fontFamily: "Pattaya",
    fontSize: "2rem",
  },
  container: {
    textAlign: "center",
  },
  goDownIcon: {
    color: "#fff",
    fontSize: "4rem",
  },
}));
export default function Header() {
  const classes = useStyles();
  const history = useHistory();
  const currentUser = AuthService.getCurrentUser();

  const logoutHandler = () => {
     AuthService.logout();
     history.push("/login")
    }

  return (
    <div className={classes.root} id="header">
      <AppBar className={classes.appbar} elevation={0}>
        <Toolbar className={classes.appbarWrapper}>
        {
            <IconButton onClick={() => history.push('/')} >
              <DirectionsCarIcon className={classes.icon} />
            </IconButton>
        }
          <h1 className={classes.appbarTitle}>
            Rent a <span className={classes.colorText}>Car</span>
          </h1>
          {currentUser &&  (currentUser.uloge[0] === "ADMINISTRATOR" || currentUser.uloge[1] === "ADMINISTRATOR" ) && (
            <div>
           <IconButton>
           <GroupIcon className={classes.icon} onClick={() => history.push('/korisnik')}/> 
           </IconButton>
           <IconButton>
           <DirectionsCarIcon className={classes.icon} onClick={() => history.push('/automobil')}/> 
           </IconButton>
           </div>
          )}
          {currentUser ? (
            <div>
              {currentUser &&  (currentUser.uloge[0] === "KORISNIK" ) && (
              <IconButton onClick={() => history.push('/profil')} >
                <AccountCircleOutlinedIcon className={classes.icon} />
              </IconButton>
            )}
              <IconButton  onClick={logoutHandler} >
              <ExitToAppOutlinedIcon className={classes.icon} />
            </IconButton>
            </div>
          ):(
            <IconButton onClick={() => history.push('/login')}>
              <PersonOutlineRoundedIcon className={classes.icon} />
            </IconButton>
          )}
         
          
        </Toolbar>
      </AppBar>
      
        <div className={classes.container}>
          <h1 className={classes.title}>
            Dobro došli!
          </h1>
          <h2  className={classes.subtitle} >
          Veliki izbor svih vrsta automobila za iznajmljivanje po povoljnim cenama. <br/> Osiguranje i podrška 24/7. <br/>
		  Rezervišite i Vi svoj na vreme, već danas!
          </h2>
        </div>
    </div>
  );
}
