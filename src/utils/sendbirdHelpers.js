/*
 * Functions used within Chat.jsx, NavMenu.jsx, and ChatMenu.jsx
 */

export const exitChannel = curChannel => {
  return new Promise(resolve => {
    curChannel.exit((response, error) => {
      if (error) console.log(error);
      resolve();
    });
  });
};

export const getChannel = (sb, channelURL) => {
  return new Promise(resolve => {
    sb.OpenChannel.getChannel(channelURL, (channel, error) => {
      if (error) return error;
      resolve(channel);
    });
  });
};

export const getMessages = channel => { 
  return new Promise(resolve => {
    let messageListQuery = channel.createPreviousMessageListQuery();
    messageListQuery.limit = 30;
    messageListQuery.reverse = false;
    messageListQuery.load((messageList, error) => {
      if (error) return error;
      resolve(messageList);
    });
  });
};