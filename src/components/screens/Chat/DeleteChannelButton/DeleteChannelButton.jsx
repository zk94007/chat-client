import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";
import styles from "./DeleteChannelButton.styles";
import { SharedSnackbarContext } from "../../../common/Snackbar/SharedSnackbar.context";
import PropTypes from 'prop-types';

class DeleteChannelButton extends React.PureComponent {
  isOperator = () => {
    const { channel, sb } = this.props;
    return channel.isOperatorWithUserId(sb.getCurrentUserId());
  };

  deleteChannel = () => {
    const { channel, sb } = this.props;
    const channelHandlerID = channel.url;
    return new Promise(resolve => {
      channel.delete((response, error) => {
        if (error) return console.log(error);
        sb.removeChannelHandler(channelHandlerID);
        resolve();
      });
    });
  };

  handleDelete = openSnackbar => async () => {
    const { history, channel } = this.props;
    if (!this.isOperator()) return;
    await this.deleteChannel();
    history.push("/channels");
    openSnackbar(`Channel ${channel.name} deleted.`);
  };

  render() {
    const {
      classes: { deleteButton },
    } = this.props;
    const {openSnackbar} = this.context;
    let disableDelete;

    this.isOperator() ? (disableDelete = false) : (disableDelete = true);

    return (
      <MenuItem
        id={"deleteChannel"}
        disabled={disableDelete}
        onClick={this.handleDelete(openSnackbar)}
        className={deleteButton}
      >
        Delete Channel
      </MenuItem>
    );
  }
}

DeleteChannelButton.propTypes = {
  channel: PropTypes.object.isRequired,
  sb: PropTypes.object.isRequired,
}

DeleteChannelButton.contextType = SharedSnackbarContext;

export default withStyles(styles)(DeleteChannelButton);
