import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Link } from "react-router-dom";
import { getChannel, exitChannel } from "../../../utils/sendbirdHelpers";

class NavMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null
    };
  }

  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget
    });
  };

  handleClose = event => {
    this.setState({ anchorEl: null });
  };

  handleLogout = async () => {
    const { sb, match } = this.props;
    if (match) {
      const channelURL = match.params.channelURL;
      let channel = await getChannel(sb, channelURL);
      await exitChannel(channel);
    }
    sb.disconnect();
  };

  render() {
    const { anchorEl } = this.state;
    return (
      <React.Fragment>
        <IconButton onClick={this.handleClick} color="inherit">
          <MenuIcon />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleLogout} component={Link} to={"/login"}>
            Logout
          </MenuItem>
        </Menu>
      </React.Fragment>
    );
  }
}

export default NavMenu;
