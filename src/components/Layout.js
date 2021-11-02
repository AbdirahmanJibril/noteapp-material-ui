import React from 'react';
import { Navbar } from '../pages/Navbar';
import { makeStyles } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import { useHistory, useLocation } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { AddCircleOutlineOutlined, SubjectOutlined } from '@material-ui/icons';
import { Hidden } from '@material-ui/core/Hidden';
import { blue, teal } from '@material-ui/core/colors';
import ListSubheader from '@material-ui/core/ListSubheader';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: 'flex',
    },
    page: {
      width: '100%',
    },
    drawerPaper: {
      width: drawerWidth,
    },
    active: {
      background: teal[100],
    },
    drawer: {
      width: drawerWidth,
    },
    title: {
      padding: theme.spacing(2),
      fontSize: 20,
      fontWeight: theme.typography.fontWeightMedium,
    },
    appbar: {
      width: `calc(100% - ${drawerWidth}px)`,
      backgroundColor: theme.palette.primary.main,
    },
  };
});

const Layout = ({ children }) => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const menuItems = [
    {
      text: 'Create Notes',
      icon: <AddCircleOutlineOutlined color='primary' />,
      path: '/',
    },
    {
      text: 'Notes',
      icon: <SubjectOutlined color='primary' />,
      path: '/fetched',
    },
  ];

  return (
    <div className={classes.root}>
      <AppBar className={classes.appbar}>
        <Toolbar>
          Today's Notes on {new Date().toLocaleDateString(15, 10, 2021)}
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        classes={{ paper: classes.drawerPaper }}
        variant='permanent'
        anchor='left'>
        <List>
          <ListSubheader className={classes.title}>
            Navigation Pan
          </ListSubheader>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => history.push(item.path)}
              className={
                location.pathname == item.path ? classes.active : null
              }>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <div className={classes.page}>{children}</div>
    </div>
  );
};

export default Layout;
