import React from "react";
import Button from "@material-ui/core/Button";
import * as SendBird from "sendbird";
import PropTypes from 'prop-types';

class LoginButton extends React.PureComponent {
  connectToSendbird = username => {
    const sb = new SendBird({ appId: process.env.REACT_APP_SB_APP_ID });
    return new Promise(resolve => {
      sb.connect(
        username,
        (user, error) => {
          if (error) return alert(error);
          resolve(sb);
        }
      );
    });
  };

  handleClick = (username, setSendbird, history) => async () => {
    if (!username) return;
    let sb = await this.connectToSendbird(username);
    setSendbird(sb);
    console.log(sb);
    history.push("/channels");
  };

  render() {
    const { history, username, setSB } = this.props;
    return (
      <Button
        id="loginButton"
        variant="contained"
        color="primary"
        onClick={this.handleClick(username, setSB, history)}
      >
        Submit
      </Button>
    );
  }
}

LoginButton.propTypes = {
  setSB: PropTypes.func.isRequired,
  username: PropTypes.string,
  history: PropTypes.object.isRequired,
}

export default LoginButton;
