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
import { Tracklist } from 'api';
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

interface TracklistEditorProps {
  tracklist: Tracklist | null;
  isLoading: boolean;
}

const TracklistEditor: React.FC<TracklistEditorProps> = ({
  tracklist,
  isLoading,
}) => {
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

  if (tracklist === null || tracklist.sections.length === 0) {
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
        <ListSubheader className={classes.subheader}>
          {tracklist.name}
        </ListSubheader>
        {tracklist.sections.map((section) => (
          <TracklistItem section={section} />
        ))}
      </List>
    </Paper>
  );
};

export default TracklistEditor;
