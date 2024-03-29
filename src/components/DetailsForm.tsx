import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { InputLabel } from '@material-ui/core';

import {
  ReducerState,
  ReducerActionsType,
  setTitle,
  setDescription,
  setPicture,
  setAudio,
} from 'state';

import { FileInput } from 'components/FileInput';

const useStyles = makeStyles({
  root: {
    marginTop: '2em',
    padding: '0 2em',
  },
  label: {
    marginBottom: '.5em',
  },
  textarea: {
    width: '100%',
    boxSizing: 'border-box',
    backgroundColor: 'transparent',
    borderRadius: '3px',
    borderColor: 'rgba(185, 185, 185)',
    padding: '1em',
  },
});

interface DetailsFormProps {
  state: ReducerState;
  dispatch: React.Dispatch<ReducerActionsType>;
  submit: () => Promise<void>;
}

const DetailsForm: React.FC<DetailsFormProps> = ({
  state,
  dispatch,
  submit,
}) => {
  const classes = useStyles();
  const { title, description } = state;
  const uploadDisabled = state.tracklist === null;

  return (
    <form noValidate autoComplete='off' className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            label='Tittel på episoden'
            variant='outlined'
            fullWidth
            value={title}
            onChange={(evt) => dispatch(setTitle(evt.target.value))}
          />
        </Grid>
        <Grid item xs={12}>
          <textarea
            rows={4}
            className={classes.textarea}
            value={description}
            placeholder='Beskrivelse av episoden'
            onChange={(evt) => dispatch(setDescription(evt.target.value))}
          />
        </Grid>
        <Grid item xs={6}>
          <InputLabel className={classes.label}>Last opp bilde</InputLabel>
          <FileInput
            maxSize={10485760} /* Magic number from the MixCloud docs. */
            onFileSelect={(file) => dispatch(setPicture(file))}
          />
        </Grid>
        <Grid item xs={6}>
          <InputLabel className={classes.label}>Last opp lydfil</InputLabel>
          <FileInput
            maxSize={4294967296} /* Magic number from the MixCloud docs. */
            onFileSelect={(file) => dispatch(setAudio(file))}
          />
        </Grid>
        <Grid container item justify='center' alignItems='center'>
          <Button
            variant='contained'
            color='secondary'
            disabled={uploadDisabled}
            onClick={submit}
          >
            {uploadDisabled
              ? 'Ingen studiobookinger valgt'
              : 'Last opp til MixCloud'}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default DetailsForm;
