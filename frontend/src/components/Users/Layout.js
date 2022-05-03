import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ListAltIcon from '@mui/icons-material/ListAlt';
import MedicationIcon from '@mui/icons-material/Medication';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
import { Avatar, Drawer, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import ChatIcon from '@mui/icons-material/Chat';
import UploadFileIcon from '@mui/icons-material/UploadFile';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => {
  return {
    pages: {
      background: '#f9f9f9',
      width: '100%',
    },
    drawer: {
      width: drawerWidth,
      background: 'red',
    },
    drawerPaper: {
      width: drawerWidth,
    },
    root: {
      display: 'flex',
    },
    active: {
      background: '#f4f4f4',
    },
    title: {
      padding: 12,
    },
    appbar: {
      width: `calc(100% - 240px)`,
    },
    toolbar: {
      marginBottom: '60px',
    },
  };
});
const Layout = ({ children }) => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  console.log({ children });
  console.log(location.pathname);
  const menuItems = [
    {
      text: 'View Documents',
      icon: <ListAltIcon color='secondary' />,
      path: '/login',
    },
    {
      text: 'Upload Documents',
      icon: <UploadFileIcon color='secondary' />,
      path: '/file_upload/',
    },
  ];
  return (
    <div className={classes.root}>
      {/* navigation bar */}
      <AppBar
        position='fixed'
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Navbar />
      </AppBar>
      {/* side bar */}
      <Drawer
        className={classes.drawer}
        classes={{ paper: classes.drawerPaper }}
        variant='permanent'
        anchor='left'
      >
        <Typography variant='h6' component='h2' className={classes.title}>
          BlockDoc
        </Typography>
        {/* List of Profile Details */}

        {/* List Links */}
        <List>
          {/* @TODO classActive to list Item */}
          {menuItems.map((menuItem) => (
            <ListItem
              button
              key={menuItem.text}
              onClick={() => history.push(menuItem.path)}
            >
              <ListItemIcon>{menuItem.icon}</ListItemIcon>
              <ListItemText primary={menuItem.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <div className={classes.pages}>
        <div className={classes.toolbar}></div>
        {children}
      </div>
    </div>
  );
};

export default Layout;
