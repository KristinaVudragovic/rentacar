import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {useHistory} from 'react-router-dom';
import {GiCommercialAirplane} from "react-icons/gi";
import CreditCardIcon from '@material-ui/icons/CreditCard';
import HomeIcon from '@material-ui/icons/Home';
import GroupIcon from '@material-ui/icons/Group';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import AuthService from "../../services/AuthService";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  icon: {
    color: "#fff", //black ?
    fontSize: "2rem",
    marginRight: theme.spacing(2),
  }
}));

  export default function Navbar() {
    const classes = useStyles();
    const history = useHistory();
    const currentUser = AuthService.getCurrentUser();

    const logoutHandler = () => {
      AuthService.logout();
      history.push("/login")
     }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title} >
            <IconButton>
           < HomeIcon className={classes.icon} onClick={() => history.push('/')}/> 
           </IconButton>
          </Typography>  
          {currentUser &&  (currentUser.uloge[0] === "ADMINISTRATOR" || currentUser.uloge[1] === "ADMINISTRATOR" ) && (
            <div>
              <IconButton>
           <GroupIcon className={classes.icon} onClick={() => history.push('/korisnik')}/>
           </IconButton>
           <IconButton>
           <CreditCardIcon className={classes.icon} onClick={() => history.push('/model')}/> 
           </IconButton>
           </div>
          )}
          <IconButton>
           < DirectionsCarIcon className={classes.icon} onClick={() => history.push('/automobil')}/> 
           </IconButton>
           <IconButton>
           < CreditCardIcon edge="start" className={classes.icon} onClick={() => history.push('/nacinPlacanja')}/> 
           </IconButton>
           {currentUser ? (
             <div>
               <IconButton>
           <GroupIcon edge="start" className={classes.icon}  onClick={() => history.push('/profil')}/> 
           </IconButton>
           <IconButton>
           < ExitToAppOutlinedIcon edge="start" className={classes.icon}  onClick={logoutHandler}/> 
           </IconButton>
           </div>
           ) : (
            <IconButton>
           <  GroupIcon edge="start" className={classes.icon}  onClick={() => history.push('/login')}/> 
           </IconButton>
           )}
        </Toolbar>
      </AppBar>
    </div>
  );
}