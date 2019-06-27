import React from "react";
import Login from "../components/screens/Login/Login";
import Channels from "../components/screens/Channels/Channels";
import Chat from "../components/screens/Chat/Chat";
import ProtectedRoute from "../components/common/ProtectedRoute/ProtectedRoute";
import { SharedSnackbarProvider } from "../components/common/Snackbar/SharedSnackbar.context";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

class App extends React.Component {
  state = {
    sb: ""
  };

  setSB = sb => {
    this.setState({
      sb: sb
    });
  };

  render() {
    return (
      <SharedSnackbarProvider>
        <Router>
          <React.Fragment>
            <Redirect from="/" to="/login" />
            <Route
              path="/login"
              render={props => <Login {...props} setSB={this.setSB} />}
            />
            <ProtectedRoute
              sb={this.state.sb}
              path="/channels"
              component={Channels}
            />
            <ProtectedRoute
              sb={this.state.sb}
              path="/chat/:channelURL"
              component={Chat}
            />
          </React.Fragment>
        </Router>
      </SharedSnackbarProvider>
    );
  }
}

export default App;
