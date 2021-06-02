import React, { useReducer, useEffect } from 'react';

import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';

import Navbar from 'components/Navbar';
import BookingSelectionForm from 'components/BookingSelectionForm';
import TracklistEditor from 'components/Tracklist';
import DetailsForm from 'components/DetailsForm';

import { fetchAuthDetails } from './fetchAuthDetails';
import { upload } from './upload';

import { reducer, initialState, setAuthObject } from '../state';

interface AppProps {
  clientId: string;
  clientSecret: string;
}

const App: React.FC<AppProps> = ({ clientId, clientSecret }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tracklist, bookingDetailsLoading } = state;

  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);

  function redirectToLogin(): void {
    const redirectUri = window.location.href;
    window.location.assign(
      `https://www.mixcloud.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}`,
    );
  }

  /**
   * On page load, check if we've received code param in URL (meaning we've been redirected from
   * MixCloud Auth). If so, fetch access token and username from MixCloud.
   */
  useEffect(() => {
    const redirectUri = window.location.href.split('?')[0];
    if (params.has('code') && state.authObject === null) {
      fetchAuthDetails(
        clientId,
        clientSecret,
        params.get('code') as string,
        redirectUri,
      ).then(({ accessToken, username }) =>
        dispatch(setAuthObject(accessToken, username)),
      );
    }
  }, [clientId, clientSecret, params, state.authObject]);

  /**
   * Upload the show to MixCloud.
   *
   * Per https://www.mixcloud.com/developers/#uploads:
   * The MP3, metadata and image should all be uploaded in a single multipart/form-data
   */
  async function publish(/* picture: File */): Promise<void> {
    upload(state)
      .then(() => {
        alert(
          "If your upload was successful, you should see it on your MixCloud page within a few minutes (don't hold your breath)",
        );
        /* Refresh to drop MixCloud session and clear state values. */
        window.location.assign(window.location.href.split('?')[0]);
      })
      .catch(() => {
        alert(
          'Something went wrong with your upload. Try reloading the page and signing in to Mixcloud again.',
        );
        /* No refresh in case user wants to save their entered text. */
      });
  }

  return (
    <Grid container spacing={6}>
      <Grid container justify='center' alignItems='center'>
        <Navbar login={redirectToLogin} authObject={state.authObject} />
        <Toolbar />
      </Grid>
      <Grid item lg={6} md={7} sm={12}>
        <DetailsForm
          state={state}
          dispatch={dispatch}
          submit={() => publish()}
        />
        <BookingSelectionForm state={state} dispatch={dispatch} />
      </Grid>
      <Grid item lg={6} md={5} sm={12}>
        <TracklistEditor
          tracklist={tracklist}
          isLoading={bookingDetailsLoading}
        />
      </Grid>
    </Grid>
  );
};

export default App;
