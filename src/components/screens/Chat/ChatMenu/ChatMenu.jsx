import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ParticipantsList from "../ParticipantsList/ParticipantsList";
import { exitChannel } from "../../../../utils/sendbirdHelpers";
import DeleteChannelButton from "../DeleteChannelButton/DeleteChannelButton";
import PropTypes from 'prop-types';

class ChatMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      isOpen: false
    };
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleLeave = () => {
    const { channel, history } = this.props;
    exitChannel(channel);
    history.push("/channels");
  };

  toggleParticipants = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
    this.handleClose();
  };

  render() {
    const { participants, channel, history, sb } = this.props;
    const { anchorEl, isOpen } = this.state;
    const open = Boolean(anchorEl);

    return (
      <React.Fragment>
        <IconButton data-testid={"chatMenuButton"} onClick={this.handleClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu anchorEl={anchorEl} open={open} onClose={this.handleClose}>
          <MenuItem onClick={this.toggleParticipants}>
            View Participants
          </MenuItem>
          <MenuItem onClick={this.handleLeave}>Leave Channel</MenuItem>
          <DeleteChannelButton history={history} channel={channel} sb={sb} />
        </Menu>
        <ParticipantsList
          isOpen={isOpen}
          toggle={this.toggleParticipants}
          channel={channel}
          participants={participants}
        />
      </React.Fragment>
    );
  }
}

ChatMenu.propTypes = {
  history: PropTypes.object.isRequired,
  channel: PropTypes.object.isRequired,
  participants: PropTypes.arrayOf(PropTypes.string).isRequired,
  sb: PropTypes.object.isRequired,
}

export default ChatMenu;
