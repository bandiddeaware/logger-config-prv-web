import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
  userinfo: {
    margin: "16px 10px 10px 10px",
    color: '#154a8f',
    backgroundColor: "#ffffff",
    fontSize: "0.8em",
    width: "30px",
    height: "30px"
  }
}));

export default function SimpleMenu() {
  let history = useNavigate();
  const classes = useStyles();

  const AnatarTag = React.createRef();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    console.log(AnatarTag.current)
    setAnchorEl(AnatarTag.current);
  };

  React.useEffect(() => {

  }, [])

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleGotoLogin = () => {
    cookies.remove("Token")
    cookies.remove("UserInfo")
    history("/Login")
  }

  return (
    <div>
      <Avatar 
        ref={AnatarTag}
        className={classes.userinfo}
        aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}
      >
        PW
      </Avatar>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        getContentAnchorEl={null}
        anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
        transformOrigin={{vertical: 'top', horizontal: 'center'}}
      >
        {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem> */}
        <MenuItem onClick={handleGotoLogin}>Logout</MenuItem>

        {/* 

        navigate(-1); ---> Go back
        navigate(1);  ---> Go forward
        navigate(-2); ---> Move two steps backward.

        */}

      </Menu>
    </div>
  );
}