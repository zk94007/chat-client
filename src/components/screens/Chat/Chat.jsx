import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";
import ChatHeader from "./ChatHeader/ChatHeader";
import ChatMenu from "./ChatMenu/ChatMenu";
import NavBar from "../../common/NavBar/NavBar";
import styles from "./Chat.styles";
import MessageInput from "./MessageInput/MessageInput";
import MessagesDisplay from "./MessagesDisplay/MessagesDisplay";
import { addChannelHandler, getParticipantList } from "../../../utils/channelHandler";
import { getChannel, exitChannel, getMessages } from "../../../utils/sendbirdHelpers";
import PropTypes from 'prop-types';

class Chat extends React.Component {
  state = {
    loading: true,
    channel: "",
    messages: [],
    channelName: "",
    participants: []
  };

  async componentDidMount() {
    const { sb } = this.props;
    const channelURL = this.props.match.params.channelURL;
    const channel = await getChannel(sb, channelURL);
    let initialParticipants = getParticipantList(channel);
    let prevMessages = await getMessages(channel);
    prevMessages = prevMessages.map(message => {
      return this.transformMessage(message);
    })
    window.addEventListener("beforeunload", this.onUnload);
    this.setState({
      channel: channel,
      channelName: channel.name,
      messages: prevMessages,
      participants: initialParticipants,
      loading: false
    });
    addChannelHandler(sb, channel, this.updateParticipants, this.addNewMessage);
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.onUnload);
  }

  onUnload = event => {
    event.preventDefault();
    exitChannel(this.props.sb, this.state.channel); // this might need to be logout
    // Chrome requires returnValue to be set
    event.returnValue = "";
  };

  updateParticipants = participantsList => {
    this.setState({ participants: participantsList });
  };

  addNewMessage = newMessage => {
    let transformedMessage = this.transformMessage(newMessage);
    this.setState({
      messages: [...this.state.messages, transformedMessage]
    });
  };

  transformMessage = (messageObj) => {
    const {sb} = this.props;
    const messageContent = messageObj.message;
    const userName = sb.currentUser.userId;
    const senderName = messageObj._sender.userId;
    // This check is needed when loading previous messages, 
    // as they won't be tagged with "You" for the senderName.
    if (senderName === userName) { 
      return { sender: "You", message: messageContent}
    }
    return { sender: senderName, message: messageContent }
  }

  render() {
    const {
      classes: {
        loadingSpinner,
        chatHeader,
        chatContainer,
        messagesDisplay,
        createMessage
      },
      history,
      sb,
      match
    } = this.props;
    const {
      channelName,
      messages,
      loading,
      channel,
      participants
    } = this.state;

    if (loading === true) {
      return (
        <div className={loadingSpinner}>
          <CircularProgress />
        </div>
      );
    }

    return (
      <React.Fragment>
        <NavBar history={history} sb={sb} match={match} />
        <div className={chatContainer}>
          <div className={chatHeader}>
            <ChatHeader title={channelName}>
              <ChatMenu
                history={history}
                channel={channel}
                participants={participants}
                sb={sb}
              />
            </ChatHeader>
          </div>
          <div className={messagesDisplay}>
            <MessagesDisplay messages={messages} />
          </div>
          <div className={createMessage}>
            <MessageInput channel={channel} addMessage={this.addNewMessage} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

Chat.propTypes = {
  sb: PropTypes.object.isRequired,
}

export default withStyles(styles)(Chat);
