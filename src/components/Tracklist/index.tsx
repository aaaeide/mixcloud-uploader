import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  ListSubheader,
  Paper,
} from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { BookingDetails } from 'api';
import TracklistItem from './TracklistItem';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.primary.contrastText,
      position: 'relative',
      overflow: 'scroll',
      height: '80vh',
      width: '90%',
      padding: '0 1em',
    },
    subheader: {
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.light,
    },
    ul: {
      backgroundColor: 'inherit',
      padding: 0,
      listStyle: 'none',
    },
  }),
);

interface TracklistProps {
  bookingDetails: BookingDetails[];
  isLoading: boolean;
}

const Tracklist: React.FC<TracklistProps> = ({ bookingDetails, isLoading }) => {
  const classes = useStyles();

  if (isLoading) {
    return (
      <Paper elevation={3} className={classes.root}>
        <List>
          <CircularProgress color='secondary' />
        </List>
      </Paper>
    );
  }

  if (bookingDetails.length === 0) {
    return (
      <Paper elevation={3} className={classes.root}>
        <List>
          <ListItem>
            <ListItemText primary='Ingenting å vise.' />
          </ListItem>
        </List>
      </Paper>
    );
  }

  return (
    <Paper elevation={3} className={classes.root}>
      <List subheader={<li />}>
        {bookingDetails.map((booking) => (
          <li key={booking.id}>
            <ul className={classes.ul}>
              <ListSubheader className={classes.subheader}>
                {booking.title}
              </ListSubheader>
              {booking.elements.map((element) => (
                <TracklistItem element={element} />
              ))}
            </ul>
          </li>
        ))}
      </List>
    </Paper>
  );
};

export default Tracklist;
