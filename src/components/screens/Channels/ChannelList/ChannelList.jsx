import React from "react";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import styles from "./ChannelList.styles";
import PropTypes from "prop-types";

class ChannelList extends React.PureComponent {
  handleClick = channelURL => async event => {
    const { history, enterChannel } = this.props;
    await enterChannel(channelURL);
    history.push(`/chat/${channelURL}`);
  };

  render() {
    const {
      classes: { channelListContainer, channelButtonList, channelButton },
      channels
    } = this.props;
    return (
      <div className={channelListContainer}>
        <Paper>
          <List
            className={channelButtonList}
            subheader={<ListSubheader color="primary">Channels</ListSubheader>}
          >
            {channels.map((channel, index) => {
              const { name, url } = channel;
              return (
                <div key={name + index.toString()}>
                  <Button
                    data-testid={`${name}${index.toString()}`}
                    onClick={() => this.handleClick(url)()}
                    className={channelButton}
                  >
                    {name}
                  </Button>
                </div>
              );
            })}
          </List>
        </Paper>
      </div>
    );
  }
}

ChannelList.propTypes = {
  channels: PropTypes.arrayOf(PropTypes.object).isRequired,
  history: PropTypes.object.isRequired,
  enterChannel: PropTypes.func.isRequired
};

export default withStyles(styles)(ChannelList);
