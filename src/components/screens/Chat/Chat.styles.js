const styles = {
  chatContainer: {
    width: "100%",
    height: "90vh", // maybe position at bottom?
    display: "flex",
    flexFlow: "column",
    justifyContent: "flex-end"
  },
  createMessage: {
    width: "100%"
  },
  chatHeader: {
    maxHeight: "7vh",
    minHeight: "7vh",
    marginBottom: "auto",
    display: "flex",
    flexFlow: "row",
    alignItems: "center",
    paddingLeft: "10px",
    paddingRight: "10px"
  },
  loadingSpinner: {
    height: "90vh", // maybe position at bottom?
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  messagesDisplay: {
    overflowY: "auto"
  }
};

export default styles;
