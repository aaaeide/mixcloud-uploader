import React, { useReducer, useEffect } from 'react';

import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';

import { fetchBookingList, fetchBookingDetails } from 'api';

import Navbar from 'components/Navbar';
import BookingSelectionForm from 'components/BookingSelectionForm';
import TracklistEditor from 'components/Tracklist';
import { generateTracklist } from './generateTracklist';

import {
  reducer,
  initialState,
  setCurrentBookingList,
  setBookingListLoading,
  setTracklist,
  setBookingDetailsLoading,
} from '../state';

const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    selectedDate,
    selectedStudio,
    selectedBookings,
    tracklist,
    bookingDetailsLoading,
  } = state;

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

    const generatedTracklist = generateTracklist(fetchedBookingDetails);

    dispatch(setTracklist(generatedTracklist));
    dispatch(setBookingDetailsLoading(false));
  }

  return (
    <Grid container spacing={6}>
      <Grid container justify='center' alignItems='center'>
        <Navbar />
        <Toolbar />
      </Grid>
      <Grid item md={7} sm={12}>
        <BookingSelectionForm
          state={state}
          dispatch={dispatch}
          onSubmit={fetchDetailsAndGenerateTracklist}
        />
      </Grid>
      <Grid item md={5} sm={12}>
        <TracklistEditor
          tracklist={tracklist}
          isLoading={bookingDetailsLoading}
        />
      </Grid>
    </Grid>
  );
};

export default App;
