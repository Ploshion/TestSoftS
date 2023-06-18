import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    AppBar,
    Toolbar,
    Avatar,
    Box,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
    CssBaseline,
    Drawer,
    Typography
  } from "@material-ui/core";

  import {
    Apps,
    Menu,
    ContactMail,
    AssignmentInd,
    Home
  } from "@material-ui/icons";

  import ExitToAppIcon from '@mui/icons-material/ExitToApp';

  const useStyles = makeStyles((theme) => ({
    menuSliderContainer: {
      width: 250,
      background: "#670D91",
      height: "100%"
    },
    avatar: {
      margin: "0.5rem auto",
      padding: "1rem",
      width: theme.spacing(13),
      height: theme.spacing(13)
    },
    listItem: {
      color: "white",
    }
  }));
  
  const listItems = [
    {
      listIcon: <Home />,
      listText: "Home",
      url: "Home"
    },
    {
      listIcon: <AssignmentInd />,
      listText: "Client List",
      url: "client/list"
    },
    {
      listIcon: <Apps />,
      listText: "Create Client",
      url: "client/create"
    },
    {
      listIcon: <ContactMail />,
      listText: "Contacts"
    }
    //,
    // {
    //   listIcon: <ExitToAppIcon />,
    //   listText: "Salir"
    // }
  ];

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    window.location.reload(true);
  };

export const Sidebar = () => {
const classes = useStyles();
  const [open, setOpen] = useState(false);

  const toggleSlider = () => {
    setOpen(!open);
  };

  const sideList = () => (
    <Box className={classes.menuSliderContainer} component="div">
      <Avatar
        className={classes.avatar}
        src="https://i.ibb.co/rx5DFbs/avatar.png"
        alt="Avatar"
      />
      <Divider />
      <List>
        {listItems.map((listItem, index) => (
          <Link to={listItem.url} key={index} >
            <ListItem className={classes.listItem} button >
              <ListItemIcon className={classes.listItem}>
                {listItem.listIcon}
              </ListItemIcon>
              <ListItemText primary={listItem.listText} />
            </ListItem>
          </Link>
        ))}
        <ListItem className={classes.listItem} button onClick={handleLogout}>
          <ListItemIcon className={classes.listItem}>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Salir" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <CssBaseline />

      <Box component="nav">
        <AppBar position="static">
          <Toolbar>
            <IconButton onClick={toggleSlider}>
              <Menu />
            </IconButton>
            <Typography>Clientes</Typography>
            <Drawer open={open} anchor="right" onClose={toggleSlider}>
              {sideList()}
            </Drawer>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}