export const getParticipantList = channel => {
  let list = [];
  const participantListQuery = channel.createParticipantListQuery();
  participantListQuery.next((participantList, error) => {
    if (error) return console.log(error);
    participantList.map(participant => {
      return list.push(participant.userId);
    });
  });
  return list;
};

export const addChannelHandler = (
  sb,
  channel,
  updateParticipants,
  addNewMessage
) => {
  const ChannelHandler = new sb.ChannelHandler();
  const channelHandlerID = channel.url;
  ChannelHandler.onUserEntered = (openChannel, user) => {
    const participantList = getParticipantList(channel);
    const newMessage = {
      _sender: {userId: "info"},
      message: `${user.userId} has joined.`
    };
    updateParticipants(participantList);
    addNewMessage(newMessage);
  };
  ChannelHandler.onUserExited = (openChannel, user) => {
    const participantList = getParticipantList(channel);
    const newMessage = {
      _sender: {userId: "info"},
      message: `${user.userId} has left.`
    };
    updateParticipants(participantList);
    addNewMessage(newMessage);
  };
  ChannelHandler.onMessageReceived = (channel, message) => {
    addNewMessage(message);
  };
  /*
   * Consider changing this. Add in a push to /channels and an alert in place of an info message.
   */
  ChannelHandler.onChannelDeleted = (channelUrl, channelType) => {
    console.dir(channelUrl);
    console.dir(channelType);
    const newMessage = {
      _sender: {userId: "info"},
      message:
        "This channel has been deleted. You are no longer able to send or receive messages here."
    };
    addNewMessage(newMessage);
  };

  sb.addChannelHandler(channelHandlerID, ChannelHandler);
};
