# Common Components Overview

This folder contains all React components that are used in multiple places throughout the app, or ones that are likely going to be reused in future feature implementations. 

## ProtectedRoute 

This takes in a component and the SendBird object as parameters. If the SendBird object has not yet been assigned, it indicates the user has not logged in and should not be able to access a protected route. In this case, they are redirected to the login page. Otherwise, this returns a <Route> component and renders the component passed as an argument on the specified route. 

## SharedSnackbar

The Snackbar displays a context message on the bottom of the screen. This is required to be provided as context because a primary scenario where it is used is when a user deletes a channel. When the channel is deleted, they are re-routed to the main Channels page from the Chat screen; however, the logic of deleting the channel is triggered from within the Chat screen. The snackbar is displayed on the Channels screen after the message has been deleted and the Chat component is unmounted. 

## AlertDialog

This component is a Material UI-styled alert. Currently the app doesn't make use of this because functionality was removed that did use it; however, future implementations will almost certainly incorporate it so it has been left defined. 