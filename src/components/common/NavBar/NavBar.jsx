import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import NavMenu from '../NavMenu/NavMenu';
import styles from './NavBar.styles';


const Navbar = props => {
  const {
    classes: { root, grow, menuIcon },
    history, sb, match
  } = props;

  return (
    <div className={root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={grow}>
            react.chat
          </Typography>
          <div className={menuIcon}>
            <NavMenu history={history} sb={sb} match={match}/>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withStyles(styles)(Navbar);
