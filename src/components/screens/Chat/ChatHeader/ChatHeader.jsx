import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";

const ChatHeader = props => {
  const { title, children } = props;

  return (
    <React.Fragment>
      <Toolbar data-testid="ChatHeader">
        <Typography variant="h6" color="inherit">
          {title}
        </Typography>
        {children}
      </Toolbar>
    </React.Fragment>
  );
};

ChatHeader.propTypes = {
  title: PropTypes.string.isRequired
};

export default ChatHeader;
