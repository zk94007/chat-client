import React from "react";
import { withStyles } from "@material-ui/core/styles";
import ChannelList from "./ChannelList/ChannelList";
import CreateChannelButton from "./CreateChannelButton/CreateChannelButton";
import NavBar from "../../common/NavBar/NavBar";
import styles from "./Channels.styles";
import PropTypes from 'prop-types';

class Channels extends React.Component {
  state = {
    channels: []
  };

  async componentDidMount() {
    const { sb } = this.props;
    const openChannelListQuery = sb.OpenChannel.createOpenChannelListQuery();
    openChannelListQuery.next((channels, error) => {
      if (error) return console.log(error);
      this.setState({ channels: channels });
    });
  }

  enterChannel = channelURL => {
    const { sb } = this.props;
    return new Promise(async resolve => {
      sb.OpenChannel.getChannel(channelURL, (channel, error) => {
        if (error) return console.log(error);
        channel.enter((response, error) => {
          if (error) return console.log(error);
          console.log(channel);
          resolve(channel);
        });
      });
    });
  };

  render() {
    const {
      classes: { channelsContainer, createChannel, channelList },
      history,
      sb
    } = this.props;
    const { channels } = this.state;
    return (
      <React.Fragment>
        <NavBar history={history} sb={sb}/>
        <div className={channelsContainer}>
          <div className={channelList}>
            <ChannelList
              history={history}
              channels={channels}
              enterChannel={this.enterChannel}
            />
          </div>
          <div className={createChannel}>
            <CreateChannelButton
              sb={sb}
              history={history}
              enterChannel={this.enterChannel}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

Channels.propTypes = {
  sb: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

export default withStyles(styles)(Channels);
