import React, { useReducer, useEffect } from 'react';

import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';

import { fetchBookingList } from 'api';

import Navbar from 'components/Navbar';
import BookingSelectionForm from 'components/BookingSelectionForm';

import {
  reducer,
  initialState,
  setCurrentBookingList,
  setBookingListLoading,
} from '../state';

const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { selectedDate, selectedStudio, selectedBookings } = state;

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

  console.log('CURRENTLY SELECTED BOOKINGS', selectedBookings);

  return (
    <Grid container spacing={6}>
      <Grid container justify='center' alignItems='center'>
        <Navbar />
        <Toolbar />
      </Grid>
      <Grid item md={8} sm={12}>
        <BookingSelectionForm state={state} dispatch={dispatch} />
      </Grid>
      <Grid item md={4} sm={12} />
    </Grid>
  );
};

export default App;
