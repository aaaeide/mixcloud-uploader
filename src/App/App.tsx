import React, { useReducer, useEffect } from 'react';

import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';

import { fetchBookingList, fetchBookingDetails } from 'api';

import Navbar from 'components/Navbar';
import BookingSelectionForm from 'components/BookingSelectionForm';
import TracklistEditor from 'components/Tracklist';
import DetailsForm from 'components/DetailsForm';
import { generateTracklist, removePromoPause } from './tracklistUtils';

import {
  reducer,
  initialState,
  setCurrentBookingList,
  setBookingListLoading,
  setTracklist,
  setBookingDetailsLoading,
  setAuthObject,
} from '../state';

interface AppProps {
  clientId: string;
  clientSecret: string;
}

interface MixCloudAuthResponse {
  // eslint-disable-next-line camelcase
  access_token: string;
}
interface MixCloudUserInfoResponse {
  username: string;
}

const App: React.FC<AppProps> = ({ clientId, clientSecret }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    selectedDate,
    selectedStudio,
    selectedBookings,
    tracklist,
    bookingDetailsLoading,
  } = state;

  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);

  function redirectToLogin(): void {
    const redirectUri = window.location.href;
    window.location.assign(
      `https://www.mixcloud.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}`,
    );
  }

  useEffect(() => {
    async function fetchAuthDetails(
      code: string,
      redirectUri: string,
    ): Promise<void> {
      const tokenFetchResponse = await fetch(
        `https://www.mixcloud.com/oauth/access_token?client_id=${clientId}&redirect_uri=${redirectUri}&client_secret=${clientSecret}&code=${code}`,
      );
      const accessToken = ((await tokenFetchResponse.json()) as MixCloudAuthResponse)
        .access_token;

      const userInfoFetchResponse = await fetch(
        `https://api.mixcloud.com/me/?access_token=${accessToken}`,
      );
      const {
        username,
      } = (await userInfoFetchResponse.json()) as MixCloudUserInfoResponse;

      console.log(accessToken, username);
      dispatch(setAuthObject(accessToken, username));
    }

    const redirectUri = window.location.href.split('?')[0];
    if (params.has('code') && state.authObject === null) {
      fetchAuthDetails(params.get('code') as string, redirectUri).then(() =>
        window.location.replace(redirectUri),
      );
    }
  }, [clientId, clientSecret, params, state.authObject]);

  /**
   * Fetch booking list whenever selectedDate changes.
   */
  useEffect(() => {
    if (selectedDate !== null) {
      dispatch(setBookingListLoading(true));

      fetchBookingList(
        selectedDate.getFullYear(),
        selectedDate.getMonth() + 1, // getMonth() returns 0-indexed month number
        selectedDate.getDate(),
        selectedStudio,
      )
        .then((bookingList) => dispatch(setCurrentBookingList(bookingList)))
        .then(() => dispatch(setBookingListLoading(false)));
    }
  }, [selectedDate, selectedStudio]);

  async function fetchDetailsAndGenerateTracklist(): Promise<void> {
    dispatch(setBookingDetailsLoading(true));

    const fetchedBookingDetails = await Promise.all(
      selectedBookings.map((booking) => {
        const { startTime: date, id, studio } = booking;

        return fetchBookingDetails(
          date.getFullYear(),
          date.getMonth() + 1,
          date.getDate(),
          studio,
          id,
        );
      }),
    );

    let generatedTracklist = generateTracklist(fetchedBookingDetails);

    if (
      generatedTracklist !== null &&
      // eslint-disable-next-line no-alert
      window.confirm(
        'Dersom det var promopauser da du spilte inn denne episoden og de har blitt klippet vekk før opplasting til MixCloud, er det sannsynligvis ønskelig å forskyve alle elementene som finner sted etter en promopause med minus x minutter, der x er antallet promopauser som fant sted før elementet. Trykk OK for å gjøre dette, Cancel for å fortsette uten å fjerne promopauser.',
      )
    ) {
      generatedTracklist = removePromoPause(generatedTracklist);
    }

    dispatch(setTracklist(generatedTracklist));
    dispatch(setBookingDetailsLoading(false));
  }

  return (
    <Grid container spacing={6}>
      <Grid container justify='center' alignItems='center'>
        <Navbar login={redirectToLogin} authObject={state.authObject} />
        <Toolbar />
      </Grid>
      <Grid item lg={6} md={7} sm={12}>
        <BookingSelectionForm
          state={state}
          dispatch={dispatch}
          onSubmit={fetchDetailsAndGenerateTracklist}
        />
        <DetailsForm state={state} dispatch={dispatch} />
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
