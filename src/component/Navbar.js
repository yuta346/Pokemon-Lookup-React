import React from 'react';
import {Link} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: "linear-gradient(316deg, #ff7d14 0%, #f94327 74%)",
  },
  title: {
    flexGrow: 1,
    fontWeight:"bold",
    fontSize:"1.5rem",
    marginLeft:40
  },
}));

export default function Navbar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.root}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Pokemon Lookup
          </Typography>
          <Button color="inherit" component={Link} to="/pokemon/all" style={{fontWeight:"bold", fontSize:"1.1rem"}}>Pokédex</Button>
          <Button color="inherit" component={Link} to="/" style={{fontWeight:"bold", fontSize:"1.1rem"}}>Logout</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
