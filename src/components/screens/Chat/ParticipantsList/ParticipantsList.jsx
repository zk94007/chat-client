import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import styles from './ParticipantsList.styles';
import PropTypes from 'prop-types';

const ParticipantsList = props => {
  const {
    classes: { participantsListContainer },
    isOpen,
    toggle,
    participants
  } = props;

  const formattedList = (
    <div className={participantsListContainer}>
      <List
        subheader={<ListSubheader color="primary">Active Users</ListSubheader>}
      >
        {participants.map((participant, index) => {
          return (
            <ListItem key={participant + index.toString()}>
              {participant}
            </ListItem>
          );
        })}
      </List>
    </div>
  );

  return (
    <React.Fragment>
      <Drawer open={isOpen} onClick={toggle}>
        <div>{formattedList}</div>
      </Drawer>
    </React.Fragment>
  );
};

ParticipantsList.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  participants: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default withStyles(styles)(ParticipantsList);
