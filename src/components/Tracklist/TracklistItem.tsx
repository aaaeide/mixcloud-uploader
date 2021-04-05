import React from 'react';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Paper,
} from '@material-ui/core';
import { Delete, MusicNote, VolumeUp, Forum } from '@material-ui/icons';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import { Section } from 'api';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.primary.contrastText,
      marginBottom: '.5em',
    },
    icon: {
      color: theme.palette.primary.contrastText,
    },
  }),
);

const TracklistItem: React.FC<{ section: Section }> = ({ section }) => {
  const classes = useStyles();

  const Icon: React.FC = () => {
    if (section.type === 'Track') return <MusicNote />;
    if (section.type === 'Jingle') return <VolumeUp />;
    return <Forum />;
  };

  return (
    <Paper elevation={6} className={classes.paper}>
      <ListItem key={section.startTime}>
        <ListItemIcon className={classes.icon}>
          <Icon />
        </ListItemIcon>
        <ListItemText primary={`${section.startTime}: \t${section.title}`} />
        <ListItemSecondaryAction>
          <IconButton edge='end'>
            <Delete />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </Paper>
  );
};

export default TracklistItem;
