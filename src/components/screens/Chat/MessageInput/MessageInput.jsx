import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SendIcon from "@material-ui/icons/SendRounded";
import IconButton from "@material-ui/core/IconButton";
import styles from "./MessageInput.styles";

class MessageInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ""
    };
  }

  handleChange = event => {
    this.setState({ message: event.target.value });
  };

  sendMessage = (channel, message) => {
    channel.sendUserMessage(message, (message, error) => {
      if (error) return console.log(error);
    });
  };

  handleClick = () => {
    const { channel, addMessage } = this.props;
    const { message } = this.state;
    this.sendMessage(channel, message);
    let newMessage = { _sender: { userId: "You" }, message: message };
    addMessage(newMessage);
    this.setState({ message: "" });
  };

  render() {
    const {
      classes: { messageInputContainer, messageInputTextField }
    } = this.props;
    const { message } = this.state;
    let color;

    !message ? (color = "default") : (color = "primary");

    return (
      <div className={messageInputContainer}>
        <TextField
          multiline
          rowsMax="4"
          value={message}
          onChange={this.handleChange}
          className={messageInputTextField}
          margin="normal"
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  variant="contained"
                  onClick={this.handleClick}
                  color={color}
                >
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      </div>
    );
  }
}

export default withStyles(styles)(MessageInput);
